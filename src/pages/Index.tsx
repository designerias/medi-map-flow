import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in, if yes redirect to dashboard
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      // This is the login page now, so no redirect needed
    }
  }, [navigate]);
  
  // Import and render Login component directly here since / is now the login route
  return <div>Redirecting...</div>;
};

export default Index;
