import { useEffect, useState } from "react";
import StudentApplicationCard from "../../components/StudentApplicationCard";
import { getStudentApplications } from "../../supabase/api";
import { useAuth } from "../../hooks/useAuth";

const statusColor = {
  applied: "bg-gray-500",
  accepted: "bg-green-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  completed: "bg-blue-500",
};

function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplication] = useState([]);

  useEffect(() => {
    if (!user) return;
    const getApplications = async () => {
      const result = await getStudentApplications(user.id);
      if (result.success) {
        setApplication(result.data);
      }
    };
    getApplications();
  }, [user]);

  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Applications</h1>
      <p className="mt-2 text-s text-gray-500">
        See your application status here
      </p>
      {applications.map((card) => (
        <StudentApplicationCard
          key={card.id}
          title={card.internships.title}
          company={card.internships.companies.name}
          status={card.status}
          statusColor={statusColor[card.status]}
        />
      ))}
      <p></p>
    </div>
  );
}

export default MyApplications;
