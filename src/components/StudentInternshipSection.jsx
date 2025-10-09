import { useNavigate } from "react-router-dom";
import StudentInternshipCard from "./StudentInternshipCard";

function StudentInternshipSection() {
  const navigate = useNavigate();
  const internshipCards = [
    {
      jobTitle: "Full Stack Developer Intern",
      company: "Tech Innovators",
      location: "Bangalore, Karnataka",
      duration: "3 months",
      stipend: "15000/month",
      status: "Approved",
    },
    {
      jobTitle: "Data Science Intern",
      company: "Analytics Corp",
      location: "Mumbai, Maharashtra",
      duration: "6 months",
      stipend: "20000/month",
      status: "Approved",
    },
    {
      jobTitle: "UI/UX Designer Intern",
      company: "Creative Studios",
      location: "Remote",
      duration: "4 months",
      stipend: "12000/month",
      status: "Approved",
    },
  ];

  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">Available Internships</h2>
      <p className="text-s text-gray-500">
        Browse and apply for verified internship opportunities
      </p>
      {internshipCards.map((card) => {
        return (
          <StudentInternshipCard
            jobTitle={card.jobTitle}
            company={card.company}
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
