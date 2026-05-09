import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, DollarSign, CheckCircle2, Clock, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComissionamentoPage() {
  const { state } = useApp();

  const totalPago = state.commissions.filter(c => c.status === 'Pago').reduce((a, c) => a + c.commissionValue, 0);
  const totalPendente = state.commissions.filter(c => c.status === 'Pendente').reduce((a, c) => a + c.commissionValue, 0);

  const byProfessional = state.commissions.reduce((acc, c) => {
    if (!acc[c.professional]) acc[c.professional] = { total: 0, count: 0 };
    acc[c.professional].total += c.commissionValue;
    acc[c.professional].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comissionamento</h1>
          <p className="text-sm text-gray-500 mt-0.5">Controle de comissões por profissional</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />Exportar
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-700">R$ {totalPago.toLocaleString('pt-BR')}</div>
              <div className="text-xs text-gray-500">Comissões pagas</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-700">R$ {totalPendente.toLocaleString('pt-BR')}</div>
              <div className="text-xs text-gray-500">Comissões pendentes</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Percent className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold">R$ {(totalPago + totalPendente).toLocaleString('pt-BR')}</div>
              <div className="text-xs text-gray-500">Total do período</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* By professional */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(byProfessional).map(([prof, data]) => (
          <Card key={prof} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                {prof.split(' ').pop()?.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{prof}</p>
                <p className="text-xs text-gray-500">{data.count} procedimento(s)</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-navy">R$ {data.total.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-gray-400">em comissões</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="px-5 pt-5 pb-3 border-b">
          <CardTitle className="text-sm font-semibold">Histórico de Comissões</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold text-gray-700 pl-5">Profissional</TableHead>
                <TableHead className="font-semibold text-gray-700">Procedimento</TableHead>
                <TableHead className="font-semibold text-gray-700">Paciente</TableHead>
                <TableHead className="font-semibold text-gray-700">Data</TableHead>
                <TableHead className="font-semibold text-gray-700">Valor Total</TableHead>
                <TableHead className="font-semibold text-gray-700">Taxa</TableHead>
                <TableHead className="font-semibold text-gray-700">Comissão</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.commissions.map(c => (
                <TableRow key={c.id} className="hover:bg-gray-50/50">
                  <TableCell className="pl-5 font-medium text-sm">{c.professional}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.procedure}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.patient}</TableCell>
                  <TableCell className="text-sm text-gray-500">{c.date}</TableCell>
                  <TableCell className="text-sm font-medium">R$ {c.totalValue.toLocaleString('pt-BR')}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{c.commissionRate}%</Badge></TableCell>
                  <TableCell className="font-bold text-navy">R$ {c.commissionValue.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-[10px] border-0", c.status === 'Pago' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                      {c.status}
                    </Badge>
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
