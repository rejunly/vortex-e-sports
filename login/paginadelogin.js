// Seleciona os elementos principais da página
let card = document.querySelector(".card"); // O container principal que desliza
let loginButton = document.querySelector(".loginButton"); // Botão para ir para o Login
let cadastroButton = document.querySelector(".cadastroButton"); // Botão para ir para o Cadastro

// Quando clicar em "Faça Login"
loginButton.onclick = () => {
    // Adiciona a classe 'loginActive' e remove 'cadastroActive'
    // Isso move o painel para o lado do login via CSS
    card.classList.add("loginActive");
    card.classList.remove("cadastroActive");
};

// Quando clicar em "Cadastre-se"
cadastroButton.onclick = () => {
    // Adiciona a classe 'cadastroActive' e remove 'loginActive'
    // Isso move o painel para o lado do cadastro
    card.classList.add("cadastroActive");
    card.classList.remove("loginActive");
};

// Função de Animação do Contador Numérico
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        // Calcula o progresso baseado no tempo
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Atualiza o número na tela com formatação brasileira (ponto de milhar)
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('pt-BR');
        // Continua a animação até completar o tempo
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Seleciona todos os contadores de "Exploradores"
const counters = document.querySelectorAll(".user-count");
counters.forEach(counter => {
    // Inicia a animação um pouco depois da página carregar (500ms)
    setTimeout(() => {
        animateValue(counter, 0, 12453, 2000); // Conta de 0 a 12.453 em 2 segundos
    }, 500);
});