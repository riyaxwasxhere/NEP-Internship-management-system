import StudentApplicationSection from "../../components/StudentApplicationSection";
import StudentInternshipSection from "../../components/StudentInternshipSection";
import StudentStats from "../../components/StudentStats";
import { useAuth } from "../../hooks/useAuth";

function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Student Dashboard</h1>
      <p className="mt-2 text-s text-gray-500">
        Welcome back {user?.full_name.split(" ")[0]}! Here's your internship
        overview
      </p>
      <StudentStats />
      <StudentApplicationSection />
      <StudentInternshipSection />
    </div>
  );
}

export default StudentDashboard;
