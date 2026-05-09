import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const sourceData = [
  { name: 'Instagram', value: 38 },
  { name: 'Indicação', value: 28 },
  { name: 'Google', value: 18 },
  { name: 'TikTok', value: 10 },
  { name: 'Facebook', value: 6 },
];

const monthlyLeads = [
  { name: 'Jan', leads: 12, fechados: 5 },
  { name: 'Fev', leads: 18, fechados: 8 },
  { name: 'Mar', leads: 15, fechados: 7 },
  { name: 'Abr', leads: 22, fechados: 11 },
  { name: 'Mai', leads: 20, fechados: 9 },
];

const COLORS = ['#001F3F', '#D4AF37', '#3B82F6', '#10B981', '#F59E0B'];

export default function CRMMetricasPage() {
  const { state } = useApp();

  const totalLeads = state.leads.length;
  const closed = state.leads.filter(l => l.status === 'Fechado').length;
  const lost = state.leads.filter(l => l.status === 'Perdido').length;
  const totalValue = state.leads.filter(l => l.status === 'Fechado').reduce((a, c) => a + c.value, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Métricas do CRM</h1>
        <p className="text-sm text-gray-500 mt-0.5">Análise de performance comercial e conversão</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Leads', value: totalLeads, sub: 'no período' },
          { label: 'Leads Fechados', value: closed, sub: `${totalLeads > 0 ? ((closed / totalLeads) * 100).toFixed(0) : 0}% de conversão` },
          { label: 'Leads Perdidos', value: lost, sub: 'sem retorno' },
          { label: 'Receita Gerada', value: `R$ ${totalValue.toLocaleString('pt-BR')}`, sub: 'leads fechados' },
        ].map(k => (
          <Card key={k.label} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs font-medium text-gray-700 mt-0.5">{k.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">Leads x Fechamentos por Mês</CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyLeads} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} />
                <Bar dataKey="leads" name="Leads" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="fechados" name="Fechados" fill="#001F3F" radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-sm font-semibold">Origem dos Leads</CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={sourceData} innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {sourceData.map((s, i) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-gray-600 flex-1">{s.name}</span>
                  <span className="text-xs font-bold text-gray-900">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funil */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="px-5 pt-5 pb-3">
          <CardTitle className="text-sm font-semibold">Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-3">
          {[
            { label: 'Leads Recebidos', count: totalLeads, color: 'bg-blue-500', pct: 100 },
            { label: 'Consultas Agendadas', count: state.leads.filter(l => l.status === 'Consulta Agendada').length, color: 'bg-purple-500', pct: Math.round((state.leads.filter(l => l.status === 'Consulta Agendada').length / totalLeads) * 100) || 0 },
            { label: 'Orçamentos Enviados', count: state.leads.filter(l => l.status === 'Orçamento Enviado').length, color: 'bg-yellow-500', pct: Math.round((state.leads.filter(l => l.status === 'Orçamento Enviado').length / totalLeads) * 100) || 0 },
            { label: 'Clientes Fechados', count: closed, color: 'bg-green-500', pct: Math.round((closed / totalLeads) * 100) || 0 },
          ].map(step => (
            <div key={step.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-medium">{step.label}</span>
                <span className="font-bold text-gray-900">{step.count} ({step.pct}%)</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${step.color} rounded-full transition-all`} style={{ width: `${Math.max(step.pct, 3)}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
