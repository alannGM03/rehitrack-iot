let cacheSalas = [
  { nombre:"Sala Planetario", visitantes_actuales:5, capacidad_max:70, ventilacion:"media", iluminacion:"normal", activo:true },
  { nombre:"Sala Avión", visitantes_actuales:8, capacidad_max:15, ventilacion:"alta", iluminacion:"tenue", activo:true },
  { nombre:"Luz y Óptica", visitantes_actuales:20, capacidad_max:50, ventilacion:"media", iluminacion:"normal", activo:true }
];

let historial = [];
let grafico = null;

// ================= UTILIDADES =================
function porcentaje(s){ return s.visitantes_actuales / s.capacidad_max; }

function registrarEvento(sala, evento){
  historial.unshift({ sala:sala.nombre, evento, fecha:new Date().toLocaleString() });
  historial = historial.slice(0,10);
}

// ================= ALERTAS =================
function evaluarAlertas() {
  cacheSalas.forEach(s => {
    s.alerta = false;
    s.mensaje = "";

    // Si la sala está apagada, no evaluar nada
    if (!s.activo) return;

    const porcentaje = s.visitantes_actuales / s.capacidad_max;

    /* ========= VENTILACIÓN ========= */
    let ventilacionEsperada = "baja";

    if (porcentaje > 2/3) {
      ventilacionEsperada = "alta";
    } else if (porcentaje > 1/3) {
      ventilacionEsperada = "media";
    }

    if (s.ventilacion === "apagada" && s.visitantes_actuales > 0) {
      s.alerta = true;
      s.mensaje = "Ventilación APAGADA con aforo presente";
    } 
    else if (s.ventilacion !== ventilacionEsperada) {
      s.alerta = true;
      s.mensaje = `Ventilación incorrecta (esperada: ${ventilacionEsperada.toUpperCase()})`;
    }

    /* ========= ILUMINACIÓN ========= */
    let iluminacionEsperada = "normal";

    if (porcentaje > 0.5) {
      iluminacionEsperada = "tenue";
    }

    if (s.iluminacion === "apagada" && s.visitantes_actuales > 0) {
      s.alerta = true;
      s.mensaje = "Iluminación APAGADA con aforo presente";
    } 
    else if (s.iluminacion !== iluminacionEsperada) {
      s.alerta = true;
      s.mensaje = `Iluminación incorrecta (esperada: ${iluminacionEsperada.toUpperCase()})`;
    }

    if (s.alerta) {
      registrarEvento(s, s.mensaje);
    }
  });
}

// ================= RENDER =================
function renderEstadoGlobal(){
  const a=cacheSalas.filter(s=>s.alerta);
  estadoSalas.innerHTML=a.length
    ? a.map(s=>`⚠ ${s.nombre}: ${s.mensaje}`).join("<br>")
    : "✅ Todas las salas en estado normal";
}

function renderSalas(){
  salas.innerHTML="";
  cacheSalas.forEach((s,i)=>{
    const card=document.createElement("div");
    card.className="sala-card";
    card.innerHTML=`
      <h3>${s.nombre}</h3>
      <p>👥 Aforo: ${s.visitantes_actuales}/${s.capacidad_max}</p>

      <p>🌬 Ventilación</p>
      ${["baja","media","alta","apagada"].map(v=>`<button class="${s.ventilacion===v?"activo":""}" onclick="setVent(${i},'${v}')">${v}</button>`).join("")}

      <p>💡 Iluminación</p>
      ${["normal","tenue","apagada"].map(l=>`<button class="${s.iluminacion===l?"activo":""}" onclick="setLuz(${i},'${l}')">${l}</button>`).join("")}

      <p>🔌 Estado: ${s.activo?"🟢 Encendida":"🔴 Apagada"}</p>
      <button onclick="encender(${i})">Encender</button>
      <button onclick="apagar(${i})">Apagar</button>

      ${s.alerta?`<div class="alerta">${s.mensaje}</div>`:""}
    `;
    salas.appendChild(card);
  });
}

function renderHistorial(){
  tablaHistorial.innerHTML="";
  historial.forEach(h=>{
    tablaHistorial.innerHTML+=`<tr><td>${h.sala}</td><td>${h.evento}</td><td>${h.fecha}</td></tr>`;
  });
}

function renderGrafico(){
  const labels=cacheSalas.map(s=>s.nombre);
  const data=cacheSalas.map(s=>s.visitantes_actuales);

  if(grafico){
    grafico.data.datasets[0].data=data;
    grafico.update();
    return;
  }
  grafico=new Chart(graficoEstatus,{
    type:"bar",
    data:{labels,datasets:[{data,backgroundColor:"#38bdf8"}]},
    options:{responsive:true}
  });
}

function renderAdmin(){
  tablaAdmin.innerHTML="";
  cacheSalas.forEach((s,i)=>{
    tablaAdmin.innerHTML+=`
      <tr>
        <td>${s.nombre}</td>
        <td><input type="number" id="act${i}" value="${s.visitantes_actuales}"></td>
        <td><input type="number" id="max${i}" value="${s.capacidad_max}"></td>
        <td><button onclick="aplicar(${i})">Aplicar</button></td>
      </tr>`;
  });
}

// ================= ACCIONES =================
function setVent(i,v){ cacheSalas[i].ventilacion=v; renderTodo(); }
function setLuz(i,l){ cacheSalas[i].iluminacion=l; renderTodo(); }
function apagar(i){ cacheSalas[i].activo=false; cacheSalas[i].visitantes_actuales=0; renderTodo(); }
function encender(i){ cacheSalas[i].activo=true; renderTodo(); }

function aplicar(i){
  cacheSalas[i].visitantes_actuales=parseInt(document.getElementById(`act${i}`).value);
  cacheSalas[i].capacidad_max=parseInt(document.getElementById(`max${i}`).value);
  renderTodo();
}

function agregarSala(){
  const n=nuevaSalaNombre.value.trim();
  const a=parseInt(nuevaSalaAforoActual.value);
  const m=parseInt(nuevaSalaAforoMax.value);
  if(!n||isNaN(a)||isNaN(m)) return alert("Datos inválidos");
  cacheSalas.push({nombre:n,visitantes_actuales:a,capacidad_max:m,ventilacion:"baja",iluminacion:"normal",activo:true});
  nuevaSalaNombre.value=nuevaSalaAforoActual.value=nuevaSalaAforoMax.value="";
  renderTodo(); renderAdmin();
}

// ================= SIMULACIÓN =================
setInterval(()=>{
  cacheSalas.forEach(s=>{
    if(!s.activo) return;
    s.visitantes_actuales=Math.max(0,Math.min(s.capacidad_max,s.visitantes_actuales+Math.floor(Math.random()*3)-1));
  });
  renderTodo();
},2000);

// ================= GENERAL =================
function renderTodo(){
  evaluarAlertas();
  renderSalas();
  renderEstadoGlobal();
  renderHistorial();
  renderGrafico();
}

function mostrarVista(id,btn){
  document.querySelectorAll(".vista").forEach(v=>v.classList.remove("activa"));
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("activa");
  btn.classList.add("active");
}

renderTodo();
renderAdmin();
