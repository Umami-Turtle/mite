import * as React from "react";
import { BookOpen, Settings2, Link, Boxes, Download } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Hopeful",
    email: "hopeful@email.com",
  },
  navMain: [
    {
      title: "Media",
      url: "/media/",
      icon: Link,
      isActive: true,
      items: [
        {
          title: "Copy-Arena",
          url: "/media/copy-arena",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs/",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs/intro",
        },
        {
          title: "Get Started",
          url: "/docs/get-started",
        },
        {
          title: "Tutorials",
          url: "/docs/tutorials",
        },
        {
          title: "Changelog",
          url: "/docs/change-logs",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings/",
      icon: Settings2,
    },
    {
      title: "Extensions",
      url: "/extensions/",
      icon: Boxes,
      items: [
        {
          title: "Installed",
          url: "/extensions/installed",
          icon: Download,
        },
        {
          title: "Browse",
          url: "/extensions/browse",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
