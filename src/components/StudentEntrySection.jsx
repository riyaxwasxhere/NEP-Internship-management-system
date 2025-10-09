import StudentEntryCard from "./StudentEntryCard";

function StudentEntrySection() {
  const entries = [
    {
      date: "2025-10-07",
      jobTitle: "Full Stack Developer Intern",
      description:
        "Worked on implementing user authentication using JWT. Completed the login and signup API endpoints.",
      status: "Approved",
      statusColor: "bg-green-500",
    },
    {
      date: "2025-10-07",
      jobTitle: "Full Stack Developer Intern",
      description:
        "Worked on implementing user authentication using JWT. Completed the login and signup API endpoints.",
      status: "Pending",
      statusColor: "bg-amber-500",
    },
    {
      date: "2025-10-07",
      jobTitle: "Full Stack Developer Intern",
      description:
        "Worked on implementing user authentication using JWT. Completed the login and signup API endpoints.",
      status: "Rejected",
      statusColor: "bg-red-500",
    },
  ];
  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl text-black">Previous Entries</h2>
      <p className="text-s text-gray-500">
        Review your submitted logbook entries and their approval status
      </p>
      {entries.map((entry) => (
        <StudentEntryCard
          date={entry.date}
          jobTitle={entry.jobTitle}
          description={entry.description}
          status={entry.status}
          statusColor={entry.statusColor}
        />
      ))}
    </div>
  );
}

export default StudentEntrySection;
