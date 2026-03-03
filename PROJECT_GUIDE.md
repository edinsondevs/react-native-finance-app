# 📘 Guía Técnica y Funcional: Finanzas App (v4.0)

Este documento proporciona una visión profunda de la arquitectura, funcionalidades y decisiones técnicas de la aplicación de Finanzas.

## 🏗️ Arquitectura y Diseño (SOLID)

La aplicación ha sido refactorizada siguiendo los principios **SOLID** para garantizar un código limpio, mantenible y escalable.

### 1. Desacoplamiento de Lógica (SRP)

Cada pantalla (`Screen`) se encarga únicamente del renderizado visual. La lógica de negocio, validaciones y obtención de datos se delega a **Custom Hooks** especializados:

- `useGastosScreenLogic`: Lógica de la lista de gastos.
- `useIngresosScreenLogic`: Lógica de la lista de ingresos.
- `useEstadisticasScreenLogic`: Orquestación de datos para gráficos.
- `useAgregarGastosLogic`: Manejo de formularios y mutaciones.

### 2. Capa de Servicios

Las interacciones con la base de datos (Supabase) están centralizadas en `api/services/`. Cada servicio tiene una única responsabilidad y está tipado con interfaces de TypeScript.

## 📊 Funcionalidades Clave

### 🗓️ Filtrado Global por Mes

Implementado con **Zustand**, permite navegar entre meses anteriores y futuros. Al cambiar el mes en el `MonthSelector`, todas las pantallas (Dashboard, Ingresos, Gastos, Estadísticas) actualizan sus datos automáticamente.

### 📈 Análisis Estadístico Avanzado

- **Gráfico de Líneas**: Tendencia de gastos diarios por usuario. Permite comparar flujos de caja entre diferentes miembros.
- **Gráfico de Torta**: Distribución de gastos por categorías y métodos de pago.
- **Resumen Mensual**: Cálculo automático de totales y saldos por periodo.

### ✍️ Gestión de Movimientos

- Registro rápido de ingresos y gastos con iconos dinámicos.
- Edición y eliminación de registros existentes con validación de propiedad (solo el creador puede editar).

## 🛠️ Stack Tecnológico Interno

- **Estado Global**: `Zustand` (Selección de mes, Autenticación).
- **Gestión de Datos Asíncronos**: `TanStack React Query` (Caché, Refetching automático).
- **Formularios**: `React Hook Form` (Validaciones controladas).
- **Estilos**: `NativeWind` (Tailwind CSS para React Native).
- **Base de Datos/Auth**: `Supabase` (PostgreSQL + PostgREST).

## 📂 Organización de Archivos

```text
/api        -> Servicios de comunicación con el backend.
/app        -> Estructura de navegación (Expo Router).
/components -> Unidades de interfaz reutilizables.
/hooks      -> Lógica de negocio (Hooks SOLID).
/store      -> Estados globales compartidos.
/styles     -> Constantes de diseño y temas.
```

## 📜 Estándares de Código

El proyecto utiliza **JSDoc** en español para documentar cada función, componente y hook, facilitando el "onboarding" de nuevos desarrolladores y la comprensión rápida de la lógica interna.
