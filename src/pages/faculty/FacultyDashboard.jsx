import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import Internship from "../../components/ui/Internship";
import Logbook from "../../components/ui/Logbook";
import DashboardLogModal from "./DashboadLogModal";

import {
  getUnverifiedInternshipsForFaculty,
  updateInternshipVerificationStatus,
  getFacultyLogbooks,
  getAllLogbookEntries,
  verifyLogbookEntry,
} from "../../supabase/api";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLogbook, setSelectedLogbook] = useState(null);

  // ------------------ Internships ------------------
  const {
    data: internshipsData,
    isLoading: internshipsLoading,
    isError: internshipsError,
  } = useQuery({
    queryKey: ["unverifiedInternships"],
    queryFn: getUnverifiedInternshipsForFaculty,
  });

  const internshipMutation = useMutation({
    mutationFn: ({ id, action }) =>
      updateInternshipVerificationStatus(id, action),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["unverifiedInternships"]);
      const previousData = queryClient.getQueryData(["unverifiedInternships"]);
      queryClient.setQueryData(["unverifiedInternships"], (old) => ({
        ...old,
        data: old.data.filter((item) => item.id !== id),
      }));
      return { previousData };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["unverifiedInternships"],
        context.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["unverifiedInternships"]);
    },
  });

  // ------------------ Logbooks ------------------
  const {
    data: logbooksData,
    isLoading: logbooksLoading,
    isError: logbooksError,
  } = useQuery({
    queryKey: ["facultyLogbooks", user?.id],
    queryFn: () => getFacultyLogbooks(user?.id),
    enabled: !!user,
  });

  // ------------------ Logbook Entries for Modal ------------------
  const { data: entriesData, isFetching: entriesLoading } = useQuery({
    queryKey: ["logbookEntries", selectedLogbook?.id],
    queryFn: () => getAllLogbookEntries(selectedLogbook?.id),
    enabled: !!selectedLogbook,
  });

  // ------------------ Verify Logbook Mutation ------------------
  const verifyMutation = useMutation({
    mutationFn: (entryId) => verifyLogbookEntry(entryId),
    onSuccess: () => {
      queryClient.invalidateQueries(["facultyLogbooks"]);
      queryClient.invalidateQueries(["logbookEntries"]);
    },
  });

  // ------------------ Loading & Error States ------------------
  if (internshipsLoading || logbooksLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl md:text-3xl font-bold text-gray-600 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  if (internshipsError || logbooksError)
    return (
      <p className="text-2xl font-bold text-red-500 text-center mt-10">
        Error loading data.
      </p>
    );

  const internships = internshipsData?.data || [];
  const logbooks = logbooksData?.data || [];

  // ------------------ Pending Logbooks ------------------
  const pendingLogbooks = logbooks.filter((logbook) =>
    logbook.logbook_entries?.some((entry) => entry.verified === false)
  );

  return (
    <div className="p-2 md:p-5 space-y-6">
      {/* ------------------ Header ------------------ */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 my-2">
          Faculty Dashboard
        </h1>
        <p>Manage internship verifications and student progress</p>
      </div>

      {/* ------------------ Stats Cards ------------------ */}
      <div className="pt-7 grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Pending Verifications</p>
          <p className="text-2xl text-amber-400 font-bold pt-2">
            {internships.length}
          </p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Approved Logbooks</p>
          <p className="text-2xl text-green-500 font-bold pt-2">
            {logbooks.length - pendingLogbooks.length}
          </p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Assigned Credits</p>
          <p className="text-2xl text-blue-500 font-bold pt-2">24</p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Pending Reviews</p>
          <p className="text-2xl text-red-500 font-bold pt-2">
            {pendingLogbooks.length}
          </p>
        </div>
      </div>

      {/* ------------------ Pending Internships ------------------ */}
      <div className="p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3">
        <h2 className="text-2xl font-semibold">
          Pending Internships Verifications
        </h2>
        <p className="mb-3 pt-2">
          Review and verify company-posted internships
        </p>
        <div className="flex flex-col gap-2">
          {internships.length === 0 ? (
            <p>No unverified internships found.</p>
          ) : (
            internships.map((internship) => (
              <Internship
                key={internship.id}
                status={internship.verified ? "verified" : "pending"}
                title={internship.title}
                company={internship.companies?.name}
                description={internship.description}
                duration={internship.duration}
                stipend={`₹${internship.stipend}`}
                location={internship.location}
                onApprove={() =>
                  internshipMutation.mutate({ id: internship.id, action: "verify" })
                }
                onReject={() =>
                  internshipMutation.mutate({ id: internship.id, action: "reject" })
                }
              />
            ))
          )}
        </div>
      </div>

      {/* ------------------ Pending Logbooks ------------------ */}
      <div className="p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3">
        <div>
          <h2 className="text-2xl font-semibold">Logbook Approvals Pending</h2>
          <p className="mb-3 pt-2">
            Review student logbooks and assign credits
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {pendingLogbooks.length === 0 ? (
            <p>No logbooks with unverified entries.</p>
          ) : (
            pendingLogbooks.map((logbook) => (
              <Logbook
                key={logbook.id}
                logbook={logbook}
                onReview={() => setSelectedLogbook(logbook)}
              />
            ))
          )}
        </div>
      </div>

      {/* ------------------ Logbook Modal ------------------ */}
      {selectedLogbook && (
        <DashboardLogModal
          open={!!selectedLogbook}
          onClose={() => setSelectedLogbook(null)}
          logbook={selectedLogbook}
          entries={
            entriesData?.data.filter((e) => e.verified === false) || []
          }
          loading={entriesLoading}
          onVerify={(entryId) => verifyMutation.mutate(entryId)}
        />
      )}
    </div>
  );
}
