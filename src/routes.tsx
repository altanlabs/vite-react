import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import RootBoundary from "./components/errors/RootBoundary";

const routes = [
  {
    path: "/",
    element: (
      <Layout showSidebar={false} showHeader={false} showFooter={false} />
    ),
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
