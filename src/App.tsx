import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BarChart2, 
  User, 
  Settings,
  CreditCard,
  Users
} from "lucide-react";

import { Layout } from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { useTheme } from "./theme/use-theme";

const appName = "My app";

// Define sidebar configuration
const dashboardSidebar = {
  items: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      label: "Account",
      href: "/dashboard/account",
      icon: <User className="h-4 w-4" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
      items: [
        {
          label: "Billing",
          href: "/dashboard/settings/billing",
          icon: <CreditCard className="h-4 w-4" />,
        },
        {
          label: "Team",
          href: "/dashboard/settings/team",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
  ],
  defaultOpen: true,
  companyName: appName,
  logo: null,
  footerComponent: null,
};


const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Theme appearance={theme === "system" ? "light" : theme}>
        <div className={theme}>
          <SidebarProvider>
            <BrowserRouter>
              <Routes>
                {/* Marketing pages with header navigation */}
                <Route
                  path="/"
                  element={
                    <Layout
                      showSidebar={false}
                      header={{
                        title: appName,
                        navigation: [
                          { label: "Home", href: "/" },
                          { label: "About", href: "/about" },
                          { label: "Contact", href: "/contact" },
                          { label: "Pricing", href: "/pricing" },
                        ],
                        showNotifications: false,
                        showUserMenu: false,
                        showThemeToggle: true,
                      }}
                    />
                  }
                >
                  <Route index element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Dashboard pages with sidebar configuration */}
                <Route
                  path="/dashboard"
                  element={
                    <Layout
                      showSidebar={true}
                      sidebarConfig={dashboardSidebar}
                      header={false}
                      footer={false}
                    />
                  }
                >
                  <Route index element={<DashboardPage />} />
                  {/* Add other dashboard routes as needed */}
                </Route>
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </div>
      </Theme>
    </ThemeProvider>
  );
};

export default App;
