import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  DollarSign, 
  Filter, 
  Search,
  MessageSquare
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LeadStatus } from "@/lib/mock-data";

const COLUMNS: LeadStatus[] = ['Lead', 'Consulta Agendada', 'Orçamento Enviado', 'Fechado'];

export default function CRMPage() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = state.leads.filter(lead => {
    const patient = state.patients.find(p => p.id === lead.patientId);
    return patient?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    dispatch({ type: 'UPDATE_LEAD_STATUS', payload: { id, status: newStatus } });
  };

  const getColumnTotal = (status: LeadStatus) => {
    return filteredLeads
      .filter(l => l.status === status)
      .reduce((acc, curr) => acc + curr.value, 0);
  };

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Funil de Vendas CRM</h1>
          <p className="text-sm text-gray-500">Acompanhe a jornada dos seus pacientes potenciais.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-gold hover:bg-gold/90 text-navy font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Buscar por nome do paciente..." 
            className="pl-9 border-none shadow-none focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-[1000px]">
          {COLUMNS.map(column => (
            <div key={column} className="flex-1 flex flex-col gap-4 bg-gray-50/50 rounded-xl p-3 border border-dashed">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-gray-700">{column}</h3>
                  <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                    {filteredLeads.filter(l => l.status === column).length}
                  </Badge>
                </div>
                <p className="text-[10px] font-bold text-gold">
                  R$ {getColumnTotal(column).toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {filteredLeads.filter(l => l.status === column).map(lead => {
                  const patient = state.patients.find(p => p.id === lead.patientId);
                  return (
                    <Card key={lead.id} className="group border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm group-hover:text-gold transition-colors">
                            {patient?.name}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-[10px] py-0 border-blue-100 text-blue-600 bg-blue-50/30">
                            {lead.source}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] py-0 border-green-100 text-green-600 bg-green-50/30">
                            R$ {lead.value.toLocaleString('pt-BR')}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                          <div className="flex -space-x-1">
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-50 hover:bg-[#D4AF37] hover:text-white transition-colors">
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-gray-50 hover:bg-[#D4AF37] hover:text-white transition-colors">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex-1" />
                          <p className="text-[10px] text-gray-400">Há 2 dias</p>
                        </div>

                        {/* Quick Action to Move (simulating drag/drop) */}
                        <div className="hidden group-hover:flex gap-1 pt-2">
                          {COLUMNS.filter(c => c !== column).map(c => (
                            <Button 
                              key={c} 
                              variant="outline" 
                              className="text-[9px] h-5 px-1.5 flex-1"
                              onClick={() => updateStatus(lead.id, c)}
                            >
                              Mover para {c.split(' ')[0]}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {filteredLeads.filter(l => l.status === column).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 opacity-30">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
