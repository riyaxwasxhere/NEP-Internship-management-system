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

// Get user role from user_roles table
export const getUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return { success: true, data: data.role };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get user details by role
export const getUserDetailsByRole = async (userId, role) => {
  try {
    let tableName;
    let columns = "*";

    // Choose which table to query based on role
    switch (role) {
      case "student":
        tableName = "students";
        break;
      case "faculty":
        tableName = "faculty";
        break;
      case "company":
        tableName = "companies";
        break;
      default:
        return { success: false, error: "Invalid user role" };
    }

    const { data, error } = await supabase
      .from(tableName)
      .select(columns)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//
// ─── INTERNSHIPS ───────────────────────────────────────────────────────────────
//

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

// Get all unverified internships (for faculty to approve)
export const getUnverifiedInternshipsForFaculty = async () => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .select("*, companies(name, email, location)")
      .eq("verified", false);

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

//Get all student logbooks (applications) for a faculty (only accepted or completed)
export const getFacultyLogbooks = async (facultyId) => {
  try {
    // Get the faculty's college_id
    const { data: facultyData, error: facultyError } = await supabase
      .from("faculty")
      .select("college_id")
      .eq("id", facultyId)
      .single();

    if (facultyError) throw facultyError;

    // Get all student IDs under the same college
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("college_id", facultyData.college_id);

    if (studentError) throw studentError;
    const studentIds = studentData?.map((s) => s.id) || [];

    if (studentIds.length === 0) {
      return { success: true, data: [] }; // No students
    }

    // Get all applications for those students with status accepted or completed
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        internships(title, duration, location, companies(name)),
        students(full_name, email, department, year),
        logbook_entries(count)
      `
      )
      .in("student_id", studentIds)
      .in("status", ["accepted", "completed"]);

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get all logbook entries for a given student’s internship
export const getAllLogbookEntries = async (applicationId) => {
  try {
    const { data, error } = await supabase
      .from("logbook_entries")
      .select("*")
      .eq("application_id", applicationId)
      .order("date", { ascending: true });

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//Verify a specific logbook entry
export const verifyLogbookEntry = async (entryId) => {
  try {
    const { data, error } = await supabase
      .from("logbook_entries")
      .update({ verified: true })
      .eq("id", entryId)
      .select();
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

// Get all credits assigned by a specific faculty
export const getCreditAssignmentHistory = async (facultyId) => {
  try {
    const { data, error } = await supabase
      .from("credits")
      .select(
        `
        id,
        credit_points,
        remarks,
        created_at,
        applications (
          id,
          status,
          students ( full_name, email, department, year ),
          internships ( title, duration, companies ( name ) )
        )
      `
      )
      .eq("faculty_id", facultyId)
      .order("created_at", { ascending: false });

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};
