import { useNavigate } from "react-router-dom";

import StudentApplicationCard from "./StudentApplicationCard";

const statusColor = {
  applied: "bg-gray-500",
  accepted: "bg-green-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  completed: "bg-blue-500",
};

function StudentApplicationSection() {
  const navigate = useNavigate();
  const applicationCards = [
    {
      jobTitle: "Full Stack Developer Intern",
      company: "Tech Innovators",
      status: "accepted",
    },

    {
      jobTitle: "ML Engineer Intern",
      company: "AI Solutions",
      status: "applied",
    },
  ];
  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">My Applications</h2>
      <p className="text-s text-gray-500">
        Track the status of your internship applications
      </p>
      {applicationCards.slice(0, 2).map((card) => (
        <StudentApplicationCard
          title={card.jobTitle}
          company={card.company}
          status={card.status}
          statusColor={statusColor[card.status]}
        />
      ))}

      <button
        onClick={() => navigate("/student/myapplications")}
        className="w-full font-medium text-center bg-gray-100 hover:bg-blue-400 hover:text-white p-2 mt-5 rounded-md"
      >
        View All Applications
      </button>
    </div>
  );
}

export default StudentApplicationSection;
