import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import PostPortal from './PostPortal';
import InternshipCard from './InternshipCard';
import { getCompanyInternships, getCompanyStats } from '../../supabase/api';
import { useAuth } from "../../hooks/useAuth"

const CompanyDashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_internships: 0,
    total_applicants: 0,
    active_interns: 0,
    completed_interns: 0,
  })
  const [internships, setInternships] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(()=>{
    if(!user) return
    const fetchData = async () => {
      try{
        setIsLoading(true)
        setError(null)
        const [statsResult, internshipsResult] = await Promise.all([
          getCompanyStats(user.id),
          getCompanyInternships(user.id),
        ])
        if(statsResult) setStats(statsResult)
          if(internshipsResult?.success) setInternships(internshipsResult.data)
      }catch(err) {
        console.error(err.message)
        setError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  if(isLoading) return <p className='text-center mt-10 text-gray-500'>Loading...</p>
  if(error) return <p className='text-center mt-10 text-red-500'>{error}</p>

  return (
    <div className='flex relative' >
      
      {/* main content */}
      <main className="flex-1 sm:p-8 relative">
        <div className='flex justify-between gap-5'>
          <div className='flex-1'>
            <h1 className='text-2xl md:text-[31.5px] font-bold'>Company Dashboard</h1>
            <p className='text-sm text-gray-500'>Manage your internship postings and applications</p>
          </div>
          <Button 
          onClick = {()=> setIsOpen(true)}
          className='bg-blue-600 hover:bg-blue-400 hover:cursor-pointer 
          lg:text-[16px] text-xs sm:text-sm p-2 sm:p-5 mt-2'>+ Post Internship</Button> 
        </div>

        <PostPortal
          companyId = {user.id}
          isOpen={isOpen} 
          onClose={()=> setIsOpen(false)}>
        </PostPortal>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-8 gap-5'>
            <Card >
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>Total Internships</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold ">{stats.total_internships}</p>
              </CardContent>
            </Card>
            <Card >
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>Total Applicants</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500">{stats.total_applicants}</p>
              </CardContent>
            </Card>
            <Card >
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>Active Interns</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">{stats.active_interns}</p>
              </CardContent>
            </Card>
            <Card >
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>Completed Interns</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500">{stats.completed_interns}</p>
              </CardContent>
            </Card>
        </div>

        <Card className='p-3 sm:p-7'>
          <div>
            <h2 className='sm:text-xl md:text-2xl font-semibold'>My Internship Postings</h2>
            <p className='text-gray-500 text-sm'>Manage your internship opportunities</p>
          </div>

          {internships.length === 0 ? (
            <p className='text-gray-500 mt-4'>No internships posted yet. Click "+ Post Internship" to create one.</p>
          ):(
            internships.slice(0,2).map((job)=>(
              <InternshipCard
                key={job.id}
                id={job.id}
                title={job.title}
                posted={job.created_at}
                location={job.location}
                duration={job.duration}
                stipend={job.stipend}
                applicants={job.applicants || 0}
                onDelete = {(deletedId) => 
                  setInternships((prev) => prev.filter((i) => i.id !== deletedId))
                }
              />
            ))
          )}
          
        </Card>
      </main>
    </div>
  )
}

export default CompanyDashboard