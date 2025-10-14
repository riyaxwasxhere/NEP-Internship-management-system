import React from 'react'
import { createPortal } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, HourglassIcon, IndianRupeeIcon, PlayIcon, Trash2Icon, X } from 'lucide-react'

const InternshipDetails = ({ isOpen, onClose, id, title, domain, posted, description, location, duration, stipend, applicants, startDate, applyBy, handleDelete}) => {
    
    if(!isOpen) return null

    return createPortal(
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-1000'>
            <div className='flex flex-col gap-4 bg-white p-5 rounded-2xl max-h-[80vh] w-[95%] sm:w-[60%] md:w-[45%] overflow-y-auto'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl sm:text-3xl flex-1 text-center font-bold '>{title}</h2>
                    <Button 
                    variant='ghost'
                    className='h-4.5 text-gray-500 hover:bg-white hover:cursor-pointer'
                    onClick={onClose}><X/></Button>
                </div>
                <div className='border-t-1'></div>
                <div>
                    <div>
                        <Badge className='bg-blue-500 text-xs'>{posted}</Badge>
                    </div>
                    
                    <div className='py-2 grid grid-cols-1 sm:grid-cols-2'>
                        <h3 className='text-gray-500 text-[16px]'>Domain: {}{domain}</h3>
                        <h3 className='text-gray-500 text-[16px] '>Location: {location} </h3>
                    </div>

                    <div className=' grid grid-cols-2 justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <PlayIcon className='h-4 sm:4.5'/>Start Date: </h3>
                            <h3 className='text-[16px]'>{startDate}</h3>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <CalendarIcon className='h-4 sm:4.5'/> Duration:</h3>
                            <h3 className=' text-[16px]'>{duration}</h3>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <IndianRupeeIcon className='h-4 sm:4.5'/>Stipend: </h3>
                            <h3 className=' text-[16px]'>{stipend}</h3>
                        </div >
                        <div className='flex items-center gap-2'>
                            <h3 className='text-gray-500 text-sm flex items-center'>
                                <HourglassIcon className='h-4 sm:4.5'/> Apply By:</h3>
                            <h3 className=' text-[16px]'>{applyBy}</h3>
                        </div>
                    </div>
                    <div className='border-t-1 my-3'></div>
                    <div>
                        <h3 className='text-xl font-semibold'>Description</h3>
                        <p className='text-gray-500 text-[16px] whitespace-pre-line'>{description}</p>
                    </div>
                    
                </div>
                
                <div className='flex justify-center gap-2'>
                    <Button variant="outline" className='text-white bg-blue-500 hover:cursor-pointer hover:bg-blue-600 hover:text-black transition-all duration-100 ease-in px-8'>Edit</Button>
                    <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="bg-red-500 text-white hover:cursor-pointer hover:bg-red-600 hover:text-black transition-all duration-100 ease-in"
                    >
                        <Trash2Icon className='h-3.5 sm:h-4.5 mx-2'/>
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default InternshipDetails
