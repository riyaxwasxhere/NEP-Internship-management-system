import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { CalendarIcon, DollarSignIcon, HomeIcon, LogOutIcon, MapPinIcon, MenuIcon, UsersIcon, WorkflowIcon, X } from 'lucide-react';
import PostPortal from './PostPortal';


const CompanyDashboard = () => {
  const sidebarEls = [
    { label: "Dashboard", icon: <HomeIcon className='h-4 sm:h-5'/> },
    { label: "My Internships", icon: <WorkflowIcon className='h-4 sm:h-5'/> },
    { label: "Applicants", icon: <UsersIcon className='h-4 sm:h-5'/> },
    { label: "Logout", icon: <LogOutIcon className='h-4 sm:h-5'/> },
  ]

  const stats = [
    { label: "Total Postings", value: 2 },
    { label: "Total Applicants", value: 42 },
    { label: "Active Interns", value: 5 },
    { label: "Completed", value: 12 },
  ]

  const internships = [
    {
      title: "Full Stack Developer Intern",
      status: "Approved",
      location: "Bangalore, Karnataka",
      duration: "3 months",
      stipend: "₹15,000/month",
      applicants: 24,
    },
    {
      title: "ML Engineer Intern",
      status: "Pending",
      location: "Mumbai, Maharashtra",
      duration: "6 months",
      stipend: "₹20,000/month",
      applicants: 18,
    },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSidebar = () =>{
    setSidebarOpen(!sidebarOpen)
  }

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
        "flex-1 py-5 px-2 sm:p-8 relative",
        sidebarOpen ? "": "pl-16"
      )}>
        <div className='flex justify-between'>
          <div className='flex-1'>
            <h1 className='sm:text-2xl md:text-[31.5px] font-bold'>Company Dashboard</h1>
            <p className='text-sm text-gray-500'>Manage your internship postings and applications</p>
          </div>
          <Button 
          onClick = {()=> setIsOpen(true)}
          className='bg-blue-600 hover:bg-blue-400 hover:cursor-pointer 
          lg:text-[16px] text-xs sm:text-sm p-2 sm:p-5'>+ Post Internship</Button> 
        </div>

        <PostPortal
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

          {internships.map((job)=>(
            <Card>
              <CardHeader className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                  <h3 className='sm:text-lg font-semibold'>{job.title}</h3>
                  <Badge 
                    variant = "secondary"
                    className={cn(
                      'text-white rounded-2xl',
                      job.status === "Approved" && "bg-green-600",
                      job.status === "Pending" && "bg-orange-400",
                      job.status === "Rejected" && "bg-red-500"
                    )}>{job.status}</Badge>
                </div>
                <div className='flex flex-col items-end'>
                  <h2 className='text-blue-600 text-xl sm:text-2xl font-bold'>{job.applicants}</h2>
                  <p className='text-gray-500 text-xs sm:text-sm'>Applicants</p>
                </div>
              </CardHeader>

              <CardContent className='grid grid-cols-1 gap-1 sm:grid-cols-3 text-gray-500'>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><MapPinIcon className='h-3.5 sm:h-4.5'/> {job.location}</p>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><CalendarIcon className='h-3.5 sm:h-4.5'/> {job.duration}</p>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><DollarSignIcon className='h-3.5 sm:h-4.5'/> {job.stipend}</p>
              </CardContent>

              <CardFooter className='flex gap-2'>
                <Button variant="outline" className='flex-1 bg-gray-50 hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-100 ease-in'>View Applications</Button>
                <Button variant="outline" className='bg-gray-50 hover:cursor-pointer hover:bg-blue-400 hover:text-white transition-all duration-100 ease-in'>Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </Card>
      </main>
    </div>
  )
}

export default CompanyDashboard
