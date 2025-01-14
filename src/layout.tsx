import { Outlet, Link, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/blocks/app-sidebar-collapsible-tree";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/theme/use-theme";
import { useEffect, useRef } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface HeaderProps {
  title?: string;
  navigation?: NavItem[];
  actions?: HeaderAction[];
  showNotifications?: boolean;
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  userMenuItems?: HeaderAction[];
  avatarSrc?: string;
  avatarFallback?: string;
}

interface FooterProps {
  text?: string;
  links?: Array<{ label: string; href: string }>;
}

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  items?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  defaultOpen?: boolean;
  companyName?: string;
  logo?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

interface LayoutProps {
  showSidebar?: boolean;
  sidebarConfig?: SidebarProps;
  header?: HeaderProps | false;
  footer?: FooterProps | false;
}

const DefaultNavigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
];

const DefaultHeader: HeaderProps = {
  title: "Dashboard",
  navigation: DefaultNavigation,
  showNotifications: true,
  showUserMenu: true,
  showThemeToggle: true,
  userMenuItems: [
    { icon: <Settings className="mr-2 h-4 w-4" />, label: "Settings" },
    { icon: <LogOut className="mr-2 h-4 w-4" />, label: "Logout" },
  ],
  avatarFallback: "JD",
};

const DefaultFooter: FooterProps = {
  text: "© 2024 Your Company. All rights reserved.",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Layout({
  showSidebar = true,
  sidebarConfig,
  header = DefaultHeader,
  footer = DefaultFooter,
}: LayoutProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const initialThemeSet = useRef(false);

  // Move theme parameter handling to useEffect
  useEffect(() => {
    if (initialThemeSet.current) return;
    
    const queryParams = new URLSearchParams(location.search);
    const themeParam = queryParams.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setTheme(themeParam);
      // Remove the theme parameter from URL
      queryParams.delete('theme');
      const newSearch = queryParams.toString();
      const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}${location.hash}`;
      window.history.replaceState({}, '', newUrl);
      initialThemeSet.current = true;
    }
  }, [location.hash, location.pathname, location.search, setTheme]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Optional Sidebar */}
      {showSidebar && (
        <AppSidebar 
          className="h-full border-r border-border" 
          items={sidebarConfig?.items} 
          defaultOpen={sidebarConfig?.defaultOpen}
          companyName={sidebarConfig?.companyName}
          logo={sidebarConfig?.logo}
          footerComponent={sidebarConfig?.footerComponent}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Configurable Header */}
        {header && (
          <header className="flex h-16 items-center justify-between border-b border-border px-6 bg-background">
            <div className="flex items-center gap-8">
              {header.title && (
                <h1 className="text-lg font-semibold text-foreground">{header.title}</h1>
              )}

              {/* Navigation Links */}
              {header.navigation && (
                <nav className="flex items-center gap-6">
                  {header.navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className={`text-sm transition-colors hover:text-primary ${
                        location.pathname === item.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              {header.showThemeToggle && (
                <Toggle
                  pressed={theme === "dark"}
                  onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`px-2 py-2 rounded-md flex items-center gap-2 transition-colors
                    ${
                      theme === "dark"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </Toggle>
              )}

              {/* Custom Actions */}
              {header.actions?.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={action.onClick}
                >
                  {action.icon}
                </Button>
              ))}

              {/* Notifications */}
              {header.showNotifications && (
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              )}

              {/* User Menu */}
              {header.showUserMenu && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full">
                      <Avatar>
                        <AvatarImage src={header.avatarSrc} alt="User" />
                        <AvatarFallback>{header.avatarFallback}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {header.userMenuItems?.map((item, index) => (
                      <DropdownMenuItem key={index} onClick={item.onClick}>
                        {item.icon}
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </main>

        {/* Footer */}
        {footer && (
          <footer className="border-t border-border px-6 py-4 bg-background">
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                {footer.text}
              </span>
              {footer.links?.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
