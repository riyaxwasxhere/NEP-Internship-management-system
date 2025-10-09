import supabase from "./supabaseClient";

// Common response helper
const handleResponse = (data, error) => {
  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

//
// ─── AUTH ────────────────────────────────────────────────────────────────
//

// Login
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Logout
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return handleResponse(true, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//
// ─── INTERNSHIPS ───────────────────────────────────────────────────────────────
//

// Get all verified internships (visible to students)
export const getVerifiedInternships = async () => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .select("*, companies(name, email, location)")
      .eq("verified", true);
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Create new internship (company)
export const createInternship = async (
  companyId,
  title,
  description,
  location,
  stipend,
  duration
) => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .insert([
        {
          company_id: companyId,
          title,
          description,
          location,
          stipend,
          duration,
          verified: false,
        },
      ])
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//
// ─── APPLICATIONS ──────────────────────────────────────────────────────────────
//

// Apply to internship (student)
export const applyToInternship = async (internshipId, studentId) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          internship_id: internshipId,
          student_id: studentId,
          status: "applied",
        },
      ])
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get applications for a faculty (accepted only)
export const getAcceptedApplicationsForFaculty = async (facultyId) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        students(full_name, email, department),
        internships(title, companies(name))
      `
      )
      .eq("status", "accepted")
      .in(
        "student_id",
        (
          await supabase
            .from("students")
            .select("id")
            .eq(
              "college_id",
              (
                await supabase
                  .from("faculty")
                  .select("college_id")
                  .eq("id", facultyId)
              ).data?.[0]?.college_id
            )
        ).data?.map((s) => s.id) || []
      );
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Update applicant status (company accepts/rejects)
export const updateApplicantStatus = async (
  applicationId,
  status = "accepted"
) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId)
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ✅ Get all applications of a specific student
export const getStudentApplications = async (studentId) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        internships(title, companies(name))
      `
      )
      .eq("student_id", studentId);
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ✅ Get all applicants for internships posted by a company
export const getCompanyApplications = async (companyId) => {
  try {
    // First get internship IDs for this company
    const { data: internships } = await supabase
      .from("internships")
      .select("id")
      .eq("company_id", companyId);

    const internshipIds = internships?.map((i) => i.id) || [];

    // Now fetch applications for those internships
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        students(full_name, email, department),
        internships(title)
      `
      )
      .in("internship_id", internshipIds);

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//
// ─── LOGBOOK & CREDITS ─────────────────────────────────────────────────────────
//

// Add logbook entry (student)
export const addLogbookEntry = async (applicationId, date, description) => {
  try {
    const { data, error } = await supabase
      .from("logbook_entries")
      .insert([
        { application_id: applicationId, date, description, verified: false },
      ])
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get all unverified logbook entries for an applicant
export const getUnverifiedLogbookEntries = async (applicationId) => {
  try {
    const { data, error } = await supabase
      .from("logbook_entries")
      .select("*")
      .eq("application_id", applicationId)
      .eq("verified", false);
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Assign credit (faculty)
export const assignCredit = async (
  applicationId,
  facultyId,
  creditPoints,
  remarks
) => {
  try {
    const { data, error } = await supabase
      .from("credits")
      .insert([
        {
          application_id: applicationId,
          faculty_id: facultyId,
          credit_points: creditPoints,
          remarks,
        },
      ])
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Verify internship (faculty)
export const verifyInternship = async (internshipId) => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .update({ verified: true })
      .eq("id", internshipId)
      .select();
    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};
