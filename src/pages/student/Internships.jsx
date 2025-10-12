import { useState } from "react";
import StudentInternshipCard from "../../components/StudentInternshipCard";
import { useEffect } from "react";
import { getVerifiedInternships } from "../../supabase/api";
import { useAuth } from "../../hooks/useAuth";

function Internships() {
  const [internships, setInternships] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const getInternships = async () => {
      const result = await getVerifiedInternships(user.id);
      if (result.success) {
        setInternships(result.data);
      }
    };
    getInternships();
  }, [user]);

  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Internships</h1>
      <p className="mt-2 text-s text-gray-500">See your Internships here</p>
      {internships.map((card) => (
        <StudentInternshipCard
          internshipId={card.id}
          jobTitle={card.title}
          company={card.companies.name}
          location={card.location}
          duration={card.duration}
          stipend={card.stipend}
        />
      ))}
    </div>
  );
}

export default Internships;
