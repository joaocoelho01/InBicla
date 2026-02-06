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
btn.onclick = function() {
  stepSelecao.style.display = "block";
  stepFormulario.style.display = "none";
  modal.style.display = "block";
}

// FECHAR O MODAL
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
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