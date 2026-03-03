import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";

import { Category } from "@/api/services/interfaces";
import MovimientosRecientes from "@/app/(tabs)/gastos/MovimientosRecientes";
import {
	CardsComponent,
	CircleButton,
	CustomSelector,
	HeaderComponent,
	MonthSelector,
	TitleOpcionInput,
} from "@/components";
import { useFormatoMoneda } from "@/hooks";
import { useGastosScreenLogic } from "@/hooks/useGastosScreenLogic";
import { colors } from "@/styles/constants";

/**
 * Pantalla principal de Gestión de Gastos.
 * Lista los movimientos filtrados por mes, categoría y método de pago.
 */
const GastosScreen = () => {
	// ⚡️ Desacoplamiento de lógica (SOLID - Single Responsibility)
	const {
		saludo,
		displayName,
		resumeIngresos,
		isLoadingResumeIngresos,
		gastosFiltrados,
		isLoadingAllGastos,
		refreshAll,
		categorias,
		metodosPago,
		selectedCategoria,
		selectedMetodoPago,
		handleCategoriaChange,
		handleMetodoPagoChange,
		gastosFiltradosTotal,
	} = useGastosScreenLogic();

	return (
		<View className='flex-1'>
			{/* Lista Principal de Movimientos */}
			<FlatList
				data={gastosFiltrados}
				refreshControl={
					<RefreshControl
						refreshing={isLoadingAllGastos}
						onRefresh={refreshAll}
					/>
				}
				keyExtractor={(item) =>
					item.id?.toString() || Math.random().toString()
				}
				renderItem={({ item }) => <MovimientosRecientes item={item} />}
				ListEmptyComponent={
					isLoadingAllGastos ? (
						<ActivityIndicator
							size='large'
							color={colors.primary}
						/>
					) : (
						<Text className='text-center text-gray-500 mt-10'>
							No hay movimientos
						</Text>
					)
				}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<>
						{/* Saludo dinámico */}
						<HeaderComponent
							title={`${saludo} ${displayName.split(" ")[0]}`}
							icon
						/>

						{/* Filtro de mes global */}
						<MonthSelector />

						{/* Tarjetas resumen: Ingresos y Gastos filtrados */}
						<View className='flex flex-row justify-around '>
							{/* Card de Ingresos */}
							<View className='w-6/12'>
								<CardsComponent className='gap-1 items-center'>
									<View className='flex flex-row items-center'>
										<MaterialIcons
											name='arrow-upward'
											size={24}
											className='text-secondary bg-secondary/10 p-1 rounded-full mr-4'
										/>
										<Text className='text-xl'>
											Ingresos
										</Text>
									</View>
									<Text className='font-Nunito-Bold text-secondary'>
										{isLoadingResumeIngresos ? (
											<ActivityIndicator />
										) : (
											useFormatoMoneda(resumeIngresos)
										)}
									</Text>
								</CardsComponent>
							</View>

							{/* Card de Gastos */}
							<View className='w-6/12'>
								<CardsComponent className='gap-1 items-center'>
									<View className='flex flex-row items-center'>
										<MaterialIcons
											name='arrow-downward'
											size={24}
											color={colors.alert}
											className='bg-alert/10 p-1 rounded-full mr-4'
										/>
										<Text className='text-xl'>Gastos</Text>
									</View>
									<Text className='font-Nunito-Bold text-alert'>
										{useFormatoMoneda(gastosFiltradosTotal)}
									</Text>
								</CardsComponent>
							</View>
						</View>

						{/* Seccion de Micro-Filtros Rápidos */}
						<View className='mx-4 my-3'>
							<Text className='text-base font-Inter-Bold text-text-dark mb-2'>
								Filtros
							</Text>
							<View className='flex-row gap-2'>
								{/* Selector de Categoria */}
								<View className='flex-1'>
									<CustomSelector<Category>
										data={categorias}
										labelKey='name'
										valueKey='id'
										iconKey='icon'
										placeholder='Categoría'
										value={selectedCategoria}
										onSelect={handleCategoriaChange}
									/>
								</View>
								{/* Selector de Metodo de Pago */}
								<View className='flex-1'>
									<CustomSelector
										data={metodosPago}
										labelKey='name'
										valueKey='id'
										iconKey='icon'
										placeholder='Método de Pago'
										value={selectedMetodoPago}
										onSelect={handleMetodoPagoChange}
									/>
								</View>
							</View>
						</View>

						{/* Subtítulo de encabezado */}
						<View className='mx-8 mb-2'>
							<TitleOpcionInput title='Movimientos Recientes' />
						</View>
					</>
				}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>

			{/* Acción flotante: Ir a crear nuevo gasto */}
			<View className='bottom-0 right-0 m-3 absolute'>
				<CircleButton
					text='+'
					onPressFunction={() =>
						router.push("/(tabs)/gastos/AgregarGastos")
					}
				/>
			</View>
		</View>
	);
};

export default GastosScreen;
