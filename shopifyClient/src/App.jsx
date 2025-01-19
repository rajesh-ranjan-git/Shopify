import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
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
