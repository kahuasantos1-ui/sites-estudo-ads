/* ===================================================================
   Desenvolvimento Ágil de Software — Central de Revisão
   DADOS (simulado + flashcards) e LÓGICA do site. JS puro. 🇧🇷
=================================================================== */

/* -------------------------------------------------------------------
   1) SIMULADO — as 19 questões da revisão do professor.
   correta = índice da alternativa certa (começa em 0 = letra A).
------------------------------------------------------------------- */
const QUESTOES = [
  {
    n: 1,
    enunciado: "O Manifesto Ágil valoriza:",
    opcoes: [
      "Processos rígidos mais que adaptação contínua.",
      "Documentação extensa mais que software funcional.",
      "Colaboração com o cliente mais que negociação contratual.",
      "Planejamento fixo mais que mudanças.",
      "Ferramentas mais que pessoas."
    ],
    correta: 2,
    explicacao: "Os 4 valores do manifesto: indivíduos e interações > processos; software funcionando > documentação; colaboração com o cliente > negociação contratual; responder a mudanças > seguir um plano. Só a alternativa C mantém a ordem certa — as outras invertem os valores."
  },
  {
    n: 2,
    enunciado: "No Scrum, o responsável por remover impedimentos da equipe e garantir a correta aplicação do framework é o:",
    opcoes: ["Product Owner", "Scrum Master", "Desenvolvedor Front-end", "Analista de Testes", "Gerente Financeiro"],
    correta: 1,
    explicacao: "O Scrum Master facilita o processo, remove impedimentos e protege o time. O Product Owner cuida do VALOR do produto (backlog) — não do processo."
  },
  {
    n: 3,
    enunciado: "No Kanban, limitar o WIP (Work in Progress) ajuda a:",
    opcoes: [
      "Aumentar tarefas simultâneas.",
      "Eliminar reuniões diárias.",
      "Melhorar fluxo de trabalho e reduzir gargalos.",
      "Eliminar backlog.",
      "Substituir metodologias ágeis."
    ],
    correta: 2,
    explicacao: "Limitar o WIP reduz a multitarefa (que gera custo de troca de contexto), melhora o fluxo e expõe gargalos. \"Pare de começar, comece a terminar.\""
  },
  {
    n: 4,
    enunciado: "A principal função da Integração Contínua (CI) é:",
    opcoes: [
      "Realizar deploy manual.",
      "Integrar código frequentemente com testes automatizados.",
      "Eliminar versionamento Git.",
      "Evitar automação.",
      "Substituir Docker."
    ],
    correta: 1,
    explicacao: "CI = integrar código com frequência (vários commits por dia) e validar cada integração com build + testes automatizados. O erro aparece em minutos, não semanas depois."
  },
  {
    n: 5,
    enunciado: "Na Implantação Contínua (Continuous Deployment):",
    opcoes: [
      "O deploy depende sempre de aprovação manual.",
      "Não existem pipelines automatizados.",
      "O deploy ocorre automaticamente após validações automatizadas.",
      "Não existem testes automatizados.",
      "O processo ocorre apenas localmente."
    ],
    correta: 2,
    explicacao: "Continuous DEPLOYMENT = deploy 100% automático após os testes passarem. A diferença pro Continuous DELIVERY é justamente essa: no Delivery o deploy final ainda tem aprovação manual."
  },
  {
    n: 6,
    enunciado: "Sobre Docker, assinale a alternativa correta:",
    opcoes: [
      "Containers são mais pesados que máquinas virtuais.",
      "Docker funciona apenas em Windows.",
      "Imagens Docker servem como modelo para criação de containers.",
      "Docker elimina necessidade de sistemas operacionais.",
      "Containers exigem hardware dedicado."
    ],
    correta: 2,
    explicacao: "A imagem é o template imutável (a receita); o container é a instância em execução (o bolo). Containers são mais LEVES que VMs, rodam em qualquer S.O. e compartilham o kernel do host — não eliminam o S.O. nem exigem hardware dedicado."
  },
  {
    n: 7,
    enunciado: "O Kubernetes é utilizado principalmente para:",
    opcoes: [
      "Criar interfaces desktop.",
      "Gerenciar containers em larga escala.",
      "Criar bancos de dados relacionais.",
      "Substituir GitHub.",
      "Desenvolver APIs REST."
    ],
    correta: 1,
    explicacao: "Kubernetes é um ORQUESTRADOR de containers: automatiza implantação, dimensionamento e gestão de centenas/milhares de containers. É o \"maestro\" da orquestra."
  },
  {
    n: 8,
    enunciado: "O objetivo do Teste de Integração é:",
    opcoes: [
      "Testar módulos isoladamente.",
      "Validar comunicação entre componentes integrados.",
      "Testar apenas interface gráfica.",
      "Eliminar testes unitários.",
      "Verificar apenas performance."
    ],
    correta: 1,
    explicacao: "Teste unitário = peça sozinha. Teste de integração = peças CONVERSANDO entre si. Se a questão fala em \"comunicação entre componentes\", é integração."
  },
  {
    n: 9,
    enunciado: "No Git, o comando utilizado para enviar alterações locais para o repositório remoto é:",
    opcoes: ["git clone", "git pull", "git push", "git init", "git status"],
    correta: 2,
    explicacao: "push = empurrar (manda pro servidor). pull = puxar (traz do servidor). clone copia o repo, init cria um novo, status mostra o estado dos arquivos."
  },
  {
    n: 10,
    enunciado: "Uma pipeline CI/CD busca principalmente:",
    opcoes: [
      "Reduzir automação.",
      "Automatizar integração, testes e entrega de software.",
      "Eliminar versionamento.",
      "Substituir containers.",
      "Impedir deploy contínuo."
    ],
    correta: 1,
    explicacao: "A pipeline é a esteira automatizada: commit → build → testes → entrega. Tudo que era manual e demorado vira automático e rastreável."
  },
  {
    n: 11,
    enunciado: "Uma equipe utiliza Scrum com sprints de 2 semanas. Ao final de cada sprint, deve ocorrer:",
    opcoes: [
      "Exclusivamente documentação técnica.",
      "Entrega incremental potencialmente utilizável do produto.",
      "Encerramento definitivo do projeto.",
      "Exclusão do backlog.",
      "Deploy obrigatório em produção."
    ],
    correta: 1,
    explicacao: "Cada sprint termina com um INCREMENTO potencialmente utilizável — algo funcional que o cliente pode ver/usar. Não é obrigatório fazer deploy, mas precisa estar \"pronto pra entregar\"."
  },
  {
    n: 12,
    enunciado: "Uma empresa deseja garantir que aplicações funcionem igualmente em:",
    contexto: "<ul><li><strong>Desenvolvimento;</strong></li><li><strong>Homologação;</strong></li><li><strong>Produção.</strong></li></ul><p>A melhor solução é:</p>",
    opcoes: [
      "Virtualização manual.",
      "Containers Docker.",
      "Apenas máquinas físicas.",
      "Versionamento sem automação.",
      "Deploy local."
    ],
    correta: 1,
    explicacao: "Containers empacotam app + dependências numa unidade que roda IGUAL em qualquer ambiente. É exatamente o problema que o Docker nasceu pra resolver."
  },
  {
    n: 13,
    enunciado: "O principal benefício do versionamento com Git é:",
    opcoes: [
      "Eliminar necessidade de equipe.",
      "Permitir controle e rastreamento de alterações no código.",
      "Substituir testes automatizados.",
      "Eliminar conflitos de código.",
      "Automatizar containers."
    ],
    correta: 1,
    explicacao: "Git registra quem mudou, o quê, quando e por quê — e permite voltar pra qualquer versão. Cuidado: Git NÃO elimina conflitos (merge conflicts existem!), ele ajuda a gerenciá-los."
  },
  {
    n: 14,
    enunciado: "Em Kubernetes, Auto-scaling significa:",
    opcoes: [
      "Reduzir automaticamente código-fonte.",
      "Aumentar ou reduzir containers conforme demanda.",
      "Eliminar balanceamento de carga.",
      "Criar bancos de dados automaticamente.",
      "Substituir pipelines CI/CD."
    ],
    correta: 1,
    explicacao: "O k8s monitora o uso de CPU e cria ou destrói pods automaticamente. Ex.: Black Friday — escala de 10 pra 100 pods no pico e volta ao normal depois."
  },
  {
    n: 15,
    enunciado: "O conceito de Self-healing em Kubernetes permite:",
    opcoes: [
      "Recuperação automática de containers com falha.",
      "Exclusão automática do código-fonte.",
      "Eliminar necessidade de monitoramento.",
      "Substituir Docker.",
      "Remover testes automatizados."
    ],
    correta: 0,
    explicacao: "Self-healing = auto-cura. Se um container trava ou um servidor cai, o k8s percebe que o estado real difere do desejado e reinicia o container em um node saudável — sem intervenção humana."
  },
  {
    n: 16,
    enunciado: "Uma empresa sofre frequentemente com:",
    contexto: "<ul><li><strong>\"Funciona na minha máquina\";</strong></li><li><strong>Conflitos de dependências;</strong></li><li><strong>Diferenças entre ambientes.</strong></li></ul><p>A solução MAIS adequada envolve:</p>",
    opcoes: [
      "Apenas Git.",
      "Docker e padronização de ambientes.",
      "Exclusivamente Scrum.",
      "Apenas testes manuais.",
      "Exclusivamente Kanban."
    ],
    correta: 1,
    explicacao: "Os 3 sintomas listados são a definição do problema que o Docker resolve: o container leva junto todas as dependências, então o ambiente é idêntico em qualquer máquina."
  },
  {
    n: 17,
    enunciado: "Uma startup possui crescimento acelerado e precisa:",
    contexto: "<ul><li><strong>escalabilidade;</strong></li><li><strong>alta disponibilidade;</strong></li><li><strong>recuperação automática de falhas.</strong></li></ul><p>A tecnologia MAIS adequada é:</p>",
    opcoes: ["Kubernetes.", "GitHub.", "HTML.", "Scrum Board.", "SQL Server."],
    correta: 0,
    explicacao: "Escalabilidade = auto-scaling; alta disponibilidade = orquestração + balanceamento; recuperação automática = self-healing. Os três são exatamente os superpoderes do Kubernetes."
  },
  {
    n: 18,
    enunciado: "Uma pipeline CI/CD madura reduz principalmente:",
    opcoes: [
      "Automação.",
      "Frequência de deploys.",
      "Erros humanos e tempo de entrega.",
      "Controle de versão.",
      "Testes automatizados."
    ],
    correta: 2,
    explicacao: "Automatizar passos manuais elimina erro humano e acelera o caminho até produção. Pegadinha: a pipeline AUMENTA a frequência de deploys, a automação e os testes — ela só REDUZ erros e tempo."
  },
  {
    n: 19,
    enunciado: "No contexto DevOps, a principal integração entre desenvolvimento e operações busca:",
    opcoes: [
      "Separar totalmente equipes.",
      "Aumentar burocracia operacional.",
      "Melhorar colaboração, automação e entrega contínua.",
      "Eliminar monitoramento.",
      "Reduzir qualidade do software."
    ],
    correta: 2,
    explicacao: "DevOps = Dev + Ops trabalhando JUNTOS, com automação e entrega contínua. É a cultura que une tudo: Scrum organiza, Git versiona, Docker padroniza, k8s escala e CI/CD automatiza."
  }
];

/* -------------------------------------------------------------------
   2) FLASHCARDS — 18 cards pra fixação rápida
------------------------------------------------------------------- */
const FLASHCARDS = [
  { frente: "Manifesto Ágil", verso: "4 valores: indivíduos > processos · software funcionando > documentação · colaboração com cliente > contratos · responder a mudanças > seguir plano." },
  { frente: "Scrum Master", verso: "Remove impedimentos, facilita o processo e garante a correta aplicação do framework. Protege o time." },
  { frente: "Product Owner", verso: "Maximiza o valor do produto gerenciando o Product Backlog. Cuida do O QUÊ, não do como." },
  { frente: "Sprint", verso: "Ciclo fixo de 2–4 semanas. Ao final: entrega incremental potencialmente utilizável do produto." },
  { frente: "WIP (Kanban)", verso: "Work in Progress — limite máximo de tarefas por coluna. Limitar o WIP melhora o fluxo e reduz gargalos." },
  { frente: "Lead Time × Cycle Time", verso: "Lead Time: do pedido do cliente até a entrega (total). Cycle Time: do início do trabalho até terminar (execução)." },
  { frente: "git push", verso: "Envia as alterações locais (commits) para o repositório remoto. push = empurrar pro servidor." },
  { frente: "4 áreas do Git", verso: "Working Directory → Staging Area → Repositório Local → Remoto (GitHub/GitLab)." },
  { frente: "Benefício do Git", verso: "Controle e rastreamento de alterações: quem mudou, o quê, quando, por quê — com rollback pra qualquer versão." },
  { frente: "Imagem Docker × Container", verso: "Imagem = modelo imutável (receita). Container = instância em execução criada da imagem (bolo assado)." },
  { frente: "Container × VM", verso: "Container é mais LEVE: compartilha o kernel do host, não emula hardware. VM carrega um S.O. inteiro." },
  { frente: "\"Funciona na minha máquina\"", verso: "Problema de diferenças entre ambientes. Solução: Docker + padronização — o container leva as dependências junto." },
  { frente: "Kubernetes (k8s)", verso: "Orquestrador: gerencia containers em larga escala. Automatiza implantação, dimensionamento e gestão." },
  { frente: "Pod", verso: "A menor unidade do Kubernetes. Contém 1+ containers que compartilham IP e recursos. Container = pessoa, pod = casa." },
  { frente: "Auto-scaling", verso: "k8s aumenta ou reduz containers automaticamente conforme a demanda (monitora CPU). Ex.: Black Friday." },
  { frente: "Self-healing", verso: "Recuperação automática: container caiu → k8s reinicia em um servidor saudável, sem intervenção humana." },
  { frente: "CI — Integração Contínua", verso: "Integrar código frequentemente com testes automatizados. Cada commit dispara build + testes." },
  { frente: "Delivery × Deployment", verso: "Continuous Delivery: pronto pra produção, deploy com aprovação MANUAL. Continuous Deployment: deploy AUTOMÁTICO após validações." }
];

/* ===================================================================
   3) LÓGICA DO SITE
=================================================================== */

/* --- Navegação entre as seções (Resumão / Simulado / Desafio / Flashcards) --- */
const navBtns = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");
const heroEl = document.querySelector(".hero");

function mostrarView(alvo) {
  views.forEach(v => v.classList.toggle("active", v.id === alvo));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.target === alvo));
  // o hero (capa) só aparece no Resumão; nas outras abas vai direto pro conteúdo
  heroEl.style.display = (alvo === "resumo") ? "" : "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navBtns.forEach(btn => btn.addEventListener("click", () => mostrarView(btn.dataset.target)));
// botões do hero que pulam pra uma seção
document.querySelectorAll("[data-jump]").forEach(btn =>
  btn.addEventListener("click", () => mostrarView(btn.dataset.jump))
);

/* --- Monta o simulado na tela --- */
const quizEl = document.getElementById("quiz");

QUESTOES.forEach(q => {
  const bloco = document.createElement("div");
  bloco.className = "question";
  bloco.dataset.correta = q.correta;

  // monta as alternativas (A, B, C...)
  const letras = ["A", "B", "C", "D", "E"];
  const opcoesHTML = q.opcoes.map((texto, i) => `
    <label class="option" data-i="${i}">
      <input type="radio" name="q${q.n}" value="${i}" />
      <span><strong>${letras[i]})</strong> ${texto}</span>
    </label>
  `).join("");

  bloco.innerHTML = `
    <div class="question-head">
      <span class="q-num">${q.n}</span>
      <span class="q-text">${q.enunciado}</span>
    </div>
    ${q.contexto ? `<div class="q-context">${q.contexto}</div>` : ""}
    <div class="options">${opcoesHTML}</div>
    <div class="explain"><strong>Por quê:</strong> ${q.explicacao}</div>
  `;
  quizEl.appendChild(bloco);
});

/* --- Destaque visual ao selecionar + atualizar barra de progresso --- */
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

quizEl.addEventListener("change", e => {
  if (e.target.type !== "radio") return;
  // tira o .selected das opções irmãs e marca a escolhida
  const grupo = e.target.closest(".options");
  grupo.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  e.target.closest(".option").classList.add("selected");
  atualizarProgresso();
});

function atualizarProgresso() {
  const respondidas = QUESTOES.filter(q => document.querySelector(`input[name="q${q.n}"]:checked`)).length;
  const pct = (respondidas / QUESTOES.length) * 100;
  progressBar.style.width = pct + "%";
  progressText.textContent = `${respondidas} / ${QUESTOES.length} respondidas`;
}

/* --- Corrigir o simulado --- */
const resultadoEl = document.getElementById("resultado");

document.getElementById("btnCorrigir").addEventListener("click", () => {
  let acertos = 0;

  document.querySelectorAll(".question").forEach((bloco, idx) => {
    const q = QUESTOES[idx];
    const escolhida = bloco.querySelector("input:checked");
    const opcoes = bloco.querySelectorAll(".option");

    // sempre pinta a correta de verde
    opcoes[q.correta].classList.add("correct");

    if (escolhida) {
      const valor = Number(escolhida.value);
      if (valor === q.correta) {
        acertos++;
      } else {
        // pinta a errada que o aluno marcou de vermelho
        opcoes[valor].classList.add("wrong");
      }
    }
    // mostra a explicação
    bloco.querySelector(".explain").classList.add("show");
  });

  // monta o card de resultado
  const total = QUESTOES.length;
  const pct = Math.round((acertos / total) * 100);
  let classe = "bad", msg = "Bora revisar o resumão e tentar de novo! 💪";
  if (pct >= 70) { classe = "mid"; msg = "Quase lá! Revisa as que errou. 👀"; }
  if (pct >= 90) { classe = "good"; msg = "Mandou bem demais! Tá pronto pra prova. 🎉"; }

  resultadoEl.innerHTML = `
    <h3>Resultado do simulado</h3>
    <div class="score ${classe}">${acertos}/${total}</div>
    <p><strong>${pct}% de acerto.</strong> ${msg}</p>
  `;
  resultadoEl.hidden = false;
  resultadoEl.scrollIntoView({ behavior: "smooth", block: "center" });
});

/* --- Refazer o simulado --- */
document.getElementById("btnRefazer").addEventListener("click", () => {
  document.querySelectorAll("input[type=radio]").forEach(r => (r.checked = false));
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected", "correct", "wrong"));
  document.querySelectorAll(".explain").forEach(e => e.classList.remove("show"));
  resultadoEl.hidden = true;
  atualizarProgresso();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* --- Desafio: mostrar/esconder a resposta-modelo --- */
const btnGabarito = document.getElementById("btnGabarito");
const gabaritoDesafio = document.getElementById("gabaritoDesafio");
btnGabarito.addEventListener("click", () => {
  const aberto = !gabaritoDesafio.hidden;
  gabaritoDesafio.hidden = aberto;
  btnGabarito.textContent = aberto ? "Ver resposta-modelo ↓" : "Esconder resposta ↑";
});

/* --- Flashcards: montar e virar ao clicar --- */
const cardsEl = document.getElementById("cards");
FLASHCARDS.forEach(fc => {
  const card = document.createElement("div");
  card.className = "flashcard";
  card.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-face flashcard-front">${fc.frente}</div>
      <div class="flashcard-face flashcard-back">
        <span class="fc-term">${fc.frente}</span>
        <span>${fc.verso}</span>
      </div>
    </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  cardsEl.appendChild(card);
});
