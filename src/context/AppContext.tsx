import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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
  // CRM
  leads: any[];
  // Agenda
  appointments: any[];
  // Patients
  patients: any[];
  // Inventory
  products: any[];
  // Finance
  transactions: any[];
  // Audit Log
  auditLog: any[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_LEAD'; payload: any }
  | { type: 'UPDATE_LEAD'; payload: any }
  | { type: 'ADD_PATIENT'; payload: any }
  | { type: 'ADD_APPOINTMENT'; payload: any }
  | { type: 'ADD_AUDIT_LOG'; payload: any };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  leads: [],
  appointments: [],
  patients: [],
  products: [],
  transactions: [],
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
    case 'ADD_AUDIT_LOG':
      return {
        ...state,
        auditLog: [action.payload, ...state.auditLog],
      };
    // Add other cases as needed
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
