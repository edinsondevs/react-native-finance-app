# Finanzas App 💰

Bienvenido a **Finanzas App**, una aplicación móvil desarrollada con React Native y Expo para el control y gestión de finanzas personales. Este proyecto permite a los usuarios registrar ingresos y gastos, visualizar su flujo de dinero mediante gráficos y gestionar categorías y métodos de pago personalizados.

## 🚀 Descripción del Proyecto

Finanzas App es una solución integral para mantener un registro claro de la economía personal. Permite a los usuarios autenticarse, agregar transacciones financieras y obtener un resumen visual de sus finanzas. La aplicación está construida utilizando una arquitectura moderna basada en componentes y servicios, aprovechando la potencia de Expo para el desarrollo multiplataforma.

## 🛠️ Tecnologías y Librerías Utilizadas

Este proyecto utiliza un stack tecnológico robusto y moderno:

### Core & Framework

- **[React Native](https://reactnative.dev/):** Biblioteca principal para construir la interfaz móvil nativa.
- **[Expo](https://expo.dev/):** Plataforma y framework para facilitar el desarrollo, construcción y despliegue de aplicaciones React Native.
- **[Expo Router](https://docs.expo.dev/router/introduction/):** Sistema de enrutamiento basado en archivos (file-based routing), similar a Next.js, para la navegación de la app.

### Estilos & UI

- **[NativeWind](https://www.nativewind.dev/) (Tailwind CSS):** Utilidad de estilos para escribir CSS clases directamente en los componentes de React Native.
- **[@expo/vector-icons](https://icons.expo.fyi/):** Conjunto de iconos vectoriales populares (FontAwesome, MaterialIcons, etc.).
- **[React Native Gifted Charts](https://gifted-charts.web.app/):** Librería para crear gráficos interactivos y visualmente atractivos.
- **[React Native Keyboard Aware ScrollView](https://github.com/APSL/react-native-keyboard-aware-scroll-view):** Componente que ajusta la vista cuando aparece el teclado para evitar tapar los inputs.

### Gestión de Estado & Datos

- **[@tanstack/react-query](https://tanstack.com/query/latest):** Potente herramienta para la gestión del estado del servidor (fetching, caching, sincronización y actualización de datos asíncronos).
- **[Zustand](https://github.com/pmndrs/zustand):** Solución ligera y rápida para la gestión del estado global del cliente (como la sesión del usuario).
- **[Axios](https://axios-http.com/):** Cliente HTTP para realizar peticiones a la API.

### Backend & Autenticación

- **[Supabase](https://supabase.com/):** Backend-as-a-Service (BaaS) utilizado para la base de datos (PostgreSQL) y el sistema de autenticación de usuarios.

### Utilidades

- **[Day.js](https://day.js.org/):** Librería minimalista para el manejo y formateo de fechas.
- **[React Hook Form](https://react-hook-form.com/):** (Listada) Librería para la gestión eficiente de formularios.

## 📂 Estructura del Proyecto

La estructura de directorios está organizada de la siguiente manera:

- **`app/`**: Contiene las pantallas y la lógica de navegación (rutas) de la aplicación.
    - **`(tabs)/`**: Define la navegación por pestañas (Dashboard, Ingresos, Gastos, Ajustes).
- **`api/`**: Capa de servicios para la comunicación con el backend (Supabase).
- **`components/`**: Componentes de UI reutilizables (Botones, Inputs, Tarjetas, Modales).
- **`store/`**: Stores de Zustand para el estado global (ej: `useAuthStore`).
- **`hooks/`**: Custom hooks para lógica encapsulada (ej: formateo de moneda).
- **`helpers/`**: Funciones de utilidad y formateadores.
- **`assets/`**: Recursos estáticos como imágenes y fuentes.
- **`constants/`**: Constantes de la aplicación (colores, temas).

## ⚡ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local:

### Prerrequisitos

- Tener instalado **Node.js**.
- Tener un gestor de paquetes como **npm**, **yarn** o **pnpm**.
- (Opcional) Tener instalado **Expo Go** en tu dispositivo móvil o un emulador (Android Studio / Xcode).

### Pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd finanzasApp
    ```

2.  **Instalar dependencias:**
    Este proyecto utiliza `pnpm` (recomendado), pero puedes usar npm o yarn.

    ```bash
    pnpm install
    # o
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    El proyecto ya incluye algunas configuraciones en `app.json`, pero asegúrate de tener acceso a las credenciales de Supabase si es necesario configurar un entorno propio.

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npx expo start
    ```

5.  **Ejecutar en dispositivo:**
    - **Físico:** Escanea el código QR que aparece en la terminal con la app **Expo Go** (Android/iOS).
    - **Emulador:** Presiona `a` para abrir en Android Emulator o `i` para iOS Simulator.

## 📱 Funcionalidades Principales

- **Autenticación:** Registro e inicio de sesión de usuarios.
- **Dashboard:** Resumen visual del balance actual.
- **Movimientos:**
    - Listado de movimientos recientes.
    - **Edición rápida:** Toca cualquier movimiento en la lista para editar su monto o descripción directamente.
- **Gestión:**
    - Agregar Ingresos y Gastos categorizados.
    - Personalización de categorías y métodos de pago desde los Ajustes.

## 👤 Autor

**Edinson Madrid**

- **Versión de la App:** 2.1.0

---

Desarrollado con ❤️ usando React Native & Expo.
