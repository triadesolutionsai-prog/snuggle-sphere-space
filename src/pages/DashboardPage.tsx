import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  CalendarClock, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  PlusCircle,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { format } from "date-fns";

const KPICard = ({ title, value, icon: Icon, trend, trendValue, isPositive }: any) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <div className="p-2 bg-[#F8F9FA] rounded-lg">
        <Icon className="w-4 h-4 text-[#D4AF37]" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trendValue && (
        <div className={cn(
          "flex items-center mt-1 text-xs font-medium",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trendValue}
          <span className="text-gray-400 ml-1">vs mês anterior</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { state } = useApp();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const appointmentsToday = state.appointments.filter(a => a.date === today).length;
  const revenueToday = state.transactions
    .filter(t => t.date === today && t.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalRevenue = state.transactions
    .filter(t => t.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const leadsTotal = state.leads.length;
  const leadsClosed = state.leads.filter(l => l.status === 'Fechado').length;
  const conversionRate = leadsTotal > 0 ? ((leadsClosed / leadsTotal) * 100).toFixed(1) : 0;

  // Chart Data
  const revenueData = [
    { name: 'Seg', value: 1200 },
    { name: 'Ter', value: 2100 },
    { name: 'Qua', value: 1800 },
    { name: 'Qui', value: 2400 },
    { name: 'Sex', value: today === format(new Date(), 'yyyy-MM-dd') ? revenueToday : 3200 },
    { name: 'Sab', value: 1500 },
    { name: 'Dom', value: 0 },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Performance</h1>
          <p className="text-sm text-gray-500 text-pretty">Bem-vindo, {state.user?.name}. Aqui estão os KPIs da sua clínica hoje.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Download PDF</Button>
          <Button className="bg-[#001F3F] text-white hover:bg-[#002D5C]" size="sm">Filtrar Período</Button>
        </div>
      </div>

      {/* Row 1 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Atendimentos Hoje" value={appointmentsToday} icon={CalendarClock} trendValue="12%" isPositive={true} />
        <KPICard title="Faturamento do Dia" value={`R$ ${revenueToday.toLocaleString('pt-BR')}`} icon={DollarSign} trendValue="8%" isPositive={true} />
        <KPICard title="Taxa de Conversão" value={`${conversionRate}%`} icon={TrendingUp} trendValue="2%" isPositive={true} />
        <KPICard title="Novos Leads" value={state.leads.length} icon={Users} trendValue="5%" isPositive={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Faturamento Semanal</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                />
                <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Próximos Agendamentos</CardTitle>
            <Button size="sm" variant="ghost" className="text-[#D4AF37] text-xs">Ver Agenda</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {state.appointments.length > 0 ? state.appointments.slice(0, 5).map((app) => {
                const patient = state.patients.find(p => p.id === app.patientId);
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#001F3F]">
                        {patient?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{patient?.name}</p>
                        <p className="text-xs text-gray-500">{app.type} • {app.startTime}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-medium",
                      app.status === 'Confirmado' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    )}>
                      {app.status}
                    </div>
                  </div>
                );
              }) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                  <CalendarClock className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">Sem agendamentos próximos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funil CRM visual */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Leads", count: state.leads.filter(l => l.status === 'Lead').length, color: "bg-blue-500", total: state.leads.length },
              { label: "Consultas", count: state.leads.filter(l => l.status === 'Consulta Agendada').length, color: "bg-orange-500", total: state.leads.length },
              { label: "Orçamentos", count: state.leads.filter(l => l.status === 'Orçamento Enviado').length, color: "bg-purple-500", total: state.leads.length },
              { label: "Fechado", count: state.leads.filter(l => l.status === 'Fechado').length, color: "bg-green-500", total: state.leads.length },
            ].map((step) => {
              const pct = step.total > 0 ? (step.count / step.total) * 100 : 0;
              return (
                <div key={step.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{step.label}</span>
                    <span className="font-bold">{step.count}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={cn("h-full", step.color)} style={{ width: `${Math.max(pct, 5)}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Inventory Warning */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Alertas de Estoque</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent className="space-y-4">
            {state.products.filter(p => p.quantity <= p.minQuantity).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50/50 border border-red-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">{product.name}</p>
                  <p className="text-xs text-red-700">Apenas {product.quantity} unidades restantes</p>
                </div>
                <Button size="xs" variant="link" className="text-red-700 p-0 text-xs font-bold">Repor</Button>
              </div>
            ))}
            {state.products.filter(p => p.quantity <= p.minQuantity).length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm italic">
                Tudo em conformidade no estoque.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tarefas Prioritárias</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-gray-50">
               {[
                 { id: 1, text: "Ligar para lead Ricardo Lima", due: "Hoje 14h", icon: MessageCircle },
                 { id: 2, text: "Revisar relatório financeiro", due: "Amanhã 09h", icon: DollarSign },
                 { id: 3, text: "Reposição de Máscaras Cirúrgicas", due: "Vencido", icon: AlertCircle },
               ].map((task) => (
                 <div key={task.id} className="flex items-center gap-3 p-4 hover:bg-gray-50/50">
                   <div className="p-2 bg-gray-100 rounded">
                     <task.icon className="w-3 h-3 text-gray-600" />
                   </div>
                   <div className="flex-1">
                     <p className="text-sm">{task.text}</p>
                     <p className={cn("text-[10px]", task.due === 'Vencido' ? "text-red-500 font-bold" : "text-gray-400")}>{task.due}</p>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
