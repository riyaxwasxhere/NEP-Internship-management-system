import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import ApplicantCard from "./ApplicantCard"
import { useAuth } from "../../hooks/useAuth"
import { getCompanyApplications } from "../../supabase/api"

const Applicants = () => {
  const { user } = useAuth()
  const [applicants, setApplicants] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return
    const fetchApplicants = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getCompanyApplications(user.id)
        if (response.success) {
          setApplicants(response.data)
        }
      } catch (err) {
        console.error(err.message)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchApplicants()
  }, [user])

  useEffect(() => {
    setSearchResults(applicants)
  }, [applicants])

  const handleSearch = (query) => {
    const filtered = applicants.filter((app) =>
      app.students.full_name.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered)
  }

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading applicants...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (applicants.length === 0)
    return <p className="text-center mt-10">No applicants yet.</p>

  return (
    <div>
      <header className="flex gap-5 justify-between p-5 sm:px-10">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl font-bold">Applicants</h1>
          <p className="text-sm text-gray-500">View and manage all applicants</p>
        </div>
        <div className="mt-2">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <div className="sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {searchResults.filter((a) => a.status === "applied").length > 0 ? (
          searchResults
            .filter((a) => a.status === "applied")
            .map((intern) => (
              <div
                key={intern.id}
                className="hover:shadow-2xl hover:scale-102 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <ApplicantCard
                  id={intern.id}
                  status={intern.status}
                  name={intern.students.full_name}
                  email={intern.students.email}
                  department={intern.students.department}
                  roleApplied={intern.internships.title}
                  handleStatus={(newStatus) => {
                    setApplicants((prev) =>
                      prev.map((a) =>
                        a.id === intern.id ? { ...a, status: newStatus } : a
                      )
                    )
                  }}
                />
              </div>
            ))
        ) : (
          <div className="text-gray-500 mt-10">
            <p className="text-lg font-semibold">No pending applicants</p>
            <p className="text-sm">All applicants have been reviewed.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Applicants
