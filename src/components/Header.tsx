import { cn } from "@/lib/utils";
import { Search, Sun, Moon, Bell, Command } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";

export function Header() {
  const { state, dispatch } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <header className="h-16 border-b bg-white dark:bg-slate-950 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-gray-500 hidden md:block">
          {getGreeting()}, <span className="text-gray-900 dark:text-gray-100 font-semibold">{state.user?.name}</span>
        </h2>
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Busca global..." 
            className="pl-9 w-64 bg-gray-50 dark:bg-slate-900 border-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]" 
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-[10px] text-gray-500 pointer-events-none">
            <Command className="w-2 h-2" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className="text-gray-500 hover:text-[#D4AF37]"
        >
          {state.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#D4AF37]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <DropdownMenuLabel className="p-4 border-b">Notificações</DropdownMenuLabel>
            <div className="py-8 text-center text-sm text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p>Nenhuma notificação nova</p>
            </div>
            <DropdownMenuSeparator />
            <Button variant="ghost" className="w-full rounded-none text-xs text-[#D4AF37]">Ver todas</Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
