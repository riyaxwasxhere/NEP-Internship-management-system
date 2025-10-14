import React from "react";
import Internship from "../../components/ui/Internship";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUnverifiedInternshipsForFaculty,
  updateInternshipVerificationStatus,
} from "../../supabase/api";

function Internships() {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["unVerifiedInternships"],
    queryFn: getUnverifiedInternshipsForFaculty,
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: ({ id, action }) =>
      updateInternshipVerificationStatus(id, action),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(["unVerifiedInternships"]);

      const previousData = queryClient.getQueryData(["unVerifiedInternships"]);

      queryClient.setQueryData(["unVerifiedInternships"], old => {
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["unVerifiedInternships"], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["unVerifiedInternships"]);
    },
  });

  if (isLoading)
    return (
      <p className="text-2xl font-bold text-center">Loading internships...</p>
    );
  if (isError)
    return (
      <p className="text-2xl font-bold text-center">Error: {error.message}</p>
    );
  if (!data?.success)
    return (
      <p className="text-2xl font-bold text-center">Error: {data?.error}</p>
    );

  const internships = data.data;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 my-2">
          Verify Internships
        </h1>
        <p>Review and verify company-posted internships</p>
      </div>

      <div className="p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3">
        <h1 className="text-2xl font-semibold">Pending Internships Verifications</h1>
        <p className="mb-3 pt-2">
          Review and verify company-posted internships
        </p>

        <div className="flex flex-col gap-2">
          {internships.length === 0 ? (
            <p>No internships found</p>
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
                  mutation.mutate({ id: internship.id, action: "verify" })
                }
                onReject={() =>
                  mutation.mutate({ id: internship.id, action: "reject" })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Internships;
