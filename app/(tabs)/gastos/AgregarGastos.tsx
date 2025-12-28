import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { crearGastoServices, getCategoriasServices } from "@/api/services";
import { Category, GastoData } from "@/api/services/interfaces";

import { getMetodosPagoServices } from "@/api/services/shared/get.metodos-pago.services";
import {
	ButtomComponent,
	CustomSelector,
	DateTimePickerComponent,
	InputComponent,
	ModalComponent,
	TitleOpcionInput,
} from "@/components";

/**
 * Pantalla para registrar nuevos gastos.
 *
 * Utiliza React Hook Form para la gestión del formulario y TanStack Query para
 * obtener datos (categorías, métodos de pago) y persistir el nuevo gasto.
 */
const AgregarGastosScreen = () => {
	const router = useRouter();
	const [modalVisible, setModalVisible] = useState(false);
	const queryClient = useQueryClient();
	const { control, handleSubmit, reset, watch, setValue } = useForm();

	// Mutation para crear gasto
	/**
	 * Mutación de React Query para enviar los datos del nuevo gasto al servidor (API).
	 * Maneja los estados de carga (isCreating) y define acciones post-éxito/error.
	 */
	const { mutate: crearGasto, isPending: isCreating } = useMutation({
		mutationFn: crearGastoServices,
		onSuccess: () => {
			// Invalida las queries de gastos para refrescar los datos
			queryClient.invalidateQueries({ queryKey: ["gastos"] });
			reset();
			router.back();
		},
		onError: (error: Error) => {
			console.error("Error al crear gasto:", error);
			// Aquí puedes agregar una notificación de error si lo deseas
		},
	});

	/**
	 * Maneja el envío del formulario.
	 *
	 * 1. Formatea la fecha seleccionada.
	 * 2. Construye el objeto de datos necesario (GastoData).
	 * 3. Ejecuta la mutación para guardar en el servidor.
	 *
	 * @param data Datos crudos del formulario (react-hook-form)
	 */
	const onSubmit: SubmitHandler<any> = (data) => {
		// Formatear la fecha al formato YYYY-MM-DD antes de enviar
		const formattedData: GastoData = {
			descripcion: data.descripcion,
			monto: parseFloat(data.monto),
			fecha: data.fecha ? dayjs(data.fecha).format("YYYY-MM-DD") : "",
			categoria_id: data.categoria.id,
			icon: data.categoria.icon,
			metodo_pago_id: data.metodo_pago_id.id,
		};
		crearGasto(formattedData);
	};

	/**
	 * Hook de React Query para obtener la lista de categorías disponibles desde el backend.
	 * Estos datos se utilizan para poblar el selector de categorías en el formulario.
	 */
	const { data: categoriesData } = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	/**
	 * Hook de React Query para obtener los métodos de pago disponibles.
	 * Permite al usuario seleccionar cómo se realizó el gasto (Efectivo, Tarjeta, etc.).
	 */
	const { data: metodosPagoData } = useQuery({
		queryKey: ["metodos-pago"],
		queryFn: getMetodosPagoServices,
	});

	// Observar los campos requeridos del formulario
	const monto = watch("monto");
	const categoria = watch("categoria");
	const metodoPago = watch("metodo_pago_id");

	// Calcular si el botón debe estar deshabilitado
	// El botón está deshabilitado si:
	// 1. Está guardando (isCreating)
	// 2. Falta algún campo requerido (monto, categoria, metodo_pago)
	const isButtonDisabled = isCreating || !monto || !categoria || !metodoPago;

	const textButton = isCreating ? "Guardando..." : "Guardar Gasto";
	const buttonColor = isButtonDisabled ? "transparent" : "bg-primary";

	return (
		<View className='flex-1 bg-background-light px-4'>
			{/* Main Content - KeyboardAwareScrollView */}
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				{/* Monto */}
				<View className='mb-5'>
					<TitleOpcionInput title='Monto' />
					<Controller
						name='monto'
						control={control}
						render={({ field }) => (
							<InputComponent
								value={field.value}
								setValue={field.onChange}
								placeholder='0.00'
								keyboardType='numeric'
								iconDollar
							/>
						)}
					/>
				</View>

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

				{/* Fecha */}
				<View className='mb-5'>
					<TitleOpcionInput title='Fecha' />
					<Controller
						name='fecha'
						control={control}
						defaultValue={new Date()}
						render={({ field }) => (
							<Pressable
								onPress={() => setModalVisible(!modalVisible)}>
								<View>
									<InputComponent
										value={dayjs(
											field.value || new Date()
										).format("DD/MM/YYYY")}
										setValue={() => {}}
										placeholder='Seleccionar fecha'
										editable={false}
										className='pl-3'
									/>
									<View className='absolute right-3 top-3'>
										<FontAwesome
											name='calendar'
											size={24}
											color='black'
										/>
									</View>
								</View>
							</Pressable>
						)}
					/>
				</View>

				{/* Descripción */}
				<View className='mb-5'>
					<TitleOpcionInput title='Descripción (Opcional)' />
					<Controller
						name='descripcion'
						control={control}
						render={({ field }) => (
							<InputComponent
								placeholder='Añade una nota...'
								multiline
								value={field.value}
								setValue={field.onChange}
								className='h-40 pl-3'
								style={{ textAlignVertical: "top" }}
							/>
						)}
					/>
				</View>
			</KeyboardAwareScrollView>

			<ButtomComponent
				onPressFunction={handleSubmit(onSubmit)}
				text={textButton}
				color={buttonColor}
				className='mb-6'
				disabled={isButtonDisabled}
			/>

			{/* Modal para fecha */}
			<ModalComponent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}>
				<DateTimePickerComponent
					value={watch("fecha") || new Date()}
					maximumDate={new Date()}
					minimumDate={new Date(2020, 0, 1)}
					cancelRequestClose={() => setModalVisible(!modalVisible)}
					onRequestClose={(selectedDate) => {
						setValue("fecha", selectedDate || new Date());
						setModalVisible(!modalVisible);
					}}
				/>
			</ModalComponent>
		</View>
	);
};

export default AgregarGastosScreen;
