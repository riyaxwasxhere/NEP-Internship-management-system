import React from 'react'
import InternDashboard from './LogbookCard'

function FacultyLogbook() {
  return (
    <div>
      <div className='my-3 px-3 md:px-7'>
        <h1 className="text-3xl font-bold text-gray-800 my-2">Logbook Approvals</h1>
        <p>Review student logbook entries and verify completed internships</p>
      </div>
      <div>
        <InternDashboard />
      </div>
    </div>
  )
}

export default FacultyLogbook