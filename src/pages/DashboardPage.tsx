import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  CalendarClock, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  PlusCircle,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KPICard = ({ title, value, icon: Icon, trend }: any) => (
  <Card className="border-none shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <Icon className="w-4 h-4 text-[#D4AF37]" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <p className="text-xs text-green-500 flex items-center mt-1">{trend}</p>}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Row 1 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Atendimentos Hoje" value="0" icon={CalendarClock} />
        <KPICard title="Faturamento do Dia" value="R$ 0,00" icon={DollarSign} />
        <KPICard title="Horários Vagos Hoje" value="0" icon={Clock} />
        <KPICard title="Taxa de Conversão" value="0%" icon={TrendingUp} />
      </div>

      {/* Row 2 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Ticket Médio" value="R$ 0,00" icon={DollarSign} />
        <KPICard title="Receita Total do Mês" value="R$ 0,00" icon={TrendingUp} />
        <KPICard title="Taxa de Faltas" value="0%" icon={AlertCircle} />
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Top Origens</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4 text-gray-400 text-xs italic">
            Sem dados disponíveis
          </CardContent>
        </Card>
      </div>

      {/* Grid of Visualization Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Próximos Agendamentos</CardTitle>
            <Button size="sm" variant="outline" className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <CalendarClock className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">Nenhum agendamento para hoje</p>
              <p className="text-sm text-gray-500">Organize sua agenda e comece os atendimentos.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Funil CRM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Leads", count: 0, color: "bg-blue-500" },
              { label: "Consulta Agendada", count: 0, color: "bg-orange-500" },
              { label: "Orçamento Enviado", count: 0, color: "bg-purple-500" },
              { label: "Fechado", count: 0, color: "bg-green-500" },
            ].map((step) => (
              <div key={step.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{step.label}</span>
                  <span className="font-bold">{step.count}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={cn("h-full", step.color)} style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* WhatsApp Empty State */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Mensagens WhatsApp Não Respondidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <MessageCircle className="w-8 h-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-500 italic">Tudo em dia! Nenhuma conversa pendente.</p>
        </CardContent>
      </Card>
    </div>
  );
}
