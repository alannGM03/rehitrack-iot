# 🏛️ RehiTrack IoT – Museo Interactivo El Rehilete

Sistema **IoT de control ambiental y gestión de aforo** para salas del Museo Interactivo *El Rehilete*, orientado a la **supervisión, control remoto, generación de alertas inteligentes y análisis histórico** del estado de las salas del museo.

---

## 👨‍💻 Autor del Proyecto

**Alan González Mejía**  
Ingeniería en Sistemas Computacionales  
Proyecto IoT – Control ambiental y monitoreo inteligente

---

## 🎯 Objetivo General

Diseñar e implementar una aplicación web basada en el paradigma **Internet of Things (IoT)** que permita:

- Monitorear el **aforo actual y máximo** de cada sala
- Controlar manualmente **ventilación** e **iluminación**
- Generar **alertas automáticas inteligentes** según reglas de aforo
- Visualizar el **estado del sistema en tiempo real**
- Consultar un **historial de eventos**
- Administrar salas y aforos desde un **panel administrativo centralizado**

---

## 🧠 Descripción General del Sistema

RehiTrack IoT simula un ecosistema IoT donde **cada sala del museo actúa como un dispositivo inteligente**, integrando sensores virtuales, actuadores y reglas de decisión para mejorar:

- Confort de los visitantes
- Seguridad
- Eficiencia energética
- Control operativo del museo

El sistema está dividido en **tres módulos principales**:

1. **Dashboard**
2. **Estatus**
3. **Administración**

---

## 🖥️ Tecnologías Utilizadas

- **HTML5**
- **CSS3** (diseño tecnológico y moderno)
- **JavaScript (Vanilla JS)**
- **Chart.js** (gráficos dinámicos)
- **MockAPI** (simulación de backend IoT)
- **Fetch API / Async-Await**

---

## 📡 Dispositivos IoT del Proyecto

Cada **sala del museo** representa un **dispositivo IoT inteligente**, compuesto por sensores y actuadores virtuales.

### 🟦 Dispositivo IoT por Sala

#### 🔹 Sensor de Aforo
- Simula la detección de personas en la sala
- Registra:
  - Aforo actual
  - Aforo máximo
- Es la **variable principal** para la toma de decisiones

#### 🔹 Actuador de Ventilación
- Estados:
  - Baja
  - Media
  - Alta
  - Apagada
- Controlado manualmente
- Evaluado automáticamente para generar alertas según el aforo

#### 🔹 Actuador de Iluminación
- Estados:
  - Normal
  - Tenue
  - Apagada
- Controlado manualmente
- Analizado para verificar uso adecuado según ocupación

#### 🔹 Control de Estado de Sala
- Encendida / Apagada
- Si la sala está apagada:
  - El aforo se mantiene en cero
  - No se generan alertas
  - Ventilación e iluminación se apagan automáticamente

---

## 📊 Módulos del Sistema

---

### 📌 1. Dashboard – Control Remoto de Salas

Permite el control individual de cada sala del museo.

#### Funcionalidades:
- Visualización de:
  - Aforo actual / máximo
  - Estado de la sala
- Control manual de:
  - Ventilación
  - Iluminación
- Encendido y apagado de salas
- Indicadores visuales de estado
- Alertas dinámicas según condiciones incorrectas

---

### 🚨 Sistema de Alertas Inteligentes

Las alertas se generan **automáticamente** según reglas basadas en el aforo.

#### 🔢 Reglas de Ventilación
- ≤ 33% del aforo → Ventilación **BAJA**
- > 33% y ≤ 66% → Ventilación **MEDIA**
- > 66% → Ventilación **ALTA**

#### 💡 Reglas de Iluminación
- ≤ 50% del aforo → Iluminación **NORMAL**
- > 50% del aforo → Iluminación **TENUe**

#### ⚠️ Alertas Críticas
- Ventilación apagada con aforo presente
- Iluminación apagada con aforo presente
- Ventilación incorrecta según el aforo
- Iluminación incorrecta según el aforo
- **Las salas apagadas NO generan alertas**

---

### 📈 2. Estatus – Monitoreo del Sistema

Panel visual de análisis del sistema IoT.

#### Incluye:
- Gráfica comparativa del estado de cada sala
- Actualización automática cada **2 segundos**
- Tabla con los **últimos 10 eventos registrados**:
  - Sala
  - Evento
  - Fecha y hora
- Separación clara entre gráfica e historial

---

### 🛠️ 3. Administración – Gestión del Sistema

Panel administrativo con diseño tecnológico y distribución completa de pantalla.

#### Funcionalidades:
- Modificar:
  - Aforo actual por sala
  - Aforo máximo por sala
- Agregar **nuevas salas dinámicamente**
- Aplicar cambios en tiempo real al Dashboard
- Gestión centralizada del sistema IoT

---

## 🗂️ Estructura del Proyecto

# 🏛️ RehiTrack IoT – Museo Interactivo El Rehilete

Sistema **IoT de control ambiental y gestión de aforo** para salas del Museo Interactivo *El Rehilete*, orientado a la **supervisión, control remoto, generación de alertas inteligentes y análisis histórico** del estado de las salas del museo.

---

## 👨‍💻 Autor del Proyecto

**Alan González Mejía**  
Ingeniería en Sistemas Computacionales  
Proyecto IoT – Control ambiental y monitoreo inteligente

---

## 🎯 Objetivo General

Diseñar e implementar una aplicación web basada en el paradigma **Internet of Things (IoT)** que permita:

- Monitorear el **aforo actual y máximo** de cada sala
- Controlar manualmente **ventilación** e **iluminación**
- Generar **alertas automáticas inteligentes** según reglas de aforo
- Visualizar el **estado del sistema en tiempo real**
- Consultar un **historial de eventos**
- Administrar salas y aforos desde un **panel administrativo centralizado**

---

## 🧠 Descripción General del Sistema

RehiTrack IoT simula un ecosistema IoT donde **cada sala del museo actúa como un dispositivo inteligente**, integrando sensores virtuales, actuadores y reglas de decisión para mejorar:

- Confort de los visitantes
- Seguridad
- Eficiencia energética
- Control operativo del museo

El sistema está dividido en **tres módulos principales**:

1. **Dashboard**
2. **Estatus**
3. **Administración**

---

## 🖥️ Tecnologías Utilizadas

- **HTML5**
- **CSS3** (diseño tecnológico y moderno)
- **JavaScript (Vanilla JS)**
- **Chart.js** (gráficos dinámicos)
- **MockAPI** (simulación de backend IoT)
- **Fetch API / Async-Await**

---

## 📡 Dispositivos IoT del Proyecto

Cada **sala del museo** representa un **dispositivo IoT inteligente**, compuesto por sensores y actuadores virtuales.

### 🟦 Dispositivo IoT por Sala

#### 🔹 Sensor de Aforo
- Simula la detección de personas en la sala
- Registra:
  - Aforo actual
  - Aforo máximo
- Es la **variable principal** para la toma de decisiones

#### 🔹 Actuador de Ventilación
- Estados:
  - Baja
  - Media
  - Alta
  - Apagada
- Controlado manualmente
- Evaluado automáticamente para generar alertas según el aforo

#### 🔹 Actuador de Iluminación
- Estados:
  - Normal
  - Tenue
  - Apagada
- Controlado manualmente
- Analizado para verificar uso adecuado según ocupación

#### 🔹 Control de Estado de Sala
- Encendida / Apagada
- Si la sala está apagada:
  - El aforo se mantiene en cero
  - No se generan alertas
  - Ventilación e iluminación se apagan automáticamente

---

## 📊 Módulos del Sistema

---

### 📌 1. Dashboard – Control Remoto de Salas

Permite el control individual de cada sala del museo.

#### Funcionalidades:
- Visualización de:
  - Aforo actual / máximo
  - Estado de la sala
- Control manual de:
  - Ventilación
  - Iluminación
- Encendido y apagado de salas
- Indicadores visuales de estado
- Alertas dinámicas según condiciones incorrectas

---

### 🚨 Sistema de Alertas Inteligentes

Las alertas se generan **automáticamente** según reglas basadas en el aforo.

#### 🔢 Reglas de Ventilación
- ≤ 33% del aforo → Ventilación **BAJA**
- > 33% y ≤ 66% → Ventilación **MEDIA**
- > 66% → Ventilación **ALTA**

#### 💡 Reglas de Iluminación
- ≤ 50% del aforo → Iluminación **NORMAL**
- > 50% del aforo → Iluminación **TENUe**

#### ⚠️ Alertas Críticas
- Ventilación apagada con aforo presente
- Iluminación apagada con aforo presente
- Ventilación incorrecta según el aforo
- Iluminación incorrecta según el aforo
- **Las salas apagadas NO generan alertas**

---

### 📈 2. Estatus – Monitoreo del Sistema

Panel visual de análisis del sistema IoT.

#### Incluye:
- Gráfica comparativa del estado de cada sala
- Actualización automática cada **2 segundos**
- Tabla con los **últimos 10 eventos registrados**:
  - Sala
  - Evento
  - Fecha y hora
- Separación clara entre gráfica e historial

---

### 🛠️ 3. Administración – Gestión del Sistema

Panel administrativo con diseño tecnológico y distribución completa de pantalla.

#### Funcionalidades:
- Modificar:
  - Aforo actual por sala
  - Aforo máximo por sala
- Agregar **nuevas salas dinámicamente**
- Aplicar cambios en tiempo real al Dashboard
- Gestión centralizada del sistema IoT

---

## 🗂️ Estructura del Proyecto

RehiTrack-IoT/
│
├── index.html # Interfaz principal
├── style.css # Estilos del sistema
├── app.js # Lógica del sistema IoT
├── README.md # Documentación


---

## 🔄 Simulación IoT

- El sistema simula sensores y actuadores IoT
- Los datos se actualizan en tiempo real
- El historial conserva solo los últimos 10 eventos
- Preparado para migrar a hardware real

---

## 🧪 Casos de Uso

- Control de salas con alto flujo de visitantes
- Prevención de mala ventilación
- Optimización del consumo energético
- Apoyo a la toma de decisiones del personal
- Simulación académica de un sistema IoT real

---

## 🚀 Estado del Proyecto

✅ Funcional  
✅ Escalable  
✅ Modular  
✅ Preparado para backend real  

---

## 🔮 Mejoras Futuras

- Integración con sensores reales (ESP32 / STM32)
- Backend en tiempo real (Firebase / MQTT)
- Notificaciones push
- Control por roles
- Dashboard público informativo

---

## 🏁 Conclusión

RehiTrack IoT demuestra la aplicación práctica de **Internet of Things**, combinando monitoreo, control, automatización basada en reglas y visualización de datos, adaptado a un entorno real como un museo interactivo.

---

📌 **Proyecto desarrollado por Alan González Mejía**
