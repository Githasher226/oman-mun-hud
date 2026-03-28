import { BookOpen, Flag, Globe, Scroll, Search, FileText, Gavel, Bot } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Procedures", url: "/", icon: Gavel },
  { title: "Topics", url: "/topics", icon: BookOpen },
  { title: "Countries", url: "/countries", icon: Globe },
  { title: "Oman Strategy", url: "/strategy", icon: Flag },
  { title: "Research", url: "/research", icon: Search },
  { title: "Resolution Builder", url: "/resolution", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Scroll className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-primary text-sm tracking-wide uppercase">
                MUN HUD
              </span>
            </div>
          )}
          {collapsed && <Scroll className="h-5 w-5 text-primary mx-auto" />}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs tracking-widest uppercase">
            Panels
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <p className="font-mono">DELEGATE: OMAN</p>
              <p className="mt-1">GA 2nd & 3rd Committee</p>
              <p>CCH MUN 2026</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
