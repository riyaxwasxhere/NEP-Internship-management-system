import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/student/Dashboard";
import FacultySidebar from "./pages/faculty/FacultySidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
         <Route path="/faculty/*" element={<FacultySidebar />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
