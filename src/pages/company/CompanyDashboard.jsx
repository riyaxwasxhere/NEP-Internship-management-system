import React from 'react'
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
import { CalendarIcon, DollarSignIcon, HomeIcon, MapPinIcon, UsersIcon, WorkflowIcon, X } from 'lucide-react';


const CompanyDashboard = () => {
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

  return (
    <div className='flex' >
      {/* sidebar */}
      <aside className='bg-blue-500 w-64 text-white px-4 '>
        <div className='flex items-center justify-between py-6'>
          <h1 className='text-lg font-bold tracking-[1px]'>Prashiskshan</h1>
          <Button variant="ghost" className='hover:bg-blue-400'><X/></Button>
        </div>
        <ul className='flex flex-col gap-3'>
          <li className='flex gap-5 text-sm font-semibold items-center p-3  rounded-xl hover:bg-blue-400 transition-all duration-100 ease-in '><HomeIcon className='h-4.5'/> Dashboard</li>
          <li className='flex gap-5 text-sm font-semibold items-center p-3  rounded-xl hover:bg-blue-400 transition-all duration-100 ease-in '><WorkflowIcon className='h-4.5'/> My Internships</li>
          <li className='flex gap-5 text-sm font-semibold items-center p-3  rounded-xl hover:bg-blue-400 transition-all duration-100 ease-in '><UsersIcon className='h-4.5'/> Applicants</li>
        </ul>
      </aside>

      {/* main content */}
      <main className='flex-1 p-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-[31.5px] font-bold'>Company Dashboard</h1>
            <p className='text-gray-500'>Manage your internship postings and applications</p>
          </div>
          <Button className='bg-blue-600 text-md p-5'>+ Post Internship</Button>
        </div>

        <div className='grid grid-cols-4 py-8 gap-5'>
          {stats.map((stat)=>(
            <Card>
              <CardContent className='flex flex-col gap-2'>
                <h3 className='text-gray-500 text-sm font-semibold'>{stat.label}</h3>
                <p className={`text-3xl font-bold 
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

        <Card className='p-7'>
          <div>
            <h2 className='text-[23px] font-semibold'>My Internship Postings</h2>
            <p className='text-gray-500 text-sm'>Manage your internship opportunities</p>
          </div>

          {internships.map((job)=>(
            <Card>
              <CardHeader className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-lg font-semibold'>{job.title}</h3>
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
                  <h2 className='text-blue-600 text-2xl font-bold'>{job.applicants}</h2>
                  <p className='text-gray-500 text-sm'>Applicants</p>
                </div>
              </CardHeader>

              <CardContent className='grid grid-cols-3 text-gray-500'>
                <p className='flex items-center gap-2 text-sm'><MapPinIcon/> {job.location}</p>
                <p className='flex items-center gap-2 text-sm'><CalendarIcon/> {job.duration}</p>
                <p className='flex items-center gap-2 text-sm'><DollarSignIcon/> {job.stipend}</p>
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
