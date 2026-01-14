import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormMutation, useFormValidation } from "@/hooks";

import { postIngresoServices } from "@/api/services/ingreso/post.ingreso.services";
import { ButtomComponent, HeaderComponent, InputComponent, TitleOpcionInput } from "@/components";
import { DescripcionField, FechaField, MontoField } from "@/components/form-fields";

import { IngresoForm } from "@/interfaces";

const AgregarIngresos = () => {

	const { control, handleSubmit, reset, watch, setValue } = useForm<IngresoForm>({ defaultValues: { fecha: new Date() } });

	// Usar el custom hook para la mutación
	const { mutate: crearIngreso, isPending } = useFormMutation<IngresoForm>({
		mutationFn: async (data: IngresoForm) => {
			return postIngresoServices({
				origen: data.origen,
				monto: Number(data.monto),
				fecha: dayjs(data.fecha).format("YYYY-MM-DD"),
				descripcion: data.descripcion
			});
		},
		queryKeys: [["ingresos"], ["resumeIngresos"]],
		successMessage: "Ingreso guardado correctamente",
		onSuccessCallback: reset,
	});

	// Usar el custom hook para validación
	const { isButtonDisabled, buttonColor, textButton } = useFormValidation({
		requiredFields: ["monto", "origen"],
		watch,
		isPending,
		saveButtonText: "Guardar Ingreso",
	});

	const onSubmit: SubmitHandler<IngresoForm> = (data) => {
		crearIngreso(data);
	};

	return (
		<View className='flex-1 px-4'>
			<HeaderComponent title='Agregar Nuevo Ingreso' />	
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingTop: 16 }}
				showsVerticalScrollIndicator={false}
				extraScrollHeight={100}
				enableOnAndroid={true}>
				<View className='flex flex-col'>
					{/* Monto - Componente reutilizable */}
					<MontoField control={control} />

					{/* Origen */}
					<View className='mb-5'>
						<TitleOpcionInput title='Origen' />
						<Controller
							name='origen'
							control={control}
							render={({ field }) => (
								<InputComponent
									placeholder='Ej. Salario, Venta, Reintegros'
									keyboardType='default'
									value={field.value}
									setValue={field.onChange}
									autoCapitalize='sentences'
								/>
							)}
						/>
					</View>

					{/* Fecha - Componente reutilizable */}
					<FechaField
						control={control}
						watch={watch}
						setValue={setValue}
					/>

					{/* Descripción - Componente reutilizable */}
					<DescripcionField control={control}  />
				</View>
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

export default AgregarIngresos;
