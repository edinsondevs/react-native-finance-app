import { FieldValues, Path, UseFormWatch } from "react-hook-form";

interface UseFormValidationProps<
	TFieldValues extends FieldValues = FieldValues
> {
	requiredFields: Path<TFieldValues>[];
	watch: UseFormWatch<TFieldValues>;
	isPending: boolean;
	saveButtonText?: string;
	savingButtonText?: string;
}

/**
 * Custom hook para validar formularios y manejar el estado del botón de guardar
 * - Valida que todos los campos requeridos tengan valor
 * - Calcula si el botón debe estar deshabilitado
 * - Proporciona el color y texto del botón dinámicamente
 */
export const useFormValidation = <
	TFieldValues extends FieldValues = FieldValues
>({
	requiredFields,
	watch,
	isPending,
	saveButtonText = "Guardar",
	savingButtonText = "Guardando...",
}: UseFormValidationProps<TFieldValues>) => {
	// Observar todos los campos requeridos
	const fieldValues = requiredFields.map((field) => watch(field));

	// El botón está deshabilitado si:
	// 1. Está guardando (isPending)
	// 2. Algún campo requerido está vacío/undefined
	const isButtonDisabled = isPending || fieldValues.some((value) => !value);

	// Color dinámico del botón
	const buttonColor: "transparent" | "bg-primary" = isButtonDisabled
		? "transparent"
		: "bg-primary";

	// Texto dinámico del botón
	const textButton = isPending ? savingButtonText : saveButtonText;

	return {
		isButtonDisabled,
		buttonColor,
		textButton,
	};
};
