import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Chatbot from "@/components/Chatbot";

interface PortalLayoutProps {
  children: React.ReactNode;
  role?: any;
}

export default function PortalLayout({
  children,
  role = "",
}: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        role="citizen"
        open={sidebarOpen}
        onClose={() => {
          if (typeof window !== "undefined" && window.innerWidth < 1024)
            setSidebarOpen(false);
        }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
      {/* <Chatbot role="citizen" /> */}
    </div>
  );
}
