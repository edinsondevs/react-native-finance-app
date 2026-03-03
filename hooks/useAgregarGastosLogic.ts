import {
	crearGastoServices,
	getCategoriasServices,
	getMetodosPagoServices,
} from "@/api/services";
import { GastoData, GastoFormData } from "@/api/services/interfaces";
import { useFormMutation, useFormValidation } from "@/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

/**
 * Hook de lógica para la pantalla de añadir gastos.
 * Maneja el estado del formulario, mutaciones de datos y validaciones.
 */
export const useAgregarGastosLogic = () => {
	const { user } = useAuthStore();
	const queryClient = useQueryClient();

	const { control, handleSubmit, reset, watch, setValue } =
		useForm<GastoFormData>({
			defaultValues: {
				fecha: new Date(),
			},
		});

	// Mutación para crear el gasto
	const { mutate: crearGasto, isPending: isCreating } =
		useFormMutation<GastoData>({
			mutationFn: crearGastoServices,
			queryKeys: [["gastos"], ["resumeGastos"]],
			successMessage: "Gasto guardado correctamente",
			errorMessage: "Error al crear gasto",
			onSuccessCallback: () => {
				reset();
				queryClient.invalidateQueries({
					queryKey: ["estadisticasGastos"],
				});
			},
		});

	// Datos de categorías
	const { data: categoriesData } = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	// Datos de métodos de pago
	const { data: metodosPagoData } = useQuery({
		queryKey: ["metodos-pago"],
		queryFn: getMetodosPagoServices,
	});

	// Validación de botón
	const { isButtonDisabled, buttonColor, textButton } =
		useFormValidation<GastoFormData>({
			requiredFields: ["monto", "categoria", "metodo_pago_id"],
			watch,
			isPending: isCreating,
			saveButtonText: "Guardar Gasto",
		});

	/**
	 * Procesa y envía los datos del formulario al backend
	 */
	const handleFormSubmit = (data: GastoFormData) => {
		const formattedData: GastoData = {
			descripcion: data.descripcion,
			monto: parseFloat(data.monto),
			fecha: data.fecha ? dayjs(data.fecha).format("YYYY-MM-DD") : "",
			categoria_id: data.categoria.id,
			icon: data.categoria.icon || "category",
			metodo_pago_id: data.metodo_pago_id.id,
			user_id: user?.id,
		};
		crearGasto(formattedData);
	};

	return {
		control,
		handleSubmit,
		handleFormSubmit,
		isCreating,
		categoriesData,
		metodosPagoData,
		isButtonDisabled,
		buttonColor,
		textButton,
		watch,
		setValue,
	};
};
