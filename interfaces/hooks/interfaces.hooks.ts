import { FieldValues, Path, UseFormWatch } from "react-hook-form";

/*
 * @interface UseFormMutationProps
 * Propiedades para el hook useFormMutation.
 * Contiene la información de la mutación que se va a realizar.
 */
export interface InterfaceUseFormMutationProps<TData> {
	mutationFn: (data: TData) => Promise<any>;
	queryKeys: string[][];
	successMessage: string;
	errorMessage?: string;
	onSuccessCallback?: () => void;
}

/*
 * @interface UseFormValidationProps
 * Propiedades para el hook useFormValidation.
 * Contiene la información de la validación del formulario.
 */
export interface InterfaceUseFormValidationProps<
	TFieldValues extends FieldValues = FieldValues,
> {
	requiredFields: Path<TFieldValues>[];
	watch: UseFormWatch<TFieldValues>;
	isPending: boolean;
	saveButtonText?: string;
	savingButtonText?: string;
}

/*
 * @interface UseGastosMutationsProps
 * Propiedades para el hook useGastosMutations.
 * Contiene la información de la mutación que se va a realizar.
 */
export interface InterfaceUseMutationsProps {
	id: number | undefined;
	onSuccessCallback?: () => void;
}

/*
 * @interface SettingsForm
 * Propiedades para el hook useSettingsMutations.
 * Contiene la información de la mutación que se va a realizar.
 */
export interface InterfaceSettingsForm {
	categoria: string;
	categoriaIcon: string;
	fuenteIngreso: string;
	fuenteIngresoIcon: string;
	metodoPago: string;
	metodoPagoIcon: string;
}
