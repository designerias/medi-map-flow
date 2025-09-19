import TopBar from "@/components/layout/TopBar";
import DashboardContent from "@/components/dashboard/Dashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;