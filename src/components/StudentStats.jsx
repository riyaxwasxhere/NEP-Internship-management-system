import StudentStatsCard from "./StudentStatsCard";

function StudentStats() {
  const statsCards = [
    {
      title: "Total Credits",
      value: 24,
    },
    {
      title: "Applications",
      value: 5,
    },
    {
      title: "Active Interships",
      value: 10,
    },
    {
      title: "Logbook Entries",
      value: 12,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
      {statsCards.map((item) => (
        <StudentStatsCard title={item.title} value={item.value} />
      ))}
    </div>
  );
}

export default StudentStats;
