import StudentInternshipCard from "../../components/StudentInternshipCard";

function Internships() {
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
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Internships</h1>
      <p className="mt-2 text-s text-gray-500">See your Internships here</p>
      {internshipCards.map((card) => (
        <StudentInternshipCard
          jobTitle={card.jobTitle}
          company={card.company}
          location={card.location}
          duration={card.duration}
          stipend={card.stipend}
          status={card.status}
        />
      ))}
    </div>
  );
}

export default Internships;
