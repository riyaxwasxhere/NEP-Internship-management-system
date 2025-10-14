import React from "react";
import { Button } from "@/components/ui/button";

export default function Logbook({ logbook, onReview }) {
  const { students, internships, logbook_entries: entries } = logbook;

  const unverifiedCount = entries.filter((e) => !e.verified).length;
  const status = unverifiedCount === 0 ? "completed" : "ongoing";

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 sm:p-5 bg-white shadow-sm">
      {/* Status tag */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
          status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {status === "completed" ? "Completed" : "Ongoing"}
      </span>

      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
        {students.full_name}
      </h2>

      <p className="text-gray-500 text-sm sm:text-base mb-2">
        {students.id} • {students.department} Dept • {internships.title}
      </p>

      <div className="flex flex-col sm:flex-row sm:gap-10 mb-4 text-gray-600 text-sm sm:text-base">
        <p>
          <span className="font-semibold">Total Entries:</span> {entries.length}
        </p>
        <p>
          <span className="font-semibold">Approved:</span>{" "}
          {entries.filter((e) => e.verified).length}
        </p>
        <p>
          <span className="font-semibold">Pending:</span> {unverifiedCount}
        </p>
      </div>

      {/* Review Logbook Button */}
      <Button
        onClick={onReview}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Review Logbook
      </Button>
    </div>
  );
}
