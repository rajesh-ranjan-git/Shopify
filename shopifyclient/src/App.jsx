import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* Common Components */}
        <Outlet />
      </div>
    </>
  );
}

export default App;
