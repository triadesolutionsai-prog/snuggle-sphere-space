import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { 
  Patient, Lead, Appointment, Transaction, Product,
  INITIAL_PATIENTS, INITIAL_LEADS, INITIAL_APPOINTMENTS, INITIAL_TRANSACTIONS, INITIAL_PRODUCTS 
} from '@/lib/mock-data';

export type UserRole = 'Administrador' | 'Clínico' | 'Assistente' | 'Recepção' | 'Financeiro';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  patients: Patient[];
  leads: Lead[];
  appointments: Appointment[];
  transactions: Transaction[];
  products: Product[];
  auditLog: any[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'DELETE_PATIENT'; payload: string }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_LEAD_STATUS'; payload: { id: string; status: Lead['status'] } }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'UPDATE_APPOINTMENT'; payload: Appointment }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'ADD_AUDIT_LOG'; payload: any };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Dr. Renato Marano',
    email: 'renato@clinicarm.com.br',
    role: 'Administrador',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?w=100&h=100&fit=crop',
  },
  isAuthenticated: true,
  theme: 'light',
  patients: INITIAL_PATIENTS,
  leads: INITIAL_LEADS,
  appointments: INITIAL_APPOINTMENTS,
  transactions: INITIAL_TRANSACTIONS,
  products: INITIAL_PRODUCTS,
  auditLog: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload 
      };
    case 'TOGGLE_THEME':
      return { 
        ...state, 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PATIENT':
      return { ...state, patients: state.patients.filter(p => p.id !== action.payload) };
    case 'ADD_LEAD':
      return { ...state, leads: [...state.leads, action.payload] };
    case 'UPDATE_LEAD_STATUS':
      return {
        ...state,
        leads: state.leads.map(l => l.id === action.payload.id ? { ...l, status: action.payload.status } : l)
      };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(a => a.id === action.payload.id ? action.payload : a)
      };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'ADD_AUDIT_LOG':
      return {
        ...state,
        auditLog: [action.payload, ...state.auditLog],
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (state.user) {
      window.localStorage.setItem('clinica-rm-user', JSON.stringify(state.user));
    } else {
      window.localStorage.removeItem('clinica-rm-user');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
