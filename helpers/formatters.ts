// Función para formatear el número como moneda (formato europeo/latinoamericano)
// Separador de miles: punto (.)
// Separador de decimales: coma (,)

export const formatCurrency = (val: string): string => {
	if (!val) return "";

	// El valor almacenado usa punto (.) como separador decimal internamente
	const parts = val.split(".");
	const integerPart = parts[0];
	const decimalPart = parts[1];

	// Formatear la parte entera con punto como separador de miles
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	// Retornar con coma como separador decimal si existen decimales
	return decimalPart !== undefined
		? `${formattedInteger},${decimalPart}`
		: formattedInteger;
};


export // Función para manejar el cambio de texto
const handleChangeText = (text: string, setValue: (value: string) => void) => {
	// Si está vacío, permitir
	if (text === "") {
		setValue("");
		return;
	}

	// No permitir punto (.) o coma (,) como primer carácter
	if (text.length === 1 && (text === "." || text === ",")) {
		return;
	}

	// Remover puntos (separadores de miles) y reemplazar coma por punto para procesamiento interno
	let cleanValue = text.replace(/\./g, "").replace(",", ".");

	// Validación: Si empieza con 0 y tiene más caracteres
	if (cleanValue.startsWith("0") && cleanValue.length > 1) {
		// Solo permitir si el segundo carácter es un punto decimal
		if (!cleanValue.startsWith("0.")) {
			return; // No permitir 01, 02, etc.
		}
	}

	// Evitar múltiples puntos decimales (internamente)
	const parts = cleanValue.split(".");
	if (parts.length > 2) {
		return; // No permitir más de un separador decimal
	}

	// Limitar decimales a 2 dígitos
	if (parts[1] && parts[1].length > 2) {
		return;
	}

	// Guardar el valor limpio (con punto como decimal interno)
	setValue(cleanValue);
};