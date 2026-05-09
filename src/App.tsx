import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import LoginPage from '@/pages/LoginPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp();
  return state.isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const Dashboard = () => {
  const { state } = useApp();
  return (
    <div className="p-8">
      <h1>Bem-vindo, {state.user?.name}</h1>
      <p>Papel: {state.user?.role}</p>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
