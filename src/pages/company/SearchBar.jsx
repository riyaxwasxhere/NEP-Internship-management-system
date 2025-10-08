import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="pl-2 border-1 border-blue-200 rounded-2xl w-3vw sm:w-80 md:w-100"
    >
      <div className="flex">
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" text-xs sm:text-[14px] bg-transparent flex-1 outline-0 border-0 w-32"
        />
        <Button 
        className='bg-blue-500 text-xs rounded-3xl outline-0 border-0 hover:bg-blue-400 cursor-pointer'
        type="submit" 
        variant="default">
            <Search 
            className=" text-white" size={10} />
        </Button>
      </div>
      
    </form>
  )
}

export default SearchBar
