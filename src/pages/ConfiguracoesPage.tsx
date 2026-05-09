import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Building2, Bell, Shield, Palette, Save } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ConfiguracoesPage() {
  const { state } = useApp();

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gerencie as configurações da sua clínica</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar nav */}
        <div className="space-y-1">
          {[
            { icon: Building2, label: 'Dados da Clínica', active: true },
            { icon: User, label: 'Perfil do Usuário', active: false },
            { icon: Bell, label: 'Notificações', active: false },
            { icon: Shield, label: 'Segurança', active: false },
            { icon: Palette, label: 'Aparência', active: false },
          ].map(item => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${item.active ? 'bg-navy text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="px-5 pt-5 pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4" />Dados da Clínica
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Nome da Clínica</Label>
                  <Input defaultValue="Clínica RM" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">CNPJ</Label>
                  <Input defaultValue="12.345.678/0001-99" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Telefone</Label>
                  <Input defaultValue="(11) 3456-7890" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">WhatsApp</Label>
                  <Input defaultValue="(11) 98765-4321" className="h-9 text-sm" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Endereço</Label>
                  <Input defaultValue="Av. Paulista, 1000, Sala 501 - São Paulo/SP" className="h-9 text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="px-5 pt-5 pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />Meu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center text-xl font-bold">
                  RM
                </div>
                <div>
                  <p className="font-semibold text-sm">{state.user?.name}</p>
                  <p className="text-xs text-gray-500">{state.user?.email}</p>
                  <Badge className="mt-1 text-[10px] bg-gold/20 text-gold-700 border-0">{state.user?.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Nome completo</Label>
                  <Input defaultValue={state.user?.name} className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Email</Label>
                  <Input defaultValue={state.user?.email} className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">CRM/CRO</Label>
                  <Input defaultValue="CRM 123456-SP" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Especialidade</Label>
                  <Input defaultValue="Dermatologia Estética" className="h-9 text-sm" />
                </div>
              </div>
              <Button className="bg-navy hover:bg-navy/90 text-white text-sm h-9">
                <Save className="w-4 h-4 mr-2" />Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
