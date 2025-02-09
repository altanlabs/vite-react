import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import { useTheme } from "./theme/use-theme";
import { router } from "./routes";

const App = () => {
  const { theme } = useTheme();
  
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
