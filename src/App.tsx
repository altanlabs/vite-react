import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import { Layout } from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import { useTheme } from "./theme/use-theme";


// CHANGE THIS NAME

const App = () => {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Theme appearance={theme === "system" ? "light" : theme}>
          <div className={theme}>
            <SidebarProvider>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={<Layout showSidebar={false} showHeader={false} showFooter={false} />}
                  >
                    <Route index element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SidebarProvider>
          </div>
        </Theme>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
