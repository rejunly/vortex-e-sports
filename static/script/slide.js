// === SLIDER ANTIGO ===
let contador = 0;
document.getElementById("radio0").checked = true;
document.getElementById("btn0").style.background = "#7cfc00";
document.getElementById("btn0").style.width = "45px";

setInterval(function () {
  nextImage();
  alterButtonGreen();
}, 4500);

function nextImage() {
  contador++;
  if (contador > 3) {
    contador = 0;
    document.getElementById("btn" + (contador + 3)).style.background = "white";
    document.getElementById("btn" + (contador + 3)).style.width = "25px";
  }
  document.getElementById("radio" + contador).checked = true;
}

function alterButtonGreen() {
  document.getElementById("btn" + contador).style.background = "#7cfc00";
  document.getElementById("btn" + contador).style.width = "45px";

  document.getElementById("btn" + (contador - 1)).style.background = "white";
  document.getElementById("btn" + (contador - 1)).style.width = "25px";
}
