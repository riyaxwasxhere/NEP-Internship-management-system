import React from 'react'
import SearchBar from './SearchBar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InternshipCard from './InternshipCard'

const MyInternships = () => {
    const internships = [
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
        {
            title: "Full Stack Developer Intern",
            posted: "06-10-2025",
            location: "Bangalore, Karnataka",
            duration: "3 months",
            stipend: "₹15,000/month",
            applicants: 24,
            desc: "bla bla bla bla bla",
        },
    ]

    const handleSearch = (query) => {
      console.log("Searching for:", query)
    }

    return (
    <div>
      <header className='flex justify-between p-5 sm:p-10'>
        <div className='flex-1'>
            <h1 className='text-lg sm:text-3xl font-bold'>My Internships</h1>
            <p className='text-xs sm:text-md text-gray-500'>View all your internships</p>
        </div>
        <div>
            <SearchBar onSearch={handleSearch}/>
        </div>
      </header>

      {/* main content */}
      <div className='px-5 sm:px-10 grid grid-cols-1  md:grid-cols-3 gap-5'>
        {internships.map((job)=>(
            <div className='hover:shadow-2xl hover:scale-102 cursor-pointer transition-all duration-300 ease-in-out' >
                <InternshipCard
                    title={job.title}
                    posted={job.posted}
                    location={job.location}
                    duration={job.duration}
                    stipend={job.stipend}
                    applicants={job.applicants}

                />
            </div>
            
        ))}
      </div>
    </div>
  )
}

export default MyInternships
