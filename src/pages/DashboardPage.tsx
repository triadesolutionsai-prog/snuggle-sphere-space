import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, CalendarClock, TrendingUp, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const revenueData = [
  { name: 'Jan', receita: 28000, despesa: 18000 },
  { name: 'Fev', receita: 32000, despesa: 19500 },
  { name: 'Mar', receita: 27000, despesa: 17000 },
  { name: 'Abr', receita: 38000, despesa: 21000 },
  { name: 'Mai', receita: 43000, despesa: 22000 },
  { name: 'Jun', receita: 41000, despesa: 23500 },
];

const weekData = [
  { name: 'Seg', value: 4200 },
  { name: 'Ter', value: 6800 },
  { name: 'Qua', value: 5100 },
  { name: 'Qui', value: 7400 },
  { name: 'Sex', value: 8200 },
  { name: 'Sab', value: 3100 },
];

export default function DashboardPage() {
  const { state } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');

  const appointmentsToday = state.appointments.filter(a => a.date === today);
  const confirmed = appointmentsToday.filter(a => a.status === 'Confirmado').length;
  const pending = appointmentsToday.filter(a => a.status === 'Pendente').length;

  const totalReceita = state.transactions.filter(t => t.type === 'Receita' && t.status === 'Pago').reduce((a, c) => a + c.amount, 0);
  const totalDespesa = state.transactions.filter(t => t.type === 'Despesa' && t.status === 'Pago').reduce((a, c) => a + c.amount, 0);

  const totalLeads = state.leads.length;
  const closedLeads = state.leads.filter(l => l.status === 'Fechado').length;
  const convRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(0) : 0;

  const criticalStock = state.products.filter(p => p.quantity <= p.minQuantity);
  const pendingTasks = state.tasks.filter(t => t.status === 'Pendente');
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'Alta');

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Bem-vindo, {state.user?.name} · {format(new Date(), "EEEE, dd 'de' MMMM")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">Exportar Relatório</Button>
          <Button size="sm" className="bg-navy hover:bg-navy/90 text-white text-xs">+ Novo Agendamento</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <CalendarClock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />12%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{appointmentsToday.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Consultas hoje</div>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-medium">{confirmed} confirmadas</span>
              <span className="text-[10px] bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">{pending} pendentes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />8%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">R$ {totalReceita.toLocaleString('pt-BR')}</div>
            <div className="text-xs text-gray-500 mt-0.5">Faturamento total</div>
            <div className="text-[10px] text-red-500 mt-2 font-medium">Despesas: R$ {totalDespesa.toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{convRate}%</div>
            <div className="text-xs text-gray-500 mt-0.5">Taxa de conversão</div>
            <div className="text-[10px] text-gray-400 mt-2">{closedLeads} fechados de {totalLeads} leads</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs text-red-500 font-semibold flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3" />3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{state.patients.filter(p => p.status === 'Ativo').length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Pacientes ativos</div>
            <div className="text-[10px] text-gray-400 mt-2">{state.patients.length} cadastrados no total</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm lg:col-span-2">
          <CardHeader className="pb-0 px-5 pt-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-800">Faturamento x Despesas (2025)</CardTitle>
              <div className="flex gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-navy inline-block" />Receita</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Despesa</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[220px] px-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="gNav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#001F3F" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#001F3F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `R$${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} formatter={(v: any) => `R$ ${v.toLocaleString('pt-BR')}`} />
                <Area type="monotone" dataKey="receita" stroke="#001F3F" strokeWidth={2} fill="url(#gNav)" />
                <Area type="monotone" dataKey="despesa" stroke="#f87171" strokeWidth={2} fill="url(#gRed)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="pb-0 px-5 pt-5">
            <CardTitle className="text-sm font-semibold text-gray-800">Receita por Dia (Semana)</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] px-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} formatter={(v: any) => `R$ ${v.toLocaleString('pt-BR')}`} />
                <Bar dataKey="value" fill="#D4AF37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's appointments */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-800">Agenda de Hoje</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-gold h-7 px-2">Ver tudo</Button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-2">
            {appointmentsToday.slice(0, 5).map(app => {
              const patient = state.patients.find(p => p.id === app.patientId);
              return (
                <div key={app.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {patient?.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{patient?.name}</p>
                    <p className="text-[10px] text-gray-400">{app.startTime} · {app.type}</p>
                  </div>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                    app.status === 'Confirmado' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  )}>{app.status}</span>
                </div>
              );
            })}
            {appointmentsToday.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-xs">Nenhum agendamento hoje</div>
            )}
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-800">Tarefas Prioritárias</CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-red-100 text-red-700 h-5">{highPriorityTasks.length} urgentes</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-2">
            {pendingTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0",
                  task.priority === 'Alta' ? "bg-red-500" : task.priority === 'Média' ? "bg-yellow-500" : "bg-green-500"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-[10px] text-gray-400">{task.category} · {task.dueDate === format(new Date(), 'yyyy-MM-dd') ? 'Hoje' : task.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stock Alerts + CRM */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-800">Alertas do Sistema</CardTitle>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-2">
            {criticalStock.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-2.5 bg-red-50 rounded-xl border border-red-100">
                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-red-900 truncate">{p.name}</p>
                  <p className="text-[10px] text-red-600">{p.quantity} un. restantes (mín: {p.minQuantity})</p>
                </div>
              </div>
            ))}
            {state.leads.filter(l => l.status === 'Lead').slice(0, 2).map(lead => (
              <div key={lead.id} className="flex items-center gap-3 p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-blue-900 truncate">Lead: {lead.name}</p>
                  <p className="text-[10px] text-blue-600">Aguardando contato · {lead.procedure}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
