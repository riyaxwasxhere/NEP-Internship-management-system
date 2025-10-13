import { useNavigate } from "react-router-dom";
import StudentInternshipCard from "./StudentInternshipCard";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getVerifiedInternships } from "../supabase/api";

function StudentInternshipSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [internshipCards, setInternshipCards] = useState([]);

  useEffect(() => {
    if (!user) return;
    const getInternships = async () => {
      const result = await getVerifiedInternships(user.id);
      if (result.success) {
        setInternshipCards(result.data);
      }
    };
    getInternships();
  }, [user]);

  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">Available Internships</h2>
      <p className="text-s text-gray-500">
        Browse and apply for verified internship opportunities
      </p>
      {internshipCards.slice(0, 2).map((card) => {
        return (
          <StudentInternshipCard
            jobTitle={card.title}
            company={card.companies.name}
            location={card.location}
            duration={card.duration}
            stipend={card.stipend}
            status={card.status}
          />
        );
      })}
      <button
        onClick={() => navigate("/student/internships")}
        className="w-full font-medium text-center bg-gray-100 hover:bg-blue-400 hover:text-white p-2 mt-5 rounded-md"
      >
        View All Internships
      </button>
    </div>
  );
}

export default StudentInternshipSection;
