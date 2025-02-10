import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import RootBoundary from "./components/errors/RootBoundary";

const routes = [
  {
    path: "/",
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
