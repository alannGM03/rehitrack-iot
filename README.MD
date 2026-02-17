# 🏛️ RehiTrack IoT – Museo Interactivo El Rehilete

Sistema Web IoT para el **monitoreo, control y administración de salas del Museo Interactivo El Rehilete**, simulando dispositivos IoT mediante una API REST en MockAPI.

El sistema permite visualizar en tiempo real la ocupación de las salas, registrar entradas y salidas, mantener un historial de eventos y mostrar métricas mediante gráficos, todo con una actualización periódica controlada.

---

## 🎯 Objetivo del Proyecto

Desarrollar una solución IoT completa que integre:

- Dispositivos IoT simulados (salas del museo)
- API REST para almacenamiento y control
- Aplicaciones web para:
  - Administración
  - Control en tiempo real
  - Monitoreo y visualización de datos
- Actualización automática cada 2 segundos
- Interfaz moderna y tecnológica

---

## 🧠 Arquitectura General

**Tecnologías utilizadas:**

- HTML5
- CSS3 (diseño futurista personalizado)
- JavaScript Vanilla (Async / Await / Fetch)
- MockAPI (API REST)
- Chart.js (visualización de datos)
- LocalStorage (persistencia de historial y métricas)

**Modelo de comunicación:**

- Cliente Web ↔ API REST (MockAPI)
- Polling cada 2 segundos para monitoreo
- Buffer de eventos para evitar pérdida de datos por acciones rápidas

---

## 🧩 Dispositivos IoT Simulados

Cada **sala del museo** representa un dispositivo IoT con los siguientes atributos:

- Nombre de la sala
- Capacidad máxima
- Visitantes actuales
- Estado (Disponible / Saturada)

El sistema maneja **mínimo 3 dispositivos IoT**, cumpliendo con la regla de negocio.

---

## 🖥️ Funcionalidades por Pestaña

### 📊 Dashboard
- Visualización del estado actual de cada sala
- Control manual por interruptores:
  - ➕ Entrada
  - ➖ Salida
- Deshabilitación automática del botón de entrada al alcanzar el límite
- Tabla de monitoreo en tiempo real (últimos 10 eventos)
- Actualización cada 2 segundos

---

### 📈 Gráficos
- Gráfico de barras con la ocupación actual por sala
- Resumen de métricas:
  - Total de entradas registradas
  - Total de salidas registradas
- Datos actualizados cada 2 segundos

---

### 🛠️ Administración
- CRUD completo de dispositivos IoT (salas):
  - Crear nueva sala
  - Editar nombre y capacidad
  - Eliminar sala
- Gestión directa sobre la API REST

---

### 📜 Historial
- Registro histórico de entradas y salidas
- Muestra los últimos 10 eventos detectados
- Persistencia mediante LocalStorage
- Actualización controlada cada 2 segundos

---

## 🔄 Lógica de Actualización

- **UI Optimista:**  
  Los botones de entrada y salida reaccionan al instante.
  
- **Procesamiento diferido:**  
  El historial, métricas y gráficos se actualizan cada 2 segundos.

- **Buffer de eventos:**  
  Evita pérdida de registros cuando ocurren múltiples acciones en poco tiempo.

---

## 🚦 Reglas de Negocio Implementadas

- Límite máximo de visitantes por sala (default: 80)
- No se permite exceder la capacidad máxima
- Solo se permite salida cuando hay visitantes
- Historial limitado a 10 registros visibles
- Una sola colección en la API REST
- Persistencia de datos de monitoreo local

---

## ✅ Requisitos Cumplidos

✔ Al menos 3 dispositivos IoT  
✔ Base de datos y API REST en MockAPI  
✔ Aplicación web de administración (CRUD)  
✔ Aplicación web de control por interruptores  
✔ Visualización de estatus por dispositivo  
✔ Gráficos de monitoreo  
✔ Historial de eventos  
✔ Refresco automático cada 2 segundos  
✔ Diseño moderno y tecnológico  
✔ Solución única y personalizada  
