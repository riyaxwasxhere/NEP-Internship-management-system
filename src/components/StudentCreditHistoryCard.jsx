import { PiBuildingOffice } from "react-icons/pi";

function StudentCreditHistoryCard({
  jobTitle,
  company,
  duration,
  approvedBy,
  approvalDate,
  credits,
}) {
  return (
    <div className="border-1 rounded-md p-3 mt-5 bg-white">
      <div className="flex justify-between">
        <h2 className="font-medium text-lg">{jobTitle}</h2>
        <div>
          <p className="rounded-full py-1 px-3 text-white font-bold bg-green-500 md:text-lg text-xs items-start">
            +{credits} Credits
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <i>
          <PiBuildingOffice />
        </i>
        <p className="text-s text-gray-500">{company}</p>
      </div>
      <div className="md:flex justify-evenly space-y-1 md:space-y-0">
        <div>
          <p className="text-s text-gray-500">Duration:</p>
          <span>{duration}</span>
        </div>

        <div>
          <p className="text-s text-gray-500">Approved By:</p>
          <span>{approvedBy}</span>
        </div>

        <div>
          <p className="text-s text-gray-500">Approval Date:</p>
          <span>{approvalDate}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentCreditHistoryCard;
