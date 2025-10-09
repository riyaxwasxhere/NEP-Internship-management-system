import StudentCreditHistoryCard from "./StudentCreditHistoryCard";

function StudentCreditHistory() {
  const creditHistory = [
    {
      jobTitle: "Full Stack Developer Intern",
      company: "Tech Innovators Pvt Ltd",
      duration: "3 months",
      approvedBy: "SDE Supratik Ray",
      approvalDate: "2025-10-09",
      credits: 6,
    },
    {
      jobTitle: "Data Analysis Intern",
      company: "Analytics Corp",
      duration: "2 months",
      approvedBy: "SDE Riya Dutta",
      approvalDate: "2025-10-12",
      credits: 4,
    },
    {
      jobTitle: "UI/UX Design Intern",
      company: "Creative Studios",
      duration: "1 month",
      approvedBy: "SDE Rajdeep Majumder",
      approvalDate: "2025-10-12",
      credits: 2,
    },
  ];
  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">Credit History</h2>
      <p className="text-s text-gray-500">
        Your approved internship credits under NEP guidelines
      </p>
      {creditHistory.map((credit) => (
        <StudentCreditHistoryCard
          jobTitle={credit.jobTitle}
          company={credit.company}
          duration={credit.duration}
          approvedBy={credit.approvedBy}
          approvalDate={credit.approvalDate}
          credits={credit.credits}
        />
      ))}
    </div>
  );
}

export default StudentCreditHistory;
