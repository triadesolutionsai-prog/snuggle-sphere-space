import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock3,
  XCircle,
  Video,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 08:00 to 18:00

export default function AgendaPage() {
  const { state } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 6 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="p-6 space-y-6 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Agenda</h1>
          <div className="flex items-center bg-white rounded-lg border shadow-sm p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="px-4 font-semibold text-sm capitalize">
              {format(weekStart, "MMMM yyyy", { locale: ptBR })}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Hoje</Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-lg mr-2">
            <Button variant="ghost" size="sm" className="bg-white shadow-sm text-xs px-3">Semana</Button>
            <Button variant="ghost" size="sm" className="text-xs px-3">Dia</Button>
          </div>
          <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      <Card className="flex-1 border-none shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-[80px_1fr] border-b bg-gray-50/50">
          <div className="p-4 flex items-center justify-center">
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-6 divide-x">
            {weekDays.map(day => (
              <div key={day.toISOString()} className={cn(
                "p-3 text-center space-y-1",
                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && "bg-[#D4AF37]/5"
              )}>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {format(day, 'EEE', { locale: ptBR })}
                </p>
                <p className={cn(
                  "text-lg font-bold",
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? "text-[#D4AF37]" : "text-[#001F3F]"
                )}>
                  {format(day, 'dd')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[80px_1fr] min-h-full">
            <div className="bg-gray-50/30 divide-y">
              {HOURS.map(hour => (
                <div key={hour} className="h-24 p-2 text-right">
                  <span className="text-xs font-medium text-gray-400">{hour}:00</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-6 divide-x relative">
              {/* Hour grid lines */}
              <div className="absolute inset-0 pointer-events-none">
                {HOURS.map(hour => (
                  <div key={hour} className="h-24 border-b border-gray-100" />
                ))}
              </div>

              {/* Day Columns */}
              {weekDays.map(day => {
                const dayStr = format(day, 'yyyy-MM-dd');
                const dayAppointments = state.appointments.filter(a => a.date === dayStr);

                return (
                  <div key={day.toISOString()} className="relative h-full">
                    {dayAppointments.map(app => {
                      const hour = parseInt(app.startTime.split(':')[0]);
                      const top = (hour - 8) * 96; // 96px per hour
                      const patient = state.patients.find(p => p.id === app.patientId);
                      
                      return (
                        <div 
                          key={app.id}
                          className={cn(
                            "absolute left-1 right-1 rounded-lg border p-2 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#D4AF37] transition-all overflow-hidden",
                            app.status === 'Confirmado' ? "bg-green-50 border-green-100 text-green-900" :
                            app.status === 'Pendente' ? "bg-yellow-50 border-yellow-100 text-yellow-900" :
                            "bg-blue-50 border-blue-100 text-blue-900"
                          )}
                          style={{ top: `${top + 4}px`, height: '88px' }}
                        >
                          <div className="flex justify-between items-start">
                             <div className="space-y-0.5">
                               <p className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">{app.startTime} - {app.endTime}</p>
                               <p className="text-xs font-bold truncate">{patient?.name}</p>
                             </div>
                             {app.status === 'Confirmado' ? <CheckCircle2 className="w-3 h-3" /> : <Clock3 className="w-3 h-3" />}
                          </div>
                          <p className="text-[10px] mt-1 opacity-70 truncate">{app.type}</p>
                          <div className="flex gap-1 mt-2">
                             <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-white/50">
                               <Phone className="w-2.5 h-2.5" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-white/50">
                               <Video className="w-2.5 h-2.5" />
                             </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
