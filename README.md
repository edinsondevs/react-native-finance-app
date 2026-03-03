# Finanzas App 💰 (v4.0)

Bienvenido a **Finanzas App**, una aplicación móvil desarrollada con **React Native** y **Expo** para el control y gestión de finanzas personales. Este proyecto ha sido recientemente refactorizado siguiendo los principios **SOLID**, garantizando un código limpio, mantenible y escalable.

## 🚀 Descripción del Proyecto

Finanzas App es una solución moderna para mantener un registro claro de la economía personal. Permite a los usuarios registrar ingresos y gastos, visualizar tendencias de dinero mediante gráficos interactivos y gestionar categorías y métodos de pago personalizados.

## 🌟 Novedades de la Versión 4.0

- **Arquitectura SOLID**: Completa separación de la lógica de negocio del renderizado UI mediante **Custom Hooks**.
- **Filtrado Global por Mes**: Implementación de **Zustand** para la gestión del estado global del mes seleccionado. Ahora puedes navegar entre meses anteriores y futuros con un solo clic.
- **Gráficos Interactivos**: Mejoras visuales significativas en la pantalla de estadísticas, con gráficos de líneas por usuario y gráficos de torta por categoría.
- **Documentación Completa**: Todos los archivos clave cuentan con comentarios descriptivos en español (**JSDoc**) para facilitar la comprensión de la lógica.
- **Consistencia de Datos**: Integración robusta con **React Query** para el manejo de caché y sincronización en tiempo real con el backend.

## 🛠️ Tecnologías Utilizadas

- **Core**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), [Expo Router](https://docs.expo.dev/router/introduction/).
- **Gestión de Estado**: [Zustand](https://github.com/pmndrs/zustand) (Mes seleccionado, Autenticación).
- **Datos Asíncronos**: [@tanstack/react-query](https://tanstack.com/query/latest) (Fetching & Caching).
- **Estilos & UI**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS), [React Native Gifted Charts](https://gifted-charts.web.app/).
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + PostgREST).
- **Utilidades**: [Day.js](https://day.js.org/), [React Hook Form](https://react-hook-form.com/).

## 📂 Organización del Proyecto

- **`app/`**: Pantallas y rutas (Expo Router).
- **`api/`**: Servicios de comunicación con Supabase.
- **`components/`**: Componentes reutilizables.
- **`hooks/`**: Lógica de negocio (Hooks SOLID).
- **`store/`**: Estados globales de la aplicación.
- **`PROJECT_GUIDE.md`**: Guía técnica detallada sobre la arquitectura y funcionalidades.

## ⚡ Instalación y Ejecución Local

1.  **Clonar:** `git clone <URL_DEL_REPOSITORIO>`
2.  **Instalar:** `npm install`
3.  **Configurar:** Asegura tus credenciales de Supabase en `app.json`.
4.  **Iniciar:** `npx expo start`

## 📱 Funcionalidades

- **Dashboard**: Vista rápida del balance mensual actual.
- **Movimientos**: Lista de ingresos y gastos con edición directa.
- **Filtro Temporal**: Navega por cualquier periodo para ver históricos.
- **Estadísticas**: Gráficos dinámicos comparativos por usuario y categoría.

## 👤 Autor

**Edinson Madrid**

---

Desarrollado con ❤️ usando React Native & Expo.
