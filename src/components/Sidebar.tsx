import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Users, 
  FileText, 
  Stethoscope, 
  Package, 
  FileCode, 
  CheckSquare, 
  Bell, 
  DollarSign, 
  Percent, 
  ShieldAlert, 
  Settings,
  ChevronLeft,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
  subItems?: { label: string; href: string }[];
  role: string;
}

const SidebarItem = ({ icon: Icon, label, href, collapsed, subItems, role }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(href);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <Link
        to={subItems ? "#" : href}
        onClick={() => subItems && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5",
          collapsed && "justify-center px-0"
        )}
      >
        <Icon className="w-5 h-5 min-w-[20px]" />
        {!collapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="truncate">{label}</span>
            {subItems && <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />}
          </div>
        )}
      </Link>
      {subItems && !collapsed && isOpen && (
        <div className="pl-9 space-y-1">
          {subItems.map((sub) => (
            <Link
              key={sub.href}
              to={sub.href}
              className={cn(
                "block py-1 text-sm transition-colors",
                location.pathname === sub.href ? "text-gold" : "text-gray-500 hover:text-white"
              )}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const userRole = state.user?.role || "Administrador";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { 
      icon: MessageSquare, 
      label: "CRM & WhatsApp", 
      href: "/crm", 
      roles: ["Administrador", "Assistente", "Recepção", "Financeiro", "Clínico"],
      subItems: [
        { label: "Funil", href: "/crm/funil" },
        { label: "Conversas", href: "/crm/conversas" },
        { label: "Templates", href: "/crm/templates" },
        { label: "Métricas", href: "/crm/metricas" },
      ]
    },
    { icon: Calendar, label: "Agenda", href: "/agenda", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { icon: FileText, label: "Agendamentos", href: "/agendamentos", roles: ["Administrador", "Assistente", "Recepção", "Financeiro"] },
    { icon: Users, label: "Pacientes", href: "/pacientes", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { icon: Stethoscope, label: "Prontuários", href: "/prontuarios", roles: ["Administrador", "Clínico", "Assistente"] },
    { icon: FileText, label: "Planos de Tratamento", href: "/planos-tratamento", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { icon: Package, label: "Estoque", href: "/estoque", roles: ["Administrador", "Clínico", "Assistente", "Financeiro"] },
    { icon: FileCode, label: "CliniDocs", href: "/clinidocs", roles: ["Administrador", "Clínico", "Assistente"] },
    { icon: CheckSquare, label: "Tarefas", href: "/tarefas", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { icon: Bell, label: "Lembretes", href: "/lembretes", roles: ["Administrador", "Clínico", "Assistente", "Recepção", "Financeiro"] },
    { icon: DollarSign, label: "Financeiro", href: "/financeiro", roles: ["Administrador", "Financeiro", "Recepção"] },
    { icon: Percent, label: "Comissionamento", href: "/comissionamento", roles: ["Administrador", "Financeiro", "Clínico"] },
    { icon: ShieldAlert, label: "Bloqueios", href: "/bloqueios", roles: ["Administrador", "Assistente", "Recepção"] },
    { icon: Settings, label: "Configurações", href: "/configuracoes", roles: ["Administrador"] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={cn(
      "bg-navy text-white flex flex-col h-screen transition-all duration-300 relative",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 rounded bg-gold flex items-center justify-center font-serif font-bold text-navy flex-shrink-0">RM</div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-serif font-bold tracking-tight whitespace-nowrap">CLÍNICA RM</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest whitespace-nowrap">Renato Marano</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        {filteredMenu.map((item) => (
          <SidebarItem key={item.href} {...item} collapsed={collapsed} role={userRole} />
        ))}
      </div>

      <div className="p-3 border-t border-white/10 space-y-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={state.user?.avatar} />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{state.user?.name}</p>
              <Badge variant="outline" className="text-[10px] h-4 py-0 text-gray-400 border-white/20">
                {state.user?.role}
              </Badge>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("w-full justify-start text-gray-400 hover:text-white hover:bg-white/5", collapsed && "justify-center p-0")}
          onClick={() => {
            dispatch({ type: 'SET_USER', payload: null });
            navigate('/auth');
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gold text-navy hover:bg-gold/90 hidden md:flex items-center justify-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
      </Button>
    </aside>
  );
}
