/* ===================================================================
   Estrutura de Dados 1 (Java) — Central de Revisão
   DADOS (simulado + cola de código + flashcards) e LÓGICA. JS puro. 🇧🇷
=================================================================== */

/* -------------------------------------------------------------------
   0) SYNTAX HIGHLIGHT — deixa o código Java colorido (estilo editor).
   Funciona protegendo comentários e strings antes de pintar keywords,
   pra nada ser destacado por engano.
------------------------------------------------------------------- */
function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightJava(code) {
  code = escHtml(code);
  const stash = [];
  const keep = (cls, txt) => { stash.push(`<span class="${cls}">${txt}</span>`); return `~@~${stash.length - 1}~@~`; };

  // 1) comentários (protege primeiro)
  code = code.replace(/\/\*[\s\S]*?\*\//g, m => keep("c-com", m));
  code = code.replace(/\/\/[^\n]*/g, m => keep("c-com", m));
  // 2) strings
  code = code.replace(/"(?:[^"\\]|\\.)*"/g, m => keep("c-str", m));
  // 3) palavras-chave
  code = code.replace(/\b(public|private|protected|static|final|abstract|void|class|interface|enum|new|return|if|else|for|while|do|switch|case|default|break|continue|import|package|extends|implements|this|super|null|true|false|int|long|double|float|char|boolean|byte|short|var|String)\b/g, '<span class="c-kw">$1</span>');
  // 4) restaura comentários e strings protegidos
  code = code.replace(/~@~(\d+)~@~/g, (_, i) => stash[Number(i)]);
  return code;
}

// monta um bloco de código já escapado (o highlight é aplicado depois, no fim)
function blocoCodigo(cru) {
  return `<pre><code class="java">${escHtml(cru)}</code></pre>`;
}

/* -------------------------------------------------------------------
   1) SIMULADO — 16 questões (conceito + leitura de código).
   correta = índice da alternativa certa (começa em 0).
------------------------------------------------------------------- */
const QUESTOES = [
  {
    n: 1,
    enunciado: "Qual a forma correta de declarar e criar um array de 5 inteiros em Java?",
    opcoes: ["int[] v = new int[5];", "int[] v = new int(5);", "array<int> v = new array(5);", "int v = [5];"],
    correta: 0,
    explicacao: "Usa colchetes [] e a palavra new: int[] v = new int[5]; cria 5 posições (índices 0 a 4). Parênteses (5) seriam chamada de construtor — errado pra array."
  },
  {
    n: 2,
    enunciado: "Qual é o índice do primeiro elemento de um array em Java?",
    opcoes: ["1", "0", "-1", "Depende do tipo"],
    correta: 1,
    explicacao: "Arrays em Java são indexados a partir de 0. O primeiro é v[0] e o último é v[v.length - 1]."
  },
  {
    n: 3,
    enunciado: "O que v.length retorna em um array?",
    opcoes: ["O último índice", "O maior valor do array", "A quantidade de posições do array", "Sempre 0"],
    correta: 2,
    explicacao: "length é um atributo do array com o número de posições. Cuidado: em array é .length (sem parênteses); em String é .length() (método)."
  },
  {
    n: 4,
    enunciado: "O que acontece ao acessar v[10] em um array de tamanho 5?",
    opcoes: ["Retorna 0", "Lança ArrayIndexOutOfBoundsException", "Retorna null", "Cria a posição automaticamente"],
    correta: 1,
    explicacao: "Acessar um índice fora do intervalo [0, length-1] lança ArrayIndexOutOfBoundsException em tempo de execução."
  },
  {
    n: 5,
    enunciado: "O que é um enum em Java?",
    opcoes: ["Um array dinâmico", "Um tipo de laço de repetição", "Um conjunto fixo de constantes nomeadas", "Uma classe abstrata"],
    correta: 2,
    explicacao: "enum define um conjunto fixo de constantes (ex.: dias da semana, status). É mais seguro que usar int ou String soltos."
  },
  {
    n: 6,
    enunciado: "Qual método retorna todas as constantes de um enum?",
    opcoes: ["values()", "all()", "getAll()", "list()"],
    correta: 0,
    explicacao: "Enum.values() retorna um array com todas as constantes — útil pra percorrer com for-each."
  },
  {
    n: 7,
    enunciado: "Java tem ponteiros como C/C++?",
    opcoes: ["Sim, com o operador *", "Sim, idênticos aos de C", "Não — Java usa referências (sem manipular endereços)", "Só dentro de arrays"],
    correta: 2,
    explicacao: "Java não expõe ponteiros nem aritmética de endereço. Variáveis de objeto guardam referências ao objeto na memória — é mais seguro."
  },
  {
    n: 8,
    enunciado: "O que é NullPointerException?",
    opcoes: ["Array cheio", "Erro ao usar um membro de uma referência que é null", "Divisão por zero", "Estouro da pilha de chamadas"],
    correta: 1,
    explicacao: "Ocorre ao chamar método/atributo de uma variável que não aponta pra nenhum objeto (null). Ex.: String s = null; s.length();"
  },
  {
    n: 9,
    enunciado: "Tipos primitivos (int, char, boolean) guardam o quê?",
    opcoes: ["Uma referência ao objeto", "O valor diretamente", "Sempre null", "Um array interno"],
    correta: 1,
    explicacao: "Primitivos guardam o valor direto. Já objetos e arrays guardam uma referência ao local do objeto na memória (heap)."
  },
  {
    n: 10,
    enunciado: "Qual a diferença entre ArrayList e LinkedList?",
    opcoes: [
      "São idênticas",
      "ArrayList usa array interno (acesso rápido por índice); LinkedList usa nós encadeados (rápido pra inserir/remover nas pontas)",
      "LinkedList não existe em Java",
      "ArrayList só guarda int"
    ],
    correta: 1,
    explicacao: "ArrayList = array redimensionável, ótimo pra get(i). LinkedList = nós ligados por referências, ótimo pra add/remove nas extremidades."
  },
  {
    n: 11,
    enunciado: "Qual método adiciona um elemento em uma ArrayList?",
    opcoes: ["push()", "add()", "offer()", "insert()"],
    correta: 1,
    explicacao: "lista.add(x) adiciona ao fim. Outros: get(i) lê, remove(i) remove, size() dá o tamanho."
  },
  {
    n: 12,
    enunciado: "Qual princípio a Pilha (Stack) segue?",
    opcoes: ["FIFO", "Aleatório", "LIFO", "Sempre ordenado"],
    correta: 2,
    explicacao: "LIFO — Last In, First Out: o último a entrar é o primeiro a sair (como uma pilha de pratos)."
  },
  {
    n: 13,
    enunciado: "Quais são os métodos principais da Stack em Java?",
    opcoes: ["add / get / size", "offer / poll / element", "push / pop / peek", "insert / delete / find"],
    correta: 2,
    explicacao: "push() insere no topo, pop() remove o topo, peek() vê o topo. A Stack herda de Vector. pop() em pilha vazia lança EmptyStackException."
  },
  {
    n: 14,
    enunciado: "Qual princípio a Fila (Queue) segue?",
    opcoes: ["LIFO", "FIFO", "Sempre por prioridade", "Aleatório"],
    correta: 1,
    explicacao: "FIFO — First In, First Out: o primeiro a entrar é o primeiro a sair (como uma fila de banco)."
  },
  {
    n: 15,
    enunciado: "O que o código abaixo imprime?",
    codigo: "Stack<Integer> p = new Stack<>();\np.push(1);\np.push(2);\np.push(3);\nSystem.out.println(p.pop());",
    opcoes: ["1", "2", "3", "Erro de compilação"],
    correta: 2,
    explicacao: "Pilha é LIFO. O último que entrou foi o 3, então pop() remove e retorna 3."
  },
  {
    n: 16,
    enunciado: "O que o código abaixo imprime?",
    codigo: "Queue<Integer> f = new LinkedList<>();\nf.offer(1);\nf.offer(2);\nf.offer(3);\nSystem.out.println(f.poll());",
    opcoes: ["3", "1", "2", "null"],
    correta: 1,
    explicacao: "Fila é FIFO. O primeiro que entrou foi o 1, então poll() remove e retorna 1."
  }
];

/* -------------------------------------------------------------------
   2) COLA DE CÓDIGO JAVA — snippets prontos por estrutura
------------------------------------------------------------------- */
const CODIGOS = [
  {
    titulo: "📦 Arrays (vetores)",
    codigo:
`// Criar
int[] nums = new int[5];      // 5 zeros (índices 0..4)
int[] v = {10, 20, 30, 40};   // já inicializado

// Acessar / alterar
v[0] = 99;                    // primeira posição
int ultimo = v[v.length - 1]; // última posição

// Percorrer por índice
for (int i = 0; i < v.length; i++) {
    System.out.println(v[i]);
}

// Percorrer com for-each
for (int n : v) {
    System.out.println(n);
}

// Matriz (array 2D)
int[][] m = new int[3][3];
m[0][0] = 1;`
  },
  {
    titulo: "🏷️ Enum",
    codigo:
`enum Status { ATIVO, INATIVO, PENDENTE }

Status s = Status.ATIVO;

if (s == Status.ATIVO) {
    System.out.println("Está ativo");
}

// switch com enum
switch (s) {
    case ATIVO    -> System.out.println("Liberado");
    case INATIVO  -> System.out.println("Bloqueado");
    case PENDENTE -> System.out.println("Aguardando");
}

// Percorrer todas as constantes
for (Status st : Status.values()) {
    System.out.println(st + " = " + st.ordinal());
}`
  },
  {
    titulo: "🔗 Nó e referência (base da lista encadeada)",
    codigo:
`// Em Java, "ponteiro" = referência ao próximo nó
class No {
    int valor;
    No proximo;   // null quando é o último

    No(int valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

No a = new No(1);
No b = new No(2);
a.proximo = b;          // 'a' aponta para 'b'

// Percorrer seguindo as referências
No atual = a;
while (atual != null) {
    System.out.println(atual.valor);
    atual = atual.proximo;
}`
  },
  {
    titulo: "📋 Lista (ArrayList / LinkedList)",
    codigo:
`import java.util.ArrayList;
import java.util.List;

List<String> lista = new ArrayList<>();
lista.add("Ana");          // adiciona no fim
lista.add("Bia");
lista.add(0, "Caio");      // insere na posição 0

String primeiro = lista.get(0);   // lê por índice
lista.set(1, "Bruna");            // troca o valor
lista.remove("Ana");              // remove pelo valor
lista.remove(0);                  // remove pelo índice

System.out.println(lista.size());          // tamanho
System.out.println(lista.contains("Bia"));

for (String nome : lista) {
    System.out.println(nome);
}`
  },
  {
    titulo: "📚 Pilha (Stack) — LIFO",
    codigo:
`import java.util.Stack;

Stack<Integer> pilha = new Stack<>();

pilha.push(1);             // empilha
pilha.push(2);
pilha.push(3);             // topo = 3

int topo = pilha.peek();   // 3 (só olha)
int saiu = pilha.pop();    // 3 (remove e retorna)

System.out.println(pilha.isEmpty()); // false
System.out.println(pilha.size());    // 2
// pop() em pilha vazia -> EmptyStackException`
  },
  {
    titulo: "🎫 Fila (Queue) — FIFO",
    codigo:
`import java.util.LinkedList;
import java.util.Queue;

Queue<String> fila = new LinkedList<>();

fila.offer("João");        // entra no fim
fila.offer("Maria");
fila.offer("Ana");

String prox = fila.peek(); // "João" (só olha)
String saiu = fila.poll(); // "João" (remove e retorna)

System.out.println(fila.isEmpty()); // false
System.out.println(fila.size());    // 2
// poll() em fila vazia -> retorna null (não dá erro)`
  },
  {
    titulo: "⭐ PriorityQueue (fila por prioridade)",
    codigo:
`import java.util.PriorityQueue;
import java.util.Queue;

// Sai sempre o MENOR primeiro (não a ordem de chegada)
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);

while (!pq.isEmpty()) {
    System.out.print(pq.poll() + " ");  // 10 20 30
}`
  }
];

/* -------------------------------------------------------------------
   3) FLASHCARDS
------------------------------------------------------------------- */
const FLASHCARDS = [
  { frente: "Array — índice inicial", verso: "Começa em 0. O último elemento é v[length - 1]." },
  { frente: "array.length", verso: "Atributo (sem parênteses) com a quantidade de posições. String usa length()." },
  { frente: "ArrayIndexOutOfBounds", verso: "Erro ao acessar um índice fora de [0, length-1]." },
  { frente: "enum", verso: "Conjunto fixo de constantes nomeadas." },
  { frente: "enum values()", verso: "Retorna um array com todas as constantes do enum." },
  { frente: "Java tem ponteiros?", verso: "Não. Usa referências — gerenciadas, sem aritmética de endereço." },
  { frente: "NullPointerException", verso: "Usar método/atributo de uma referência que é null." },
  { frente: "Primitivo vs objeto", verso: "Primitivo guarda o valor; objeto guarda a referência." },
  { frente: "ArrayList", verso: "Lista com array interno. Ótima pra acesso por índice — get(i)." },
  { frente: "LinkedList", verso: "Lista de nós encadeados. Ótima pra inserir/remover nas pontas." },
  { frente: "Pilha (Stack)", verso: "LIFO — o último a entrar é o primeiro a sair." },
  { frente: "Métodos da Pilha", verso: "push (topo), pop (remove topo), peek (vê topo), isEmpty." },
  { frente: "Stack herda de", verso: "Vector (pacote java.util)." },
  { frente: "EmptyStackException", verso: "pop() ou peek() chamado em uma pilha vazia." },
  { frente: "Fila (Queue)", verso: "FIFO — o primeiro a entrar é o primeiro a sair." },
  { frente: "Métodos da Fila", verso: "offer (adiciona no fim), poll (remove o 1º), peek (vê o 1º)." },
  { frente: "PriorityQueue", verso: "Fila que entrega sempre o de maior prioridade, não a ordem de chegada." },
  { frente: "Torre de Hanói", verso: "Recursão clássica. Mínimo de movimentos = 2ⁿ - 1. Precisa de caso base (if n == 1)." }
];

/* ===================================================================
   4) LÓGICA DO SITE
=================================================================== */

/* --- Navegação --- */
const navBtns = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");
const heroEl = document.querySelector(".hero");

function mostrarView(alvo) {
  views.forEach(v => v.classList.toggle("active", v.id === alvo));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.target === alvo));
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
      <span><strong>${letras[i]})</strong> ${escHtml(texto)}</span>
    </label>
  `).join("");

  bloco.innerHTML = `
    <div class="question-head">
      <span class="q-num">${q.n}</span>
      <span class="q-text">${q.enunciado}</span>
    </div>
    ${q.codigo ? blocoCodigo(q.codigo) : ""}
    <div class="options">${opcoesHTML}</div>
    <div class="explain"><strong>Por quê:</strong> ${q.explicacao}</div>
  `;
  quizEl.appendChild(bloco);
});

/* --- Seleção + progresso --- */
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

/* --- Corrigir --- */
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
  let classe = "bad", msg = "Bora revisar o resumão e a cola de código! 💪";
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

/* --- Monta a cola de código --- */
const codigoEl = document.getElementById("codigoLista");
CODIGOS.forEach(c => {
  const bloco = document.createElement("div");
  bloco.className = "codigo-bloco";
  bloco.innerHTML = `<div class="codigo-titulo">${c.titulo}</div>${blocoCodigo(c.codigo)}`;
  codigoEl.appendChild(bloco);
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

/* --- Aplica o syntax highlight em TODOS os blocos de código --- */
document.querySelectorAll("code.java").forEach(el => {
  el.innerHTML = highlightJava(el.textContent);
});
