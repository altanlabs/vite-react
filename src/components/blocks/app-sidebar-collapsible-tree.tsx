import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  items?: SidebarItem[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  items?: SidebarItem[];
  defaultOpen?: boolean;
  companyName?: string;
  logo?: React.ReactNode;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

export function AppSidebar({ 
  items = [], 
  defaultOpen = true, 
  companyName,
  logo,
  headerComponent,
  footerComponent,
  ...props 
}: AppSidebarProps) {
  const location = useLocation();
  return (
    <Sidebar className="w-64 border-r" {...props}>
      {/* Company Header - always show if companyName exists */}
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          {logo}
          {companyName && (
            <>
              <span className="font-semibold text-foreground">{companyName}</span>
              <Link to="/" className="ml-auto">
                <Home className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Link>
            </>
          )}
        </div>
      </SidebarHeader>

      {/* Custom Header Component */}
      {headerComponent}

      {/* Main Menu */}
      <SidebarContent className="flex-1 px-3 py-2">
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              {item.items ? (
                <Collapsible defaultOpen={defaultOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full px-3 py-2">
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem, subIndex) => (
                        <Link key={subIndex} to={subItem.href}>
                          <SidebarMenuButton
                            className={`w-full px-3 py-2 ${
                              location.pathname === subItem.href
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            {subItem.icon && (
                              <span className="mr-2">{subItem.icon}</span>
                            )}
                            {subItem.label}
                          </SidebarMenuButton>
                        </Link>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link to={item.href}>
                  <SidebarMenuButton
                    className={`w-full px-3 py-2 ${
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer Component */}
      {footerComponent && (
        <SidebarFooter className="border-t p-4">
          {footerComponent}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
