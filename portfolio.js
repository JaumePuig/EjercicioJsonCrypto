const usuario = {
  balanceUSD: 10000,
  misActivos: [],
};

const mercado = {
  BTC: 35000,
  ETH: 2000,
  ADA: 0.5,
};

class Portfolio {
  constructor(usuario, mercado) {
    this.usuario = usuario;
    this.mercado = mercado;
  }

  comprar(idMoneda, cantidad) {
    const precioActual = this.mercado[idMoneda];
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

    for (let activo of this.usuario.misActivos) {
      const precioActual = this.mercado[activo.idMoneda];

      const valorActual = activo.cantidad * precioActual;
      const valorCompra = activo.cantidad * activo.precioCompra;

      const ganancia = valorActual - valorCompra;

      let tipo = ganancia >= 0 ? "Ganancia" : "Pérdida";
      let mensaje = activo.idMoneda + ": " + tipo + " de " + ganancia.toFixed(2) + " USD";

      console.log(mensaje);

      totalActivos += valorActual;
    }

    const patrimonioTotal = totalActivos + this.usuario.balanceUSD;

    console.log("💰 Patrimonio total:", patrimonioTotal.toFixed(2));
  }
}

const portfolio = new Portfolio(usuario, mercado);

function actualizarBalance() {
  document.getElementById("balance").innerText =
    "Balance: $" + usuario.balanceUSD.toFixed(2);
}

function comprarMoneda(moneda) {
  portfolio.comprar(moneda, 0.1); // cantidad fija
}

// Mostrar balance inicial
actualizarBalance();
