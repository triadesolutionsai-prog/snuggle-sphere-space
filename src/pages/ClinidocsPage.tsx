import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, Plus, Download, Send, Eye, File, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, any> = {
  'Receita': FileText,
  'Atestado': FileCheck,
  'Laudo': File,
  'Termo': FileText,
  'Prontuário': FileText,
};

const typeColor: Record<string, string> = {
  'Receita': 'bg-green-100 text-green-700',
  'Atestado': 'bg-blue-100 text-blue-700',
  'Laudo': 'bg-purple-100 text-purple-700',
  'Termo': 'bg-orange-100 text-orange-700',
  'Prontuário': 'bg-gray-100 text-gray-700',
};

export default function ClinidocsPage() {
  const { state } = useApp();
  const [search, setSearch] = useState("");

  const filtered = state.documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CliniDocs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestão de documentos clínicos e receituários</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Documento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: state.documents.length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Assinados', value: state.documents.filter(d => d.status === 'Assinado').length, color: 'bg-green-50 text-green-600' },
          { label: 'Enviados', value: state.documents.filter(d => d.status === 'Enviado').length, color: 'bg-purple-50 text-purple-600' },
          { label: 'Pendentes', value: state.documents.filter(d => d.status === 'Pendente').length, color: 'bg-yellow-50 text-yellow-600' },
        ].map(s => (
          <Card key={s.label} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", s.color.split(' ')[0])}>
                  <FileText className={cn("w-4 h-4", s.color.split(' ')[1])} />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Buscar documentos..." className="pl-9 h-9 text-sm bg-white" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => {
          const Icon = typeIcon[doc.type] ?? FileText;
          return (
            <Card key={doc.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{doc.title}</p>
                    <p className="text-xs text-gray-500">{doc.patient}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge className={cn("text-[10px] border-0", typeColor[doc.type])}>{doc.type}</Badge>
                  <Badge className={cn("text-[10px] border-0",
                    doc.status === 'Assinado' ? "bg-green-100 text-green-700" :
                    doc.status === 'Enviado' ? "bg-purple-100 text-purple-700" : "bg-yellow-100 text-yellow-700"
                  )}>{doc.status}</Badge>
                </div>
                <div className="text-[10px] text-gray-400 mb-3">
                  {doc.professional} · {doc.date}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
                    <Eye className="w-3 h-3 mr-1" />Ver
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
                    <Download className="w-3 h-3 mr-1" />PDF
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
                    <Send className="w-3 h-3 mr-1" />Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
