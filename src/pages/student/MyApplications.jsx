import { useState } from "react";
import StudentApplicationCard from "../../components/StudentApplicationCard";

const statusColor = {
  applied: "bg-gray-500",
  accepted: "bg-green-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  completed: "bg-blue-500",
};

function MyApplications() {
  const [applications, setApplication] = useState([]);

  const applicationCards = [
    {
      jobTitle: "Full Stack Developer Intern",
      company: "Tech Innovators",
      status: "accepted",
    },
    {
      jobTitle: "ML Engineer Intern",
      company: "AI Solutions",
      status: "pending",
    },
    {
      jobTitle: "ML Engineer Intern",
      company: "AI Solutions",
      status: "applied",
    },
    {
      jobTitle: "ML Engineer Intern",
      company: "AI Solutions",
      status: "rejected",
    },
    {
      jobTitle: "ML Engineer Intern",
      company: "AI Solutions",
      status: "completed",
    },
  ];

  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Applications</h1>
      <p className="mt-2 text-s text-gray-500">
        See your application status here
      </p>
      {applicationCards.map((card) => (
        <StudentApplicationCard
          title={card.jobTitle}
          company={card.company}
          status={card.status}
          statusColor={statusColor[card.status]}
        />
      ))}
      <p></p>
    </div>
  );
}

export default MyApplications;
