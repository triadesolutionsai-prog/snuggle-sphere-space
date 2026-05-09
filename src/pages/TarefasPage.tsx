import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Circle, Clock, AlertCircle, CheckCircle2, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function TarefasPage() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<'todas' | 'Pendente' | 'Em Andamento' | 'Concluída'>('todas');

  const today = format(new Date(), 'yyyy-MM-dd');

  const filteredTasks = state.tasks.filter(t => filter === 'todas' || t.status === filter);

  const countByStatus = (s: string) => state.tasks.filter(t => t.status === s).length;

  const markDone = (id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (task) dispatch({ type: 'UPDATE_TASK', payload: { ...task, status: 'Concluída' } });
  };

  const priorityColor = (p: string) => p === 'Alta' ? 'bg-red-100 text-red-700' : p === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';
  const statusIcon = (s: string) => s === 'Concluída' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : s === 'Em Andamento' ? <Clock className="w-4 h-4 text-blue-500" /> : <Circle className="w-4 h-4 text-gray-400" />;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tarefas</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gerencie e acompanhe as tarefas da clínica</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Nova Tarefa
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pendentes', value: countByStatus('Pendente'), color: 'bg-yellow-50 text-yellow-700', icon: AlertCircle },
          { label: 'Em Andamento', value: countByStatus('Em Andamento'), color: 'bg-blue-50 text-blue-700', icon: Clock },
          { label: 'Concluídas', value: countByStatus('Concluída'), color: 'bg-green-50 text-green-700', icon: CheckCircle2 },
        ].map(item => (
          <Card key={item.label} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.color.split(' ')[0])}>
                  <item.icon className={cn("w-5 h-5", item.color.split(' ')[1])} />
                </div>
                <div>
                  <div className="text-xl font-bold">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['todas', 'Pendente', 'Em Andamento', 'Concluída'] as const).map(f => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm"
            className={cn("text-xs h-8", filter === f && "bg-navy text-white")}
            onClick={() => setFilter(f)}
          >
            {f === 'todas' ? 'Todas' : f}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <Card key={task.id} className={cn("bg-white border-0 shadow-sm hover:shadow-md transition-shadow", task.status === 'Concluída' && "opacity-60")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <button onClick={() => task.status !== 'Concluída' && markDone(task.id)} className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform">
                  {statusIcon(task.status)}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={cn("font-semibold text-sm text-gray-900", task.status === 'Concluída' && "line-through text-gray-500")}>
                      {task.title}
                    </p>
                    <Badge className={cn("text-[10px] border-0 h-4", priorityColor(task.priority))}>{task.priority}</Badge>
                    <Badge variant="outline" className="text-[10px] h-4">{task.category}</Badge>
                  </div>
                  {task.description && <p className="text-xs text-gray-500 mt-1">{task.description}</p>}
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                    <span>Responsável: {task.assignee}</span>
                    <span className={cn(task.dueDate < today && task.status !== 'Concluída' && "text-red-500 font-semibold")}>
                      Prazo: {task.dueDate === today ? 'Hoje' : task.dueDate < today ? `Vencida (${task.dueDate})` : task.dueDate}
                    </span>
                  </div>
                </div>
                {task.status !== 'Concluída' && (
                  <Button size="sm" variant="outline" className="text-xs h-7 flex-shrink-0" onClick={() => markDone(task.id)}>
                    Concluir
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
