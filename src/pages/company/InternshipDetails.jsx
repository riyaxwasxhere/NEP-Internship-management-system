import React from 'react'
import { createPortal } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSignIcon, HourglassIcon, PlayIcon, X } from 'lucide-react'

const InternshipDetails = ({ isOpen, onClose, onEdit}) => {
    if(!isOpen) return null

    return createPortal(
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-1000'>
            <div className='flex flex-col gap-4 bg-white p-5 rounded-2xl w-[95%] sm:w-[60%] md:w-[45%]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl sm:text-3xl flex-1 text-center font-bold '>Job name</h2>
                    <Button 
                    variant='ghost'
                    className='h-4.5 text-gray-500 hover:bg-white hover:cursor-pointer'
                    onClick={onClose}><X/></Button>
                </div>
                <div className='border-t-1'></div>
                <div>
                    <div>
                        <Badge className='bg-blue-500 text-xs'>worktype: Work from home</Badge>
                    </div>
                    
                    <div className='py-2 grid grid-cols-1 sm:grid-cols-2'>
                        <h3 className='text-gray-500 text-[16px]'>Domain: Software Development</h3>
                        <h3 className='text-gray-500 text-[16px] '>Location: Remote </h3>
                    </div>

                    <div className=' grid grid-cols-2 sm:grid-cols-4 justify-between gap-2'>
                        <div >
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <PlayIcon className='h-4 sm:4.5'/> start date</h3>
                            <h3 className='text-[16px] pl-5'>Immediately</h3>
                        </div>
                        <div >
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <CalendarIcon className='h-4 sm:4.5'/> duration</h3>
                            <h3 className='pl-5 text-[16px]'>1 month</h3>
                        </div>
                        <div>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <DollarSignIcon className='h-4 sm:4.5'/> stipend </h3>
                            <h3 className='pl-5 text-[16px]'>15000 /month</h3>
                        </div>
                        <div>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <HourglassIcon className='h-4 sm:4.5'/> apply by</h3>
                            <h3 className='pl-5 text-[16px]'>6 nov' 25</h3>
                        </div>
                    </div>
                    <div className='border-t-1 my-3'></div>
                    <div>
                        <h3 className='text-xl font-semibold'>Description</h3>
                        <p className='text-gray-500 text-[16px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat tenetur tempora molestias blanditiis, nemo magnam voluptatum, dolore iure fugiat nostrum facere. Nemo tenetur nobis dolor architecto tempora beatae assumenda delectus ad consequatur porro blanditiis, reiciendis repellat excepturi, doloribus omnis laudantium incidunt. Natus adipisci alias reprehenderit provident odit molestias blanditiis ipsam ipsum quam sapiente, dicta aperiam nihil nesciunt mollitia esse commodi porro temporibus aspernatur aliquam iure! Facere laboriosam repellat ea similique magnam obcaecati corrupti, officiis porro saepe. Obcaecati, voluptas quam! Sunt sequi iure voluptatem commodi ut, excepturi accusamus perspiciatis! Enim quaerat ipsam dignissimos minima tempore nobis labore voluptatibus? Laboriosam, voluptatum iure.</p>
                    </div>
                    
                </div>
                
                <div className='flex justify-center'>
                    <Button className='px-10 bg-blue-500 hover:bg-blue-600 cursor-pointer text-lg'>Edit</Button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default InternshipDetails
