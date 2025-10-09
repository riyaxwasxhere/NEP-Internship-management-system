import StudentCreditGuidelines from "../../components/StudentCreditGuidelines";
import StudentCreditHistory from "../../components/StudentCreditHistory";
import StudentStatsCard from "../../components/StudentStatsCard";

function Credits() {
  const credits = [
    {
      title: "Total Credits Earned",
      value: 12,
    },
    {
      title: "Completed Internships",
      value: 3,
    },
    {
      title: "Average Credits",
      value: 5,
    },
  ];
  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">NEP Credits</h1>
      <p className="mt-2 text-s text-gray-500">
        Track your earned academic credits from internships
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {credits.map((credit) => (
          <StudentStatsCard title={credit.title} value={credit.value} />
        ))}
      </div>
      <StudentCreditHistory />
      <StudentCreditGuidelines />
    </div>
  );
}

export default Credits;
