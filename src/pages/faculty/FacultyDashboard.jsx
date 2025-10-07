import React from 'react'
import Internship from '../../components/ui/Internship'
import Logbook from '../../components/ui/Logbook'

export default function FacultyDasboard() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 my-2">Faculty Dashboard</h1>
        <p>Manage internship verifications and student progress</p>
      </div>
      <div className="pt-7 grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Pending Verifications</p>
          <p className="text-2xl text-amber-400 font-bold pt-2">8</p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Approved Logbooks</p>
          <p className="text-2xl text-green-500 font-bold pt-2">15</p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Assigned Credits</p>
          <p className="text-2xl text-blue-500 font-bold pt-2">24</p>
        </div>
        <div className="p-5 border-2 border-gray-200 rounded-xl bg-white">
          <p className="font-semibold text-gray-400">Pending Reviews</p>
          <p className="text-2xl text-red-500 font-bold pt-2">4</p>
        </div>
      </div>
      <div className='p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3'>
        <h1 className='text-2xl font-semibold'>Pending Internships Verifications</h1>
        <p className='mb-3 pt-2'>Review and verify company-posted internships</p>
        <div className='flex flex-col gap-2'>
          <Internship status="pending" title="ML Engineer Intern" company="Tech Innovators Pvt Ltd" description="Work on machine learning models for predictive analytics" duration="6 months" stipend="₹20,000/month" location="Bangalore"/>
          <Internship status="pending" title="ML Engineer Intern" company="Tech Innovators Pvt Ltd" description="Work on machine learning models for predictive analytics" duration="6 months" stipend="₹20,000/month" location="Bangalore"/>
        </div>
      </div>
      <div className='p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3'>
        <div>
          <h1 className='text-2xl font-semibold'>Logbook Approvals Pending</h1>
          <p className='mb-3 pt-2'>Review student logbooks and assign credits</p>
        </div>
        <div className='flex flex-col gap-2'>
          <Logbook name="Rajdeep Majumdar" role="Frontend developer" entries="12" date="20/4/2025" status="pending" />
          <Logbook name="Rajdeep Majumdar" role="Frontend developer" entries="12" date="20/4/2025" status="pending" />
        </div>
      </div>
    </div>
  )
}
