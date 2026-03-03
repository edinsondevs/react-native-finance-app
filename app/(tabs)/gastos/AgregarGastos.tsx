import { Controller } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Category } from "@/api/services/interfaces";
import {
	ButtomComponent,
	CustomSelector,
	HeaderComponent,
	ModalsAlerts,
	TitleOpcionInput,
} from "@/components";
import {
	DescripcionField,
	FechaField,
	MontoField,
} from "@/components/form-fields";
import { useAgregarGastosLogic } from "@/hooks/useAgregarGastosLogic";
import { Colors } from "@/styles/constants";

/**
 * Pantalla para añadir un nuevo registro de gasto.
 * Implementa un formulario controlado con validaciones y feedback de carga.
 */
const AgregarGastosScreen = () => {
	// 🔌 Desacoplamiento de lógica (SOLID)
	const {
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
	} = useAgregarGastosLogic();

	return (
		<View className='flex-1 bg-background-light px-4'>
			{/* Indicador de carga modal al guardar */}
			<ModalsAlerts
				visible={isCreating}
				color={Colors.primary}
				text='Guardando Nuevo Gasto...'
				transparent={true}
			/>

			{/* Encabezado fijo */}
			<HeaderComponent title='Agregar Nuevo Gasto' />

			{/* Formulario con scroll para evitar el teclado */}
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				{/* Campo de Monto (Numérico) */}
				<MontoField<any> control={control} />

				{/* Selector de Categoría */}
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

				{/* Selector de Método de Pago */}
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

				{/* Selección de Fecha (Calendario) */}
				<FechaField<any>
					control={control}
					watch={watch}
					setValue={setValue}
				/>

				{/* Campo de Texto para Descripción/Notas */}
				<DescripcionField<any> control={control} />
			</KeyboardAwareScrollView>

			{/* Botón de acción principal al final del formulario */}
			<ButtomComponent
				onPressFunction={handleSubmit(handleFormSubmit)}
				text={textButton}
				color={buttonColor}
				className='mb-6'
				disabled={isButtonDisabled}
			/>
		</View>
	);
};

export default AgregarGastosScreen;
