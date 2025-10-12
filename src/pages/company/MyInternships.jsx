import React, { useEffect, useState } from 'react'
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
import { useAuth } from "../../hooks/useAuth"
import { getCompanyInternships } from '../../supabase/api'

const MyInternships = () => {
    // const internships = [
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    //     {
    //         title: "Full Stack Developer Intern",
    //         posted: "06-10-2025",
    //         location: "Bangalore, Karnataka",
    //         duration: "3 months",
    //         stipend: "₹15,000/month",
    //         applicants: 24,
    //         desc: "bla bla bla bla bla",
    //     },
    // ]
    const { user } = useAuth()

    const [ internships, setInternships ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        if(!user) return
        const fetchInternships = async () => {
            try{
                setIsLoading(true)
                setError(null)
                const response = await getCompanyInternships(user.id)
                if(response.success){
                    setInternships(response.data)
                }
            }catch(err){
                console.error(err.message)
                setError(err.message)
            }finally{
                setIsLoading(false)
            }
        }
        fetchInternships()
    },[user])

    if(isLoading) return <p className='text-center mt-10 text-gray-500'>Loading internships...</p>
    if(error) return <p className='text-center mt-10 text-red-500'>{error}</p>
    if(internships.length === 0) return <p className='text-center mt-10'>No internships posted yet.</p>

    const handleSearch = (query) => {
      console.log("Searching for:", query)
    }

    return (
    <div>
      <header className='flex justify-between pb-4 sm:p-10 gap-4'>
        <div className='flex-1'>
            <h1 className='text-2xl sm:text-4xl font-bold'>My Internships</h1>
            <p className='text-sm text-gray-500'>View all your internships</p>
        </div>
        <div className='mt-2'>
            <SearchBar onSearch={handleSearch}/>
        </div>
      </header>

      {/* main content */}
      <div className=' sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {internships.map((job, index)=>(
            <div key={index}>
                <InternshipCard
                    title={job.title}
                    posted={job.created_at}
                    location={job.location}
                    duration={job.duration}
                    stipend={job.stipend}
                    applicants={job.applicants || 0}
                />
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyInternships
