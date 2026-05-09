import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [role, setRole] = useState<UserRole>('Administrador');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SET_USER',
      payload: {
        id: '1',
        name: 'Dr. Renato Marano',
        email: 'renato@clinicarm.com.br',
        role: role,
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?w=100&h=100&fit=crop',
      },
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Branding Column */}
      <div className="md:w-1/2 bg-navy text-white p-8 md:p-24 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tighter text-gold">CLÍNICA RM</h1>
            <p className="text-xl md:text-2xl font-serif text-gray-300">Renato Marano</p>
          </div>
          <div className="h-px w-24 bg-gold" />
          <h2 className="text-2xl font-light">Gestão clínica inteligente e simplificada</h2>
          <p className="text-gray-400 max-w-md leading-relaxed">
            Organize seus pacientes, agendamentos, prontuários e finanças em uma única plataforma moderna e intuitiva.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div>
              <p className="text-gold font-bold">100%</p>
              <p className="text-xs text-gray-400">Digital</p>
            </div>
            <div>
              <p className="text-gold font-bold">24/7</p>
              <p className="text-xs text-gray-400">Acesso</p>
            </div>
            <div>
              <p className="text-gold font-bold">Dados</p>
              <p className="text-xs text-gray-400">Seguros</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-12 md:mt-0">
          © 2025 Clínica RM. Todos os direitos reservados.
        </p>
      </div>

      {/* Login Column */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-24">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardContent className="space-y-8 p-0">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h3>
              <p className="text-gray-500">Acesse sua conta para gerenciar sua clínica.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nome@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Button variant="link" className="p-0 h-auto text-xs text-gold">
                      Esqueci minha senha
                    </Button>
                  </div>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Entrar como:</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um papel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Clínico">Clínico</SelectItem>
                      <SelectItem value="Assistente">Assistente</SelectItem>
                      <SelectItem value="Recepção">Recepção</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold"
              >
                Entrar
              </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500">
                Não tem uma conta? <Button variant="link" className="p-0 h-auto text-gold">Criar conta</Button>
              </p>
              <p className="text-[10px] text-gray-400 leading-tight">
                Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
