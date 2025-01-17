import { Outlet } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout";

function App() {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* Common Components */}
        <h1>Header Component</h1>
        <Outlet />
      </div>
    </>
  );
}

export default App;
