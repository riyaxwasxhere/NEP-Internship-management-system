import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { useAuth } from '../../hooks/useAuth'
import { getApprovedInternsByCompany } from '../../supabase/api'
import InternCard from './InternCard'

const Interns = () => {
  const { user } = useAuth()
  const [interns, setInterns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!user) return
    const fetchInterns = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getApprovedInternsByCompany(user.id)
        if (response.success) {
          setInterns(response.data)
        }else{
            console.warn("API returned error, using empty array")
            setInterns([])
        }
      } catch (err) {
        console.error(err.message)
        console.warn("API returned error, using empty array")
        setInterns([])
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInterns()
  }, [user])

  useEffect(() => {
    setSearchResults(interns)
  }, [interns])

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(interns)
      return
    }
    const filtered = interns.filter((intern) =>
      intern.internship_title.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered)
  }

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading interns...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (interns.length === 0) return <p className="text-center mt-10">No interns hired yet.</p>

  return (
    <div>
      <header className='flex gap-5 justify-between p-5 sm:px-10'>
        <div className='flex-1'>
            <h1 className='text-2xl sm:text-4xl font-bold'>My Interns</h1>
            <p className='text-sm text-gray-500'>View and manage all approved interns</p>
        </div>
        <div className='mt-2'>
            <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <div className="sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {searchResults.map((intern, index) => (
            <div
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 ease-in-out"
            >
            <InternCard
                id={intern.id}
                status={intern.status}
                name={intern.student_name}
                email={intern.student_email}
                department={intern.department}
                year={intern.year}
                role={intern.internship_title}
                duration={intern.duration}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Interns