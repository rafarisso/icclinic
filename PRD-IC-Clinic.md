# PRD IC Clinic

Table of Contents
PRD . IC Clinic App
Product Requirements DocumentCliente:IC Clinic (Dra. Camila Castro)Fornecedor:RR Solutions / Risso TechVersão:1.0 . Demo NavegávelData:Maio de 2026
1. Visão do produto
1.1 Resumo executivo
Aplicativo web progressivo (PWA) exclusivo para as pacientes da IC Clinic, clínica de estética avançada localizada em São Paulo e conduzida pela Dra. Camila Castro. O app não é uma ferramenta genérica de agendamento, é odiário digital da jornada de transformaçãode cada paciente, materializando a promessa de marca“+1.000 vidas transformadas”em uma experiência personalizada, premium e contínua.
1.2 Objetivo desta entrega
Entregar umademo navegável de alta fidelidade, com dados mockados, que reproduza fielmente as 5 telas principais mostradas nas referências visuais fornecidas. A demo deve:
Ser navegável em todas as telas (com transições reais entre elas)
Ter estrutura de código preparada para receber backend Supabase posteriormente sem refatoração
Refletir com fidelidade a identidade visual da IC Clinic (creme, dourado, preto)
Funcionar como PWA instalável em iOS e Android via browser
Ser apresentável no celular de uma cliente real (Dra. Camila) durante uma reunião comercial
1.3 O que esta demo NÃO é
Esta demo NÃO inclui:
Backend real (Supabase será integrado na fase contratual seguinte)
Autenticação real (login mockado com botão“Entrar como Camila”)
Upload real de fotos (galeria do diário usa imagens mockadas)
Pagamentos
Notificações push reais
Painel administrativo
Integração com sistema de gestão da clínica
Estas funcionalidades fazem parte do MVP completo descrito na proposta comercial e serão construídas após o fechamento do contrato.
1.4 Público-alvo
Usuária primária:Paciente da IC Clinic, mulher entre 30 e 55 anos, classe A/B, mora em São Paulo capital, valoriza estética, conhecimento e exclusividade. Usa Instagram diariamente, está acostumada com apps premium (Sephora, Nubank Ultravioleta, Equinox).
Usuária secundária (demo):Dra. Camila Castro, médica empreendedora, decisora pela contratação. Vai navegar pelo app no celular durante reunião comercial. Precisa entender em menos de 3 minutos o valor que o produto traz.
2. Stack técnico
2.1 Framework e ferramentas
Camada
Tecnologia
Versão
Motivo
Build
Vite
5.x
Performance superior em dev
Framework
React
18.x
Stack consolidada do projeto
Linguagem
TypeScript
5.x
Tipagem para reduzir bugs
Estilização
Tailwind CSS
3.x
Velocidade e consistência
Componentes
shadcn/ui
latest
Customizável, sem lock-in
Roteamento
React Router
6.x
Padrão de mercado
Ícones
lucide-react
latest
Estética alinhada à marca
Fontes
Cormorant Garamond + Inter
Google Fonts
Serif premium + sans neutro
PWA
vite-plugin-pwa
latest
Instalável sem fricção
Animações
framer-motion
11.x
Transições suaves
Estado
Zustand
4.x
Simples, prepara para integração futura
Datas
date-fns
3.x
Manipulação leve de datas
2.2 Estrutura de pastas
ic-clinic-app/├── public/│   ├── icons/             # PWA icons (192x192, 512x512)│   ├── mockups/           # Fotos das pacientes mockadas│   └── manifest.json      # PWA manifest├── src/│   ├── assets/│   │   ├── logo.svg│   │   └── images/        # Imagens de procedimentos│   ├── components/│   │   ├── ui/            # shadcn primitives│   │   ├── layout/│   │   │   ├── AppLayout.tsx│   │   │   ├── BottomNav.tsx│   │   │   └── TopBar.tsx│   │   ├── shared/│   │   │   ├── ProcedureCard.tsx│   │   │   ├── JourneyStep.tsx│   │   │   ├── BeforeAfterSlider.tsx│   │   │   ├── ICLogo.tsx│   │   │   └── GoldButton.tsx│   │   └── home/│   │       ├── NextProcedureCard.tsx│   │       ├── QuickActions.tsx│   │       └── PointsCard.tsx│   ├── pages/│   │   ├── HomePage.tsx│   │   ├── ProceduresPage.tsx│   │   ├── SchedulePage.tsx│   │   ├── JourneyPage.tsx│   │   ├── DiaryPage.tsx│   │   └── ProfilePage.tsx│   ├── data/              # CAMADA DE MOCK (importante)│   │   ├── mockUser.ts│   │   ├── mockProcedures.ts│   │   ├── mockJourney.ts│   │   ├── mockDiary.ts│   │   └── mockAppointments.ts│   ├── services/          # CAMADA QUE VAI VIRAR API│   │   ├── userService.ts│   │   ├── procedureService.ts│   │   ├── journeyService.ts│   │   ├── diaryService.ts│   │   └── appointmentService.ts│   ├── hooks/│   │   ├── useUser.ts│   │   ├── useProcedures.ts│   │   └── useJourney.ts│   ├── types/│   │   └── index.ts       # Interfaces TypeScript│   ├── lib/│   │   ├── utils.ts       # cn(), formatters│   │   └── theme.ts       # Design tokens│   ├── store/│   │   └── useAppStore.ts # Estado global (Zustand)│   ├── App.tsx│   ├── main.tsx│   └── index.css├── index.html├── package.json├── tailwind.config.ts├── tsconfig.json└── vite.config.ts
2.3 Camada de abstração de dados (CRÍTICO)
Para que a demo seja substituível por backend Supabase sem refatoração,toda chamada de dados deve passar pela camadaservices/, nunca direto do mock. Os componentes consomemservices, osservicesconsomemmocksagora e vão consumir Supabase depois.
Exemplo de service que deve ser preparado para troca:
// src/services/procedureService.tsimport { mockProcedures } from'@/data/mockProcedures';import { Procedure } from'@/types';// MOCK MODE . trocar por Supabase na fase 2const USE_MOCK =true;exportconst procedureService = {asyncgetAll():Promise<Procedure[]> {if (USE_MOCK) {awaitnewPromise(r =>setTimeout(r,200));// simula latênciareturn mockProcedures;    }// const { data } = await supabase.from('procedures').select('*');// return data;thrownewError('Backend não configurado');  },asyncgetById(id:string):Promise<Procedure |null> {if (USE_MOCK) {return mockProcedures.find(p => p.id=== id) ??null;    }thrownewError('Backend não configurado');  },asyncgetFeatured():Promise<Procedure[]> {if (USE_MOCK) {return mockProcedures.filter(p => p.featured);    }thrownewError('Backend não configurado');  }};
Quando o backend for plugado, basta trocarUSE_MOCK = falsee implementar a chamada Supabase. Os componentes consumidores não mudam.
3. Design System
3.1 Paleta de cores
Baseada fielmente nas referências visuais fornecidas:
Token
Hex
Uso
--ic-cream
#F5EDE0
Background principal das telas claras
--ic-cream-light
#FAF5EC
Background secundário, cards
--ic-cream-dark
#E8DCC8
Bordas suaves
--ic-gold
#B89968
Cor principal de marca
--ic-gold-light
#D4B88A
Hover states, acentos
--ic-gold-dark
#8B6F47
Texto sobre dourado, contraste
--ic-black
#1A1A1A
Texto principal, dark sections
--ic-charcoal
#2D2620
Cards escuros (próximo procedimento)
--ic-white
#FFFFFF
Botões claros, texto sobre dark
--ic-gray-600
#6B6258
Texto secundário
--ic-gray-400
#9B9388
Texto terciário, ícones inativos
--ic-success
#7A9166
Confirmações
--ic-warning
#C9A961
Avisos sutis
3.2 Tipografia
/* Fontes carregadas no index.html */font-family-serif: 'Cormorant Garamond', Georgia, serif;font-family-sans: 'Inter', system-ui, sans-serif;
Hierarquia:
H1 (títulos de tela):Cormorant Garamond, 32px, weight 400, color cream-light em dark / black em cream
H2 (seções):Cormorant Garamond, 24px, weight 500
H3 (cards):Cormorant Garamond, 18px, weight 600
Body:Inter, 14px, weight 400, line-height 1.6
Caption:Inter, 12px, weight 400, color gray-600
Label uppercase:Inter, 10px, weight 600, letter-spacing 0.2em, uppercase
3.3 Espaçamento e bordas
// tailwind.config.ts extensions{  borderRadius: {'ic-sm':'8px','ic-md':'12px','ic-lg':'16px','ic-xl':'24px','ic-pill':'999px',  },  spacing: {'screen-px':'20px',// padding horizontal das telas  }}
3.4 Componentes-chave do design system
3.4.1 ICLogo
Logo da clínica com letra“IC”em serif +“CLINIC”abaixo +“DRA. CAMILA CASTRO”em caps tracking. Tamanhos: small (header), medium (telas), large (splash).
3.4.2 GoldButton
Botão principal da marca. Background dourado (--ic-gold), texto branco, padding generoso, border-radiusic-md. Variantes: solid (default), outline (borda dourada + bg transparente), ghost (só texto dourado).
3.4.3 BottomNav
Navegação inferior fixa com 5 itens: Início, Procedimentos, Jornada, Diário, Perfil. Ícone + label. Estado ativo: ícone dourado, label dourado, com indicador sutil acima. Background com leve transparência e blur sobre o conteúdo.
3.4.4 TopBar
Barra superior com logo IC centralizada e ícone de sino com badge para notificações no canto direito. Sem botão de voltar nas telas principais.
3.4.5 ProcedureCard
Card de procedimento com foto à esquerda (proporção 1:1, border-radius ic-md), informações à direita (nome em serif, descrição curta, duração com ícone de relógio) e botão“Agendar”dourado no canto inferior direito. Badge opcional no topo (“Mais Procurado”ou“Queridinho das Pacientes”) em dourado claro.
3.4.6 JourneyStep
Item de timeline vertical com círculo (estados: concluído com check, em andamento com ponto pulsante, futuro com borda tracejada), conectado por linha. Inclui foto thumbnail à esquerda, título serif, descrição curta, badge de status.
3.4.7 BeforeAfterSlider
Comparador visual com duas fotos sobrepostas. Handle central arrastável (círculo dourado com ícone<>) que revela cada lado. Labels“Antes”e“Depois”em pills douradas nos cantos.
3.4.8 NextProcedureCard
Card escuro (background charcoal) destaque na home, com foto da paciente em procedimento à direita, label“PRÓXIMO PROCEDIMENTO”em dourado, nome do procedimento em serif claro, nome da doutora, data e hora com ícones, botão“Ver detalhes”.
4. Especificação das telas
4.1 Tela 1 . Início (HomePage)
Rota:/
Referência visual:Image 2 (home com saudação e próximo procedimento)
Estrutura vertical (de cima pra baixo):
TopBarcom logo IC centralizado + sino com badge“1”
Saudação personalizada
Foto de perfil circular da paciente (60px) à esquerda
Texto à direita:
“Olá, Camila”em serif 24px
“Bem-vinda de volta!”em sans 13px gray
“Sua jornada de transformação continua aqui.”em sans 13px gray
Card“Seus pontos”à direita extrema: ícone de coroa dourada + número“1.240”+ chevron
NextProcedureCard(card escuro destaque)
Background charcoal
Imagem real à direita: foto de paciente em procedimento (mockupnextProcedure.jpg)
Label“PRÓXIMO PROCEDIMENTO”dourado, tracking
“Skin Booster”em serif claro 22px
“com Dra. Camila Castro”em sans 13px cream-light/70
Linha com ícone calendário +“24 Mai 2026”e ícone relógio +“10:00”
Botão“Ver detalhes >”em outline dourado, pequeno
Quick Actions(grid 4 colunas)
4 botões quadrados pequenos com ícone + label
Itens:“Agendar”(calendar),“Reagendar”(refresh),“Falar com a clínica”(message-circle),“Ver jornada”(bar-chart)
Background cream-light com borda dourada sutil
Pré e Pós-cuidados(2 cards lado a lado)
Card“PRÉ-CUIDADOS”com imagem de produto à direita (mockuppre-care.jpg)
Texto:“Alguns cuidados importantes para o dia do seu procedimento.”
Link“Ver orientações >”
Card“PÓS-CUIDADOS”similar (mockuppost-care.jpg)
Texto:“Seu bem-estar é parte do resultado. Siga as recomendações.”
Para Você(seção)
Label“PARA VOCÊ”+“Ver todos”alinhado à direita
2 cards lado a lado:
“PROTOCOLO”+“Glow IC”+ descrição + foto + link“Conhecer >”
“EM DESTAQUE”+“Harmonização Facial”+ descrição + foto + link“Conhecer >”
Banner final
Card escuro horizontal com imagem da clínica à direita
Texto:“Sua jornada de transformaçãocontinua aqui.”(palavra final em cursive script dourado)
Subtítulo:“Acompanhe sua evolução com exclusividade.”
BottomNavfixa
Dados mockados necessários:
// data/mockUser.tsexportconst mockUser = {  id:'user-1',  firstName:'Camila',  fullName:'Camila Mendes',  avatarUrl:'/mockups/avatar.jpg',  points:1240,  memberSince:'2025-03-15',};// data/mockAppointments.tsexportconst mockNextAppointment = {  id:'apt-1',  procedureName:'Skin Booster',  doctorName:'Dra. Camila Castro',  date:'2026-05-24',  time:'10:00',  imageUrl:'/mockups/skin-booster.jpg',};
4.2 Tela 2 . Procedimentos (ProceduresPage)
Rota:/procedimentos
Referência visual:Image 5 (lista de procedimentos com fotos)
Estrutura:
TopBarcom logo IC
Título“Procedimentos”em serif 32px
Barra de buscacom ícone lupa, placeholder“Buscar procedimento”
Filtros em pills(scroll horizontal se overflow)
“Todos”(ativo, background dourado, texto branco)
“Facial”,“Corporal”,“Capilar”,“Injetáveis”(outline dourado)
Lista de ProcedureCard(vertical, com gap)
Cada card mostrado conforme spec 3.4.5
Cards a incluir, com badges:
Botox Full Face(Mais Procurado), 30-40 min
Bioestimulador de Colágeno, 45-60 min
Skin Booster, 30 min
Preenchimento Labial(Queridinho das Pacientes), 60 min
Harmonização Facial, 90 min
Limpeza de Pele Profunda, 60 min
Rinomodelação, 40 min
Bioestimulador Capilar, 45 min
Banner final
“Protocolos pensados para realçar sua beleza com naturalidade.”
“Resultados acompanhados com exclusividade.”
BottomNav
Dados mockados:
// data/mockProcedures.tsexportconst mockProcedures: Procedure[] = [  {    id:'proc-1',    name:'Botox Full Face',    category:'Injetáveis',    description:'Suaviza rugas e linhas de expressão, proporcionando um rosto mais leve, descansado e natural.',    duration:'30-40 min',    durationMinutes:35,    priceFrom:1800,    imageUrl:'/mockups/proc-botox.jpg',    badge:'Mais Procurado',    featured:true,  },// ... outros procedimentos];
Comportamento:
Click em“Agendar”no card abre/agendar?procedure={id}
Click no card (fora do botão) abre detalhe do procedimento (não implementado nesta demo, mas placeholder com toast“Em breve”)
Filtros aplicam filtro local na lista (não precisa de chamada de service)
Busca filtra por nome (debounce 300ms)
4.3 Tela 3 . Agendar (SchedulePage)
Rota:/agendar(opcional:?procedure={id}pré-seleciona)
Referência visual:Image 3 (calendário com horários)
Estrutura:
TopBarcom logo IC + sino
Título“Agendar consulta”centralizado em serif 28px
Subtítulo“Escolha o melhor momento para a sua próxima etapa.”centralizado em sans 13px gray
Card de procedimento selecionado
Foto circular pequena à esquerda
“Skin Booster”em serif +“com Dra. Camila Castro”em sans cinza
Ícone de chevron para trocar (placeholder visual)
Calendário mensal
Header com nav de mês:<“Maio 2026”>
Linha de dias da semana: DOM SEG TER QUA QUI SEX SAB (em caps small dourado)
Grid de datas (7 colunas, ~6 linhas)
Estados visuais:
Dia normal: número black
Dia indisponível: número gray-400
Dia disponível: número black + pequeno ponto dourado abaixo
Dia selecionado: círculo dourado preenchido, número branco
Dia 14 deve aparecer selecionado por padrão
Horários disponíveis para 14/05
Label em sans 13px black
4 pills horários em linha: 09:00, 10:30 (selecionado, background black, texto cream), 14:00, 16:30
Card de pré-confirmação(bg cream-light com borda dourada)
Ícone de sino à esquerda
Título“Pré-confirmação”em serif dourado
Texto“Você terá 10 minutos para confirmar. Enviaremos um lembrete inteligente para você.”
Resumo do agendamento(card cream)
Ícone de calendário grande à esquerda
Lista bem espaçada:
Procedimento: Skin Booster com Dra. Camila Castro
Data: 14 de maio de 2026
Horário: 10:30
Local: IC Clinic, Vila Nova Conceição
Botão“Confirmar agendamento”dourado grande, full width
Microtexto finalcentralizado:“Sua experiência começa antes da consulta.”
BottomNavcom“Agendar”como item ativo
Comportamento:
Calendário interativo (mudança de mês, seleção de dia)
Datas disponíveis mockadas: dias 4, 6, 8, 13, 14, 15, 16, 21, 22, 23, 28, 29 do mês atual
Horários disponíveis variam por dia (mock simples)
Click em“Confirmar”exibe toast de sucesso e redireciona para Home com novo agendamento
4.4 Tela 4 . Minha Jornada (JourneyPage)
Rota:/jornada
Referência visual:Image 4 (timeline com etapas e fotos)
Estrutura:
TopBarcom logo IC + sino
Título“Minha Jornada”em serif 32px
Subtítulo“Seu protocolo personalizado com Dra. Camila Castro”
Barra de progresso(card cream-light)
Texto:“4 de 5 etapas concluídas”à esquerda,“80%”à direita
Barra horizontal preenchida em dourado degradê
Lista vertical de etapas(timeline com conector lateral)
Cada etapa é um JourneyStep conforme spec 3.4.6:
Avaliação inicial(concluído)
“Consulta e plano personalizado”
Badge“Concluído”
Thumbnail mockup-1.jpg
Bioestimulador(concluído)
“Estímulo de colágeno e firmeza”
Badge“Concluído”
Thumbnail mockup-2.jpg
Botox Full Face(concluído)
“Harmonização e prevenção”
Badge“Concluído”
Thumbnail mockup-3.jpg
Skin Booster(em andamento, com ponto pulsante)
“Hidratação profunda e viço”
Badge“Em andamento”(dourado pulsante)
Thumbnail mockup-4.jpg
Manutenção(futura, com borda tracejada)
“Resultados duradouros”
Badge“Futura etapa”(cinza)
Thumbnail mockup-5.jpg
Banner motivacional
Card cream com ilustração de lótus à esquerda
Quote em serif:“Cada etapa aproxima você da sua melhor versão.”
Texto sans:“Acompanhe resultados e próximos passos com clareza.”
Foto de paciente à direita
BottomNavcom“Jornada”como item ativo
Dados mockados:
// data/mockJourney.tsexportconst mockJourney = {  totalSteps:5,  completedSteps:4,  steps: [    {      id:'step-1',      name:'Avaliação inicial',      description:'Consulta e plano personalizado',      status:'completed',// 'completed' | 'in-progress' | 'future'      thumbnailUrl:'/mockups/journey-1.jpg',      completedAt:'2026-01-15',    },// ...  ],};
4.5 Tela 5 . Diário de Evolução (DiaryPage)
Rota:/diario
Referência visual:Image 1 (diário com comparador antes/depois)
Estrutura:
TopBarcom chevron de voltar à esquerda + logo IC centralizado + sino
Título“Diário de Evolução”em serif 28px centralizado
Subtítulocom ícone de cadeado:“Seu acompanhamento privado e seguro”em sans 12px gray
BeforeAfterSlider(componente principal)
Área retangular, height ~280px, border-radius ic-lg
Duas fotos sobrepostas (antes.jpg e depois.jpg) com clip-path controlado pelo handle
Handle central dourado com ícone<>arrastável horizontalmente
Pills douradas nos cantos inferiores:“Antes”(esquerda) e“Depois”(direita)
Histórico de evolução
Label“Seu histórico de evolução”em sans 14px
Timeline lateral com bolinhas conectadas (mesmo estilo da Journey)
Cards de registro (data à esquerda em coluna, conteúdo + thumbnail à direita)
12/04.“Pele mais viçosa”.“Melhora na luminosidade e textura da pele já perceptível.”. thumb
28/04.“Recuperação excelente”.“Sem intercorrências. Edema reduzido e evolução dentro do esperado.”. thumb
10/05.“Resultado natural e harmônico”.“Contornos mais definidos e expressão leve. Muito satisfeita!”. thumb
Botão“Adicionar novo registro”dourado grande com ícone“+”à esquerda
Footer card(cream-light com borda)
Ícone de escudo dourado à esquerda
Título:“Sua evolução registrada com carinho e discrição”
Texto:“Compare resultados e acompanhe sua transformação ao longo do tempo.”
BottomNavcom“Diário”como item ativo
Dados mockados:
// data/mockDiary.tsexportconst mockDiary = {  beforePhotoUrl:'/mockups/before.jpg',  afterPhotoUrl:'/mockups/after.jpg',  entries: [    {      id:'entry-1',      date:'2026-04-12',      title:'Pele mais viçosa',      description:'Melhora na luminosidade e textura da pele já perceptível.',      thumbnailUrl:'/mockups/diary-1.jpg',    },// ...  ],};
4.6 Tela 6 . Perfil (ProfilePage) . SECUNDÁRIA
Rota:/perfil
Referência visual:Image 6 (overview, card de perfil em destaque)
Tela complementar para completar a navegação. Pode ser implementada mais simples:
TopBarcom logo + ícone de engrenagem
Header de perfil
Foto de perfil grande
Nome“Camila Mendes”
“Paciente IC Clinic”em gray
Botão“Editar perfil”com ícone lápis
Carteira(card destaque cream-light com borda dourada)
Label“Minha carteira”
“Créditos disponíveis”+ valor“R$ 1.250,00”em serif 28px
Ilustração de moeda dourada com logo IC à direita
Botão“Adicionar créditos”dourado
Lista de menu(cards cream com ícones + chevron)
Meus Agendamentos
Meu Histórico
Indique e Ganhe
Documentos e Anamnese
Configurações
BottomNav
5. PWA e responsividade
5.1 Configuração PWA
// vite.config.ts (trecho relevante)import { VitePWA } from'vite-plugin-pwa';exportdefault {  plugins: [VitePWA({      registerType:'autoUpdate',      manifest: {        name:'IC Clinic',        short_name:'IC Clinic',        description:'Sua jornada de transformação',        theme_color:'#1A1A1A',        background_color:'#F5EDE0',        display:'standalone',        orientation:'portrait',        scope:'/',        start_url:'/',        icons: [          { src:'/icons/icon-192.png', sizes:'192x192', type:'image/png' },          { src:'/icons/icon-512.png', sizes:'512x512', type:'image/png' },          { src:'/icons/icon-512-maskable.png', sizes:'512x512', type:'image/png', purpose:'maskable' },        ],      },    }),  ],};
5.2 Viewport e responsividade
Foco mobile-first. Layout otimizado para 375px (iPhone padrão) até 430px (iPhone Pro Max). Em telas maiores que 480px, o conteúdo deve ser centralizado num container com largura máxima de 430px com bordas suaves laterais (simulando moldura de celular num desktop).
/* index.css */@media (min-width: 768px) {  body {background: var(--ic-cream-dark);  }#root {max-width: 430px;margin: 0auto;min-height: 100vh;background: var(--ic-cream);box-shadow: 0060pxrgba(0,0,0,0.1);  }}
5.3 Performance
Imagens otimizadas (WebP quando possível, lazy loading)
Code splitting por rota comReact.lazy+Suspense
Lighthouse score alvo: 90+ em Performance e Best Practices
6. Estado global e navegação
6.1 Store global
Usar Zustand para estado global mínimo:
// src/store/useAppStore.tsinterface AppStore {  user: User |null;  isLoading:boolean;  notifications:Notification[];  setUser: (user: User |null) =>void;  markNotificationsRead: () =>void;}
Tudo que é dado de domínio (procedimentos, jornada, diário) é buscado viaservices/em cada tela, não fica no store.
6.2 Roteamento
// App.tsx<Routes><Route element={<AppLayout />}><Route path="/" element={<HomePage />} /><Route path="/procedimentos" element={<ProceduresPage />} /><Route path="/agendar" element={<SchedulePage />} /><Route path="/jornada" element={<JourneyPage />} /><Route path="/diario" element={<DiaryPage />} /><Route path="/perfil" element={<ProfilePage />} /></Route></Routes>
AppLayoutrenderiza TopBar (condicional) + Outlet + BottomNav fixo.
6.3 Transições
Usarframer-motionpara transições suaves entre rotas (fade + slight slide). Cards interativos devem terwhileTap={{ scale: 0.98 }}para feedback tátil.
7. Mockup de imagens
A demo precisa de imagens reais para reproduzir o visual das referências. Imagens necessárias em/public/mockups/:
Arquivo
Tipo
Onde usado
Sugestão de obtenção
avatar.jpg
Foto perfil mulher 30-40 anos
Home, Perfil
Unsplash, pesquisar“professional woman portrait”
next-procedure.jpg
Mulher fazendo procedimento facial
NextProcedureCard
Unsplash,“facial treatment”
pre-care.jpg
Produto skincare em frasco
Home pré-cuidados
Unsplash,“skincare bottle”
post-care.jpg
Produto creme em tubo
Home pós-cuidados
Unsplash,“skincare cream”
protocol-glow.jpg
Mulher pele radiante closeup
Home Para Você
Unsplash,“glowing skin closeup”
protocol-harmony.jpg
Mulher rosto harmonizado
Home Para Você
Unsplash,“facial harmony”
clinic-banner.jpg
Interior da clínica IC
Home banner final
Foto da própria IC ou Unsplash“luxury clinic”
proc-botox.jpg
Aplicação de botox
Procedimentos
Unsplash,“botox application”
proc-bioestim.jpg
Frasco de Radiesse + paciente
Procedimentos
Unsplash,“collagen treatment”
proc-skinboost.jpg
Skin booster sendo aplicado
Procedimentos
Unsplash,“skin booster”
proc-labios.jpg
Preenchimento labial
Procedimentos
Unsplash,“lip filler”
journey-1.jpgajourney-5.jpg
Etapas de procedimentos
Jornada
Unsplash várias buscas
diary-before.jpg
Antes (rosto natural)
Diário
Unsplash,“natural face no makeup”
diary-after.jpg
Depois (rosto tratado)
Diário
Unsplash,“perfect skin face”
diary-1.jpgadiary-3.jpg
Thumbs do histórico
Diário
Unsplash
coin-ic.png
Moeda dourada com IC
Perfil carteira
Pode ser SVG gerado
Importante:todas as fotos devem ter mulheres jovens-maduras (30-45), pele saudável, sem branding visível de outras marcas, com estética premium (iluminação suave, fundos neutros). Evitar imagens cliché de stock.
8. Mock de dados completos
8.1 Estrutura domockProcedures.ts
Lista completa com pelo menos 8 procedimentos, todos com:- id, name, category, description, duration, durationMinutes, priceFrom, imageUrl, badge (opcional), featured (boolean), longDescription
8.2 Estrutura domockJourney.ts
Protocolo personalizado de 5 etapas com status variado (3 completed, 1 in-progress, 1 future).
8.3 Estrutura domockDiary.ts
3 entradas de diário com data, título, descrição, thumbnailUrl. Mais o par before/after principal.
8.4 Estrutura domockAppointments.ts
1 próximo agendamento (Skin Booster, 24 Mai 2026) + 2 históricos.
9. Critérios de aceitação
A demo será considerada concluída quando:
✅ Todas as 5 telas principais estão navegáveis sem erros (Home, Procedimentos, Agendar, Jornada, Diário) + tela de Perfil simplificada
✅ Visual fiel às 5 imagens de referência (cores, tipografia, layout, espaçamentos)
✅ Funciona como PWA instalável (passa nos checks do Chrome Lighthouse)
✅ BottomNav funcional com indicador de tela ativa
✅ Comparador antes/depois funciona com gesto de arrastar
✅ Calendário de agendamento permite seleção de data e horário
✅ Timeline da jornada exibe corretamente os 3 estados (concluído, em andamento, futuro)
✅ Estrutura de pastas segue exatamente a especificação 2.2
✅ Camadaservices/está abstraída e pronta para troca por Supabase
✅ Lighthouse score Performance >= 85
✅ Funciona corretamente em iPhone Safari e Chrome Android
✅ Nenhum erro no console em uso normal
10. Roadmap pós-demo
Depois que o cliente fechar contrato, a evolução prevista é:
Fase 2 . MVP funcional (4-5 semanas)
Integração com Supabase (auth, db, storage)
Painel administrativo para Dra. Camila e equipe
Upload real de fotos no diário com compressão e LGPD
Notificações push via OneSignal ou similar
Sistema real de pontos e carteira de créditos
Fase 3 . Evoluções
Simulador com IA
Modo Noiva com countdown
Chat direto com a clínica
Análise facial automática
11. Glossário e convenções
Paciente:usuário final do app, cliente da clínica
Procedimento:qualquer serviço estético oferecido (botox, bioestimulador, etc)
Protocolo:sequência personalizada de procedimentos planejada pela doutora
Jornada:experiência completa da paciente ao longo do tempo
Etapa:unidade individual dentro do protocolo/jornada
Convenções de código:
Componentes em PascalCase, arquivos.tsx
Hooks em camelCase com prefixouse
Constantes em UPPER_SNAKE_CASE
Semanyno TypeScript
Imports absolutos com alias@/parasrc/
Tailwind para tudo, evitar CSS inline ou módulos CSS
Sem travessões em textos visíveis (usar vírgula, ponto ou dois pontos)
Fim do PRD.
Em caso de dúvidas durante a implementação, contatar Rafael Risso (linkedin.com/in/rafaeltrisso).
