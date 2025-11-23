export interface ColorsInterfaces {
	primary: string;
	secondary: string;
	"background-light": string;
	"text-dark": string;
	"border-light": string;
	"google-red": string;
	"github-dark": string;
	"text-white": string;
	"text-gray": string;
	"text-input-placeholder": string;
	"text-black": string;
}

export const colors: ColorsInterfaces = {
	// Color principal de la marca (el azul fuerte del botón 'Iniciar sesión')
	primary: "#1E40FF",
	secondary: "#4CAF50",

	// Color para el fondo o elementos muy sutiles
	"background-light": "#FAFAFA",

	// Color para textos principales o encabezados
	"text-dark": "#1F2937",

	// Color para bordes de inputs (el gris claro)
	"border-light": "#D1D5DB",

	// Colores específicos para botones de terceros (Google, GitHub)
	"google-red": "#DB4437",
	"github-dark": "#333333",
	"text-white": "#FFFFFF",
	"text-gray": "#6B7280",
	"text-input-placeholder": "#9CA3AF",
	"text-black": "#9f9f9f",
};
