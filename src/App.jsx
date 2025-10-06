import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import MyInternships from "./pages/company/MyInternships";
import Applicants from "./pages/company/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/company/dashboard" element={<CompanyDashboard/>} />
        <Route path="/company/myinternships" element={<MyInternships/>} />
        <Route path="/company/applicants" element={<Applicants/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
