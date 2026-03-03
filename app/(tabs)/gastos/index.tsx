import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";

import { getCategoriasServices, getMetodosPagoServices } from "@/api/services";
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
import { useDashboardData, useFormatoMoneda } from "@/hooks";
import { useGetHoursCurrent } from "@/hooks/useGetHoursCurrent";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/styles/constants";

const GastosScreen = () => {
	const { saludo } = useGetHoursCurrent();

	const {
		resumeIngresos,
		isLoadingResumeIngresos,
		resumeGastos,
		isLoadingResumeGastos,
		allGastos,
		isLoadingAllGastos,
		refreshAll,
	} = useDashboardData();

	const { user } = useAuthStore();
	const displayName = user?.displayName || "Usuario";

	// Estado para filtros
	const [selectedCategoria, setSelectedCategoria] = useState<Category | null>(
		null,
	);
	const [selectedMetodoPago, setSelectedMetodoPago] = useState<any>(null);

	// Obtener categorías
	const { data: categorias = [] } = useQuery({
		queryKey: ["categorias"],
		queryFn: getCategoriasServices,
	});

	// Obtener métodos de pago
	const { data: metodosPago = [] } = useQuery({
		queryKey: ["metodos-pago"],
		queryFn: getMetodosPagoServices,
	});

	// Manejar cambio de categoría con toggle
	const handleCategoriaChange = (categoria: Category) => {
		if (selectedCategoria?.id === categoria.id) {
			setSelectedCategoria(null);
		} else {
			setSelectedCategoria(categoria);
		}
	};

	// Manejar cambio de método de pago con toggle
	const handleMetodoPagoChange = (metodo: any) => {
		if (selectedMetodoPago?.id === metodo.id) {
			setSelectedMetodoPago(null);
		} else {
			setSelectedMetodoPago(metodo);
		}
	};

	// Filtrar gastos según los filtros seleccionados
	const gastosFiltrados =
		allGastos?.filter((gasto) => {
			const porCategoria =
				!selectedCategoria ||
				gasto.categoria_id === selectedCategoria.id;
			const porMetodoPago =
				!selectedMetodoPago ||
				gasto.metodo_pago_id === selectedMetodoPago.id;
			return porCategoria && porMetodoPago;
		}) || [];

	// Calcular el total de gastos filtrados
	const gastosFiltradosTotal = gastosFiltrados.reduce(
		(sum, gasto) => sum + (gasto.monto || 0),
		0,
	);

	return (
		<View className='flex-1'>
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
						<HeaderComponent
							title={`${saludo} ${displayName.split(" ")[0]}`}
							icon
						/>

						<MonthSelector />

						{/* Ingresos / Gastos */}
						<View className='flex flex-row justify-around '>
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
						{/* Filtros de categoría y método de pago */}
						<View className='mx-4 my-3'>
							<Text className='text-base font-Inter-Bold text-text-dark mb-2'>
								Filtros
							</Text>
							<View className='flex-row gap-2'>
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
						{/* Título antes de los movimientos */}
						<View className='mx-8 mb-2'>
							<TitleOpcionInput title='Movimientos Recientes' />
						</View>
					</>
				}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>

			{/* Botón flotante */}
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
