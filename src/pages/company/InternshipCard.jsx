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
import InternshipDetails from './InternshipDetails';

const InternshipCard = ({ title, posted, location, duration, stipend, applicants }) => {
  const [isOpen, setIsOpen ] = useState(false)


  return (
    <div>
      <Card>
            <CardHeader className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-sm sm:text-lg font-semibold'>{title}</h3>
                  <p className='text-xs sm:text-sm'>{posted}</p>
                  {/* <Badge 
                    variant = "secondary"
                    className={cn(
                      'text-white rounded-2xl',
                      job.status === "Approved" && "bg-green-600",
                      job.status === "Pending" && "bg-orange-400",
                      job.status === "Rejected" && "bg-red-500"
                    )}>{job.status}</Badge> */}
                </div>
                <div className='flex flex-col items-end'>
                  <h2 className='text-blue-600 text-xl sm:text-2xl font-bold'>{applicants}</h2>
                  <p className='text-gray-500 text-xs sm:text-sm'>Applicants</p>
                </div>
            </CardHeader>

            <CardContent className='grid grid-cols-1 gap-1 sm:grid-cols-3 text-gray-500'>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><MapPinIcon className='h-3.5 sm:h-4.5'/> {location}</p>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><CalendarIcon className='h-3.5 sm:h-4.5'/> {duration}</p>
                <p className='flex items-center sm:gap-2 text-xs sm:text-sm'><DollarSignIcon className='h-3.5 sm:h-4.5'/> {stipend}</p>
            </CardContent>

            <CardFooter className='flex gap-2'>
                <Button 
                onClick={()=>setIsOpen(true)}
                variant="outline" 
                className='flex-1 hover:cursor-pointer hover:bg-blue-400 bg-blue-500 text-white transition-all duration-100 ease-in'>View Applications</Button>

                <InternshipDetails
                title={title}
                posted={posted}
                location={location}
                duration={duration}
                stipend={stipend}
                applicants={applicants}
                
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
                />
                <Button variant="outline" className='bg-gray-50 hover:cursor-pointer hover:bg-blue-400 hover:text-white transition-all duration-100 ease-in'>Edit</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default InternshipCard
