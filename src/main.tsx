import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./features/About/About.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import Home from "./features/Home/Home.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const Movies = lazy(() => import("./features/Movies/Movies.tsx"));

function AppEntryPoint() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntryPoint />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

