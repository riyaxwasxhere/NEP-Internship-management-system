import { useNavigate } from "react-router-dom";

import StudentApplicationCard from "./StudentApplicationCard";
import { useEffect, useState } from "react";
import { getStudentApplications } from "../supabase/api";
import { useAuth } from "../hooks/useAuth";

const statusColor = {
  applied: "bg-gray-500",
  accepted: "bg-green-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  completed: "bg-blue-500",
};

function StudentApplicationSection() {
  const navigate = useNavigate();
  const [applicationCards, setApplicationCards] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const getApplications = async () => {
      const result = await getStudentApplications(user.id);
      if (result.success) {
        console.log(result.data);
        setApplicationCards(result.data);
      }
    };
    getApplications();
  }, [user]);

  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">My Applications</h2>
      <p className="text-s text-gray-500">
        Track the status of your internship applications
      </p>
      {applicationCards.slice(0, 2).map((card) => (
        <StudentApplicationCard
          title={card.internships.title}
          company={card.internships.companies.name}
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
