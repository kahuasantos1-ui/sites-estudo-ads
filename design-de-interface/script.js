/* ===================================================================
   Design de Interface — Central de Revisão
   DADOS (simulado + modo prova + flashcards) e LÓGICA. JS puro. 🇧🇷
=================================================================== */

/* -------------------------------------------------------------------
   1) SIMULADO — versão múltipla escolha (alternativas criadas a partir
   do gabarito do Prof. Renato). correta = índice da certa (começa em 0).
------------------------------------------------------------------- */
const QUESTOES = [
  {
    n: 1,
    enunciado: "Qual é a finalidade principal do Google Stitch?",
    opcoes: [
      "Gerenciar banco de dados em nuvem",
      "Criação e prototipagem de interfaces em alta velocidade",
      "Edição de vídeos com inteligência artificial",
      "Versionamento de código-fonte",
      "Hospedagem de sites estáticos"
    ],
    correta: 1,
    explicacao: "O Stitch usa IA (Gemini) para gerar e prototipar interfaces rapidamente a partir de prompts. A finalidade é a velocidade na criação/prototipagem de UI."
  },
  {
    n: 2,
    enunciado: "Qual a importância prática da persona para os objetivos do negócio?",
    opcoes: [
      "Substituir a equipe de marketing",
      "Definir o orçamento do projeto",
      "Representar, como cliente fictício, o usuário ideal do serviço para guiar as decisões",
      "Armazenar os dados pessoais reais dos clientes",
      "Gerar o código da interface automaticamente"
    ],
    correta: 2,
    explicacao: "A persona é um cliente fictício que representa o usuário ideal. Ela alinha o time sobre para quem se projeta (ex.: no iFood, o cliente típico), guiando features e design."
  },
  {
    n: 3,
    enunciado: "Como se chama a representação baseada em cenários de interação (o caminho do usuário entre as telas)?",
    opcoes: ["Wireframe", "User Flow", "Moodboard", "Sitemap", "Mockup"],
    correta: 1,
    explicacao: "User Flow é o diagrama do fluxo de interação — o caminho do usuário do início ao objetivo. (O wireframe é o esboço de UMA tela; o User Flow conecta as telas.)"
  },
  {
    n: 4,
    enunciado: "Qual princípio afirma que elementos agrupados por proximidade são percebidos como um grupo?",
    opcoes: [
      "Princípio da Similaridade",
      "Princípio da Continuidade",
      "Princípio (Lei) da Proximidade",
      "Princípio do Fechamento",
      "Princípio da Figura-Fundo"
    ],
    correta: 2,
    explicacao: "É o Princípio (ou Lei) da Proximidade, da teoria de Gestalt: itens próximos entre si são lidos como um grupo, mesmo sem bordas ou cores separando."
  },
  {
    n: 5,
    enunciado: "Na psicologia das cores, qual cor está associada à simpatia, harmonia, fidelidade e virtude?",
    opcoes: ["Vermelho", "Verde", "Azul", "Amarelo", "Preto"],
    correta: 2,
    explicacao: "O Azul transmite simpatia, harmonia, fidelidade, confiança e virtude (Eva Heller). Por isso é a cor mais usada por bancos e redes sociais — passa segurança."
  },
  {
    n: 6,
    enunciado: "Qual componente da UI é usado para exibir uma mensagem crítica do sistema (ex.: \"Coloque a senha!\")?",
    opcoes: ["Tooltip", "Dialog Box", "Breadcrumb", "Carousel", "Accordion"],
    correta: 1,
    explicacao: "A Dialog Box (caixa de diálogo / modal) interrompe o fluxo para exibir uma mensagem crítica e exigir uma ação ou decisão do usuário."
  },
  {
    n: 7,
    enunciado: "Qual componente de interação retorna o usuário para a tela inicial?",
    opcoes: ["Logout", "Breadcrumb", "Botão Home", "Splash Screen", "Menu hambúrguer"],
    correta: 2,
    explicacao: "O botão Home leva o usuário de volta à tela inicial do app/site — geralmente representado por um ícone de casa 🏠."
  },
  {
    n: 8,
    enunciado: "Qual recurso é entendido como a finalidade principal do Google Stitch?",
    opcoes: [
      "Compilar código C++",
      "Criar e prototipar interfaces rapidamente (a mesma da questão 1)",
      "Fazer backup de arquivos",
      "Treinar modelos de machine learning",
      "Editar planilhas"
    ],
    correta: 1,
    explicacao: "Mesma resposta da Q1: a finalidade principal do Stitch é a criação e prototipagem de UI em alta velocidade."
  }
];

/* -------------------------------------------------------------------
   2) MODO PROVA — as 8 perguntas EXATAS do professor, com a dica e a
   resposta-modelo (como vai cair na prova: resposta escrita).
------------------------------------------------------------------- */
const PERGUNTAS_PROVA = [
  {
    n: 1,
    pergunta: "Explique a finalidade e as funcionalidades do Google Stitch.",
    dica: "Funcionalidades podem ser umas 3, mas a finalidade é só UMA. Pense nos comandos de texto (letrinhas) e de atualização.",
    resposta: "<strong>Finalidade (uma só):</strong> criação e prototipagem de interfaces em alta velocidade.<br><br><strong>Funcionalidades (ex.):</strong><br>1) Gerar UI a partir de um prompt de texto;<br>2) Atualizar/refinar o design por comando em linguagem natural;<br>3) Exportar o resultado (para o Figma ou como código HTML/CSS)."
  },
  {
    n: 2,
    pergunta: "Qual a importância prática da persona para os objetivos do negócio?",
    dica: "No caso do iFood: por que criar uma persona? Quem é a persona?",
    resposta: "A persona é um <strong>cliente fictício que representa o usuário ideal do serviço</strong>. Ela alinha o time sobre PARA QUEM se está projetando, guiando as decisões de design e a priorização das funcionalidades conforme as necessidades reais desse usuário. No iFood, representa o cliente típico (ex.: alguém sem tempo que quer pedir comida rápido)."
  },
  {
    n: 3,
    pergunta: "Qual o nome da representação baseada em cenários de interação? (workflows — aula em que usamos o Miro)",
    dica: "Informar o nome.",
    resposta: "<strong>User Flow</strong> — o diagrama do caminho que o usuário percorre entre as telas até atingir o objetivo."
  },
  {
    n: 4,
    pergunta: "Qual o princípio que afirma que os itens agrupados por proximidade se organizam visualmente como um grupo?",
    dica: "Gestalt → Alinhamento, Proximidade, Repetição, Frequência.",
    resposta: "<strong>Princípio (ou Lei) da Proximidade</strong> — da teoria de Gestalt: elementos próximos entre si são percebidos como um grupo."
  },
  {
    n: 5,
    pergunta: "Na psicologia das cores, qual cor está associada à simpatia, harmonia, fidelidade e virtude?",
    dica: "Informar a cor (uma só!).",
    resposta: "<strong>Azul.</strong>"
  },
  {
    n: 6,
    pergunta: "Qual componente da UI é utilizado para exibir uma mensagem crítica do sistema? Ex.: \"Coloque a senha!\"",
    dica: "Aparece uma \"caixinha\" — tem um nome específico (Box... alguma coisa).",
    resposta: "<strong>Dialog Box</strong> (caixa de diálogo / modal) — interrompe o fluxo para exibir a mensagem crítica e exigir uma ação do usuário."
  },
  {
    n: 7,
    pergunta: "Qual o nome do componente de interação que retorna o usuário para a tela inicial?",
    dica: "UI → um botão que leva para a tela inicial.",
    resposta: "<strong>Home</strong> (botão Home) — leva o usuário de volta à tela inicial."
  },
  {
    n: 8,
    pergunta: "Qual recurso do Google Stitch é entendido como a sua finalidade principal?",
    dica: "A finalidade é só uma.",
    resposta: "A mesma da questão 1: <strong>criação e prototipagem de interfaces em alta velocidade</strong>."
  }
];

/* -------------------------------------------------------------------
   3) FLASHCARDS — frente (conceito) / verso (resposta)
------------------------------------------------------------------- */
const FLASHCARDS = [
  { frente: "Google Stitch — finalidade", verso: "Criação e prototipagem de interfaces em alta velocidade (ferramenta de IA do Google)." },
  { frente: "Google Stitch — funcionalidades", verso: "Gerar UI por texto, atualizar por comando e exportar (Figma / código)." },
  { frente: "Persona", verso: "Cliente fictício que representa o usuário ideal do serviço." },
  { frente: "User Flow", verso: "Representação baseada em cenários de interação: o caminho do usuário entre as telas." },
  { frente: "Lei da Proximidade (Gestalt)", verso: "Elementos próximos entre si são percebidos como um grupo." },
  { frente: "Azul", verso: "Psicologia das cores: simpatia, harmonia, fidelidade, virtude e confiança." },
  { frente: "Dialog Box", verso: "Componente que exibe mensagem crítica do sistema (ex.: \"Coloque a senha!\")." },
  { frente: "Botão Home", verso: "Componente que retorna o usuário para a tela inicial 🏠." },
  { frente: "Gestalt", verso: "Teoria da percepção visual: o todo é mais que a soma das partes." },
  { frente: "Wireframe", verso: "Esboço de baixa fidelidade da estrutura de UMA tela." },
  { frente: "UX", verso: "User Experience: como o usuário sente e interage com o produto." },
  { frente: "Regra 60-30-10", verso: "60% cor dominante, 30% secundária, 10% de destaque." },
  { frente: "Eva Heller — luxo e poder", verso: "Acordes cromáticos: preto, dourado e prata." },
  { frente: "Vermelho", verso: "Paixão, energia, urgência, perigo." },
  { frente: "Responsividade", verso: "Interface que se adapta a cada tamanho de tela." },
  { frente: "Grid de 8px", verso: "Usar múltiplos de 8 para espaçamento e alinhamento (Figma)." }
];

/* ===================================================================
   4) LÓGICA DO SITE
=================================================================== */

/* --- Navegação entre as seções --- */
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
document.querySelectorAll("[data-jump]").forEach(btn =>
  btn.addEventListener("click", () => mostrarView(btn.dataset.jump))
);

/* --- Monta o simulado --- */
const quizEl = document.getElementById("quiz");
const letras = ["A", "B", "C", "D", "E"];

QUESTOES.forEach(q => {
  const bloco = document.createElement("div");
  bloco.className = "question";

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
    <div class="options">${opcoesHTML}</div>
    <div class="explain"><strong>Por quê:</strong> ${q.explicacao}</div>
  `;
  quizEl.appendChild(bloco);
});

/* --- Seleção + barra de progresso --- */
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

quizEl.addEventListener("change", e => {
  if (e.target.type !== "radio") return;
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

    opcoes[q.correta].classList.add("correct");

    if (escolhida) {
      const valor = Number(escolhida.value);
      if (valor === q.correta) acertos++;
      else opcoes[valor].classList.add("wrong");
    }
    bloco.querySelector(".explain").classList.add("show");
  });

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

/* --- Refazer --- */
document.getElementById("btnRefazer").addEventListener("click", () => {
  document.querySelectorAll("input[type=radio]").forEach(r => (r.checked = false));
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected", "correct", "wrong"));
  document.querySelectorAll(".explain").forEach(e => e.classList.remove("show"));
  resultadoEl.hidden = true;
  atualizarProgresso();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* --- Monta o Modo Prova (perguntas reveláveis) --- */
const provaEl = document.getElementById("provaLista");

PERGUNTAS_PROVA.forEach(p => {
  const item = document.createElement("div");
  item.className = "prova-item";
  item.innerHTML = `
    <div class="prova-head">
      <span class="prova-num">${p.n}</span>
      <span class="prova-pergunta">${p.pergunta}</span>
    </div>
    <div class="prova-dica">${p.dica}</div>
    <button class="prova-btn">👁️ Ver resposta</button>
    <div class="prova-resposta">${p.resposta}</div>
  `;
  // botão revela/esconde a resposta daquela pergunta
  const btn = item.querySelector(".prova-btn");
  const resp = item.querySelector(".prova-resposta");
  btn.addEventListener("click", () => {
    const aberto = resp.classList.toggle("show");
    btn.textContent = aberto ? "🙈 Esconder resposta" : "👁️ Ver resposta";
  });
  provaEl.appendChild(item);
});

/* --- Flashcards --- */
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
