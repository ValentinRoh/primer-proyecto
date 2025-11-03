document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");

  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      data.tortas.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("producto");
        card.innerHTML = `
          <img src="${item.imagen}" alt="${item.nombre}">
          <h3>${item.nombre}</h3>
          <p>$${item.precio}</p>
          <button class="agregar" data-nombre="${item.nombre}" data-precio="${item.precio}">Agregar 🛒</button>
        `;
        contenedor.appendChild(card);
      });
    });
});
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const panel = document.getElementById("panel-carrito");
const btnCarrito = document.getElementById("carrito-btn");
const lista = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const vaciar = document.getElementById("vaciar");

btnCarrito.addEventListener("click", () => {
  panel.classList.toggle("visible");
  renderCarrito();
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("agregar")) {
    const nombre = e.target.dataset.nombre;
    const precio = parseFloat(e.target.dataset.precio);
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  }
});

vaciar.addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify([]));
  renderCarrito();
  actualizarContador();
});

function renderCarrito() {
  lista.innerHTML = "";
  let totalPrecio = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    lista.appendChild(li);
    totalPrecio += p.precio;
  });
  total.textContent = totalPrecio.toFixed(2);
}

function actualizarContador() {
  document.getElementById("contador").textContent = carrito.length;
}
actualizarContador();
