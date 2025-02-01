import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import checkAuthService from "@/services/auth/checkAuthService";

function App() {
  const dispatch = useDispatch();

  // Check for auth validation on page load
  useEffect(() => {
    dispatch(checkAuthService());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* Common Components */}
        <Outlet />
        <Toaster />
      </div>
    </>
  );
}

export default App;
