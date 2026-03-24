export const mercado = [
  {
    id: 0,
    nombre: "Dogecoin",
    precioBase: 1,
    precioActual: 1,
    volatilidad: 0.5,
    simbolo: "@",
  },
  {
    id: 1,
    nombre: "Bitcoin",
    precioBase: 2,
    precioActual: 2,
    volatilidad: 0.3,
    simbolo: "$",
  },
  {
    id: 2,
    nombre: "Neocoin",
    precioBase: 10,
    precioActual: 10,
    volatilidad: 0.1,
    simbolo: "&",
  },
  {
    id: 3,
    nombre: "Shittycoin",
    precioBase: 0.5,
    precioActual: 0.5,
    volatilidad: 0.2,
    simbolo: "#",
  },
];

class Ticker {
  constructor(mercado) {
    this.mercado = mercado;
    document.addEventListener("cambiaPrecios", (e) => {
      console.log(e.detail.mensaje);
    });
    this.miEvento = new CustomEvent("cambiaPrecios", {
      detail: { mensaje: "Cambia precios" },
    });
    setInterval(this.floatingPrices.bind(this), 1000);
  }

  floatingPrices() {
    this.mercado.forEach((moneda) => {
      var num = Math.floor(Math.random() * 1) + 1; 
      num *= Math.round(Math.random()) ? 1 : -1; 
      moneda.precioActual =
        moneda.precioActual * (1 + num * moneda.volatilidad);
      if (moneda.precioActual <= 0) {
        moneda.precioActual = 0;
      }
      document.dispatchEvent(this.miEvento);
    });
  }
}
const ticker = new Ticker(mercado);
const tabla = document.getElementById("tablaMercados");
const celdasMercado = [];

mercado.forEach(element => {
    let newTr = document.createElement("tr");
    let newTd1 = document.createElement("td");
    newTd1.textContent = element.nombre;
    newTr.appendChild(newTd1);
    let newTd2 = document.createElement("td");
    newTd2.textContent = element.precioActual;
    newTr.appendChild(newTd2);
    tabla.appendChild(newTr);
    celdasMercado.push(newTd2);
});

document.addEventListener("cambiaPrecios", (e) => {
      for (let i = 0; i < mercado.length; i++) {
        celdasMercado[i].textContent = mercado[i].precioActual;
      }
    });