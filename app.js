const API_URL = "https://698a177bc04d974bc6a15370.mockapi.io/api/v1/SalasRehilete";
const MAX_CAPACIDAD = 80;

// ELEMENTOS
const salasDiv = document.getElementById("salas");
const tablaEventos = document.getElementById("tablaEventos");
const tablaEventosHistorial = document.getElementById("tablaEventosHistorial");
const tablaAdmin = document.getElementById("tablaAdmin");
const btnAgregarSala = document.getElementById("btnAgregarSala");
const resumenTotales = document.getElementById("resumenTotales");

// =====================
// ESTADO GLOBAL
// =====================
let cacheSalas = [];
let grafico = null;

// 🔥 BUFFER DE EVENTOS (CLAVE)
let colaEventos = JSON.parse(localStorage.getItem("colaEventos")) || [];

// HISTORIAL
let historial = JSON.parse(localStorage.getItem("historial")) || [];
let totalEntradas = parseInt(localStorage.getItem("totalEntradas")) || 0;
let totalSalidas = parseInt(localStorage.getItem("totalSalidas")) || 0;

// =====================
// CARGA DE DATOS
// =====================
async function cargarDatos() {
  const res = await fetch(API_URL);
  cacheSalas = await res.json();

  renderSalas();
  renderAdmin(cacheSalas);
  renderGrafico(cacheSalas);
  renderResumen();
}

// =====================
// RENDER SALAS
// =====================
function renderSalas() {
  salasDiv.innerHTML = "";

  cacheSalas.forEach(sala => {
    const llena = sala.visitantes_actuales >= MAX_CAPACIDAD;
    const estado = llena ? "saturada" : "disponible";

    const card = document.createElement("div");
    card.className = "sala-card";

    card.innerHTML = `
      <h3>${sala.nombre}</h3>
      <p>Visitantes actuales: <strong>${sala.visitantes_actuales}</strong></p>
      <span class="estado ${estado}">${estado}</span>
      <div class="botones">
        <button class="entrada" ${llena ? "disabled" : ""}>+ Entrada</button>
        <button class="salida">- Salida</button>
      </div>
    `;

    card.querySelector(".entrada").onclick = () =>
      accionUsuario(sala.id, "entrada");

    card.querySelector(".salida").onclick = () =>
      accionUsuario(sala.id, "salida");

    salasDiv.appendChild(card);
  });
}

// =====================
// ACCIÓN DEL USUARIO (NO HIPERSENSIBLE)
// =====================
function accionUsuario(idSala, tipo) {
  const sala = cacheSalas.find(s => s.id === idSala);
  if (!sala) return;

  if (tipo === "entrada" && sala.visitantes_actuales >= MAX_CAPACIDAD) return;
  if (tipo === "salida" && sala.visitantes_actuales <= 0) return;

  // UI inmediata
  if (tipo === "entrada") sala.visitantes_actuales++;
  if (tipo === "salida") sala.visitantes_actuales--;

  renderSalas();

  // Guardar evento en cola (NO historial directo)
  colaEventos.push({
    sala: sala.nombre,
    tipo,
    fecha: new Date().toLocaleString()
  });

  localStorage.setItem("colaEventos", JSON.stringify(colaEventos));

  // PUT asíncrono
  fetch(`${API_URL}/${sala.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sala)
  });
}

// =====================
// PROCESAR EVENTOS (CADA 2s)
// =====================
function procesarEventos() {
  if (colaEventos.length === 0) return;

  colaEventos.forEach(ev => {
    if (ev.tipo === "entrada") totalEntradas++;
    if (ev.tipo === "salida") totalSalidas++;

    historial.unshift({
      sala: ev.sala,
      evento: ev.tipo === "entrada" ? "Entrada registrada" : "Salida registrada",
      tipo: ev.tipo,
      visitantes: 1,
      fecha: ev.fecha
    });
  });

  historial = historial.slice(0, 10);

  colaEventos = [];
  localStorage.setItem("colaEventos", JSON.stringify([]));
  localStorage.setItem("historial", JSON.stringify(historial));
  localStorage.setItem("totalEntradas", totalEntradas);
  localStorage.setItem("totalSalidas", totalSalidas);

  renderTablas();
  renderResumen();
}

// =====================
// TABLAS
// =====================
function renderTablas() {
  tablaEventos.innerHTML = "";
  tablaEventosHistorial.innerHTML = "";

  historial.forEach(e => {
    const fila = `
      <tr>
        <td>${e.sala}</td>
        <td>${e.evento}</td>
        <td>${e.tipo}</td>
        <td>${e.visitantes}</td>
        <td>${e.fecha}</td>
      </tr>
    `;
    tablaEventos.innerHTML += fila;
    tablaEventosHistorial.innerHTML += fila;
  });
}

// =====================
// RESUMEN
// =====================
function renderResumen() {
  if (!resumenTotales) return;
  resumenTotales.textContent =
    `Total entradas: ${totalEntradas} | Total salidas: ${totalSalidas}`;
}

// =====================
// GRÁFICO
// =====================
function renderGrafico(salas) {
  const ctx = document.getElementById("graficoSalas");
  if (!ctx) return;

  const labels = salas.map(s => s.nombre);
  const data = salas.map(s => s.visitantes_actuales);

  if (grafico) {
    grafico.data.labels = labels;
    grafico.data.datasets[0].data = data;
    grafico.update();
    return;
  }

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: "#38bdf8"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: MAX_CAPACIDAD } },
      plugins: { legend: { display: false } }
    }
  });
}

// =====================
// ADMINISTRACIÓN
// =====================
function renderAdmin(salas) {
  tablaAdmin.innerHTML = "";

  salas.forEach(sala => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input value="${sala.nombre}" id="n-${sala.id}"></td>
      <td><input type="number" value="${sala.capacida_max}" id="c-${sala.id}"></td>
      <td>${sala.visitantes_actuales}</td>
      <td>
        <button class="entrada">💾</button>
        <button class="salida">🗑</button>
      </td>
    `;

    fila.querySelector(".entrada").onclick = async () => {
      await fetch(`${API_URL}/${sala.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sala,
          nombre: document.getElementById(`n-${sala.id}`).value,
          capacida_max: parseInt(document.getElementById(`c-${sala.id}`).value)
        })
      });
      cargarDatos();
    };

    fila.querySelector(".salida").onclick = async () => {
      await fetch(`${API_URL}/${sala.id}`, { method: "DELETE" });
      cargarDatos();
    };

    tablaAdmin.appendChild(fila);
  });
}

// =====================
// AGREGAR SALA
// =====================
btnAgregarSala.onclick = async () => {
  const nombre = prompt("Nombre de la nueva sala:");
  if (!nombre) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      visitantes_actuales: 0,
      capacida_max: MAX_CAPACIDAD
    })
  });

  cargarDatos();
};

// =====================
// PESTAÑAS
// =====================
function mostrarVista(id, boton) {
  document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(id).classList.add("activa");
  boton.classList.add("active");
}

// =====================
// ARRANQUE
// =====================
cargarDatos();
renderTablas();
setInterval(procesarEventos, 2000);
setInterval(cargarDatos, 2000);
