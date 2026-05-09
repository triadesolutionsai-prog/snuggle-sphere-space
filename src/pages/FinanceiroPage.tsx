import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Plus, 
  Filter, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  CreditCard,
  Building2,
  Calendar,
  MoreVertical
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function FinanceiroPage() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const totalReceita = state.transactions
    .filter(t => t.type === 'Receita')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalDespesa = state.transactions
    .filter(t => t.type === 'Despesa')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const saldo = totalReceita - totalDespesa;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financeiro</h1>
          <p className="text-sm text-gray-500">Gestão de fluxo de caixa e faturamento.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Fluxo de Caixa (PDF)
          </Button>
          <Button className="bg-gold hover:bg-gold/90 text-navy font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Lançar Transação
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-500">Entradas</CardTitle>
              <div className="p-1.5 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceita.toLocaleString('pt-BR')}</div>
            <p className="text-[10px] text-gray-400 mt-1 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-500">Saídas</CardTitle>
              <div className="p-1.5 bg-red-50 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalDespesa.toLocaleString('pt-BR')}</div>
            <p className="text-[10px] text-gray-400 mt-1 flex items-center">
              <ArrowDownRight className="w-3 h-3 mr-1" /> 5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-navy text-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-blue-200">Saldo Previsto</CardTitle>
              <div className="p-1.5 bg-white/10 rounded-lg">
                <DollarSign className="w-4 h-4 text-gold" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {saldo.toLocaleString('pt-BR')}</div>
            <p className="text-[10px] text-blue-200/60 mt-1 italic">
              Considerando lançamentos pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="p-4 border-b bg-white">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar por descrição ou categoria..." 
                className="pl-9 bg-gray-50 border-none shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">Mês Atual</Button>
               <Button variant="outline" size="sm"><Filter className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[120px]">Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Meio</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.transactions.map((t) => (
                <TableRow key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {t.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-2 rounded",
                        t.type === 'Receita' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      )}>
                        {t.category === 'Infraestrutura' ? <Building2 className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      </div>
                      <span className="font-medium text-sm">{t.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-[10px]">{t.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <CreditCard className="w-3 h-3" /> Cartão
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "font-bold text-sm",
                    t.type === 'Receita' ? "text-green-600" : "text-red-600"
                  )}>
                    {t.type === 'Receita' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={t.status === 'Pago' ? "secondary" : "outline"} className={cn(
                      "text-[10px]",
                      t.status === 'Pago' ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-yellow-600"
                    )}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
