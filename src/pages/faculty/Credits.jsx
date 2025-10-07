

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
        <div>
            
        </div>
    </div>
  )
}

export default Credits