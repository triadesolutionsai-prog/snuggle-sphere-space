A Clínica RM está atualmente em uma estrutura de "esqueleto" com a navegação básica pronta, mas sem os dados e funcionalidades completas solicitadas. Vou implementar os módulos principais com dados simulados e interatividade para que o sistema pareça e funcione como uma plataforma real.

### 1. Motor de Dados Mock
* Criar um arquivo central de dados iniciais (`src/lib/mock-data.ts`) com pacientes, leads do CRM, agendamentos, produtos em estoque e transações financeiras.
* Atualizar o `AppContext` para carregar esses dados e permitir operações de CRUD locais.

### 2. Dashboard Dinâmico
* Vincular os KPIs do Dashboard ao estado global (ex: calcular faturamento total, taxa de conversão do CRM, faltas).
* Adicionar gráficos reais usando Recharts.

### 3. Módulo CRM (Funil de Vendas)
* Implementar a visualização de funil (Kanban) com colunas: Lead, Consulta, Orçamento, Fechado.
* Adicionar funcionalidade de "arrastar" (simulada ou via clique) para mudar status.

### 4. Módulo Agenda & Agendamentos
* Criar uma visualização de calendário funcional para gerenciar horários.
* Implementar o modal de "Novo Agendamento".

### 5. Prontuário Eletrônico
* Expandir a página de pacientes para incluir uma visão detalhada (Prontuário) com anamnese, histórico de tratamentos e arquivos.

### 6. Módulos Auxiliares (Financeiro, Estoque, Tarefas)
* Implementar tabelas interativas e filtros.
* Adicionar os botões de automação (WhatsApp, Envio de Boleto, etc.).

### Detalhes Técnicos
* UI baseada em **Shadcn UI** e **Lucide Icons**.
* Gerenciamento de estado 100% via **React useReducer**.
* Design focado no esquema **Navy Blue & Gold** solicitado.
