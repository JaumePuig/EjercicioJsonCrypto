import { mercado } from "./mercado.js";
const usuario = {
  balanceUSD: 100000,
  misActivos: [],
};

class Portfolio {
  constructor(usuario, mercado) {
    this.usuario = usuario;
    this.mercado = mercado;
  }

  comprar(idMoneda, cantidad) {
    const precioActual = this.mercado[idMoneda].precioActual;
    const costoTotal = precioActual * cantidad;

    if (this.usuario.balanceUSD >= costoTotal) {
      this.usuario.balanceUSD -= costoTotal;

      this.usuario.misActivos.push({
        idMoneda: idMoneda,
        cantidad: cantidad,
        precioCompra: precioActual,
      });

      console.log(" Compra realizada");
    } else {
      console.log("Fondos insuficientes");
    }

    actualizarBalance();
  }

  recalcularPatrimonio() {
    let totalActivos = 0;
    console.log(this.usuario);
    if (this.usuario.misActivos.length > 0) {
      for (let activo of this.usuario.misActivos) {
        const precioActual = this.mercado[activo.idMoneda];

        const valorActual = activo.cantidad * precioActual;
        const valorCompra = activo.cantidad * activo.precioCompra;

        const ganancia = valorActual - valorCompra;

        let tipo = ganancia >= 0 ? "Ganancia" : "Pérdida";
        let mensaje =
          activo.idMoneda + ": " + tipo + " de " + ganancia.toFixed(2) + " USD";

        console.log(mensaje);

        totalActivos += valorActual;
      }
    }else{
      console.log("No tienes activos maquina");
    }

    const patrimonioTotal = totalActivos + this.usuario.balanceUSD;

    console.log("💰 Patrimonio total:", patrimonioTotal.toFixed(2));
  }
}

const portfolio = new Portfolio(usuario, mercado);

function actualizarBalance() {
  document.getElementById("balance").textContent =
    "Balance: $" + usuario.balanceUSD.toFixed(2);
}

function comprarMoneda(moneda) {
  console.log("aaaaaaaaaaaaaaaa");
  portfolio.comprar(moneda, 0.1); // cantidad fija
}

// Mostrar balance inicial
actualizarBalance();

const btnDoge = document.getElementById("btnDoge");
const btnBit = document.getElementById("btnBit");
const btnNeo = document.getElementById("btnNeo");
const btnShit = document.getElementById("btnShit");
btnDoge.addEventListener("click", () => {
  comprarMoneda(0);
});
btnBit.addEventListener("click", () => {
  comprarMoneda(1);
});
btnNeo.addEventListener("click", () => {
  comprarMoneda(2);
});
btnShit.addEventListener("click", () => {
  comprarMoneda(3);
});

document.addEventListener(
  "cambiaPrecios",
  portfolio.recalcularPatrimonio,
  console.log(portfolio),
);
