import React from 'react'
import Internship from '../../components/ui/Internship'
function Internships() {
  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold text-gray-800 my-2">Verify Internships</h1>
            <p>Review and verify company-posted internships</p>
        </div>
        <div className='p-3 md:p-5 border-1 border-gray-200 bg-white rounded-2xl mt-5 pt-3'>
            <h1 className='text-2xl font-semibold'>Pending Internships Verifications</h1>
            <p className='mb-3 pt-2'>Review and verify company-posted internships</p>
        <div className='flex flex-col gap-2'>
          <Internship status="pending" title="ML Engineer Intern" company="Tech Innovators Pvt Ltd" description="Work on machine learning models for predictive analytics" duration="6 months" stipend="₹20,000/month" location="Bangalore"/>
          <Internship status="pending" title="ML Engineer Intern" company="Tech Innovators Pvt Ltd" description="Work on machine learning models for predictive analytics" duration="6 months" stipend="₹20,000/month" location="Bangalore"/>
          <Internship status="pending" title="ML Engineer Intern" company="Tech Innovators Pvt Ltd" description="Work on machine learning models for predictive analytics" duration="6 months" stipend="₹20,000/month" location="Bangalore"/>
        </div>
      </div>
    </div>
  )
}

export default Internships