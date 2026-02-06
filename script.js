// Elementos do Modal Base
const modal = document.getElementById("modalOrcamento");
const btn = document.getElementById("btnAbrirModal");
const span = document.getElementsByClassName("fechar")[0];

// Elementos dos Passos
const stepSelecao = document.getElementById("step-selecao");
const stepFormulario = document.getElementById("step-formulario");
const tituloServico = document.getElementById("titulo-servico");
const inputServico = document.getElementById("servico-selecionado");

// ABRIR O MODAL (Sempre no passo 1)
btn.onclick = function () {
    stepSelecao.style.display = "block";
    stepFormulario.style.display = "none";
    modal.style.display = "block";
}

// FECHAR O MODAL
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// FUNÇÃO: Quando o user clica num dos 3 cartões
function mostrarFormulario(nomeServico) {
    // 1. Esconder a seleção
    stepSelecao.style.display = "none";

    // 2. Mostrar o formulário
    stepFormulario.style.display = "block";

    // 3. Atualizar o título com o serviço escolhido
    tituloServico.innerText = "Orçamento: " + nomeServico;
    inputServico.value = nomeServico; // Guarda o valor para enviar depois
}

// FUNÇÃO: Botão de voltar atrás
function voltarSelecao() {
    stepFormulario.style.display = "none";
    stepSelecao.style.display = "block";
}

// VARIÁVEIS DE ESTADO
let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

// Elementos DOM
const labelMes = document.getElementById("currentMonth");
const gridDias = document.getElementById("calendar-grid");
const sectionHoras = document.getElementById("time-section");
const gridHoras = document.getElementById("time-grid");
const inputFinal = document.getElementById("dataHoraFinal");
const btnPrev = document.getElementById("prevMonth");
const btnNext = document.getElementById("nextMonth");

// Horas disponíveis
const horasTrabalho = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// --- INICIAR ---
function iniciarCalendario() {
    renderizarCalendario(mesAtual, anoAtual);
}

// --- RENDERIZAR O MÊS ---
function renderizarCalendario(mes, ano) {
    gridDias.innerHTML = "";
    sectionHoras.style.display = "none";
    
    // Atualizar título
    const nomeMes = new Date(ano, mes).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
    labelMes.innerText = nomeMes;

    // Dados do Mês
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0 = Domingo, 1 = Segunda...
    const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate(); // Último dia do mês

    // 1. Criar espaços vazios antes do dia 1
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const vazio = document.createElement("div");
        vazio.className = "day-slot empty";
        gridDias.appendChild(vazio);
    }

    // 2. Criar os dias (1 a 31)
    const hoje = new Date();
    hoje.setHours(0,0,0,0); // Zerar horas para comparar apenas datas

    for (let dia = 1; dia <= totalDiasNoMes; dia++) {
        const divDia = document.createElement("div");
        divDia.innerText = dia;
        divDia.className = "day-slot";
        
        const dataDoLoop = new Date(ano, mes, dia);

        // LÓGICA DE ESTADOS
        
        // A: Dias passados (bloqueados)
        if (dataDoLoop < hoje) {
            divDia.classList.add("disabled");
        }
        // B: Domingos (bloqueados - dia 0 da semana)
        else if (dataDoLoop.getDay() === 0) {
            divDia.classList.add("disabled");
            divDia.title = "Fechado";
        }
        // C: Simulação de "Cheio/Baço" (Ex: dia 15 e 20)
        else if (dia === 15 || dia === 20) {
            divDia.classList.add("full");
            divDia.title = "Esgotado";
        }
        // D: Disponíveis (Verde Neon)
        else {
            divDia.classList.add("available");
            divDia.onclick = () => selecionarDia(divDia, dia, mes, ano);
        }

        gridDias.appendChild(divDia);
    }

    // Controlar botões (Não deixar voltar para trás do mês atual)
    const dataReal = new Date();
    if (mes === dataReal.getMonth() && ano === dataReal.getFullYear()) {
        btnPrev.disabled = true;
    } else {
        btnPrev.disabled = false;
    }
}

// --- SELECIONAR DIA ---
function selecionarDia(elemento, dia, mes, ano) {
    // Reset visual
    document.querySelectorAll(".day-slot").forEach(d => d.classList.remove("selected"));
    elemento.classList.add("selected");

    // Mostrar horas
    sectionHoras.style.display = "block";
    gridHoras.innerHTML = "";
    
    // Gerar Horas
    horasTrabalho.forEach(hora => {
        const btnHora = document.createElement("div");
        btnHora.className = "time-slot";
        btnHora.innerText = hora;
        
        // Simular horas ocupadas
        if (Math.random() > 0.8) {
            btnHora.style.opacity = "0.3";
            btnHora.style.textDecoration = "line-through";
            btnHora.style.pointerEvents = "none";
        } else {
            btnHora.onclick = () => {
                document.querySelectorAll(".time-slot").forEach(t => t.classList.remove("selected"));
                btnHora.classList.add("selected");
                
                // Guardar valor final
                const dataFormatada = `${dia}/${mes+1}/${ano} às ${hora}`;
                inputFinal.value = dataFormatada;
            };
        }
        gridHoras.appendChild(btnHora);
    });
}

// --- EVENTOS DOS BOTÕES DE NAVEGAÇÃO ---
btnPrev.onclick = () => {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    renderizarCalendario(mesAtual, anoAtual);
};

btnNext.onclick = () => {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    renderizarCalendario(mesAtual, anoAtual);
};

// Ligar ao botão de abrir modal
const btnAbrir = document.getElementById("btnAbrirModal");
if (btnAbrir) {
    btnAbrir.addEventListener("click", () => {
        // Reset para o mês real quando abre
        const d = new Date();
        mesAtual = d.getMonth();
        anoAtual = d.getFullYear();
        // Teu código para mostrar o modal...
        iniciarCalendario();
    });
}