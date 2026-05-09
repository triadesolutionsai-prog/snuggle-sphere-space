import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, Send, Phone, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const CONVERSATIONS = [
  { id: 1, name: 'Ana Silva', last: 'Oi! Posso confirmar meu horário para amanhã?', time: '14:32', unread: 2, status: 'online', phone: '(11) 98765-4321' },
  { id: 2, name: 'João Pereira', last: 'Muito obrigado! O procedimento ficou ótimo 😊', time: '11:15', unread: 0, status: 'offline', phone: '(11) 97654-3210' },
  { id: 3, name: 'Maria Santos', last: 'Qual o valor para harmonização facial?', time: 'Ontem', unread: 1, status: 'offline', phone: '(11) 96543-2109' },
  { id: 4, name: 'Ricardo Lima', last: 'Estou com um pouco de inchaço, é normal?', time: 'Ontem', unread: 3, status: 'offline', phone: '(11) 95432-1098' },
  { id: 5, name: 'Fernanda Oliveira', last: 'Perfeito! Até sexta então 🙏', time: 'Seg', unread: 0, status: 'online', phone: '(11) 94321-0987' },
  { id: 6, name: 'Carlos Mendes', last: 'Você tem horário essa semana?', time: 'Dom', unread: 1, status: 'offline', phone: '(11) 93210-9876' },
];

const MESSAGES: Record<number, { from: 'me' | 'them'; text: string; time: string }[]> = {
  1: [
    { from: 'them', text: 'Olá! Boa tarde 😊', time: '14:28' },
    { from: 'them', text: 'Oi! Posso confirmar meu horário para amanhã?', time: '14:32' },
    { from: 'me', text: 'Olá Ana! Claro, está confirmado para amanhã às 09h com Dr. Renato 🎉', time: '14:33' },
    { from: 'them', text: 'Perfeito! Muito obrigada 💙', time: '14:34' },
  ],
};

export default function CRMConversasPage() {
  const [selected, setSelected] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filtered = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const selectedConv = CONVERSATIONS.find(c => c.id === selected);
  const msgs = selected ? (MESSAGES[selected] ?? []) : [];

  return (
    <div className="flex h-full bg-gray-50/50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold text-gray-900 mb-3">Conversas</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Buscar conversa..." className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(conv => (
            <button key={conv.id} onClick={() => setSelected(conv.id)}
              className={cn("w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50", selected === conv.id && "bg-blue-50/50")}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                  {conv.name.charAt(0)}
                </div>
                {conv.status === 'online' && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-900 truncate">{conv.name}</p>
                  <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{conv.last}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-green-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b px-5 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
              {selectedConv.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">{selectedConv.name}</p>
              <p className="text-[10px] text-gray-500">{selectedConv.phone}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <Phone className="w-3 h-3 mr-1" />Ligar
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {msgs.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-12">Nenhuma mensagem ainda. Inicie a conversa!</div>
            )}
            {msgs.map((msg, i) => (
              <div key={i} className={cn("flex", msg.from === 'me' ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-xs px-3 py-2 rounded-2xl text-sm",
                  msg.from === 'me' ? "bg-navy text-white rounded-br-sm" : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                )}>
                  <p>{msg.text}</p>
                  <p className={cn("text-[10px] mt-0.5", msg.from === 'me' ? "text-white/60 text-right" : "text-gray-400")}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t p-4 flex items-center gap-3">
            <Input
              placeholder="Digite uma mensagem..."
              className="flex-1 h-10 text-sm"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setMessage("")}
            />
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-10 px-4">
              <Send className="w-4 h-4 mr-1" />Enviar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Selecione uma conversa</p>
          </div>
        </div>
      )}
    </div>
  );
}
