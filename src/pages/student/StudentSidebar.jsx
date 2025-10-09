import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

import StudentDashboard from "./StudentDashboard";
import Internships from "./Internships";
import MyApplications from "./MyApplications";
import Logbook from "./Logbook";
import Credits from "./Credits";
import SidebarLayout from "../SidebarLayout";

export default function StudentSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      component: <StudentDashboard />,
    },
    {
      name: "Internships",
      path: "/student/internships",
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
      component: <Internships />,
    },
    {
      name: "My Applications",
      path: "/student/myapplications",
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
      component: <MyApplications />,
    },
    {
      name: "Logbook",
      path: "/student/logbook",
      icon: <BookOpenIcon className="w-6 h-6" />,
      component: <Logbook />,
    },
    {
      name: "Credits",
      path: "/student/credits",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      component: <Credits />,
    },
  ];

  return (
    <SidebarLayout
      title="NEP PORTAL"
      menuItems={menuItems}
      defaultRoute="/student/dashboard"
    />
  );
}
