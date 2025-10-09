import React from 'react'

function Logbook(props) {
  return (
    <div className='relative bg-white rounded-2xl border-gray-200 border-1 p-5 mt-2'>
         <p className='border-1 text-center text-sm font-semibold px-1.5 pb-0.5 rounded-xl bg-amber-500 absolute right-2 top-2 md:right-4 md:top-4 text-white w-fit'>{props.status}</p>
        <div>
            <h1 className='mt-2 md:mt-0 mb-1 font-semibold text-xl'>{props.name}</h1>
            <p className='font-semibold text-gray-500'>{props.role}</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2 mt-2'>
            <p><span>Total Entries:</span> {props.entries}</p>
            <p><span>Completion:</span> {props.date}</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_0.3fr] gap-3 mt-4'>
            <button className='p-2 bg-gray-50 border-gray-300 border-1 rounded-lg hover:text-white font-bold hover:bg-blue-500 cursor-pointer'>Review logbook</button>
            <button className='bg-blue-700 text-white font-bold p-2 border-1 rounded-lg cursor-pointer hover:bg-blue-500'>Assign credits</button>
        </div>
    </div>
  )
}

export default Logbook