import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import checkAuthService from "./services/auth/checkAuthService";

function App() {
  const dispatch = useDispatch();

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
