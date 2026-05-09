import { subDays, addDays, format, subMonths } from 'date-fns';

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
  address?: string;
  bloodType?: string;
  allergies?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  patientId: string;
  name: string;
  status: LeadStatus;
  value: number;
  source: string;
  createdAt: string;
  phone: string;
  procedure: string;
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
  room?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'Receita' | 'Despesa';
  category: string;
  date: string;
  status: 'Pago' | 'Pendente';
  method?: string;
  patient?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  category: string;
  expiryDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
  dueDate: string;
  assignee: string;
  category: string;
}

export interface Reminder {
  id: string;
  title: string;
  message: string;
  type: 'Consulta' | 'Retorno' | 'Financeiro' | 'Estoque' | 'Aniversário';
  date: string;
  time: string;
  patient?: string;
  status: 'Ativo' | 'Enviado' | 'Cancelado';
  channel: 'WhatsApp' | 'Email' | 'SMS';
}

export interface Commission {
  id: string;
  professional: string;
  procedure: string;
  patient: string;
  date: string;
  totalValue: number;
  commissionRate: number;
  commissionValue: number;
  status: 'Pendente' | 'Pago';
}

export interface Document {
  id: string;
  title: string;
  type: 'Receita' | 'Atestado' | 'Laudo' | 'Termo' | 'Prontuário';
  patient: string;
  date: string;
  professional: string;
  status: 'Assinado' | 'Pendente' | 'Enviado';
}

export interface Block {
  id: string;
  professional: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  recurring: boolean;
}

const today = format(new Date(), 'yyyy-MM-dd');
const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
const dayAfter = format(addDays(new Date(), 2), 'yyyy-MM-dd');

export const INITIAL_PATIENTS: Patient[] = [
  { id: '1', name: 'Ana Silva', cpf: '123.456.789-00', phone: '(11) 98765-4321', email: 'ana.silva@email.com', origin: 'Instagram', status: 'Ativo', birthDate: '1990-05-15', lastVisit: format(subDays(new Date(), 7), 'yyyy-MM-dd'), address: 'Rua das Flores, 123 - São Paulo/SP', bloodType: 'A+', allergies: 'Nenhuma', notes: 'Paciente frequente, prefere horário matutino.' },
  { id: '2', name: 'João Pereira', cpf: '234.567.890-11', phone: '(11) 97654-3210', email: 'joao.p@email.com', origin: 'Indicação', status: 'Ativo', birthDate: '1985-10-20', lastVisit: format(subDays(new Date(), 14), 'yyyy-MM-dd'), address: 'Av. Paulista, 456 - São Paulo/SP', bloodType: 'O+', allergies: 'Penicilina', notes: 'Hipertenso - acompanhar pressão antes de procedimentos.' },
  { id: '3', name: 'Maria Santos', cpf: '345.678.901-22', phone: '(11) 96543-2109', email: 'maria.s@email.com', origin: 'Google Search', status: 'Pendente', birthDate: '1992-02-28', address: 'Rua Augusta, 789 - São Paulo/SP', bloodType: 'B+', allergies: 'Látex' },
  { id: '4', name: 'Ricardo Lima', cpf: '456.789.012-33', phone: '(11) 95432-1098', email: 'ricardo.l@email.com', origin: 'Facebook', status: 'Ativo', birthDate: '1978-12-05', lastVisit: format(subDays(new Date(), 3), 'yyyy-MM-dd'), address: 'Rua Consolação, 321 - São Paulo/SP', bloodType: 'AB-', allergies: 'Nenhuma' },
  { id: '5', name: 'Fernanda Oliveira', cpf: '567.890.123-44', phone: '(11) 94321-0987', email: 'fernanda.o@email.com', origin: 'Indicação', status: 'Ativo', birthDate: '1995-07-12', lastVisit: format(subDays(new Date(), 21), 'yyyy-MM-dd'), address: 'Alameda Santos, 654 - São Paulo/SP', bloodType: 'A-' },
  { id: '6', name: 'Carlos Mendes', cpf: '678.901.234-55', phone: '(11) 93210-9876', email: 'carlos.m@email.com', origin: 'TikTok', status: 'Ativo', birthDate: '1980-03-22', lastVisit: format(subDays(new Date(), 5), 'yyyy-MM-dd'), address: 'Rua Bela Cintra, 987 - São Paulo/SP', bloodType: 'O-' },
  { id: '7', name: 'Juliana Costa', cpf: '789.012.345-66', phone: '(11) 92109-8765', email: 'juliana.c@email.com', origin: 'Instagram', status: 'Ativo', birthDate: '1988-09-30', lastVisit: format(subDays(new Date(), 10), 'yyyy-MM-dd'), address: 'Rua da Consolação, 147 - São Paulo/SP', bloodType: 'B-' },
  { id: '8', name: 'Paulo Rodrigues', cpf: '890.123.456-77', phone: '(11) 91098-7654', email: 'paulo.r@email.com', origin: 'Google Search', status: 'Inativo', birthDate: '1975-11-08', address: 'Av. Rebouças, 258 - São Paulo/SP', bloodType: 'A+' },
  { id: '9', name: 'Beatriz Almeida', cpf: '901.234.567-88', phone: '(11) 90987-6543', email: 'beatriz.a@email.com', origin: 'Indicação', status: 'Ativo', birthDate: '1993-04-17', lastVisit: format(subDays(new Date(), 2), 'yyyy-MM-dd'), address: 'Rua Oscar Freire, 369 - São Paulo/SP', bloodType: 'AB+' },
  { id: '10', name: 'Luís Ferreira', cpf: '012.345.678-99', phone: '(11) 89876-5432', email: 'luis.f@email.com', origin: 'Facebook', status: 'Ativo', birthDate: '1982-06-25', lastVisit: format(subDays(new Date(), 30), 'yyyy-MM-dd'), address: 'Av. Nove de Julho, 741 - São Paulo/SP', bloodType: 'O+' },
  { id: '11', name: 'Camila Souza', cpf: '111.222.333-44', phone: '(11) 88765-4321', email: 'camila.s@email.com', origin: 'Instagram', status: 'Ativo', birthDate: '1997-01-09', lastVisit: format(subDays(new Date(), 45), 'yyyy-MM-dd'), address: 'Rua Haddock Lobo, 852 - São Paulo/SP', bloodType: 'A+' },
  { id: '12', name: 'André Martins', cpf: '222.333.444-55', phone: '(11) 77654-3210', email: 'andre.m@email.com', origin: 'TikTok', status: 'Pendente', birthDate: '1991-08-14', address: 'Av. Brigadeiro Faria Lima, 963 - São Paulo/SP', bloodType: 'B+' },
];

export const INITIAL_LEADS: Lead[] = [
  { id: 'L1', patientId: '3', name: 'Maria Santos', status: 'Lead', value: 1500, source: 'Google Search', createdAt: subDays(new Date(), 2).toISOString(), phone: '(11) 96543-2109', procedure: 'Avaliação Facial' },
  { id: 'L2', patientId: '1', name: 'Ana Silva', status: 'Orçamento Enviado', value: 3500, source: 'Instagram', createdAt: subDays(new Date(), 5).toISOString(), phone: '(11) 98765-4321', procedure: 'Harmonização Facial' },
  { id: 'L3', patientId: '2', name: 'João Pereira', status: 'Fechado', value: 5000, source: 'Indicação', createdAt: subDays(new Date(), 10).toISOString(), phone: '(11) 97654-3210', procedure: 'Botox Completo' },
  { id: 'L4', patientId: '12', name: 'André Martins', status: 'Lead', value: 800, source: 'TikTok', createdAt: subDays(new Date(), 1).toISOString(), phone: '(11) 77654-3210', procedure: 'Consulta Inicial' },
  { id: 'L5', patientId: '5', name: 'Fernanda Oliveira', status: 'Consulta Agendada', value: 2200, source: 'Indicação', createdAt: subDays(new Date(), 7).toISOString(), phone: '(11) 94321-0987', procedure: 'Preenchimento Labial' },
  { id: 'L6', patientId: '6', name: 'Carlos Mendes', status: 'Fechado', value: 4500, source: 'TikTok', createdAt: subDays(new Date(), 15).toISOString(), phone: '(11) 93210-9876', procedure: 'Botox + Preenchimento' },
  { id: 'L7', patientId: '11', name: 'Camila Souza', status: 'Orçamento Enviado', value: 1800, source: 'Instagram', createdAt: subDays(new Date(), 3).toISOString(), phone: '(11) 88765-4321', procedure: 'Skinbooster' },
  { id: 'L8', patientId: '9', name: 'Beatriz Almeida', status: 'Consulta Agendada', value: 3000, source: 'Indicação', createdAt: subDays(new Date(), 4).toISOString(), phone: '(11) 90987-6543', procedure: 'Fio de Sustentação' },
  { id: 'L9', patientId: '7', name: 'Juliana Costa', status: 'Perdido', value: 1200, source: 'Instagram', createdAt: subDays(new Date(), 20).toISOString(), phone: '(11) 92109-8765', procedure: 'Bioestimulador' },
  { id: 'L10', patientId: '10', name: 'Luís Ferreira', status: 'Lead', value: 900, source: 'Facebook', createdAt: subDays(new Date(), 1).toISOString(), phone: '(11) 89876-5432', procedure: 'Avaliação' },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'A1', patientId: '1', date: today, startTime: '09:00', endTime: '10:00', status: 'Confirmado', type: 'Avaliação', professional: 'Dr. Renato Marano', room: 'Sala 1' },
  { id: 'A2', patientId: '2', date: today, startTime: '11:00', endTime: '12:00', status: 'Pendente', type: 'Procedimento', professional: 'Dr. Renato Marano', room: 'Sala 2' },
  { id: 'A3', patientId: '4', date: today, startTime: '14:00', endTime: '15:00', status: 'Confirmado', type: 'Retorno', professional: 'Dra. Julia Costa', room: 'Sala 1' },
  { id: 'A4', patientId: '6', date: today, startTime: '15:30', endTime: '16:30', status: 'Confirmado', type: 'Harmonização Facial', professional: 'Dr. Renato Marano', room: 'Sala 3' },
  { id: 'A5', patientId: '9', date: today, startTime: '17:00', endTime: '18:00', status: 'Pendente', type: 'Botox', professional: 'Dra. Julia Costa', room: 'Sala 2' },
  { id: 'A6', patientId: '3', date: tomorrow, startTime: '09:00', endTime: '10:00', status: 'Confirmado', type: 'Consulta Inicial', professional: 'Dr. Renato Marano', room: 'Sala 1' },
  { id: 'A7', patientId: '5', date: tomorrow, startTime: '10:30', endTime: '11:30', status: 'Pendente', type: 'Preenchimento', professional: 'Dra. Julia Costa', room: 'Sala 2' },
  { id: 'A8', patientId: '7', date: tomorrow, startTime: '14:00', endTime: '15:00', status: 'Confirmado', type: 'Retorno', professional: 'Dr. Renato Marano', room: 'Sala 1' },
  { id: 'A9', patientId: '11', date: tomorrow, startTime: '16:00', endTime: '17:00', status: 'Confirmado', type: 'Skinbooster', professional: 'Dra. Julia Costa', room: 'Sala 3' },
  { id: 'A10', patientId: '10', date: dayAfter, startTime: '09:00', endTime: '10:00', status: 'Confirmado', type: 'Avaliação', professional: 'Dr. Renato Marano', room: 'Sala 1' },
  { id: 'A11', patientId: '12', date: dayAfter, startTime: '11:00', endTime: '12:00', status: 'Pendente', type: 'Consulta', professional: 'Dra. Julia Costa', room: 'Sala 2' },
  { id: 'A12', patientId: '4', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), startTime: '10:00', endTime: '11:00', status: 'Finalizado', type: 'Procedimento', professional: 'Dr. Renato Marano', room: 'Sala 1' },
  { id: 'A13', patientId: '8', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), startTime: '14:00', endTime: '15:00', status: 'Faltou', type: 'Retorno', professional: 'Dra. Julia Costa', room: 'Sala 2' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'T1', description: 'Botox - João Pereira', amount: 2500, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'Pago', method: 'Cartão de Crédito', patient: 'João Pereira' },
  { id: 'T2', description: 'Aluguel da Clínica', amount: 8000, type: 'Despesa', category: 'Infraestrutura', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), status: 'Pago', method: 'Transferência' },
  { id: 'T3', description: 'Insumos Médicos - MedCorp', amount: 2800, type: 'Despesa', category: 'Estoque', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), status: 'Pendente', method: 'Boleto' },
  { id: 'T4', description: 'Harmonização Facial - Ana Silva', amount: 3500, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), status: 'Pago', method: 'Pix', patient: 'Ana Silva' },
  { id: 'T5', description: 'Folha de Pagamento', amount: 15000, type: 'Despesa', category: 'Pessoal', date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), status: 'Pago', method: 'Transferência' },
  { id: 'T6', description: 'Preenchimento Labial - Fernanda Oliveira', amount: 1800, type: 'Receita', category: 'Procedimentos', date: today, status: 'Pendente', method: 'Cartão de Crédito', patient: 'Fernanda Oliveira' },
  { id: 'T7', description: 'Software de Gestão', amount: 350, type: 'Despesa', category: 'Tecnologia', date: format(subDays(new Date(), 10), 'yyyy-MM-dd'), status: 'Pago', method: 'Cartão de Crédito' },
  { id: 'T8', description: 'Botox + Preenchimento - Carlos Mendes', amount: 4500, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), status: 'Pago', method: 'Pix', patient: 'Carlos Mendes' },
  { id: 'T9', description: 'Material de Escritório', amount: 280, type: 'Despesa', category: 'Administrativo', date: format(subDays(new Date(), 6), 'yyyy-MM-dd'), status: 'Pago', method: 'Cartão de Débito' },
  { id: 'T10', description: 'Skinbooster - Juliana Costa', amount: 1500, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 8), 'yyyy-MM-dd'), status: 'Pago', method: 'Pix', patient: 'Juliana Costa' },
  { id: 'T11', description: 'Manutenção de Equipamentos', amount: 1200, type: 'Despesa', category: 'Infraestrutura', date: format(subDays(new Date(), 12), 'yyyy-MM-dd'), status: 'Pago', method: 'Boleto' },
  { id: 'T12', description: 'Retorno - Ricardo Lima', amount: 800, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), status: 'Pago', method: 'Dinheiro', patient: 'Ricardo Lima' },
  { id: 'T13', description: 'Marketing Digital', amount: 2000, type: 'Despesa', category: 'Marketing', date: format(subDays(new Date(), 15), 'yyyy-MM-dd'), status: 'Pago', method: 'Cartão de Crédito' },
  { id: 'T14', description: 'Bioestimulador - Beatriz Almeida', amount: 3200, type: 'Receita', category: 'Procedimentos', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), status: 'Pago', method: 'Cartão de Crédito', patient: 'Beatriz Almeida' },
  { id: 'T15', description: 'Avaliação Inicial - Luís Ferreira', amount: 200, type: 'Receita', category: 'Consultas', date: today, status: 'Pendente', method: 'Pix', patient: 'Luís Ferreira' },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'P1', name: 'Luvas de Procedimento (M)', sku: 'LUV-001-M', quantity: 120, minQuantity: 30, price: 45.0, supplier: 'MedCorp', category: 'EPIs', expiryDate: '2026-06-30' },
  { id: 'P2', name: 'Máscara Cirúrgica', sku: 'MSK-002', quantity: 8, minQuantity: 20, price: 25.0, supplier: 'HealthSafe', category: 'EPIs', expiryDate: '2026-03-15' },
  { id: 'P3', name: 'Álcool Gel 70%', sku: 'ALC-070', quantity: 15, minQuantity: 5, price: 12.0, supplier: 'CleanMed', category: 'Higienização' },
  { id: 'P4', name: 'Ácido Hialurônico 1ml', sku: 'AH-001', quantity: 4, minQuantity: 10, price: 380.0, supplier: 'Galderma', category: 'Insumos Clínicos', expiryDate: '2025-12-01' },
  { id: 'P5', name: 'Toxina Botulínica 100U', sku: 'BOT-100', quantity: 12, minQuantity: 5, price: 850.0, supplier: 'Allergan', category: 'Insumos Clínicos', expiryDate: '2025-11-30' },
  { id: 'P6', name: 'Seringa 1ml com Agulha', sku: 'SER-001', quantity: 200, minQuantity: 50, price: 2.50, supplier: 'MedCorp', category: 'Materiais' },
  { id: 'P7', name: 'Curativo Estéril', sku: 'CUR-007', quantity: 60, minQuantity: 20, price: 8.0, supplier: 'HealthSafe', category: 'Materiais' },
  { id: 'P8', name: 'Anestésico Tópico', sku: 'ANE-TOP', quantity: 3, minQuantity: 8, price: 95.0, supplier: 'Pharma Hospitalar', category: 'Medicamentos', expiryDate: '2025-10-15' },
  { id: 'P9', name: 'Soro Fisiológico 500ml', sku: 'SF-500', quantity: 30, minQuantity: 10, price: 15.0, supplier: 'CleanMed', category: 'Medicamentos' },
  { id: 'P10', name: 'Bioestimulador de Colágeno', sku: 'BIO-COL', quantity: 6, minQuantity: 4, price: 920.0, supplier: 'Galderma', category: 'Insumos Clínicos', expiryDate: '2026-01-20' },
  { id: 'P11', name: 'Cânula Descartável 25G', sku: 'CAN-25G', quantity: 80, minQuantity: 30, price: 18.0, supplier: 'MedCorp', category: 'Materiais' },
  { id: 'P12', name: 'Fio de Sustentação PDO', sku: 'FIO-PDO', quantity: 2, minQuantity: 5, price: 450.0, supplier: 'Sinclair', category: 'Insumos Clínicos', expiryDate: '2026-04-30' },
];

export const INITIAL_TASKS: Task[] = [
  { id: 'TK1', title: 'Ligar para lead Ricardo Lima', description: 'Follow-up do orçamento enviado há 3 dias', priority: 'Alta', status: 'Pendente', dueDate: today, assignee: 'Recepção', category: 'CRM' },
  { id: 'TK2', title: 'Revisar relatório financeiro de maio', description: 'Fechar o balanço do mês anterior', priority: 'Alta', status: 'Em Andamento', dueDate: tomorrow, assignee: 'Dr. Renato Marano', category: 'Financeiro' },
  { id: 'TK3', title: 'Reabastecer Ácido Hialurônico', description: 'Estoque crítico - apenas 4 unidades restantes', priority: 'Alta', status: 'Pendente', dueDate: today, assignee: 'Assistente', category: 'Estoque' },
  { id: 'TK4', title: 'Enviar confirmações de amanhã', description: 'Disparar WhatsApp para 4 pacientes agendados', priority: 'Média', status: 'Pendente', dueDate: today, assignee: 'Recepção', category: 'Agendamento' },
  { id: 'TK5', title: 'Atualizar prontuário - João Pereira', description: 'Registrar evolução do procedimento de sexta', priority: 'Média', status: 'Pendente', dueDate: tomorrow, assignee: 'Dr. Renato Marano', category: 'Clínico' },
  { id: 'TK6', title: 'Renovar licença sanitária', description: 'Documentação vence em 30 dias', priority: 'Média', status: 'Em Andamento', dueDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'), assignee: 'Dr. Renato Marano', category: 'Administrativo' },
  { id: 'TK7', title: 'Criar post para Instagram', description: 'Divulgar novo procedimento de bioestimulador', priority: 'Baixa', status: 'Pendente', dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'), assignee: 'Assistente', category: 'Marketing' },
  { id: 'TK8', title: 'Reunião de equipe mensal', description: 'Alinhar metas do mês e avaliar resultados', priority: 'Média', status: 'Pendente', dueDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'), assignee: 'Dr. Renato Marano', category: 'Administrativo' },
  { id: 'TK9', title: 'Cobrar boleto em aberto', description: 'Insumos MedCorp - R$ 2.800 vencendo amanhã', priority: 'Alta', status: 'Pendente', dueDate: today, assignee: 'Financeiro', category: 'Financeiro' },
  { id: 'TK10', title: 'Protocolo pós-procedimento - Beatriz', description: 'Enviar orientações por WhatsApp', priority: 'Baixa', status: 'Concluída', dueDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'), assignee: 'Dra. Julia Costa', category: 'Clínico' },
];

export const INITIAL_REMINDERS: Reminder[] = [
  { id: 'R1', title: 'Confirmação de consulta', message: 'Olá Ana! Confirma sua consulta amanhã às 09h com Dr. Renato? 😊', type: 'Consulta', date: today, time: '16:00', patient: 'Ana Silva', status: 'Ativo', channel: 'WhatsApp' },
  { id: 'R2', title: 'Retorno pós-procedimento', message: 'Olá João! Como você está se sentindo após o procedimento? Precisa de alguma orientação?', type: 'Retorno', date: today, time: '10:00', patient: 'João Pereira', status: 'Enviado', channel: 'WhatsApp' },
  { id: 'R3', title: 'Lembrete de pagamento', message: 'Prezado Ricardo, identificamos uma parcela em aberto. Entre em contato para regularizar.', type: 'Financeiro', date: tomorrow, time: '09:00', patient: 'Ricardo Lima', status: 'Ativo', channel: 'WhatsApp' },
  { id: 'R4', title: 'Alerta estoque crítico', message: 'Ácido Hialurônico com 4 unidades restantes. Realizar pedido urgente.', type: 'Estoque', date: today, time: '08:00', status: 'Enviado', channel: 'Email' },
  { id: 'R5', title: 'Aniversário da paciente', message: 'Parabéns Fernanda! A Clínica RM deseja um feliz aniversário e tem um presente especial pra você! 🎁', type: 'Aniversário', date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), time: '09:00', patient: 'Fernanda Oliveira', status: 'Ativo', channel: 'WhatsApp' },
  { id: 'R6', title: 'Confirmação Carlos Mendes', message: 'Olá Carlos! Seu agendamento para sexta às 15h30 está confirmado. Até lá! 💉', type: 'Consulta', date: tomorrow, time: '14:00', patient: 'Carlos Mendes', status: 'Ativo', channel: 'WhatsApp' },
  { id: 'R7', title: 'Retorno Beatriz Almeida', message: 'Beatriz, faça o retorno 30 dias após o procedimento para avaliação. Quer agendar?', type: 'Retorno', date: format(addDays(new Date(), 3), 'yyyy-MM-dd'), time: '11:00', patient: 'Beatriz Almeida', status: 'Ativo', channel: 'Email' },
];

export const INITIAL_COMMISSIONS: Commission[] = [
  { id: 'C1', professional: 'Dr. Renato Marano', procedure: 'Botox Completo', patient: 'João Pereira', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), totalValue: 2500, commissionRate: 40, commissionValue: 1000, status: 'Pago' },
  { id: 'C2', professional: 'Dra. Julia Costa', procedure: 'Preenchimento Labial', patient: 'Ana Silva', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), totalValue: 1800, commissionRate: 35, commissionValue: 630, status: 'Pago' },
  { id: 'C3', professional: 'Dr. Renato Marano', procedure: 'Harmonização Facial', patient: 'Ana Silva', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), totalValue: 3500, commissionRate: 40, commissionValue: 1400, status: 'Pendente' },
  { id: 'C4', professional: 'Dra. Julia Costa', procedure: 'Skinbooster', patient: 'Juliana Costa', date: format(subDays(new Date(), 8), 'yyyy-MM-dd'), totalValue: 1500, commissionRate: 35, commissionValue: 525, status: 'Pago' },
  { id: 'C5', professional: 'Dr. Renato Marano', procedure: 'Botox + Preenchimento', patient: 'Carlos Mendes', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), totalValue: 4500, commissionRate: 40, commissionValue: 1800, status: 'Pendente' },
  { id: 'C6', professional: 'Dra. Julia Costa', procedure: 'Bioestimulador', patient: 'Beatriz Almeida', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), totalValue: 3200, commissionRate: 35, commissionValue: 1120, status: 'Pendente' },
];

export const INITIAL_DOCUMENTS: Document[] = [
  { id: 'D1', title: 'Receita - Creme Hidratante', type: 'Receita', patient: 'Ana Silva', date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), professional: 'Dr. Renato Marano', status: 'Assinado' },
  { id: 'D2', title: 'Atestado Médico - 2 dias', type: 'Atestado', patient: 'João Pereira', date: format(subDays(new Date(), 14), 'yyyy-MM-dd'), professional: 'Dr. Renato Marano', status: 'Enviado' },
  { id: 'D3', title: 'Termo de Consentimento - Botox', type: 'Termo', patient: 'João Pereira', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), professional: 'Dr. Renato Marano', status: 'Assinado' },
  { id: 'D4', title: 'Laudo Pós-Procedimento', type: 'Laudo', patient: 'Ricardo Lima', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), professional: 'Dra. Julia Costa', status: 'Assinado' },
  { id: 'D5', title: 'Termo de Consentimento - Harmonização', type: 'Termo', patient: 'Ana Silva', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), professional: 'Dr. Renato Marano', status: 'Pendente' },
  { id: 'D6', title: 'Prontuário Completo', type: 'Prontuário', patient: 'Carlos Mendes', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), professional: 'Dr. Renato Marano', status: 'Assinado' },
  { id: 'D7', title: 'Receita - Protetor Solar FPS 70', type: 'Receita', patient: 'Beatriz Almeida', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), professional: 'Dra. Julia Costa', status: 'Enviado' },
];

export const INITIAL_BLOCKS: Block[] = [
  { id: 'BL1', professional: 'Dr. Renato Marano', date: format(addDays(new Date(), 4), 'yyyy-MM-dd'), startTime: '08:00', endTime: '10:00', reason: 'Reunião com fornecedor', recurring: false },
  { id: 'BL2', professional: 'Dra. Julia Costa', date: format(addDays(new Date(), 3), 'yyyy-MM-dd'), startTime: '12:00', endTime: '14:00', reason: 'Almoço com parceiro comercial', recurring: false },
  { id: 'BL3', professional: 'Dr. Renato Marano', date: format(addDays(new Date(), 7), 'yyyy-MM-dd'), startTime: '08:00', endTime: '18:00', reason: 'Congresso de Dermatologia', recurring: false },
  { id: 'BL4', professional: 'Dra. Julia Costa', date: format(addDays(new Date(), 10), 'yyyy-MM-dd'), startTime: '08:00', endTime: '12:00', reason: 'Curso de Atualização', recurring: false },
];
