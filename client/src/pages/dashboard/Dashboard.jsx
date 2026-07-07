import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";

const Dashboard = () => {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <DashboardCards />

    </DashboardLayout>
  );
};

export default Dashboard;