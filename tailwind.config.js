/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de que el contenido rastree todos tus archivos
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts-tsx}"
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      // === COLORES PERSONALIZADOS ===
      colors: {
        // Color principal de la marca (el azul fuerte del botón 'Iniciar sesión')
        'primary': '#1E40FF',
        'secondary': '#4CAF50',

        // Color para el fondo o elementos muy sutiles
        'background-light': '#FAFAFA',

        // Color para textos principales o encabezados
        'text-dark': '#1F2937',

        // Color para bordes de inputs (el gris claro)
        'border-light': '#D1D5DB',

        // Colores específicos para botones de terceros (Google, GitHub)
        'google-red': '#DB4437',
        'github-dark': '#333333',
        'text-white': '#FFFFFF',
        'text-gray': '#6B7280',
        'text-input-placeholder': '#9CA3AF',
        'text-black': '#9f9f9f',
      },

      // === TIPOGRAFÍA PERSONALIZADA ===
      fontFamily: {
        // Define una familia de fuentes sans-serif para todo el texto.
        // NOTA: Debes cargar la fuente 'Inter' en tu proyecto Expo para que funcione.
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        "Bold": ["RobotoCondensed-Bold", 'system-ui'],
        "BoldItalic": ["RobotoCondensed-BoldItalic", 'system-ui'],
        "ExtraBold": ["RobotoCondensed-ExtraBold", 'system-ui'],
        "Italic": ["RobotoCondensed-Italic", 'system-ui'],
        "Light": ["RobotoCondensed-Light", 'system-ui'],
        "Medium": ["RobotoCondensed-Medium", 'system-ui'],
        "Regular": ["RobotoCondensed-Regular", 'system-ui'],
      },

      // Puedes ajustar el tamaño de fuente si el que usa Tailwind por defecto no coincide.
      // fontSize: {
      //   'title': ['28px', { lineHeight: '36px' }],
      // },
    },
  },
  plugins: [],
}