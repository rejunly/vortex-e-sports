document.addEventListener("DOMContentLoaded", () => {
  const imagens = document.querySelectorAll(".noticias-img div"); // todas as divs de imagem
  const titulo = document.getElementById("titulo");
  const paragrafo = document.getElementById("paragrafo");

  const noticias = [
    {
      titulo: "VORTEX BATE META DE SEGUIDORES",
      imagem: "img-noticias/img-noticias-1..png",
      paragrafo:
        "No dia 05/10/2025, a VORTEX alcançou a marca de 1 milhão de seguidores...",
      index: 0,
    },
    {
      titulo: "TESTANDO O TÍTULO 2",
      imagem: "img-noticias/img-noticias-2.png",
      paragrafo: "AAAAAAAAAAAAAAAA...",
      index: 1,
    },
    {
      titulo: "TÍTULO FINAL",
      imagem: "img-noticias/img-noticias-2.png",
      paragrafo: "Texto final aqui.",
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
