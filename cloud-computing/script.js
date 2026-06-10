/* ===================================================================
   Cloud Computing — Central de Revisão
   Aqui ficam os DADOS (questões + flashcards) e a LÓGICA do site.
   Tudo em JS puro, sem biblioteca. Comentado em PT-BR. 🇧🇷
=================================================================== */

/* -------------------------------------------------------------------
   1) BANCO DE QUESTÕES
   Cada questão tem:
   - n: número
   - enunciado: a pergunta
   - contexto: (opcional) requisitos em lista, quando a questão tem bullets
   - opcoes: array de alternativas
   - correta: índice da alternativa certa (começa em 0!)
   - explicacao: o "porquê" da resposta
------------------------------------------------------------------- */
const QUESTOES = [
  {
    n: 1,
    enunciado: "Uma plataforma de streaming percebe aumento repentino de usuários durante o lançamento de uma série, criando automaticamente novos servidores temporários para suportar os acessos. Esse comportamento caracteriza:",
    opcoes: ["Escalabilidade vertical", "Elasticidade", "Backup incremental", "Replicação síncrona", "Virtualização local"],
    correta: 1,
    explicacao: "Elasticidade é crescer e encolher recursos automaticamente, em tempo real, conforme a demanda. Criar servidores no pico e desligar depois é o exemplo clássico."
  },
  {
    n: 2,
    enunciado: "Sobre os modelos de serviço em Computação em Nuvem, é correto o que se afirma em:",
    contexto: "<ul><li><strong>I.</strong> SaaS fornece software pronto para uso ao cliente.</li><li><strong>II.</strong> IaaS oferece maior controle sobre a infraestrutura virtual.</li><li><strong>III.</strong> PaaS exige que o cliente gerencie o hardware físico.</li></ul>",
    opcoes: ["I apenas", "I e II apenas", "II e III apenas", "I e III apenas", "I, II e III"],
    correta: 1,
    explicacao: "I e II estão corretas. A III está errada: em PaaS o provedor cuida de todo o hardware e do S.O. — o cliente só escreve o código."
  },
  {
    n: 3,
    enunciado: "Uma empresa deseja armazenar arquivos de backup massivos. O armazenamento MAIS adequado é:",
    contexto: "<ul><li>baixo custo</li><li>alta durabilidade</li><li>grande escalabilidade</li></ul>",
    opcoes: ["Block Storage", "File Storage", "Object Storage", "SSD local", "Cache distribuído"],
    correta: 2,
    explicacao: "Object Storage (ex.: Amazon S3) é barato, extremamente durável e tem escalabilidade quase infinita — perfeito para backups e arquivos estáticos."
  },
  {
    n: 4,
    enunciado: "O principal objetivo do Edge Computing é:",
    opcoes: ["Centralizar processamento em um único datacenter", "Processar dados próximos da origem para reduzir latência", "Eliminar totalmente a computação em nuvem", "Substituir redes de computadores"],
    correta: 1,
    explicacao: "Edge aproxima o processamento da fonte geradora de dados (sensores/IoT) para reduzir latência. Ele complementa a nuvem, não a elimina."
  },
  {
    n: 5,
    enunciado: "O princípio do menor privilégio determina que:",
    opcoes: ["Todos os usuários devem ter acesso total", "Usuários devem receber apenas permissões necessárias para suas funções", "Apenas administradores acessam sistemas cloud", "Dados devem permanecer públicos para auditoria", "Backup elimina necessidade de segurança"],
    correta: 1,
    explicacao: "Privilégio Mínimo (PoLP): cada usuário/serviço recebe só as permissões estritamente necessárias. Isso reduz a superfície de ataque."
  },
  {
    n: 6,
    enunciado: "No modelo On-Demand de computação em nuvem:",
    opcoes: ["O cliente compra permanentemente os servidores", "O custo é fixo mensalmente", "O pagamento ocorre conforme a utilização dos recursos", "Não existe elasticidade", "O serviço funciona apenas em nuvem privada"],
    correta: 2,
    explicacao: "On-Demand é o 'pay-as-you-go': você paga conforme usa, sem comprar servidor nem assumir custo fixo. É o que viabiliza a elasticidade."
  },
  {
    n: 7,
    enunciado: "No modelo de responsabilidade compartilhada:",
    opcoes: ["Apenas o provedor protege os dados", "Cliente e provedor possuem responsabilidades de segurança", "O cliente não precisa configurar permissões", "A LGPD não se aplica à nuvem", "Segurança física é responsabilidade exclusiva do cliente"],
    correta: 1,
    explicacao: "O provedor cuida da segurança DA nuvem (hardware, instalações, virtualização). O cliente cuida da segurança NA nuvem (dados, IAM, criptografia, configurações)."
  },
  {
    n: 8,
    enunciado: "Uma empresa deseja um banco de dados com alta performance e compartilhamento de arquivos entre equipes. A melhor combinação seria:",
    contexto: "<ul><li>Banco de dados com alta performance</li><li>Compartilhamento de arquivos entre equipes</li></ul>",
    opcoes: ["Apenas Object Storage", "Apenas File Storage", "Block Storage + File Storage", "Apenas armazenamento local", "Apenas BigTable"],
    correta: 2,
    explicacao: "Block Storage entrega a alta performance que o banco de dados precisa; File Storage resolve o compartilhamento de arquivos entre equipes. A combinação cobre os dois requisitos."
  },
  {
    n: 9,
    enunciado: "A autenticação multifator (MFA) aumenta a segurança porque:",
    opcoes: ["Elimina a criptografia", "Substitui o firewall", "Exige múltiplas formas de verificação de identidade"],
    correta: 2,
    explicacao: "MFA combina mais de um fator (ex.: senha + código no app). Mesmo que a senha vaze, o invasor não consegue entrar sem o segundo fator."
  },
  {
    n: 10,
    enunciado: "Em cloud computing, Alta Disponibilidade significa:",
    opcoes: ["Eliminar backups", "Garantir funcionamento contínuo mesmo diante de falhas", "Utilizar apenas servidores locais", "Aumentar o custo operacional", "Eliminar a redundância"],
    correta: 1,
    explicacao: "Alta Disponibilidade (HA) é manter o serviço no ar mesmo quando algo falha, usando redundância e failover (troca automática para um recurso saudável)."
  },
  {
    n: 11,
    enunciado: "Uma empresa deseja migrar aplicações sem gerenciar hardware, sistema operacional e middleware. O modelo MAIS adequado é:",
    contexto: "<ul><li>hardware</li><li>sistema operacional</li><li>middleware</li></ul>",
    opcoes: ["IaaS", "SaaS", "PaaS", "Bare Metal", "Edge Computing"],
    correta: 2,
    explicacao: "Sem gerenciar hardware, S.O. nem middleware — mas ainda levando a própria aplicação — é exatamente o PaaS. (Em SaaS você nem leva a aplicação; em IaaS você ainda cuida do S.O.)"
  },
  {
    n: 12,
    enunciado: "Uma arquitetura Multi-Region em nuvem tem como principal vantagem:",
    opcoes: ["Eliminar a internet pública", "Reduzir a redundância", "Melhorar a tolerância a falhas e a continuidade de serviço", "Impedir a escalabilidade", "Centralizar todos os recursos em um datacenter"],
    correta: 2,
    explicacao: "Multi-Region distribui a aplicação por várias regiões geográficas. Se uma região cai, outra assume — garantindo tolerância a falhas e continuidade do serviço."
  },
  {
    n: 13,
    enunciado: "Criptografia em repouso protege:",
    opcoes: ["Dados trafegando na internet", "Dados armazenados em discos e bancos de dados", "Apenas senhas de usuários", "Apenas backups físicos", "Somente containers Docker"],
    correta: 1,
    explicacao: "'Em repouso' (at rest) = dados parados, gravados no disco ou no banco (protegidos por AES-256). Proteger dados em movimento seria criptografia 'em trânsito' (TLS)."
  },
  {
    n: 14,
    enunciado: "O conceito de escalabilidade horizontal consiste em:",
    opcoes: ["Aumentar CPU e RAM do mesmo servidor", "Adicionar novos servidores para distribuir a carga", "Reduzir a quantidade de máquinas", "Eliminar o balanceamento de carga"],
    correta: 1,
    explicacao: "Horizontal (scale out) = adicionar MAIS servidores e dividir a carga entre eles. Aumentar CPU/RAM do mesmo servidor é escalabilidade vertical (scale up)."
  },
  {
    n: 15,
    enunciado: "O IAM (Identity and Access Management) é utilizado para:",
    opcoes: ["Criar máquinas virtuais", "Gerenciar identidades e permissões de acesso", "Substituir bancos de dados", "Realizar backups automáticos", "Eliminar a autenticação"],
    correta: 1,
    explicacao: "IAM gerencia identidades (autenticação: quem é você?) e permissões (autorização: o que você pode fazer?). É a base do controle de acesso na nuvem."
  },
  {
    n: 16,
    enunciado: "Uma plataforma global precisa de baixa latência, tolerância a falhas, alta disponibilidade e escalabilidade automática. A arquitetura MAIS adequada envolve:",
    contexto: "<ul><li>baixa latência</li><li>tolerância a falhas</li><li>alta disponibilidade</li><li>escalabilidade automática</li></ul>",
    opcoes: ["Um único servidor físico local", "Multi-Region com balanceamento de carga e Auto Scaling", "Apenas armazenamento local", "Apenas Edge Computing sem cloud", "Infraestrutura sem redundância"],
    correta: 1,
    explicacao: "Multi-Region resolve latência e tolerância a falhas; o balanceamento de carga garante a alta disponibilidade; o Auto Scaling dá a escalabilidade automática. Combinação completa."
  },
  {
    n: 17,
    enunciado: "Uma empresa sofreu vazamento de dados porque um bucket cloud estava público. A principal falha foi:",
    opcoes: ["Ausência de virtualização", "Má configuração de permissões e controle de acesso", "Excesso de escalabilidade horizontal", "Utilização de criptografia", "Uso de Object Storage"],
    correta: 1,
    explicacao: "Deixar um bucket público é erro de configuração de permissões (IAM/ACL) — responsabilidade do cliente. A tecnologia não falhou; a configuração de acesso falhou."
  },
  {
    n: 18,
    enunciado: "Uma aplicação IoT precisa processar dados em tempo real com mínima latência. A melhor solução é:",
    opcoes: ["Processar tudo em datacenter distante", "Utilizar Edge Computing próximo aos dispositivos", "Eliminar a computação em nuvem", "Armazenar tudo offline", "Utilizar apenas backups locais"],
    correta: 1,
    explicacao: "IoT em tempo real com mínima latência pede processamento na borda (Edge), perto dos dispositivos — sem depender da viagem até um datacenter distante."
  },
  {
    n: 19,
    enunciado: "Uma empresa utiliza MFA, criptografia, backups e princípio do menor privilégio. Essas práticas estão relacionadas principalmente a:",
    contexto: "<ul><li>MFA</li><li>criptografia</li><li>backups</li><li>princípio do menor privilégio</li></ul>",
    opcoes: ["Elasticidade", "Segurança em Computação em Nuvem", "Virtualização", "Escalabilidade vertical", "Processamento paralelo"],
    correta: 1,
    explicacao: "Todas são práticas de Segurança em nuvem: protegem identidade (MFA, menor privilégio), dados (criptografia) e recuperação (backups)."
  }
];

/* -------------------------------------------------------------------
   2) FLASHCARDS — frente (conceito) / verso (definição)
------------------------------------------------------------------- */
const FLASHCARDS = [
  { frente: "Elasticidade", verso: "Crescer e encolher recursos automaticamente, em tempo real, conforme a demanda (Auto Scaling)." },
  { frente: "Escalabilidade Horizontal", verso: "Adicionar MAIS servidores para distribuir a carga (scale out)." },
  { frente: "Escalabilidade Vertical", verso: "Aumentar CPU/RAM do MESMO servidor (scale up)." },
  { frente: "Alta Disponibilidade", verso: "Manter o sistema funcionando mesmo diante de falhas (redundância + failover)." },
  { frente: "IaaS", verso: "Você gerencia S.O. e apps; provedor cuida do hardware. Ex.: EC2. (alugar um carro 🚗)" },
  { frente: "PaaS", verso: "Você só escreve o código; provedor cuida de tudo embaixo. Ex.: Heroku, Vercel. (Uber 🚕)" },
  { frente: "SaaS", verso: "Software pronto pra usar; você não gerencia nada. Ex.: Gmail, Slack. (hotel 🏨)" },
  { frente: "Object Storage", verso: "Objetos isolados (dado + metadado + ID). Barato e escalável. Ideal: backups, fotos, vídeos. (S3)" },
  { frente: "Block Storage", verso: "Dado em blocos endereçáveis ('HD virgem'). Altíssima performance. Ideal: banco de dados e S.O." },
  { frente: "File Storage", verso: "Pastas e subpastas (NAS em nuvem). Ideal: compartilhar arquivos entre equipes." },
  { frente: "Edge Computing", verso: "Processar dados perto da fonte (IoT/sensores) para reduzir latência." },
  { frente: "IAM", verso: "Identity and Access Management: gerencia identidades e permissões (autenticação + autorização)." },
  { frente: "Privilégio Mínimo", verso: "Cada usuário/serviço recebe só as permissões estritamente necessárias." },
  { frente: "MFA", verso: "Autenticação multifator: exige mais de uma forma de verificar identidade (senha + código/biometria)." },
  { frente: "Criptografia em repouso", verso: "Protege dados parados no disco/banco — AES-256." },
  { frente: "Criptografia em trânsito", verso: "Protege dados trafegando na internet — TLS/HTTPS." },
  { frente: "Responsabilidade Compartilhada", verso: "Provedor cuida da segurança DA nuvem; cliente cuida da segurança NA nuvem." },
  { frente: "Multi-Region", verso: "Rodar em várias regiões geográficas: tolerância a falhas, continuidade e baixa latência." }
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
