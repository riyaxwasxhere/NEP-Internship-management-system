import StudentEntrySection from "../../components/StudentEntrySection";
import StudentLogbookEntry from "../../components/StudentLogbookEntry";
import StudentReview from "../../components/StudentReview";

function Logbook() {
  return (
    <div className="p-2 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl">Digital Logbook</h1>
      <p className="text-s text-gray-500">
        Track your daily progress and learnings
        <StudentLogbookEntry />
        <StudentEntrySection />
        <StudentReview />
      </p>
    </div>
  );
}

export default Logbook;
