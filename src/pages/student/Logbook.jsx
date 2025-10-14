import StudentEntrySection from "../../components/StudentEntrySection";
import StudentLogbookEntry from "../../components/StudentLogbookEntry";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getStudentApplications } from "../../supabase/api";

function Logbook() {
  const [applicationId, setApplicationId] = useState();
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!user) return;
    const getEntries = async () => {
      const result = await getStudentApplications(user.id);
      console.log("wow");
      console.log(result);
      const filteredResult = result.data.filter(
        (entry) => entry.status == "accepted"
      );
      console.log("yes");
      console.log(filteredResult);
      if (result.success) {
        setApplicationId(filteredResult[0].id);
        setEntries(filteredResult);
        setApplicationId(filteredResult[0].id);
      } else {
        console.log(result.error);
      }
    };
    getEntries();
    setLoading(false);
  }, [user, setApplicationId]);
  console.log("no");
  console.log(entries);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Digital Logbook</h1>
      <p className="text-s text-gray-500">
        Track your daily progress and learnings
      </p>
      {entries.length > 0 ? (
        <div>
          <StudentLogbookEntry
            applicationId={applicationId}
            setApplicationId={setApplicationId}
            entries={entries}
          />
          <StudentEntrySection applicationId={applicationId} />
        </div>
      ) : (
        <p className="mt-5 text-lg">Get accepted by internships first!</p>
      )}
    </div>
  );
}

export default Logbook;
