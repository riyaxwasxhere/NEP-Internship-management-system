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
import { CalendarIcon, DollarSignIcon, HomeIcon, LogOutIcon, MapPinIcon, MenuIcon, UsersIcon, WorkflowIcon, X } from 'lucide-react';

const ApplicantCard = ({...props}) => {
  return (
    <div>
      <Card className='flex'>
        <CardHeader className=' flex items-center justify-between'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
                <div className=' flex sm:flex-col items-center gap-2'>
                    <img 
                    className='rounded-[50%] h-12 sm:h-20 md:h-25 lg:h-30'
                    src={props.photo} 
                    alt="" />
                    <Badge 
                        variant = "secondary"
                        className={cn(
                        'text-white text-[10px] sm:text-xs rounded-2xl',
                        props.status === "Shortlisted" && "bg-green-600",
                        props.status === "Applied" && "bg-blue-600",
                        props.status === "Screening" && "bg-orange-400",
                        props.status === "Rejected" && "bg-red-500",
                        props.status === "Interview Scheduled" && "bg-purple-500",
                        props.status === "Interview Completed" && "bg-purple-700",
                        props.status === "Offer Extended" && "bg-green-700",
                        props.status === "Interview Completed" && "bg-purple-700",
                    )}>{props.status}</Badge>
                </div>

                <div className='flex-1'>
                    <h2 className='text-xl font-semibold'>{props.name}</h2>
                    <p className='text-[10px] sm:text-xs '>Id: {props.id}</p>
                    <div className='flex flex-col lg:flex-row lg:gap-5 lg:items-center justify-between'>
                        <h3 className='text-xs sm:text-sm'>{props.roleApplied}</h3>
                        <h3 className='text-xs sm:text-sm'>{props.appliedDate}</h3>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:gap-5 lg:items-center justify-between'>
                        <h3 className='text-xs sm:text-sm'>📍{props.location}</h3>
                        <h3 className='text-xs sm:text-sm'>💼{props.experience}</h3>
                    </div>
                    <div>
                        <h3 className='text-xs sm:text-sm'><span>Skills: </span>{props.topSkills}</h3>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardFooter className='flex justify-center'>
            <div className='flex gap-5'>
                <Button className='bg-green-500 text-xs sm:text-sm sm:px-10 hover:bg-green-600 cursor-pointer'>Approve</Button>
                <Button className='bg-red-500 text-xs sm:text-sm sm:px-10 hover:bg-red-600 cursor-pointer'>Reject</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ApplicantCard
