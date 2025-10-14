import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFacultyLogbooks,
  getAllLogbookEntries,
  verifyLogbookEntry,
} from "../../supabase/api";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import LogbookModal from "./LogbookModal";

export default function FacultyLogbookCard() {
  const { user } = useAuth();

  const {
    data: logbookData,
    isLoading: isLogbookLoading,
    isError: isLogbookError,
  } = useQuery({
    queryKey: ["facultyLogbooks", user?.id],
    queryFn: () => getFacultyLogbooks(user.id),
    enabled: !!user?.id,
  });

  const applicationIds =
    logbookData?.data?.map((logbook) => logbook.id) || [];

  const {
    data: allEntriesData,
    isLoading: isEntriesLoading,
    isError: isEntriesError,
  } = useQuery({
    queryKey: ["allLogbookEntries", applicationIds],
    queryFn: async () => {
      const results = await Promise.all(
        applicationIds.map((id) => getAllLogbookEntries(id))
      );
      return results.map((r, i) => ({
        applicationId: applicationIds[i],
        entries: r.data,
      }));
    },
    enabled: applicationIds.length > 0,
  });

  if (isLogbookLoading || isEntriesLoading)
    return (
      <div className="p-6 text-gray-600 text-center">Loading logbooks...</div>
    );

  if (isLogbookError || isEntriesError)
    return (
      <div className="p-6 text-red-500 text-center">
        Error loading logbooks or entries.
      </div>
    );

  if (!logbookData?.data?.length)
    return <p className="text-gray-500 text-center">No logbooks found.</p>;

  // Sort logbooks: pending/ongoing first, completed later
  const sortedLogbooks = [...logbookData.data].sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") return 1;
    if (a.status !== "completed" && b.status === "completed") return -1;
    return 0;
  });

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {sortedLogbooks.map((logbook) => {
        const entryGroup = allEntriesData?.find(
          (e) => e.applicationId === logbook.id
        );
        const entries = entryGroup?.entries || [];
        return (
          <LogbookCard key={logbook.id} logbook={logbook} entries={entries} />
        );
      })}
    </div>
  );
}


function LogbookCard({ logbook, entries }) {
  const { students, internships, status, id: applicationId } = logbook;
  const queryClient = useQueryClient();

  const { mutate: approveEntry } = useMutation({
    mutationFn: (entryId) => verifyLogbookEntry(entryId),
    onSuccess: () => {
      queryClient.invalidateQueries(["allLogbookEntries"]);
    },
  });

  const pendingEntries = entries.filter((e) => !e.verified);

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 sm:p-5 bg-white shadow-sm">
      {/* Status tag top-right */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
          status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {status === "completed" ? "Completed" : "Ongoing"}
      </span>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-0">
          {students.full_name}
        </h2>
      </div>

      <p className="text-gray-500 text-sm sm:text-base mb-4">
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
          <span className="font-semibold">Pending:</span> {pendingEntries.length}
        </p>
      </div>

      <h3 className="text-md font-semibold mb-2">Pending Entry Reviews</h3>
      {pendingEntries.length === 0 ? (
        <p className="text-gray-400 italic mb-3">No pending entries.</p>
      ) : (
        pendingEntries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-100 rounded-lg p-3 sm:p-4 mb-3 bg-gray-50"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
              <p className="font-semibold text-gray-700 text-sm sm:text-base">
                {entry.date}
              </p>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 sm:mt-0">
                Pending
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-2">{entry.description}</p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
                onClick={() => approveEntry(entry.id)}
              >
                Approve
              </Button>
            </div>
          </div>
        ))
      )}

      <div className="mt-4 p-2 w-[250px] ">
        <LogbookModal className="hover:bg-blue-700" student={students} internship={internships} entries={entries} />
      </div>
    </div>
  );
}
