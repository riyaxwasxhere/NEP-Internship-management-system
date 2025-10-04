import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/company/dashboard" element={<CompanyDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
