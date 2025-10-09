import { Modal } from "./Modal"


function Credits() {
  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold text-gray-800 my-2">Assign Credits</h1>
            <p>Assign NEP credits to students who have completed verified internships</p>
        </div>
        <div className='border-1 rounded-xl border-gray-200 p-3 my-5 bg-white '>
            <div>
                <h1 className="text-xl font-bold text-gray-800 my-2">NEP Credit Guidelines</h1>
                <p>Recommended credit allocation based on internship duration</p>
            </div>
            <div className='my-3 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 '>
                <div className='rounded-lg border-1 border-r-gray-200 p-3'>
                    <h1>1-2 months</h1>
                    <p>2 credits</p>
                </div>
                <div className='rounded-lg border-1 border-r-gray-200 p-3'>
                    <h1>3-4 months</h1>
                    <p>4 credits</p>
                </div>
                <div className='rounded-lg border-1 border-r-gray-200 p-3'>
                    <h1>4-6 months</h1>
                    <p>6 credits</p>
                </div>
                <div className='rounded-lg border-1 border-r-gray-200 p-3'>
                    <h1>8+ months</h1>
                    <p>8+ credits</p>
                </div>
            </div>
        </div>
        <div className=" border-1 border-gray-200 bg-white rounded-xl p-5">
            <h1 className="text-xl font-bold">Credit Assignment History</h1>
            <p className="my-2 ">Previously assigned credits</p>
            <div className="relative border-1 border-gray-200 rounded-lg p-3">
                <div className="absolute top-0 md:top-2 right-2 flex md:block gap-1">
                    <p className="text-right font-bold md:text-lg text-blue-600">2</p>
                    <p>Credits</p>
                </div>
                <h1 className="font-semibold text-lg mt-2 md:mt-0">Rajdeep majumdar</h1>
                <p className="my-2  text-gray-600">CS21B001 • Full Stack Developer Intern at TechCorp Solution</p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-5 text-left">
                    <p><span className="text-gray-600">Duration:</span> 3 months</p>
                    <p><span className="text-gray-600">Assigned:</span> 2025-01-20</p>
                </div>
                <p className="my-2 text-gray-600">Excellent performance and consistent logbook maintenance</p>
            </div>
        </div>
        <Modal
  name="Jane Smith"
  rollNo="CS21B002"
  internship="Data Science Intern"
  duration="6 months"
  logbookEntries={60}
/>

    </div>
  )
}

export default Credits