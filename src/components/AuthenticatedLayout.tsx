import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { state } = useApp();

  return (
    <div className={cn("min-h-screen flex", state.theme === 'dark' ? 'dark' : '')}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
