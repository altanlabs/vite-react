import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import { useTheme } from "./hooks/use-theme";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Theme appearance={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </div>
  );
};

export default App;
