import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthAsyncThunk } from "./store/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsyncThunk());
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
