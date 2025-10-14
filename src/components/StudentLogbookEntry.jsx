import { useState } from "react";
import { addLogbookEntry } from "../supabase/api";

function StudentLogbookEntry({ applicationId, setApplicationId, entries }) {
  const [description, setDescription] = useState();

  const handleSubmitEntry = async (e) => {
    e.preventDefault();
    const result = await addLogbookEntry(
      applicationId,
      new Date().toISOString(),
      description
    );
    console.log(applicationId);
    if (result.success) {
      alert("Entry Submitted Successfully");
      setDescription("");
    } else {
      console.log(result.error);
    }
  };

  console.log(applicationId);

  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <div className="flex justify-between items-start">
        <h2 className="font-medium text-2xl text-black">Add New Entry</h2>
        <select
          onChange={(e) => setApplicationId(e.target.value)}
          name=""
          id=""
          className="p-2 rounded-lg "
        >
          {entries?.map((entry) => {
            return <option value={entry.id}>{entry.internships.title}</option>;
          })}
        </select>
      </div>
      <p className="text-s text-gray-500">
        Document your daily work and progress
      </p>
      <h3 className="font-medium text-s mt-3 text-black">
        Today's Work Description
      </h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-36 rounded-md bg-gray-100 p-2 mt-2"
        placeholder="Describe what you worked on today, what you learned, and any challenges you faced."
      ></textarea>
      <button
        onClick={handleSubmitEntry}
        className="p-2 mt-2 bg-blue-600 font-medium text-white rounded-md"
      >
        Submit Entry
      </button>
    </div>
  );
}

export default StudentLogbookEntry;
