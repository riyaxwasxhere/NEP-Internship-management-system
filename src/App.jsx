import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentSidebar from "./pages/student/StudentSidebar";
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
         <Route path="/student/*" element={<StudentSidebar />} />
          <Route path="/faculty/*" element={<FacultySidebar />} />
          <Route path="/company/*" element={<CompanySidebar />} />
          <Route path="/login" element={<LoginPortal />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
