const mercado = [
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
      var num = Math.floor(Math.random() * 1) + 1; // this will get a number between 1 and 99;
      num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
      moneda.precioActual =
        moneda.precioActual * (1 + num * moneda.volatilidad);
      if (moneda.precioActual <= 0) {
        moneda.precioActual = 0;
      }
      console.log(
        "la moneda " + moneda.nombre + " tiene valor: " + moneda.precioActual,
      );
      document.dispatchEvent(this.miEvento);
    });
  }
}
console.log(mercado);
const ticker = new Ticker(mercado);
