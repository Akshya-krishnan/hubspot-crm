import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F7F8FC]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout; 