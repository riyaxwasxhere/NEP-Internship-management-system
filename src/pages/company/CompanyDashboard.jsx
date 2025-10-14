import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import PostPortal from './PostPortal';
import InternshipCard from './InternshipCard';
import { getCompanyInternships } from '../../supabase/api';
import { useAuth } from "../../hooks/useAuth"


const CompanyDashboard = () => {
  const stats = [
    { label: "Total Postings", value: 2 },
    { label: "Total Applicants", value: 42 },
    { label: "Active Interns", value: 5 },
    { label: "Completed", value: 12 },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true)
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

      if(isLoading) return <p className='text-center mt-10 text-gray-500'>Loading...</p>
    if(error) return <p className='text-center mt-10 text-red-500'>{error}</p>

  // const [sidebarOpen, setSidebarOpen] = useState(true)

  // const handleSidebar = () =>{
  //   setSidebarOpen(!sidebarOpen)
  // }

  return (
    <div className='flex relative' >
      {/* sidebar */}
      {/* <aside 
      className={cn(
          "bg-blue-500 text-white h-screen top-0 left-0 transition-all duration-300 ease-in-out z-50 px-4",
          sidebarOpen ? "fixed sm:sticky sm:w-64" : "fixed sm:sticky p-1 sm:w-16"
        )}>
        <div className=' flex items-center justify-between py-6'>
          <h1 className={cn(
              "sm:text-md md:text-xl font-bold tracking-[1px] transition-all duration-300  ",
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            )}>Prashiskshan</h1>

          {sidebarOpen ? (
            <Button 
            onClick={handleSidebar}
            variant="ghost" 
            className={`hover:cursor-pointer hover:bg-blue-400 transition-all duration-100 ease-in-out ${sidebarOpen? "" : "hidden"}`}><X/></Button>
          ):(
            <Button 
            onClick ={handleSidebar}
            variant="ghost" 
            className={`hover:cursor-pointer transition-all duration-100 ease-in-out hover:bg-blue-400 ${sidebarOpen? "hidden" : ""} `}><MenuIcon/></Button>
          )}
          
        </div>
        <ul className='flex flex-col gap-3 justify-center'>
          {sidebarEls.map((item)=>(
            <li className={cn(
              "flex w-full items-center gap-2 sm:gap-4 p-1 sm:p-3 rounded-lg hover:cursor-pointer hover:bg-blue-400 transition-all duration-300 text-sm font-medium",
              sidebarOpen ? "justify-start" : "justify-center"
            )}>
              <div className='flex-shrink-0'>{item.icon}</div>
              {sidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside> */}

      {/* main content */}
      <main className={cn(

        "flex-1 sm:p-8 relative",
        
      )}>
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
          {stats.map((stat)=>(
            <Card >
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>{stat.label}</h3>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold 
                  ${stat.label === "Total Applicants"
                  ? "text-blue-500"
                  :stat.label === "Active Interns"
                  ? "text-green-500"
                  : ""
                  }`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className='p-3 sm:p-7'>
          <div>
            <h2 className='sm:text-xl md:text-2xl font-semibold'>My Internship Postings</h2>
            <p className='text-gray-500 text-sm'>Manage your internship opportunities</p>
          </div>

          {internships.slice(0,2).map((job)=>(
            <InternshipCard
            title={job.title}
            posted={job.created_at}
            location={job.location}
            duration={job.duration}
            stipend={job.stipend}
            applicants={job.applicants || 0}
            />
          ))}
        </Card>
      </main>
    </div>
  )
}

export default CompanyDashboard
