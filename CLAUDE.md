# IC Clinic App

## Projeto

Nome do projeto: IC Clinic App.

Cliente: Dra. Camila Castro, IC Clinic, São Paulo.

Proposta do app: experiência premium para pacientes de estética, com agendamento, jornada de transformação, diário de evolução, histórico de procedimentos e simulação estética com IA.

## Identidade Visual Aprovada

O app deve manter estética premium, clínica, elegante, feminina e sofisticada.

Paleta principal:

- Off-white
- Creme
- Nude
- Dourado/champagne
- Preto suave/cinza escuro
- Tons neutros

Estilo:

- Luxo discreto
- Visual clean
- Bastante respiro
- Cantos arredondados
- Sombras suaves
- Cards elegantes
- Tipografia refinada

Evitar:

- Visual exagerado
- Cores fortes
- Interface genérica de clínica popular
- Textos alarmistas
- Promessas médicas
- Linguagem de diagnóstico automático

## Linguagem

A comunicação deve ser acolhedora, premium, segura e objetiva.

Use termos como:

- Simulação ilustrativa
- Prévia visual
- Possibilidades estéticas
- Apoio para avaliação
- Resultado sujeito à avaliação profissional

Evite termos como:

- Resultado garantido
- Veja exatamente como ficará
- Previsão real
- Diagnóstico
- Recomendação médica automática

## Regra Médica e Comercial

Toda simulação estética com IA deve ser apresentada como simulação ilustrativa e nunca como promessa de resultado real.

Texto obrigatório em fluxos de simulação:

> Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.

## LGPD

Imagens de pacientes são dados sensíveis e precisam ser tratadas com consentimento, segurança e cuidado.

Regras para o MVP público:

- Solicitar consentimento explícito antes de gerar simulação.
- Usar a imagem exclusivamente para a prévia ilustrativa.
- Não salvar imagens públicas permanentemente nesta fase.
- Nunca expor chaves de API no frontend.
- Guardar chaves apenas em variáveis de ambiente do backend.

Texto de consentimento:

> Autorizo o uso desta imagem exclusivamente para gerar uma simulação estética ilustrativa.

Aviso adicional:

> As imagens enviadas são tratadas como dados sensíveis. A simulação não substitui avaliação profissional.

## Arquitetura

Frontend:

- React
- Vite
- TypeScript
- Tailwind
- React Router
- Framer Motion
- Zustand

Backend:

- Netlify Functions para endpoints seguros.
- OpenAI Images API somente pelo backend.
- Supabase planejado para próxima etapa de dados persistentes.

Endpoint planejado para simulação:

- `/api/generate-simulation`

Variáveis de ambiente necessárias:

- `OPENAI_API_KEY`
- `OPENAI_IMAGE_MODEL`

## Painel da Clínica

Planejar uma área interna para a equipe da IC Clinic com:

- Dashboard da clínica
- Lista de pacientes
- Perfil da paciente
- Linha do tempo de procedimentos
- Upload de fotos autorizadas
- Histórico de simulações

Dados futuros devem considerar:

- `patients`
- `patient_photos`
- `procedures`
- `patient_timeline`
- `ai_simulations`

