import { useEffect, useState } from "react";
import StudentEntryCard from "./StudentEntryCard";
import { getStudentLogbookEntries } from "../supabase/api";
import { useAuth } from "../hooks/useAuth";

function StudentEntrySection({ applicationId }) {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const getEntries = async () => {
      const result = await getStudentLogbookEntries(user.id);
      if (result.success) {
        const filteredResult = result.data.filter(
          (entry) => entry.applications.id == applicationId
        );
        console.log("heloo bubu");
        console.log(filteredResult);
        setEntries(filteredResult);
      } else {
        console.log(result.error);
      }
    };

    getEntries();
  }, [applicationId, user, setEntries]);

  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl text-black">Previous Entries</h2>
      <p className="text-s text-gray-500">
        Review your submitted logbook entries and their approval status
      </p>
      {entries.length == 0 && (
        <p className="text-s text-gray-500">No entries yet</p>
      )}
      {entries.map((entry) => (
        <StudentEntryCard
          date={entry.date}
          jobTitle={entry?.internships?.title}
          description={entry.description}
          verified={entry.verified}
        />
      ))}
    </div>
  );
}

export default StudentEntrySection;
