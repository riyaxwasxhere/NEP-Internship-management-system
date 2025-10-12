import { HomeIcon, Users, Workflow } from 'lucide-react';
import React from 'react'
import CompanyDashboard from './CompanyDashboard';
import MyInternships from './MyInternships';
import Applicants from './Applicants';
import SidebarLayout from '../SidebarLayout';

const CompanySidebar = () => {
    const menuItems = [
        {
            name: "Dashboard", 
            path: "/company/dashboard", 
            icon: <HomeIcon className="h-4 sm:h-4.5" />, 
            component: <CompanyDashboard /> 
        },
        {
            name: "My Internships",
            path: "/company/internships", 
            icon: <Workflow className="h-4 sm:h-4.5" />, 
            component: <MyInternships /> 
        },
        { 
            name: "Applicants", 
            path: "/company/applicants", 
            icon: <Users className="h-4 sm:h-4.5" />, 
            component: <Applicants /> 
        }
    ]

  return (
    <SidebarLayout
      title="NEP PORTAL"
      menuItems={menuItems}
      defaultRoute="/company/dashboard"
    />
  )
}

export default CompanySidebar
