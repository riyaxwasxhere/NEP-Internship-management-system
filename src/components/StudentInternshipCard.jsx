import { PiBuildingOffice } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import StudentApplyPortal from "./StudentApplyPortal";
import { useState } from "react";

function StudentInternshipCard({
  jobTitle,
  company,
  location,
  duration,
  stipend,
  status,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-1 rounded-md p-3 mt-5 bg-white">
      <div className="flex justify-between">
        <h3 className="font-medium text-lg">{jobTitle}</h3>
        <div>
          <p className="rounded-full px-3 py-1 text-white font-bold bg-green-500 text-s">
            {status}
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
        <div className="flex items-center space-x-1">
          <i>
            <CiLocationOn />
          </i>
          <span>{location}</span>
        </div>

        <div className="flex items-center space-x-1">
          <i>
            <CiCalendar />
          </i>
          <span>{duration}</span>
        </div>

        <div className="flex items-center space-x-1">
          <i>
            <RiMoneyRupeeCircleLine />
          </i>
          <span>{stipend}</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <button
          onClick={() => setShowModal(true)}
          className="w-3/4 font-medium text-center bg-blue-500 text-white p-2 mt-5 rounded-md"
        >
          Apply Now
        </button>
        <StudentApplyPortal
          isOpen={showModal}
          isClose={() => setShowModal(false)}
          jobTitle={jobTitle}
          company={company}
        />
        <button className="w-4/12 p-2 mt-5 bg-gray-100 font-medium text-center rounded-md">
          View Details
        </button>
      </div>
    </div>
  );
}

export default StudentInternshipCard;
