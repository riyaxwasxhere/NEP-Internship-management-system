import { GraduationCap, Layers, LayoutDashboard, Users } from 'lucide-react';
import React from 'react'
import CompanyDashboard from './CompanyDashboard';
import MyInternships from './MyInternships';
import Applicants from './Applicants';
import SidebarLayout from '../SidebarLayout';
import Interns from './Interns';

const CompanySidebar = () => {
    const menuItems = [
        {
            name: "Dashboard", 
            path: "/company/dashboard", 
            icon: <LayoutDashboard className="h-4 sm:h-4.5" />, 
            component: <CompanyDashboard /> 
        },
        {
            name: "My Internships",
            path: "/company/internships", 
            icon: <Layers className="h-4 sm:h-4.5" />, 
            component: <MyInternships /> 
        },
        { 
            name: "Applicants", 
            path: "/company/applicants", 
            icon: <Users className="h-4 sm:h-4.5" />, 
            component: <Applicants /> 
        },
        { 
            name: "Interns", 
            path: "/company/interns", 
            icon: <GraduationCap className="h-4 sm:h-4.5" />, 
            component: <Interns /> 
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
