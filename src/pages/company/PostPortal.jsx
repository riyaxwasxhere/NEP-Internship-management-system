import React, { useEffect, useState } from 'react'
import {createPortal} from 'react-dom'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInternship } from '../../supabase/api';
import { useAuth } from "../../hooks/useAuth"

const PostPortal = ({ isOpen, onClose, companyId }) => {
    const [title, setTitle] = useState("")
    const [domain, setDomain] = useState("")
    const [duration, setDuration] = useState("")
    const [stipend, setStipend] = useState("")
    const [startDate, setStartDate] = useState("")
    const [applyBy, setApplyBy] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")

    const { user } = useAuth()
    
    if(!user) return

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await createInternship(
            companyId,
            title, 
            domain,
            description, 
            location, 
            stipend, 
            duration,
            startDate,
            applyBy
        )

        if(result.success) {
            alert("Posted Successfully!")
            setTitle("")
            setDuration("")
            setStipend("")
            setStartDate("")
            setApplyBy("")
            setLocation("")
            setDescription("")
            onClose()
        }else{
            alert("Error: "+ result.error)
        }
    }

  if(!isOpen) return null

  return createPortal(
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-1000'>
      <div className='flex flex-col gap-5 bg-white p-5 rounded-2xl max-h-[80vh] w-[95%] sm:w-[60%] md:w-[45%] overflow-y-auto'>
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='flex-1 text-center text-xl sm:text-2xl font-bold '>Post New Internship </h2>
                <Button 
                variant='ghost'
                className='h-5 text-gray-500 hover:bg-white hover:cursor-pointer'
                onClick={onClose}><X/></Button>
            </div>
            <p className='text-gray-500 text-sm sm:text-lg text-center'>Create a new internship opportunity for students</p>
        </div>
        <form 
            onSubmit={handleSubmit}
            action="" 
            className='flex flex-col gap-2'>
            
            {/* title */}
            <div className='flex flex-col gap-1'>
            <Label 
                className='text-lg sm:text-xl'
                htmlFor='title'>Internship Title
            </Label>

            <Input 
                value={title}
                onChange = {e=> setTitle(e.target.value)}
                className='text-sm sm:text-lg'
                id='title' 
                placeholder='e.g., Full Stack Developer Intern' 
            />
            </div>

            {/* domain */}
            <div className='flex flex-col gap-1'>
                <Label 
                    className='text-lg sm:text-xl'
                    htmlFor='domain'>Domain</Label>
                <Input
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className='text-sm sm:text-lg'
                    id='domain' 
                    placeholder='e.g., Software Development, Data Science' />
            </div>

            <div className='grid grid-cols-2 items-center justify-between gap-5'>

                {/* duration */}
                <div className='flex flex-col gap-1'>
                    <Label 
                        className='text-lg sm:text-xl'
                        htmlFor='duration'>Duration</Label>
                    <Input 
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className='text-sm sm:text-lg'
                        id='duration' 
                        placeholder='e.g., 3 months' />
                </div>

                <div className='flex flex-col gap-1'>
                    {/* stipend */}
                    <Label 
                        className='text-lg sm:text-xl'
                        htmlFor='stipend'>Stipend</Label>
                    <Input 
                        value={stipend}
                        onChange={e => setStipend(e.target.value)}
                        className='text-sm sm:text-lg'
                        id='stipend' 
                        placeholder='e.g., ₹15,000/month' />
                </div>
            </div>
            
            <div className='grid grid-cols-2 items-center justify-between gap-5'>
                <div className='flex flex-col gap-1'>
                    <Label 
                        className='text-lg sm:text-xl'
                        htmlFor='startDate'>Start Date</Label>
                    <Input 
                        value={startDate}
                        onChange={e=>setStartDate(e.target.value)}
                        className='text-sm sm:text-lg'
                        id='startDate' 
                        placeholder='e.g., Immediately' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label 
                        className='text-lg sm:text-xl'
                        htmlFor='applyBy'>Apply By</Label>
                    <Input 
                        value={applyBy}
                        onChange={e=>setApplyBy(e.target.value)}
                        className='text-sm sm:text-lg'
                        id='applyBy' 
                        placeholder='e.g., 10-10-25' />
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <Label 
                    className='text-lg sm:text-xl'
                    htmlFor='location'>Location</Label>
                <Input 
                    value={location}
                    onChange={e=>setLocation(e.target.value)}
                    className='text-sm sm:text-lg'
                    id='location'
                    placeholder='e.g., Bangalore, Karnataka or remote' />
            </div>
            <div className='flex flex-col gap-1'>
                <Label 
                    className='text-lg sm:text-xl'
                    htmlFor='description'>Internship Description</Label>
                <Textarea 
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                    className='text-sm sm:text-lg'
                    id='description' 
                    placeholder='Describe the role, responsibilities, and requirements...' />
            </div>
            <div className='flex gap-2'>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className='flex-1 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-xs sm:text-sm transition-all duration-100 ease-in'>Post Internship</Button>
                <Button 
                    type="button"
                    onClick={onClose}
                    className='text-xs sm:text-sm bg-white text-black border-1 hover:bg-blue-400 transition-all duration-100 ease-in hover:cursor-pointer'>Cancel</Button>
            </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default PostPortal