import { View } from "react-native";

import { ButtomComponent, InputComponent, TitleOpcionInput, DividerComponent } from "@/components";
import ThemedView from "@/presentation/ThemedView";

const AjustesScreen = () => {
	return (
		<ThemedView
			margin
			className='gap-4 mt-6'>
			<View className='gap-4'>
				<TitleOpcionInput title='Agregar Categoria' />
				<InputComponent
					value=''
					setValue={() => {}}
					placeholder='Agrega nueva categoria'
					editable
				/>
				<ButtomComponent
					onPressFunction={() => {}}
					text='Crear Nueva Categoría'
					color='bg-primary'
				/>
			</View>

			<DividerComponent />

			<View className='gap-4'>
				<TitleOpcionInput title='Agregar Origen de Ingreso' />
				<InputComponent
					value=''
					setValue={() => {}}
					placeholder='Agrega nuevo origen de ingreso'
					editable
				/>
				<ButtomComponent
					onPressFunction={() => {}}
					text='Crear Ingreso'
					color='bg-primary'
				/>
			</View>

			<DividerComponent />

			<View className='gap-4'>
				<TitleOpcionInput title='Agregar Metodo de Pago' />
				<InputComponent
					value=''
					setValue={() => {}}
					placeholder='Agrega nuevo metodo de pago'
					editable
				/>
				<ButtomComponent
					onPressFunction={() => {}}
					text='Crear Metodo de Pago'
					color='bg-primary'
				/>
			</View>
		</ThemedView>
	);
};

export default AjustesScreen;
