
import { HomeIcon, ClipboardDocumentCheckIcon, BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

import FacultyDashboard from "./FacultyDashboard";
import Internships from "./Internships";
import LogbookApprovals from "./LogbookApprovals";
import Credits from "./Credits";
import SidebarLayout from "../SidebarLayout";

export default function FacultySidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/faculty/dashboard", icon: <HomeIcon className="w-6 h-6" />, component: <FacultyDashboard /> },
    { name: "Verify Internships", path: "/faculty/internships", icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />, component: <Internships /> },
    { name: "Logbook Approvals", path: "/faculty/logbook", icon: <BookOpenIcon className="w-6 h-6" />, component: <LogbookApprovals /> },
    { name: "Assign Credits", path: "/faculty/credits", icon: <AcademicCapIcon className="w-6 h-6" />, component: <Credits /> },
  ];

  return (
    <SidebarLayout
      title="NEP PORTAL"
      menuItems={menuItems}
      defaultRoute="/faculty/dashboard"
    />
  );
}
