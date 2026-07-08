import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import {getDashboardStats}  from "../../services/dashboardServices";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <DashboardCards stats={stats} />
    </DashboardLayout>
  );
};

export default Dashboard;