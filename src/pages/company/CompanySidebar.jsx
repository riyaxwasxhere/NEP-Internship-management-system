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
            icon: <HomeIcon className="w-6 h-6" />, 
            component: <CompanyDashboard /> 
        },
        {
            name: "My Internships",
            path: "/company/internships", 
            icon: <Workflow className="w-6 h-6" />, 
            component: <MyInternships /> 
        },
        { 
            name: "Applicants Approvals", 
            path: "/company/logbook", 
            icon: <Users className="w-6 h-6" />, 
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
