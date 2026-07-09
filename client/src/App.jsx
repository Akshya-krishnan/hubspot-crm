import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/leads/Leads";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LeadDetails from "./pages/leads/LeadDetails";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetails />}/>
      </Routes>
    </BrowserRouter>
    <Toaster position="top-right" />
    </>
  );
}

export default App;