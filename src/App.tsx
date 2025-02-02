import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import RootBoundary from "./components/errors/RootBoundary";

import Layout from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import { useTheme } from "./theme/use-theme";

const App = () => {
  const { theme } = useTheme();

  const router = createBrowserRouter([
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
  ]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Theme appearance={theme === "system" ? "light" : theme}>
        <div className={theme}>
          <RouterProvider router={router} />
        </div>
      </Theme>
    </ThemeProvider>
  );
};

export default App;
