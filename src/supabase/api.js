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

///////stats for students//////////
// Get all key dashboard stats for a specific student
export const getStudentDashboardStats = async (studentId) => {
  try {
    // 1️⃣ Total credits earned
    const { data: creditsData, error: creditsError } = await supabase
      .from("credits")
      .select("credit_points, applications!inner(student_id)")
      .eq("applications.student_id", studentId);

    if (creditsError) throw creditsError;
    const totalCredits = creditsData.reduce(
      (sum, c) => sum + (c.credit_points || 0),
      0
    );

    // 2️⃣ Total internship applications
    const { count: applicationsCount, error: appError } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("student_id", studentId);

    if (appError) throw appError;

    // 3️⃣ Active internships (status = accepted or completed)
    const { count: activeCount, error: activeError } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("student_id", studentId)
      .in("status", ["accepted", "completed"]);

    if (activeError) throw activeError;

    // 4️⃣ Total logbook entries across all internships
    const { count: logbookCount, error: logError } = await supabase
      .from("logbook_entries")
      .select("*", { count: "exact", head: true })
      .in(
        "application_id",
        (
          await supabase
            .from("applications")
            .select("id")
            .eq("student_id", studentId)
        ).data?.map((a) => a.id) || []
      );

    if (logError) throw logError;

    // ✅ Final stats object
    const stats = {
      totalCredits,
      totalApplications: applicationsCount || 0,
      activeInternships: activeCount || 0,
      totalLogbookEntries: logbookCount || 0,
    };

    return { success: true, data: stats };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//
// ─── INTERNSHIPS ───────────────────────────────────────────────────────────────
//

//company stats for dashboard
export async function getCompanyStats(companyId) {
  try {
    // 1️⃣ Fetch all internships posted by this company
    const { data: internships, error: internshipsError } = await supabase
      .from("internships")
      .select("id")
      .eq("company_id", companyId);

    if (internshipsError) throw internshipsError;

    const internshipIds = internships.map((i) => i.id);
    if (internshipIds.length === 0) {
      return {
        total_internships: 0,
        total_applicants: 0,
        active_interns: 0,
        completed_interns: 0,
      };
    }

    // 2️⃣ Fetch all applications related to those internships
    const { data: applications, error: applicationsError } = await supabase
      .from("applications")
      .select("status")
      .in("internship_id", internshipIds);

    if (applicationsError) throw applicationsError;

    // 3️⃣ Calculate stats
    const total_internships = internships.length;
    const total_applicants = applications.length;
    const active_interns = applications.filter(
      (a) => a.status === "accepted"
    ).length;
    const completed_interns = applications.filter(
      (a) => a.status === "completed"
    ).length;

    return {
      total_internships,
      total_applicants,
      active_interns,
      completed_interns,
    };
  } catch (error) {
    console.error("Error fetching company stats:", error.message);
    return null;
  }
}

// Get all internships posted by a particular company (with new fields)
export const getCompanyInternships = async (companyId) => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .select(
        `
        id,
        title,
        description,
        location,
        stipend,
        duration,
        verified,
        created_at,
        apply_date,
        start_date,
        domain,
        applications (
          id,
          status,
          students ( full_name, email, department, year )
        )
      `
      )
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Update (edit) an internship post by the company
export const updateInternship = async (internshipId, updatedFields) => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .update(updatedFields)
      .eq("id", internshipId)
      .select();

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Delete an internship post by ID
export const deleteInternship = async (internshipId) => {
  try {
    const { data, error } = await supabase
      .from("internships")
      .delete()
      .eq("id", internshipId)
      .select();

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export async function getApplicantCountForInternship(internshipId) {
  try {
    const { count, error } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true }) // only count, no data
      .eq("internship_id", internshipId);

    if (error) throw error;

    return count || 0;
  } catch (error) {
    console.error("Error fetching applicant count:", error.message);
    return null;
  }
}

// Faculty verifies or rejects an internship
export const updateInternshipVerificationStatus = async (
  internshipId,
  action
) => {
  try {
    if (action === "verify") {
      // Approve → mark verified true
      const { data, error } = await supabase
        .from("internships")
        .update({ verified: true })
        .eq("id", internshipId)
        .select();

      return handleResponse(data, error);
    }

    if (action === "reject") {
      // Reject → delete internship permanently
      const { error } = await supabase
        .from("internships")
        .delete()
        .eq("id", internshipId);

      if (error) throw error;
      return {
        success: true,
        data: `Internship ${internshipId} deleted successfully.`,
      };
    }

    // Invalid action
    return {
      success: false,
      error: "Invalid action. Use 'verify' or 'reject'.",
    };
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

// Create a new internship (for companies)
export const createInternship = async (
  companyId,
  title,
  description,
  location,
  stipend,
  duration,
  domain,
  applyDate,
  startDate
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
          domain,
          apply_date: applyDate,
          start_date: startDate,
          verified: false,
        },
      ])
      .select();

    return handleResponse(data, error);
  } catch (err) {
    console.log(err);
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

//for ®️ℹ️y🅰️
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

//for ®️ℹ️y🅰️
// Get all approved interns (accepted applications) for a specific company
export const getApprovedInternsByCompany = async (companyId) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        students (
          full_name,
          email,
          department,
          year
        ),
        internships (
          id,
          title,
          duration,
          companies ( id, name )
        )
      `
      )
      .eq("status", "accepted") // ✅ Only approved interns
      .eq("internships.company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Optional: flatten data for easier UI usage
    const formatted = data.map((app) => ({
      application_id: app.id,
      student_name: app.students?.full_name,
      student_email: app.students?.email,
      department: app.students?.department,
      year: app.students?.year,
      internship_title: app.internships?.title,
      duration: app.internships?.duration,
      company_name: app.internships?.companies?.name,
    }));

    return { success: true, data: formatted };
  } catch (err) {
    console.error("Error fetching approved interns:", err.message);
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
        logbook_entries(*)
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

//for🐔
// Get all logbook entries for a student (most recent first)
export const getStudentLogbookEntries = async (studentId) => {
  try {
    const { data, error } = await supabase
      .from("logbook_entries")
      .select(
        `
        id,
        date,
        description,
        verified,
        applications (
          id,
          internships (
            title,
            duration,
            companies ( name )
          )
        )
      `
      )
      .in(
        "application_id",
        (
          await supabase
            .from("applications")
            .select("id")
            .eq("student_id", studentId)
        ).data?.map((a) => a.id) || []
      )
      .order("date", { ascending: false }); // Newest entries first

    return handleResponse(data, error);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//for 🐔
// Get all accepted applications of a student with company + internship info
export const getStudentApplicationsWithCompany = async (studentId) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        internships (
          title,
          duration,
          companies ( name )
        )
      `
      )
      .eq("student_id", studentId)
      .eq("status", "accepted") // ✅ only accepted applications
      .order("applied_at", { ascending: false });

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

// Get all verified internships with no assigned credits (for a faculty)
export const getPendingCreditAssignments = async (facultyId) => {
  try {
    // Step 1️⃣: Get faculty's college
    const { data: facultyData, error: facultyError } = await supabase
      .from("faculty")
      .select("college_id")
      .eq("id", facultyId)
      .single();

    if (facultyError) throw facultyError;
    const collegeId = facultyData.college_id;

    // Step 2️⃣: Get all students under this college
    const { data: studentsData, error: studentsError } = await supabase
      .from("students")
      .select("id, full_name, email, department, year")
      .eq("college_id", collegeId);

    if (studentsError) throw studentsError;
    const studentIds = studentsData.map((s) => s.id);

    // Step 3️⃣: Fetch completed applications with verified internships and no credits
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        internships (
          id,
          title,
          duration,
          verified,
          companies ( name )
        ),
        students (
          full_name,
          email,
          department,
          year
        ),
        logbook_entries ( id, verified )
      `
      )
      .in("student_id", studentIds)
      .eq("status", "completed")
      .eq("internships.verified", true)
      .not("id", "in", supabase.from("credits").select("application_id"));

    if (error) throw error;

    // Step 4️⃣: Aggregate logbook entry count
    const formattedData = data.map((app) => ({
      application_id: app.id,
      student_name: app.students.full_name,
      email: app.students.email,
      internship_title: app.internships.title,
      company_name: app.internships.companies.name,
      duration: app.internships.duration,
      total_entries: app.logbook_entries?.length || 0,
      verified_entries:
        app.logbook_entries?.filter((e) => e.verified).length || 0,
    }));

    return handleResponse(formattedData, null);
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//for 🐔

export async function getCreditStats(studentId) {
  try {
    // 1️⃣ Get completed applications for this student
    const { data: completedApps, error: appError } = await supabase
      .from("applications")
      .select("id")
      .eq("student_id", studentId)
      .eq("status", "completed");

    if (appError) throw appError;

    const completedAppIds = completedApps.map((a) => a.id);

    // If no completed internships, return defaults
    if (completedAppIds.length === 0) {
      return {
        total_completed_internships: 0,
        total_credits_earned: 0,
        avg_credits: 0,
      };
    }

    // 2️⃣ Get all credits earned for these completed applications
    const { data: creditsData, error: creditError } = await supabase
      .from("credits")
      .select("credit_points")
      .in("application_id", completedAppIds);

    if (creditError) throw creditError;

    // 3️⃣ Compute totals and averages
    const total_completed_internships = completedAppIds.length;
    const total_credits_earned = creditsData.reduce(
      (sum, c) => sum + (c.credit_points || 0),
      0
    );
    const avg_credits =
      total_completed_internships > 0
        ? total_credits_earned / total_completed_internships
        : 0;

    return {
      total_completed_internships,
      total_credits_earned,
      avg_credits: Number(avg_credits.toFixed(2)),
    };
  } catch (error) {
    console.error("Error fetching student stats:", error.message);
    return null;
  }
}

export async function getStudentCreditHistory(studentId) {
  try {
    // 1️⃣ Get all completed applications for this student
    const { data: applications, error: appError } = await supabase
      .from("applications")
      .select(
        `
        id,
        internship:internships (
          title,
          duration,
          company:companies ( name )
        ),
        credits:credits (
          credit_points,
          remarks,
          created_at,
          faculty:faculty (
            full_name
          )
        )
      `
      )
      .eq("student_id", studentId)
      .eq("status", "completed");

    if (appError) throw appError;

    // 2️⃣ Format the results into clean credit history items
    const history = [];

    for (const app of applications) {
      const internship = app.internship;
      const credit = app.credits?.[0]; // each completed internship typically has one credit entry

      if (internship && credit) {
        history.push({
          internship_title: internship.title,
          company_name: internship.company?.name || "N/A",
          duration: internship.duration || "N/A",
          approved_by: credit.faculty?.full_name || "N/A",
          approval_date: credit.created_at?.split("T")[0],
          credit_points: credit.credit_points || 0,
        });
      }
    }

    // 3️⃣ Sort most recent first (optional)
    history.sort(
      (a, b) => new Date(b.approval_date) - new Date(a.approval_date)
    );

    return history;
  } catch (error) {
    console.error("Error fetching credit history:", error.message);
    return [];
  }
}
