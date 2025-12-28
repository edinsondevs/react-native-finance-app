import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { crearGastoServices, getCategoriasServices } from "@/api/services";
import { Category, GastoData, GastoFormData } from "@/api/services/interfaces";
import { getMetodosPagoServices } from "@/api/services/shared/get.metodos-pago.services";
import {
	ButtomComponent,
	CustomSelector,
	TitleOpcionInput,
} from "@/components";
import {
	DescripcionField,
	FechaField,
	MontoField,
} from "@/components/form-fields";
import { useFormMutation, useFormValidation } from "@/hooks";

/**
 * Pantalla para registrar nuevos gastos.
 *
 * Utiliza React Hook Form para la gestión del formulario y TanStack Query para
 * obtener datos (categorías, métodos de pago) y persistir el nuevo gasto.
 */
const AgregarGastosScreen = () => {
	const { control, handleSubmit, reset, watch, setValue } =
		useForm<GastoFormData>({
			defaultValues: {
				fecha: new Date(),
			},
		});

	// Usar el custom hook para la mutación
	const { mutate: crearGasto, isPending: isCreating } =
		useFormMutation<GastoData>({
			mutationFn: crearGastoServices,
			queryKeys: [["gastos"], ["resumeGastos"]],
			successMessage: "Gasto guardado correctamente",
			errorMessage: "Error al crear gasto",
			onSuccessCallback: reset,
		});

	/**
	 * Hook de React Query para obtener la lista de categorías disponibles desde el backend.
	 */
	const { data: categoriesData } = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	/**
	 * Hook de React Query para obtener los métodos de pago disponibles.
	 */
	const { data: metodosPagoData } = useQuery({
		queryKey: ["metodos-pago"],
		queryFn: getMetodosPagoServices,
	});

	// Usar el custom hook para validación
	const { isButtonDisabled, buttonColor, textButton } =
		useFormValidation<GastoFormData>({
			requiredFields: ["monto", "categoria", "metodo_pago_id"],
			watch,
			isPending: isCreating,
			saveButtonText: "Guardar Gasto",
		});

	/**
	 * Maneja el envío del formulario.
	 */
	const onSubmit: SubmitHandler<GastoFormData> = (data) => {
		const formattedData: GastoData = {
			descripcion: data.descripcion,
			monto: parseFloat(data.monto),
			fecha: data.fecha ? dayjs(data.fecha).format("YYYY-MM-DD") : "",
			categoria_id: data.categoria.id,
			icon: data.categoria.icon || "",
			metodo_pago_id: data.metodo_pago_id.id,
		};
		crearGasto(formattedData);
	};

	return (
		<View className='flex-1 bg-background-light px-4'>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				{/* Monto - Componente reutilizable */}
				<MontoField<GastoFormData> control={control} />

				{/* Categoría */}
				<View className='mb-5'>
					<TitleOpcionInput title='Categoría' />
					<Controller
						name='categoria'
						control={control}
						render={({ field }) => (
							<CustomSelector<Category>
								data={categoriesData}
								labelKey='name'
								valueKey='id'
								iconKey='icon'
								placeholder='Selecciona una categoría...'
								value={field.value}
								onSelect={(item) => field.onChange(item)}
							/>
						)}
					/>
				</View>

				{/* Metodo de Pago */}
				<View className='mb-5'>
					<TitleOpcionInput title='Metodo de Pago' />
					<Controller
						name='metodo_pago_id'
						control={control}
						render={({ field }) => (
							<CustomSelector
								data={metodosPagoData}
								labelKey='name'
								valueKey='id'
								iconKey='icon'
								placeholder='Selecciona el metodo de pago...'
								value={field.value}
								onSelect={(item) => field.onChange(item)}
							/>
						)}
					/>
				</View>

				{/* Fecha - Componente reutilizable */}
				<FechaField<GastoFormData>
					control={control}
					watch={watch}
					setValue={setValue}
				/>

				{/* Descripción - Componente reutilizable */}
				<DescripcionField<GastoFormData> control={control} />
			</KeyboardAwareScrollView>

			<ButtomComponent
				onPressFunction={handleSubmit(onSubmit)}
				text={textButton}
				color={buttonColor}
				className='mb-6'
				disabled={isButtonDisabled}
			/>
		</View>
	);
};

export default AgregarGastosScreen;
