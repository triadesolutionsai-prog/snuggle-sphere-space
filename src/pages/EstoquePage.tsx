import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Search, Plus, AlertTriangle, CheckCircle, TrendingDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EstoquePage() {
  const { state } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<'todos' | 'critico' | 'normal'>('todos');

  const filtered = state.products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    if (filter === 'critico') return matchSearch && p.quantity <= p.minQuantity;
    if (filter === 'normal') return matchSearch && p.quantity > p.minQuantity;
    return matchSearch;
  });

  const critical = state.products.filter(p => p.quantity <= p.minQuantity).length;
  const totalItems = state.products.reduce((a, c) => a + c.quantity, 0);
  const totalValue = state.products.reduce((a, c) => a + c.quantity * c.price, 0);

  const getStockLevel = (p: typeof state.products[0]) => {
    const ratio = p.quantity / p.minQuantity;
    if (ratio <= 1) return 'crítico';
    if (ratio <= 2) return 'baixo';
    return 'normal';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estoque</h1>
          <p className="text-sm text-gray-500 mt-0.5">Controle de insumos e materiais clínicos</p>
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="w-4 h-4 mr-2" />Novo Produto
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold">{state.products.length}</div>
                <div className="text-xs text-gray-500">Itens cadastrados</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", critical > 0 ? "bg-red-50" : "bg-green-50")}>
                {critical > 0 ? <AlertTriangle className="w-5 h-5 text-red-600" /> : <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              <div>
                <div className={cn("text-xl font-bold", critical > 0 ? "text-red-600" : "text-green-600")}>{critical}</div>
                <div className="text-xs text-gray-500">Itens em estado crítico</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</div>
                <div className="text-xs text-gray-500">Valor total em estoque</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="px-5 pt-5 pb-3 border-b">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Buscar produto ou SKU..." className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {(['todos', 'critico', 'normal'] as const).map(f => (
                <Button key={f} variant={filter === f ? "default" : "outline"} size="sm"
                  className={cn("text-xs capitalize h-8", filter === f && "bg-navy text-white")}
                  onClick={() => setFilter(f)}
                >
                  {f === 'todos' ? 'Todos' : f === 'critico' ? '🔴 Crítico' : '✅ Normal'}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold text-gray-700 pl-5">Produto</TableHead>
                <TableHead className="font-semibold text-gray-700">SKU</TableHead>
                <TableHead className="font-semibold text-gray-700">Categoria</TableHead>
                <TableHead className="font-semibold text-gray-700">Fornecedor</TableHead>
                <TableHead className="font-semibold text-gray-700">Qtd. Atual</TableHead>
                <TableHead className="font-semibold text-gray-700">Qtd. Mínima</TableHead>
                <TableHead className="font-semibold text-gray-700">Preço Unit.</TableHead>
                <TableHead className="font-semibold text-gray-700">Validade</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(product => {
                const level = getStockLevel(product);
                return (
                  <TableRow key={product.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium pl-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-gray-500">{product.sku}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] font-normal">{product.category}</Badge></TableCell>
                    <TableCell className="text-sm text-gray-600">{product.supplier}</TableCell>
                    <TableCell>
                      <span className={cn("font-bold text-sm", level === 'crítico' ? "text-red-600" : level === 'baixo' ? "text-yellow-600" : "text-gray-900")}>
                        {product.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{product.minQuantity}</TableCell>
                    <TableCell className="text-sm font-medium">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-sm text-gray-500">{product.expiryDate ?? '—'}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-[10px] border-0",
                        level === 'crítico' ? "bg-red-100 text-red-700" :
                        level === 'baixo' ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                      )}>
                        {level === 'crítico' ? 'Crítico' : level === 'baixo' ? 'Baixo' : 'Normal'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
