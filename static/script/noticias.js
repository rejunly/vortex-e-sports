document.addEventListener("DOMContentLoaded", () => {
  const imagens = document.querySelectorAll(".noticias-img div"); // todas as divs de imagem
  const titulo = document.getElementById("titulo");
  const paragrafo = document.getElementById("paragrafo");

  const noticias = [
    {
      titulo: "VORTEX BATE META DE SEGUIDORES",
      imagem: "img-noticias/img-noticias-1..png",
      paragrafo:
        "No dia 05/10/2025, a VORTEX alcançou a marca de 1 milhão de seguidores no Instagram! Confira as palavras da equipe que vem se destacando cada vez mais no cenário de e-sports no Brasil!",
      index: 0,
    },
    {
      titulo: "OS MELHORES MOMENTOS DA LIVE DO DIA 22/12/2025",
      imagem: "img-noticias/img-noticias-2.png",
      paragrafo: "Na live do dia 22/12, os jogadores do time Vortex divulgaram as composições do time que será usado no campeonato de jogos e-sports na semana da informática do IFRN.",
      index: 1,
    },
    {
      titulo: "PREPARÇÕES FINAIS",
      imagem: "img-noticias/img-noticias-2.png",
      paragrafo: "Encerrando a temporada com chave de ouro, a equipe VORTEX celebra os resultados conquistados ao longo do ano e já se prepara para novos desafios em 2026. A organização reforça seu compromisso com o crescimento do cenário de e-sports e promete grandes novidades para a comunidade.",
      index: 2,
    },
  ];

  let contador = 0;

  function atualizarConteudo() {
    // atualiza título e parágrafo
    titulo.innerText = noticias[contador].titulo;
    paragrafo.innerText = noticias[contador].paragrafo;
    imagens.forEach((imgDiv, i) => {
      imgDiv.classList.toggle("active", i === contador);
    });
  }

  window.Next = () => {
    contador = (contador + 1) % noticias.length;
    atualizarConteudo();
  };

  window.Back = () => {
    contador = (contador - 1 + noticias.length) % noticias.length;
    atualizarConteudo();
  };
  atualizarConteudo();
});
