import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPendingCreditAssignments,
  getCreditAssignmentHistory,
  assignCredit,
} from "../../supabase/api";
import { useAuth } from "../../hooks/useAuth";
import { Modal } from "./Modal";

export default function Credits() {
  const { user } = useAuth();
  const facultyId = user?.id;
  const queryClient = useQueryClient();

  const { data: pendingData, isLoading: loadingPending } = useQuery({
    queryKey: ["pendingCredits", facultyId],
    queryFn: () => getPendingCreditAssignments(facultyId),
    enabled: !!facultyId,
  });

  const { data: historyData, isLoading: loadingHistory } = useQuery({
    queryKey: ["creditHistory", facultyId],
    queryFn: () => getCreditAssignmentHistory(facultyId),
    enabled: !!facultyId,
  });

  const assignMutation = useMutation({
    mutationFn: ({ applicationId, creditPoints, remarks }) =>
      assignCredit(applicationId, facultyId, creditPoints, remarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingCredits", facultyId]);
      queryClient.invalidateQueries(["creditHistory", facultyId]);
    },
  });

  return (
    <div className="p-1 md:p-5 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Assign Credits
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Assign NEP credits to students who have completed verified internships.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
          NEP Credit Guidelines
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Recommended credit allocation based on internship duration
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { duration: "1–2 months", credit: "2 credits" },
            { duration: "3–4 months", credit: "4 credits" },
            { duration: "5–6 months", credit: "6 credits" },
            { duration: "6+ months", credit: "8+ credits" },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-2 md:p-3 text-center hover:bg-gray-50"
            >
              <h3 className="font-medium text-gray-800 text-sm md:text-base">
                {item.duration}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">{item.credit}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
          Pending Credit Assignment
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Students awaiting NEP credit allocation.
        </p>

        {loadingPending ? (
          <p>Loading pending assignments...</p>
        ) : pendingData?.data?.length ? (
          pendingData.data.map((item) => (
            <div
              key={item.application_id}
              className="border border-gray-200 rounded-lg p-3 md:p-4 mb-3 flex flex-col md:flex-row justify-between gap-2"
            >
              <div>
                <h3 className="font-semibold text-base md:text-lg text-gray-800">
                  {item.student_name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.email} • {item.internship_title}
                </p>
                <p className="text-gray-600 text-sm">
                  Company: {item.company_name} • Duration: {item.duration} •
                  Entries: {item.verified_entries}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 text-xs md:text-sm px-2 py-1 rounded-full">
                  Approved
                </span>
                <Modal
                  name={item.student_name}
                  rollNo={item.email}
                  internship={item.internship_title}
                  duration={item.duration}
                  logbookEntries={item.verified_entries}
                  onSubmit={(credit, remarks) =>
                    assignMutation.mutate({
                      applicationId: item.application_id,
                      creditPoints: credit,
                      remarks,
                    })
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No pending assignments.</p>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
          Credit Assignment History
        </h2>
        <p className="text-gray-600 text-sm mb-4">Previously assigned credits.</p>

        {loadingHistory ? (
          <p>Loading credit history...</p>
        ) : historyData?.data?.length ? (
          historyData.data.map((credit) => (
            <div
              key={credit.id}
              className="border border-gray-200 rounded-lg p-3 md:p-4 mb-3 relative"
            >
              <div className="absolute top-2 right-3 text-right flex md:block items-center gap-1">
                <p className="text-blue-600 font-bold text-base md:text-lg">
                  {credit.credit_points}
                </p>
                <p className="text-gray-600 text-xs">Credits</p>
              </div>

              <h3 className="font-semibold text-base md:text-lg text-gray-800">
                {credit.applications.students.full_name}
              </h3>
              <p className="text-gray-600 text-sm">
                {credit.applications.students.email} •{" "}
                {credit.applications.internships.title} Intern at{" "}
                {credit.applications.internships.companies.name}
              </p>
              <p className=" text-sm">
               <span className="text-gray-600"> Duration:</span> {credit.applications.internships.duration}
              </p>
              <p className="text-gray-600 italic text-sm">
                {credit.remarks || "No remarks provided."}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Assigned: {credit.created_at.split("T")[0]}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No credit history yet.</p>
        )}
      </div>
    </div>
  );
}
