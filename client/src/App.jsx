import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/leads/Leads";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;