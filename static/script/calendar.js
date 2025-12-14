// Calendar logic extracted from home.html
$(document).ready(function () {
  let titulo = document.querySelector(".title-agenda");
  let paragrafo = document.querySelector(".paragrafo-agenda");

  const eventos = {
    "2026-01-22": {
      titulo: "Dia 22 - VORTEX x TIME 1",
      paragrafo: "No dia 22/01/2026, o time Vortex enfrentará o Time 1 na sala 67. Horários: das 13:30 às 14:30. Esteja lá para acompanhar nosso jogo! Contamos com você!"
    },
    "2026-01-23": {
      titulo: "Dia 23 - VORTEX x TIME 2",
      paragrafo: "No dia 23/01/2026, o time Vortex enfrentará o Time 2 na sala 66. Horários: das 13:50 às 14:50. Estamos te esperando!"
    },
    "2026-01-24": {
      titulo: "Dia 24 - VORTEX x TIME 3",
      paragrafo: "No dia 24/01/2026, o time Vortex enfrentará o Time 3 na sala 65. Horários: das 16:20 às 17:20. Acompanhe nossa batalha final!"
    }
  };

  let ultimoSelecionado = null;

  $("#calendar").fullCalendar({
    header: {
      left: "",
      center: "title",
      right: "",
    },
    defaultDate: "2026-01-01",
    validRange: {
      start: "2026-01-01",
      end: "2026-01-31",
    },
    dayRender: function (date, cell) {
      const dateString = date.format('YYYY-MM-DD');
      if (eventos[dateString]) {
        cell.css("background-color", "#39810c");
        cell.css("color", "black");
        cell.css("cursor", "pointer");
      }
    },
    dayClick: function (date, jsEvent, view) {
      const dateString = date.format('YYYY-MM-DD');
      const evento = eventos[dateString];

      if (evento) {
        // Reset styling of previously selected
        if (ultimoSelecionado) {
          ultimoSelecionado.css("background-color", "#39810c");
          ultimoSelecionado.css("color", "");
        }

        // Update text
        titulo.innerHTML = evento.titulo;
        paragrafo.innerHTML = evento.paragrafo;

        // Highlight new selection
        // 'this' in dayClick is the raw DOM element, so we wrap it
        const cell = $(this);
        cell.css("background-color", "#39810c50");
        cell.css("color", "white");

        ultimoSelecionado = cell;
      }
    }
  });
});
