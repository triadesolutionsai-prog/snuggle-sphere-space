import { useState } from "react";
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
  Mail
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <p className="text-sm text-gray-500">Gerencie o cadastro e histórico dos seus pacientes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nome, CPF ou telefone..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="w-fit">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty State */}
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Nenhum paciente cadastrado</p>
                      <p className="text-sm text-gray-500">Comece adicionando seu primeiro paciente ao sistema.</p>
                    </div>
                    <Button variant="outline" className="mt-2 text-[#D4AF37] border-[#D4AF37]">
                      Cadastrar Paciente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
