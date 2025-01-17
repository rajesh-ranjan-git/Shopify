import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routers";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter}>
    <Provider store={store}>
      <App />
    </Provider>
  </RouterProvider>
);
