import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_PLANS = [
  { id: 'PL1', patient: 'Ana Silva', procedure: 'Harmonização Facial Completa', sessions: 3, done: 1, value: 8500, status: 'Em Andamento', professional: 'Dr. Renato Marano', startDate: '2025-05-01' },
  { id: 'PL2', patient: 'João Pereira', procedure: 'Botox Terapêutico - 6 meses', sessions: 2, done: 2, value: 5000, status: 'Concluído', professional: 'Dr. Renato Marano', startDate: '2025-04-10' },
  { id: 'PL3', patient: 'Carlos Mendes', procedure: 'Bioestimulador Colágeno', sessions: 4, done: 1, value: 12000, status: 'Em Andamento', professional: 'Dra. Julia Costa', startDate: '2025-05-05' },
  { id: 'PL4', patient: 'Beatriz Almeida', procedure: 'Fio de Sustentação PDO', sessions: 1, done: 0, value: 4500, status: 'Aguardando Início', professional: 'Dr. Renato Marano', startDate: '2025-05-12' },
  { id: 'PL5', patient: 'Juliana Costa', procedure: 'Skinbooster + Preenchimento', sessions: 3, done: 2, value: 6000, status: 'Em Andamento', professional: 'Dra. Julia Costa', startDate: '2025-04-20' },
];

export default function PlanosTratamentoPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planos de Tratamento</h1>
          <p className="text-sm text-gray-500 mt-0.5">Acompanhe os planos terapêuticos dos pacientes</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Plano
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div><div className="text-xl font-bold">{MOCK_PLANS.length}</div><div className="text-xs text-gray-500">Planos cadastrados</div></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div><div className="text-xl font-bold">{MOCK_PLANS.filter(p => p.status === 'Em Andamento').length}</div><div className="text-xs text-gray-500">Em andamento</div></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold">R$ {MOCK_PLANS.reduce((a, c) => a + c.value, 0).toLocaleString('pt-BR')}</div>
              <div className="text-xs text-gray-500">Valor total em planos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {MOCK_PLANS.map(plan => {
          const progress = (plan.done / plan.sessions) * 100;
          return (
            <Card key={plan.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {plan.patient.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-sm text-gray-900">{plan.patient}</p>
                      <Badge className={cn("text-[10px] border-0",
                        plan.status === 'Concluído' ? "bg-green-100 text-green-700" :
                        plan.status === 'Em Andamento' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                      )}>{plan.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{plan.procedure}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{plan.professional} · Início: {plan.startDate}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>{plan.done} de {plan.sessions} sessões</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm text-navy">R$ {plan.value.toLocaleString('pt-BR')}</p>
                    <p className="text-[10px] text-gray-400">valor total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
