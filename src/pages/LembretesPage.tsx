import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Mail, Plus, Send, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColor: Record<string, string> = {
  'Consulta': 'bg-blue-100 text-blue-700',
  'Retorno': 'bg-purple-100 text-purple-700',
  'Financeiro': 'bg-yellow-100 text-yellow-700',
  'Estoque': 'bg-red-100 text-red-700',
  'Aniversário': 'bg-pink-100 text-pink-700',
};

const statusBadge: Record<string, string> = {
  'Ativo': 'bg-green-100 text-green-700',
  'Enviado': 'bg-gray-100 text-gray-600',
  'Cancelado': 'bg-red-100 text-red-600',
};

const channelIcon = (channel: string) => {
  if (channel === 'WhatsApp') return <MessageSquare className="w-3 h-3 text-green-600" />;
  if (channel === 'Email') return <Mail className="w-3 h-3 text-blue-500" />;
  return <Bell className="w-3 h-3 text-gray-500" />;
};

export default function LembretesPage() {
  const { state } = useApp();

  const active = state.reminders.filter(r => r.status === 'Ativo').length;
  const sent = state.reminders.filter(r => r.status === 'Enviado').length;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lembretes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Automações e lembretes para pacientes</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Lembrete
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div><div className="text-xl font-bold">{active}</div><div className="text-xs text-gray-500">Ativos</div></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-gray-500" />
            </div>
            <div><div className="text-xl font-bold">{sent}</div><div className="text-xs text-gray-500">Enviados</div></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div><div className="text-xl font-bold">{state.reminders.filter(r => r.channel === 'WhatsApp').length}</div><div className="text-xs text-gray-500">Via WhatsApp</div></div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders list */}
      <div className="space-y-3">
        {state.reminders.map(reminder => (
          <Card key={reminder.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {channelIcon(reminder.channel)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm text-gray-900">{reminder.title}</p>
                    <Badge className={cn("text-[10px] border-0 h-4", typeColor[reminder.type] ?? 'bg-gray-100 text-gray-600')}>{reminder.type}</Badge>
                    <Badge className={cn("text-[10px] border-0 h-4", statusBadge[reminder.status])}>{reminder.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 italic">"{reminder.message}"</p>
                  <div className="flex gap-4 mt-2 text-[10px] text-gray-400">
                    {reminder.patient && <span>Paciente: <span className="text-gray-600 font-medium">{reminder.patient}</span></span>}
                    <span>Canal: <span className="text-gray-600 font-medium">{reminder.channel}</span></span>
                    <span>Data: <span className="text-gray-600 font-medium">{reminder.date} às {reminder.time}</span></span>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {reminder.status === 'Ativo' && (
                    <Button size="sm" variant="outline" className="text-xs h-7 text-green-700 border-green-200 hover:bg-green-50">
                      <Send className="w-3 h-3 mr-1" />Enviar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
