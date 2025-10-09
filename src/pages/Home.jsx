import { HiOutlineAcademicCap, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GoBook, GoPeople } from "react-icons/go";
import { FiAward, FiShield } from "react-icons/fi";
import LoginPortal from "../LoginPortal";
import { useState } from "react";
function Home() {
  const [loginOpen, setLoginOpen] = useState(false)
  
  return (
    <div>
      <div className="p-15 md:px-30 md:py-20 bg-blue-600 text-center flex justify-center">
        <div className="max-w-4xl text-center">
          <h1 className="md:text-5xl text-4xl font-bold text-white">NEP Internship Management System</h1>
          <p className="text-xl text-white my-10">Connecting Students, Companies, and Colleges for verified, credit-worthy internships under the National Education Policy</p>

          <button 
          onClick={()=>setLoginOpen(true)}
          className="p-2 px-5 bg-white text-xl font-semibold rounded  hover:scale-105 cursor-pointer">Get Started</button>

          <LoginPortal
              isOpen = {loginOpen}
              onClose = {()=>setLoginOpen(false)}
          />

        </div>
      </div>
      <div className="bg-gray-50">
        <h1 className="text-3xl text-center pt-10 font-semibold">Platform Features</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,0.9fr))]  justify-around gap-5 py-15 px-10 md:px-20">
          <div className="flex flex-col gap-3 p-5 border-1 rounded-lg bg-white">
            <FiShield className="text-blue-600 h-16 w-16 mx-auto" />
            <h1 className="text-2xl font-semibold">Verified Internships</h1>
            <p className=" text-gray-600 font-semibold">All internships are verified by faculty coordinators ensuring quality and legitimacy</p>
          </div>
          <div className="flex flex-col gap-3 p-5 border-1 rounded-lg bg-white">
            <GoBook  className="text-blue-600 h-16 w-16 mx-auto"/>
            <h1 className="text-2xl font-semibold">Digital Logbooks</h1>
            <p className=" text-gray-600 font-semibold">Students maintain daily progress logs reviewed and approved by faculty members</p>
          </div>
          <div className="flex flex-col gap-3 p-5 border-1 rounded-lg bg-white">
            <FiAward className="text-blue-600 h-16 w-16 mx-auto" />
            <h1 className="text-2xl font-semibold">NEP Credits</h1>
            <p className=" text-gray-600 font-semibold">Earn academic credits upon successful completion and faculty approval</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-10">
        <h1 className="pt-10 text-3xl font-semibold text-center">Who Can Join ?</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,0.9fr))] gap-10 items-center justify-center px-10 py-10 md:px-20">
          <div className="p-5 text-center border-1 rounded-xl shadow-xl  bg-white">
            <HiOutlineAcademicCap className="text-blue-600 h-16 w-16 mx-auto" />

            <h1 className="text-2xl font-semibold">Students</h1>
            <p className="py-5 text-sm text-gray-600 font-semibold">Find verified internships, maintain logbooks, and earn NEP credits.</p>
            <ul className="list-disc text-left pl-5 text-sm text-gray-600">
              <li>Browse internship opportunities</li>
              <li>Apply with ease</li>
              <li>Track your progress</li>
              <li>Earn academic credits</li>
            </ul>
          </div>
          <div className="p-5 text-center border-1 rounded-xl shadow-xl  bg-white">
            <HiOutlineBuildingOffice2  className="text-blue-600 h-16 w-16 mx-auto" />
            <h1 className="text-2xl font-semibold">Companies</h1>
            <p className="py-5  text-sm text-gray-600 font-semibold">Post internships, manage applications, and discover talented students.</p>
            <ul className="list-disc text-left pl-5 text-sm text-gray-600">
              <li>Post verified internships</li>
              <li>Review applications</li>
              <li>Track intern progress</li>
              <li>Build talent pipeline</li>
            </ul>
          </div>
          <div className="p-5 text-center border-1 rounded-xl shadow-xl  bg-white">
            <GoPeople  className="text-blue-600 h-16 w-16 mx-auto"/>
            <h1 className="text-2xl font-semibold">Faculty</h1>
            <p className="py-5 text-sm text-gray-600 font-semibold">Verify internships, approve logbooks, and assign NEP credits</p>
            <ul className="list-disc text-left pl-5 text-sm text-gray-600">
              <li>Verify comapny postings</li>
              <li>Review student logbooks</li>
              <li>Assign academic credits</li>
              <li>Monitor student progress</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center bg-blue-600 p-10">
        <h1 className="text-4xl font-bold text-white">Ready to Get Started ?</h1>
        <p className="text-white font-semibold my-7 text-xl">Join the platform that's revolutionizing internship management under NEP guidelines</p>
        <button 
        onClick={()=>setLoginOpen(true)}
        className="px-5 p-3 bg-white rounded hover:scale-105 font-bold text-lg">Get Started</button>
      </div>
      <div className="p-7">
        <p className="text-center">© 2025 NEP Internship Management System - Smart India Hackathon Project</p>
      </div>
    </div>
  );
}

export default Home;
