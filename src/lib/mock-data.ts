import { subDays, addDays, format } from 'date-fns';

export type LeadStatus = 'Lead' | 'Consulta Agendada' | 'Orçamento Enviado' | 'Fechado' | 'Perdido';

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  origin: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  lastVisit?: string;
  birthDate: string;
}

export interface Lead {
  id: string;
  patientId: string;
  status: LeadStatus;
  value: number;
  source: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado' | 'Faltou' | 'Finalizado';
  type: string;
  professional: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'Receita' | 'Despesa';
  category: string;
  date: string;
  status: 'Pago' | 'Pendente';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
}

export const INITIAL_PATIENTS: Patient[] = [
  { id: '1', name: 'Ana Silva', cpf: '123.456.789-00', phone: '(11) 98765-4321', email: 'ana.silva@email.com', origin: 'Instagram', status: 'Ativo', birthDate: '1990-05-15' },
  { id: '2', name: 'João Pereira', cpf: '234.567.890-11', phone: '(11) 97654-3210', email: 'joao.p@email.com', origin: 'Indicação', status: 'Ativo', birthDate: '1985-10-20' },
  { id: '3', name: 'Maria Santos', cpf: '345.678.901-22', phone: '(11) 96543-2109', email: 'maria.s@email.com', origin: 'Google Search', status: 'Pendente', birthDate: '1992-02-28' },
  { id: '4', name: 'Ricardo Lima', cpf: '456.789.012-33', phone: '(11) 95432-1098', email: 'ricardo.l@email.com', origin: 'Facebook', status: 'Ativo', birthDate: '1978-12-05' },
];

export const INITIAL_LEADS: Lead[] = [
  { id: 'L1', patientId: '3', status: 'Lead', value: 1500, source: 'Google Search', createdAt: subDays(new Date(), 2).toISOString() },
  { id: 'L2', patientId: '1', status: 'Orçamento Enviado', value: 3500, source: 'Instagram', createdAt: subDays(new Date(), 5).toISOString() },
  { id: 'L3', patientId: '2', status: 'Fechado', value: 5000, source: 'Indicação', createdAt: subDays(new Date(), 10).toISOString() },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'A1', patientId: '1', date: format(new Date(), 'yyyy-MM-dd'), startTime: '09:00', endTime: '10:00', status: 'Confirmado', type: 'Avaliação', professional: 'Dr. Renato Marano' },
  { id: 'A2', patientId: '2', date: format(new Date(), 'yyyy-MM-dd'), startTime: '11:00', endTime: '12:00', status: 'Pendente', type: 'Procedimento', professional: 'Dr. Renato Marano' },
  { id: 'A3', patientId: '4', date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), startTime: '14:00', endTime: '15:00', status: 'Confirmado', type: 'Retorno', professional: 'Dra. Julia Costa' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'T1', description: 'Procedimento - João Pereira', amount: 2500, type: 'Receita', category: 'Serviços', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'Pago' },
  { id: 'T2', description: 'Aluguel Sala', amount: 3000, type: 'Despesa', category: 'Infraestrutura', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), status: 'Pago' },
  { id: 'T3', description: 'Insumos Médicos', amount: 1200, type: 'Despesa', category: 'Estoque', date: format(new Date(), 'yyyy-MM-dd'), status: 'Pendente' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'P1', name: 'Luvas de Procedimento', sku: 'LUV-001', quantity: 50, minQuantity: 10, price: 45.0, supplier: 'MedCorp' },
  { id: 'P2', name: 'Máscara Cirúrgica', sku: 'MSK-002', quantity: 5, minQuantity: 20, price: 25.0, supplier: 'HealthSafe' },
  { id: 'P3', name: 'Álcool em Gel 70%', sku: 'ALC-070', quantity: 15, minQuantity: 5, price: 12.0, supplier: 'CleanMed' },
];
