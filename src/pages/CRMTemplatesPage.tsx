import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Edit2, Copy, Trash2 } from "lucide-react";

const TEMPLATES = [
  { id: 1, name: 'Confirmação de Consulta', category: 'Agendamento', message: 'Olá {nome}! 😊 Confirmamos sua consulta com Dr. Renato amanhã ({data}) às {hora}. Se precisar remarcar, entre em contato. Até lá! 💙', uses: 48, status: 'Ativo' },
  { id: 2, name: 'Lembrete 24h', category: 'Agendamento', message: 'Oi {nome}! Lembrete da sua consulta *amanhã às {hora}* na Clínica RM. Endereço: Av. Paulista, 1000. Qualquer dúvida, estamos aqui! 🙏', uses: 62, status: 'Ativo' },
  { id: 3, name: 'Pós-Procedimento', category: 'Pós-Atendimento', message: 'Olá {nome}! Esperamos que você esteja bem após o procedimento de hoje. Lembre-se das orientações: {orientacoes}. Em caso de dúvidas, chame! 💙', uses: 31, status: 'Ativo' },
  { id: 4, name: 'Feliz Aniversário', category: 'Relacionamento', message: '🎉 Feliz aniversário, {nome}! A Clínica RM deseja um dia incrível! Como presente especial, você tem 15% de desconto no próximo procedimento. Use o código: ANIVER15 🎁', uses: 15, status: 'Ativo' },
  { id: 5, name: 'Orçamento Enviado', category: 'CRM', message: 'Olá {nome}! Conforme conversado, segue o orçamento para {procedimento}: *R$ {valor}*. Formas de pagamento: até 12x no cartão ou 5% de desconto no Pix. Aguardo seu retorno! 😊', uses: 24, status: 'Ativo' },
  { id: 6, name: 'Cobrança Amigável', category: 'Financeiro', message: 'Olá {nome}! Identificamos uma parcela em aberto referente a {servico}. Para regularizar, entre em contato ou acesse o link de pagamento: {link}', uses: 9, status: 'Pausado' },
];

const categoryColor: Record<string, string> = {
  'Agendamento': 'bg-blue-100 text-blue-700',
  'Pós-Atendimento': 'bg-green-100 text-green-700',
  'Relacionamento': 'bg-pink-100 text-pink-700',
  'CRM': 'bg-purple-100 text-purple-700',
  'Financeiro': 'bg-yellow-100 text-yellow-700',
};

export default function CRMTemplatesPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates de Mensagem</h1>
          <p className="text-sm text-gray-500 mt-0.5">Modelos prontos para envio via WhatsApp</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEMPLATES.map(t => (
          <Card key={t.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    {t.status === 'Pausado' && <Badge className="bg-gray-100 text-gray-500 border-0 text-[10px]">Pausado</Badge>}
                  </div>
                  <Badge className={`${categoryColor[t.category] ?? 'bg-gray-100 text-gray-600'} border-0 text-[10px]`}>{t.category}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Edit2 className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Copy className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mt-2">
                <p className="text-xs text-gray-600 leading-relaxed">{t.message}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />{t.uses} envios
                </span>
                <Button size="sm" variant="outline" className="text-xs h-7">Usar Template</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
