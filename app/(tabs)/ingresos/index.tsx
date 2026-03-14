import { router } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";

import {
	CircleButton,
	HeaderComponent,
	ItemIngreso,
	MonthSelector,
} from "@/components";
import { useIngresosScreenLogic } from "@/hooks/useIngresosScreenLogic";

// Eliminamos HeaderList ya que no es necesario en el nuevo diseño de tarjetas.

/**
 * Pantalla de registro de ingresos mensuales.
 * Muestra el historial de entradas de dinero para el periodo seleccionado.
 */
const IngresosScreen = () => {
	// 🏗️ Lógica externa desacoplada (SOLID)
	const { isLoading, error, refetch, ingresosConSeparadores } =
		useIngresosScreenLogic();

	// Estado de carga inicial
	if (isLoading) {
		return (
			<View className='flex-1 justify-center items-center'>
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			</View>
		);
	}

	// Estado de error en la petición
	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text>Error cargando ingresos</Text>
			</View>
		);
	}

	return (
		<View className='flex-1 bg-gray-50'>
			{/* Encabezado Principal */}
			<HeaderComponent title='Ingresos' />

			{/* Selector de Mes (Sincronizado globalmente) */}
			<MonthSelector />

			{/* Lista de Ingresos */}
			<FlatList
				data={ingresosConSeparadores}
				contentContainerStyle={{ paddingVertical: 8 }}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={() => refetch()}
					/>
				}
				renderItem={({ item }: { item: any }) => {
					// Renderizado condicional de separador vs item de ingreso
					if (item.type === "separator") {
						return <View className='bg-blue-500 h-1 my-3 mx-4' />;
					}

					return (
						<ItemIngreso
							monto={item.monto}
							fecha={item.fecha}
							origen={item.origen}
							descripcion={item.descripcion}
							id={item.id}
							user_id={item.user_id}
						/>
					);
				}}
				keyExtractor={(item, index) =>
					item.id?.toString()
						? `${item.id}-${index}`
						: Math.random().toString()
				}
				ListEmptyComponent={
					<Text className='text-center mt-5'>
						No hay ingresos registrados
					</Text>
				}
			/>

			{/* Acción Flotante: Agregar Ingreso */}
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
					color='bg-secondary'
					onPressFunction={() =>
						router.push("/(tabs)/ingresos/AgregarIngresos")
					}
				/>
			</View>
		</View>
	);
};

export default IngresosScreen;
