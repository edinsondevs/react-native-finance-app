/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de que el contenido rastree todos tus archivos
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      // === COLORES PERSONALIZADOS ===
      colors: {
        // Color principal de la marca (el azul fuerte del botón 'Iniciar sesión')
        'primary': '#135bec',
        'secondary': '#28a745',
        'alert': '#dc3545',

        // Color para el fondo o elementos muy sutiles
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "calendar-primary": "#10b981",

        // Color para textos principales o encabezados
        'text-dark': '#1F2937',

        // Color para bordes de inputs (el gris claro)
        'border-light': '#D1D5DB',

        // Colores específicos para botones de terceros (Google, GitHub)
        'google-red': '#DB4437',
        'github-dark': '#333333',
        'text-white': '#FFFFFF',
        'text-gray': '#6B7280',
        'input-placeholder': '#9CA3AF',
        'text-black': '#9f9f9f',
      },

      // === TIPOGRAFÍA PERSONALIZADA ===
      fontFamily: {
        // Define una familia de fuentes sans-serif para todo el texto.
        // NOTA: Debes cargar la fuente 'Inter' en tu proyecto Expo para que funcione.
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        "Inter-Bold": ["Inter_18pt-Bold", 'system-ui'],
        "Inter-ExtraBold": ["Inter_18pt-ExtraBold", 'system-ui'],
        "Inter-Medium": ["Inter_18pt-Medium", 'system-ui'],
        "Inter-Regular": ["Inter_18pt-Regular", 'system-ui'],
        "Inter-SemiBold": ["Inter_18pt-SemiBold", 'system-ui'],
        "Nunito-Bold": ["Nunito-Bold", 'system-ui'],
        "Nunito-ExtraBold": ["Nunito-ExtraBold", 'system-ui'],
        "Nunito-Medium": ["Nunito-Medium", 'system-ui'],
        "Nunito-Regular": ["Nunito-Regular", 'system-ui'],
        "Nunito-SemiBold": ["Nunito-SemiBold", 'system-ui'],
        "Rubik-Bold": ["Rubik-Bold", 'system-ui'],
        "Rubik-ExtraBold": ["Rubik-ExtraBold", 'system-ui'],
        "Rubik-Medium": ["Rubik-Medium", 'system-ui'],
        "Rubik-Regular": ["Rubik-Regular", 'system-ui'],
        "Rubik-SemiBold": ["Rubik-SemiBold", 'system-ui'],
      },

      // Puedes ajustar el tamaño de fuente si el que usa Tailwind por defecto no coincide.
      // fontSize: {
      //   'title': ['28px', { lineHeight: '36px' }],
      // },
    },
  },
  plugins: [],
}