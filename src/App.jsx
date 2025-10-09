import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentSidebar from "./pages/student/StudentSidebar";
import FacultySidebar from "./pages/faculty/FacultySidebar";
import CompanySidebar from "./pages/company/CompanySidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/*" element={<StudentSidebar />} />
         <Route path="/faculty/*" element={<FacultySidebar />} />
        <Route path="/company/*" element={<CompanySidebar />} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
