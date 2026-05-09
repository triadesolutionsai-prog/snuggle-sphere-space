import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import PatientsPage from '@/pages/PatientsPage';
import CRMPage from '@/pages/CRMPage';
import AgendaPage from '@/pages/AgendaPage';
import FinanceiroPage from '@/pages/FinanceiroPage';
import EstoquePage from '@/pages/EstoquePage';
import TarefasPage from '@/pages/TarefasPage';
import LembretesPage from '@/pages/LembretesPage';
import ComissionamentoPage from '@/pages/ComissionamentoPage';
import ClinidocsPage from '@/pages/ClinidocsPage';
import BloqueiosPage from '@/pages/BloqueiosPage';
import PlanosTratamentoPage from '@/pages/PlanosTratamentoPage';
import ConfiguracoesPage from '@/pages/ConfiguracoesPage';
import CRMConversasPage from '@/pages/CRMConversasPage';
import CRMTemplatesPage from '@/pages/CRMTemplatesPage';
import CRMMetricasPage from '@/pages/CRMMetricasPage';
import { AuthenticatedLayout } from '@/components/AuthenticatedLayout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp();
  return state.isAuthenticated ? <AuthenticatedLayout>{children}</AuthenticatedLayout> : <Navigate to="/auth" />;
};

const AuthRoute = () => {
  const { state } = useApp();
  return state.isAuthenticated ? <Navigate to="/" /> : <LoginPage />;
};

export default function App() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return <div className="min-h-screen bg-background" />;

  return (
    <AppProvider>
      <Router initialEntries={[window.location.pathname]}>
        <Routes>
          <Route path="/auth" element={<AuthRoute />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/crm/funil" element={<ProtectedRoute><CRMPage /></ProtectedRoute>} />
          <Route path="/crm/conversas" element={<ProtectedRoute><CRMConversasPage /></ProtectedRoute>} />
          <Route path="/crm/templates" element={<ProtectedRoute><CRMTemplatesPage /></ProtectedRoute>} />
          <Route path="/crm/metricas" element={<ProtectedRoute><CRMMetricasPage /></ProtectedRoute>} />
          <Route path="/agenda" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/agendamentos" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/pacientes" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
          <Route path="/prontuarios" element={<ProtectedRoute><PatientsPage /></ProtectedRoute>} />
          <Route path="/planos-tratamento" element={<ProtectedRoute><PlanosTratamentoPage /></ProtectedRoute>} />
          <Route path="/estoque" element={<ProtectedRoute><EstoquePage /></ProtectedRoute>} />
          <Route path="/clinidocs" element={<ProtectedRoute><ClinidocsPage /></ProtectedRoute>} />
          <Route path="/tarefas" element={<ProtectedRoute><TarefasPage /></ProtectedRoute>} />
          <Route path="/lembretes" element={<ProtectedRoute><LembretesPage /></ProtectedRoute>} />
          <Route path="/financeiro" element={<ProtectedRoute><FinanceiroPage /></ProtectedRoute>} />
          <Route path="/comissionamento" element={<ProtectedRoute><ComissionamentoPage /></ProtectedRoute>} />
          <Route path="/bloqueios" element={<ProtectedRoute><BloqueiosPage /></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute><ConfiguracoesPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
