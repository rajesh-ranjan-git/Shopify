import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import appRouter from "./router/router";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  // Redux store
  <Provider store={store}>
    {/* Router provider */}
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </Provider>
);
