import React from 'react'

function Internships(props) {
  return (
    <div className='relative bg-white rounded-2xl border-gray-200 border-1 p-5'>
        <p className='border-1 text-center text-sm font-semibold px-1.5 pb-0.5 rounded-xl bg-amber-500 absolute right-2 top-2 md:right-4 md:top-4 text-white w-fit'>{props.status}</p>
        <h1 className='mt-2 text-xl font-semibold'>{props.title}</h1>
        <p className='mt-1 font-semibold text-gray-600'>{props.company}</p>
        <p className='my-3'>{props.description}</p>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-5 text-left my-4'>
            <p><span className='text-gray-600'>Stipend:</span> {props.stipend}</p>
            <p><span className='text-gray-600'>Duration:</span> {props.duration}</p>
            <p><span className='text-gray-600'>Location:</span> {props.location}</p>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
            <button onClick={props.onApprove} className='flex justify-center gap-2 cursor-pointer border-1 border-green-500 rounded-lg text-green-500 hover:bg-green-500 hover:text-white font-semibold p-2'>
                <p>✅ Approved</p>
            </button>
            <button onClick={props.onReject} className='flex justify-center gap-2 cursor-pointer border-1 text-red-500 border-red-500 rounded-lg hover:text-white hover:bg-red-500 p-2 '>  
                <p>❌ Rejected</p>
            </button>
        </div>
    </div>
  )
}

export default Internships