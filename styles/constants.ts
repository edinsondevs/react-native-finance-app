export interface ColorsInterfaces {
	primary: string;
	secondary: string;
	alert: string;
	"background-light": string;
	"background-dark": string;
	"text-dark": string;
	"border-light": string;
	"google-red": string;
	"github-dark": string;
	"text-white": string;
	"text-gray": string;
	"input-placeholder": string;
	"text-black": string;
}

export const Colors = {
	light: {
		primary: "#49129c",
		secondary: "#b40086",
		tertiary: "#ef2967",
		success: "#52d49b",

		text: "#000000",
		background: "#f5f5f5",
		backgroundListHeader: "#D6E2F1",
	},
	dark: {
		primary: "#7a4edc",
		secondary: "#d138a8",
		tertiary: "#ff527f",
		success: "#3a9d78",

		text: "#ECEDEE",
		background: "#17202A",
		backgroundListHeader: "#314761",
	},
};

export const colors: ColorsInterfaces = {
	// Color principal de la marca (el azul fuerte del botón 'Iniciar sesión')
	primary: "#135bec",
	secondary: "#28a745",
	alert: "#dc3545",
	// Color para el fondo o elementos muy sutiles
	"background-light": "#f6f6f8",
	"background-dark": "#101622",

	// Color para textos principales o encabezados
	"text-dark": "#1F2937",

	// Color para bordes de inputs (el gris claro)
	"border-light": "#D1D5DB",

	// Colores específicos para botones de terceros (Google, GitHub)
	"google-red": "#DB4437",
	"github-dark": "#333333",
	"text-white": "#FFFFFF",
	"text-gray": "#6B7280",
	"input-placeholder": "#9CA3AF",
	"text-black": "#9f9f9f",
};
