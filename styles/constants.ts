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
	primary: "#135bec",
	secondary: "#28a745",
	alert: "#dc3545",
	backgroundLight: "#f6f6f8",
	backgroundDark: "#101622",
	calendarPrimary: "#10b981",
	buttonDisabled: "#D1D5DB",
	textDark: "#1F2937",
	textLight: "#fafafa",
	borderLight: "#D1D5DB",
	googleRed: "#DB4437",
	githubDark: "#333333",
	textWhite: "#FFFFFF",
	textGray: "#6B7280",
	inputPlaceholder: "#9CA3AF",
	textBlack: "#9f9f9f",
};


export const ColorsTheme = {
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
	primary: Colors.primary,
	secondary: Colors.secondary,
	alert: Colors.alert,
	// Color para el fondo o elementos muy sutiles
	"background-light": Colors.backgroundLight,
	"background-dark": Colors.backgroundDark,

	// Color para textos principales o encabezados
	"text-dark": Colors.textDark,

	// Color para bordes de inputs (el gris claro)
	"border-light": Colors.borderLight,

	// Colores específicos para botones de terceros (Google, GitHub)
	"google-red": Colors.googleRed,
	"github-dark": Colors.githubDark,
	"text-white": Colors.textWhite,
	"text-gray": Colors.textGray,
	"input-placeholder": Colors.inputPlaceholder,
	"text-black": Colors.textBlack,
};

