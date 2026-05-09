import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { state } = useApp();

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
