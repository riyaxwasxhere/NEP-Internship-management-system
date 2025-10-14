import { useEffect, useState } from "react";
import StudentCreditGuidelines from "../../components/StudentCreditGuidelines";
import StudentCreditHistory from "../../components/StudentCreditHistory";
import StudentStatsCard from "../../components/StudentStatsCard";
import { getCreditStats } from "../../supabase/api";
import { useAuth } from "../../hooks/useAuth";

const creditsArr = [
  {
    title: "Total Credits",
    value: 0,
  },
  {
    title: "Completed Internships",
    value: 0,
  },
  {
    title: "Average Credits",
    value: 0,
  },
];

function Credits() {
  const [credits, setCredits] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const getCredits = async () => {
      const result = await getCreditStats(user.id);
      console.log(result);
      Object.values(result).forEach((element, index) => {
        creditsArr[index].value = element;
      });

      setCredits(creditsArr);
    };
    getCredits();
  }, [user]);

  console.log("i am bubu");
  console.log(credits);

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
