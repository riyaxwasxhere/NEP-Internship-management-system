import React from 'react'
import {createPortal} from 'react-dom'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const PostPortal = ({ isOpen, onClose }) => {
  if(!isOpen) return null

  return createPortal(
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center'>
      <div className='flex flex-col gap-5 bg-white p-5 rounded-2xl w-[95%] sm:w-[60%] md:w-[45%]'>
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-md sm:text-lg font-semibold '>Post New Internship </h2>
                <Button 
                variant='ghost'
                className='h-4.5 text-gray-500 hover:bg-white hover:cursor-pointer'
                onClick={onClose}><X/></Button>
            </div>
            <p className='text-gray-500 text-xs sm:text-sm'>Create a new internship opportunity for students</p>
        </div>
        <div className='flex flex-col gap-1'>
            <Label 
            className='text-xs sm:text-sm'
            htmlFor='title'>Internship Title</Label>
            <Input 
            className='text-xs sm:text-sm'
            id='title' 
            placeholder='e.g., Full Stack Developer Intern
            ' />
        </div>
        <div className='flex flex-col gap-1'>
            <Label 
            className='text-xs sm:text-sm'
            htmlFor='domain'>Domain</Label>
            <Input
            className='text-xs sm:text-sm'
            id='domain' 
            placeholder='e.g., Software Development, Data Science' />
        </div>
        <div className='grid grid-cols-2 items-center justify-between gap-5'>
            <div className='flex flex-col gap-1'>
                <Label 
                className='text-xs sm:text-sm'
                htmlFor='duration'>Duration</Label>
                <Input 
                className='text-xs sm:text-sm'
                id='duration' 
                placeholder='e.g., 3 months' />
            </div>
            <div className='flex flex-col gap-1'>
                <Label 
                className='text-xs sm:text-sm'
                htmlFor='stipend'>Stipend</Label>
                <Input 
                className='text-xs sm:text-sm'
                id='stipend' 
                placeholder='e.g., ₹15,000/month' />
            </div>
        </div>
        <div className='flex flex-col gap-1'>
            <Label 
            className='text-xs sm:text-sm'
            htmlFor='loc'>Location</Label>
            <Input 
            className='text-xs sm:text-sm'
            id='loc'
            placeholder='e.g., Bangalore, Karnataka or remote' />
        </div>
        <div className='flex flex-col gap-1'>
            <Label 
            className='text-xs sm:text-sm'
            htmlFor='Description'>Internship Description</Label>
            <Textarea 
            className='text-xs sm:text-sm'
            id='title' 
            placeholder='Describe the role, responsibilities, and requirements...' />
        </div>
        <div className='flex gap-2'>
            <Button className='flex-1 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-xs sm:text-sm transition-all duration-100 ease-in'>Post Internship</Button>
            <Button className='text-xs sm:text-sm bg-white text-black border-1 hover:bg-blue-400 transition-all duration-100 ease-in hover:cursor-pointer'>Cancel</Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default PostPortal
