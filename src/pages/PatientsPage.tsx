import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  UserPlus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  Mail,
  Users,
  Calendar
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PatientsPage() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = state.patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <p className="text-sm text-gray-500">Total de {state.patients.length} pacientes cadastrados no sistema.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button className="bg-gold hover:bg-gold/90 text-navy font-bold shadow-sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="p-4 bg-white border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nome, CPF ou telefone..." 
                className="pl-9 bg-gray-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-gold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-bold text-navy">Paciente</TableHead>
                <TableHead className="font-bold text-navy">Documento</TableHead>
                <TableHead className="font-bold text-navy">Contato</TableHead>
                <TableHead className="font-bold text-navy">Origem</TableHead>
                <TableHead className="font-bold text-navy">Status</TableHead>
                <TableHead className="text-right font-bold text-navy">Ações Rápidas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center font-bold text-navy border border-navy/10">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-gold transition-colors">{patient.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{patient.birthDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-gray-600">{patient.cpf}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-sm">{patient.phone}</p>
                      <p className="text-xs text-gray-400">{patient.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-[10px] bg-gray-50/50">
                      {patient.origin}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        patient.status === 'Ativo' ? "bg-green-500" : "bg-yellow-500"
                      )} />
                      <span className="text-xs">{patient.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4 text-gray-500" /> Ver Prontuário
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4 text-gray-500" /> Editar Dados
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="w-4 h-4 text-gray-500" /> Enviar Documento
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="w-4 h-4" /> Excluir Registro
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Nenhum paciente encontrado</p>
                        <p className="text-sm text-gray-500">Ajuste sua busca ou cadastre um novo paciente.</p>
                      </div>
                      <Button variant="outline" className="mt-2 text-gold border-gold hover:bg-gold hover:text-navy">
                        Limpar Filtros
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

