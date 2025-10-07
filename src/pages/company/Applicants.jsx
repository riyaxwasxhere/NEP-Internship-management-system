import React from 'react'
import SearchBar from './SearchBar'
import ApplicantCard from './ApplicantCard'

const Applicants = () => {
  const applicants = [
    {
      id: "APP001",
      name: "Riya Dutta",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      roleApplied: "Frontend Developer",
      status: "Screening",
      location: "Siliguri, India",
      experience: "1.5 years",
      topSkills: ["React", "JavaScript", "Tailwind CSS"],
      email: "riya.dutta@example.com",
      phone: "+91 9876543210",
      resume: "https://example.com/resume/riya-dutta.pdf",
      appliedDate: "2025-10-01",
      currentCompany: "Freelancer",
      education: "BCA, Siliguri Institute of Technology",
      portfolio: {
        github: "https://github.com/riya-dev",
        linkedin: "https://linkedin.com/in/riya-dutta"
      }
    },
    {
      id: "APP002",
      name: "Rahul Karmakar",
      photo: "https://randomuser.me/api/portraits/men/12.jpg",
      roleApplied: "Backend Developer",
      status: "Interview Scheduled",
      location: "Kolkata, India",
      experience: "2 years",
      topSkills: ["Node.js", "Express", "MongoDB"],
      email: "rahul.karmakar@example.com",
      phone: "+91 9998877766",
      resume: "https://example.com/resume/rahul-karmakar.pdf",
      appliedDate: "2025-09-28",
      currentCompany: "TechNova Pvt Ltd",
      education: "B.Tech, Computer Science",
      portfolio: {
        github: "https://github.com/rahul-backend",
        linkedin: "https://linkedin.com/in/rahulkarmakar"
      }
    },
    {
      id: "APP003",
      name: "Tiyasha Deb",
      photo: "https://randomuser.me/api/portraits/women/24.jpg",
      roleApplied: "UI/UX Designer",
      status: "Applied",
      location: "Siliguri, India",
      experience: "1 year",
      topSkills: ["Figma", "Adobe XD", "Prototyping"],
      email: "tiyasha.deb@example.com",
      phone: "+91 9811223344",
      resume: "https://example.com/resume/tiyasha-deb.pdf",
      appliedDate: "2025-10-03",
      currentCompany: "Designify Studio",
      education: "B.Des, Graphic Design",
      portfolio: {
        behance: "https://behance.net/tiyasha",
        linkedin: "https://linkedin.com/in/tiyasha-deb"
      }
    },
    {
      id: "APP004",
      name: "Raktima Das",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      roleApplied: "React Developer",
      status: "Shortlisted",
      location: "Guwahati, India",
      experience: "2.5 years",
      topSkills: ["React", "Redux", "TypeScript"],
      email: "raktima.das@example.com",
      phone: "+91 9911992233",
      resume: "https://example.com/resume/raktima-das.pdf",
      appliedDate: "2025-09-29",
      currentCompany: "Innovate Labs",
      education: "B.Tech, IT",
      portfolio: {
        github: "https://github.com/raktima-dev",
        linkedin: "https://linkedin.com/in/raktima-das"
      }
    },
    {
      id: "APP005",
      name: "Sriya Prasad",
      photo: "https://randomuser.me/api/portraits/women/77.jpg",
      roleApplied: "Full Stack Developer",
      status: "Interview Completed",
      location: "Kolkata, India",
      experience: "3 years",
      topSkills: ["React", "Node.js", "MySQL"],
      email: "sriya.bose@example.com",
      phone: "+91 9123456789",
      resume: "https://example.com/resume/sriya-bose.pdf",
      appliedDate: "2025-09-25",
      currentCompany: "StackHive Technologies",
      education: "MCA, Jadavpur University",
      portfolio: {
        github: "https://github.com/sriyabose",
        linkedin: "https://linkedin.com/in/sriyabose"
      }
    },
    {
      id: "APP006",
      name: "Arjun Sen",
      photo: "https://randomuser.me/api/portraits/men/53.jpg",
      roleApplied: "Data Analyst",
      status: "Screening",
      location: "Bangalore, India",
      experience: "1.8 years",
      topSkills: ["Python", "SQL", "Power BI"],
      email: "arjun.sen@example.com",
      phone: "+91 9090999999",
      resume: "https://example.com/resume/arjun-sen.pdf",
      appliedDate: "2025-10-02",
      currentCompany: "DataCrafters",
      education: "B.Sc, Statistics",
      portfolio: {
        linkedin: "https://linkedin.com/in/arjun-sen"
      }
    },
    {
      id: "APP007",
      name: "Ananya Paul",
      photo: "https://randomuser.me/api/portraits/women/19.jpg",
      roleApplied: "Frontend Developer",
      status: "Rejected",
      location: "Kolkata, India",
      experience: "0.8 years",
      topSkills: ["HTML", "CSS", "JavaScript"],
      email: "ananya.paul@example.com",
      phone: "+91 9033445566",
      resume: "https://example.com/resume/ananya-paul.pdf",
      appliedDate: "2025-09-27",
      currentCompany: "Fresher",
      education: "B.Sc, Computer Science",
      portfolio: {
        github: "https://github.com/ananyapaul",
        linkedin: "https://linkedin.com/in/ananya-paul"
      }
    },
    {
      id: "APP008",
      name: "Soham Dasgupta",
      photo: "https://randomuser.me/api/portraits/men/78.jpg",
      roleApplied: "DevOps Engineer",
      status: "Offer Extended",
      location: "Pune, India",
      experience: "3.5 years",
      topSkills: ["AWS", "Docker", "CI/CD"],
      email: "soham.dasgupta@example.com",
      phone: "+91 9988776655",
      resume: "https://example.com/resume/soham-dasgupta.pdf",
      appliedDate: "2025-09-20",
      currentCompany: "CloudSync Pvt Ltd",
      education: "B.Tech, Computer Science",
      portfolio: {
        linkedin: "https://linkedin.com/in/soham-dasgupta"
      }
    },
    {
      id: "APP009",
      name: "Priya Sharma",
      photo: "https://randomuser.me/api/portraits/women/91.jpg",
      roleApplied: "QA Engineer",
      status: "Screening",
      location: "Delhi, India",
      experience: "2.2 years",
      topSkills: ["Selenium", "Jest", "Manual Testing"],
      email: "priya.sharma@example.com",
      phone: "+91 9022334455",
      resume: "https://example.com/resume/priya-sharma.pdf",
      appliedDate: "2025-10-04",
      currentCompany: "QualityFirst Labs",
      education: "BCA, DU",
      portfolio: {
        linkedin: "https://linkedin.com/in/priya-sharma"
      }
    },
    {
      id: "APP010",
      name: "Vikram Roy",
      photo: "https://randomuser.me/api/portraits/men/44.jpg",
      roleApplied: "Backend Developer",
      status: "Applied",
      location: "Hyderabad, India",
      experience: "1 year",
      topSkills: ["Node.js", "PostgreSQL", "REST APIs"],
      email: "vikram.roy@example.com",
      phone: "+91 9871234567",
      resume: "https://example.com/resume/vikram-roy.pdf",
      appliedDate: "2025-10-05",
      currentCompany: "TechSprint",
      education: "B.Tech, IT",
      portfolio: {
        github: "https://github.com/vikramroy",
        linkedin: "https://linkedin.com/in/vikram-roy"
      }
    },
    {
      id: "APP011",
      name: "Neha Agarwal",
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
      roleApplied: "Product Manager",
      status: "Interview Scheduled",
      location: "Mumbai, India",
      experience: "4 years",
      topSkills: ["Agile", "JIRA", "User Research"],
      email: "neha.agarwal@example.com",
      phone: "+91 8800112233",
      resume: "https://example.com/resume/neha-agarwal.pdf",
      appliedDate: "2025-09-22",
      currentCompany: "ProdZen Pvt Ltd",
      education: "MBA, Marketing",
      portfolio: {
        linkedin: "https://linkedin.com/in/neha-agarwal"
      }
    },
    {
      id: "APP012",
      name: "Rohit Chatterjee",
      photo: "https://randomuser.me/api/portraits/men/23.jpg",
      roleApplied: "Software Engineer Intern",
      status: "Applied",
      location: "Siliguri, India",
      experience: "Fresher",
      topSkills: ["C++", "React", "Git"],
      email: "rohit.chatterjee@example.com",
      phone: "+91 9700001111",
      resume: "https://example.com/resume/rohit-chatterjee.pdf",
      appliedDate: "2025-10-06",
      currentCompany: "Student",
      education: "BCA, North Bengal University",
      portfolio: {
        github: "https://github.com/rohitc",
        linkedin: "https://linkedin.com/in/rohit-chatterjee"
      }
    }
  ];

  
    const handleSearch = (query) => {
      console.log("Searching for:", query)
    }

  return (
    <div>
      <header className='flex justify-between p-5 sm:p-10'>
        <div className='flex-1'>
            <h1 className='text-lg sm:text-3xl font-bold'>Applicants</h1>
            <p className='text-xs sm:text-[14px] text-gray-500'>View and manage all applicants</p>
        </div>
        <div>
            <SearchBar onSearch={handleSearch}/>
        </div>
      </header>

      <div className='px-5 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
        {applicants.map((intern)=>(
          <div className='hover:shadow-2xl hover:scale-102 cursor-pointer transition-all duration-300 ease-in-out'>
            <ApplicantCard
              id={intern.id}
              photo={intern.photo}
              name={intern.name}
              roleApplied={intern.roleApplied}
              status={intern.status}
              location={intern.location}
              experience={intern.experience}
              topSkills={intern.topSkills}
              email={intern.email}
              phone={intern.phone}
              resume={intern.resume}
              appliedDate={intern.appliedDate}
              currentCompany={intern.currentCompany}
              education={intern.education}
              portfolio={intern.portfolio}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applicants
