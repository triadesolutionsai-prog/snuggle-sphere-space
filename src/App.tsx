import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import PatientsPage from '@/pages/PatientsPage';
import CRMPage from '@/pages/CRMPage';
import AgendaPage from '@/pages/AgendaPage';
import FinanceiroPage from '@/pages/FinanceiroPage';
import { AuthenticatedLayout } from '@/components/AuthenticatedLayout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp();
  return state.isAuthenticated ? <AuthenticatedLayout>{children}</AuthenticatedLayout> : <Navigate to="/auth" />;
};

const AuthRoute = () => {
  const { state } = useApp();
  return state.isAuthenticated ? <Navigate to="/" /> : <LoginPage />;
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-gray-500">Esta funcionalidade está em desenvolvimento e será preenchida com mock data em breve.</p>
  </div>
);

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <AppProvider>
      <Router initialEntries={[window.location.pathname]}>
        <Routes>
          <Route path="/auth" element={<AuthRoute />} />
          
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          
          {/* CRM */}
          <Route path="/crm/funil" element={<ProtectedRoute><CRMPage /></ProtectedRoute>} />
          <Route path="/crm/conversas" element={<ProtectedRoute><PlaceholderPage title="Conversas WhatsApp" /></ProtectedRoute>} />
          <Route path="/crm/templates" element={<ProtectedRoute><PlaceholderPage title="Templates de Mensagem" /></ProtectedRoute>} />
          <Route path="/crm/metricas" element={<ProtectedRoute><PlaceholderPage title="Métricas do CRM" /></ProtectedRoute>} />
          
          {/* Outras rotas */}
          <Route path="/agenda" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/agendamentos" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/pacientes" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
          <Route path="/prontuarios" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
          <Route path="/planos-tratamento" element={<ProtectedRoute><PlaceholderPage title="Planos de Tratamento" /></ProtectedRoute>} />
          <Route path="/estoque" element={<ProtectedRoute><PlaceholderPage title="Estoque" /></ProtectedRoute>} />
          <Route path="/clinidocs" element={<ProtectedRoute><PlaceholderPage title="CliniDocs" /></ProtectedRoute>} />
          <Route path="/tarefas" element={<ProtectedRoute><PlaceholderPage title="Tarefas" /></ProtectedRoute>} />
          <Route path="/lembretes" element={<ProtectedRoute><PlaceholderPage title="Lembretes" /></ProtectedRoute>} />
          <Route path="/financeiro" element={<ProtectedRoute><FinanceiroPage /></ProtectedRoute>} />
          <Route path="/comissionamento" element={<ProtectedRoute><PlaceholderPage title="Comissionamento" /></ProtectedRoute>} />
          <Route path="/bloqueios" element={<ProtectedRoute><PlaceholderPage title="Bloqueios" /></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute><PlaceholderPage title="Configurações" /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}


