import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/student/Dashboard";
import FacultySidebar from "./pages/faculty/FacultySidebar";
import CompanySidebar from "./pages/company/CompanySidebar";
import LoginPortal from "./LoginPortal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/faculty/*" element={<FacultySidebar />} />
          <Route path="/company/*" element={<CompanySidebar />} />
          <Route path="/login" element={<LoginPortal />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
