import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Plus, Clock, Trash2 } from "lucide-react";

export default function BloqueiosPage() {
  const { state } = useApp();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bloqueios de Agenda</h1>
          <p className="text-sm text-gray-500 mt-0.5">Períodos bloqueados na agenda dos profissionais</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Bloqueio
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{state.blocks.length}</div>
              <div className="text-xs text-gray-500">Bloqueios ativos</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{state.blocks.filter(b => b.recurring).length}</div>
              <div className="text-xs text-gray-500">Recorrentes</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {state.blocks.map(block => (
          <Card key={block.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-red-400 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{block.reason}</p>
                    {block.recurring && <Badge className="bg-purple-100 text-purple-700 border-0 text-[10px]">Recorrente</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">{block.professional}</p>
                  <div className="flex gap-3 mt-1 text-[10px] text-gray-400">
                    <span>Data: <span className="text-gray-600 font-medium">{block.date}</span></span>
                    <span>Horário: <span className="text-gray-600 font-medium">{block.startTime} – {block.endTime}</span></span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
