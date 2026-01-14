import { deleteGastoServices } from "@/api/services/gastos/delete.gasto.services";
import { updateGastoServices } from "@/api/services/gastos/update.gasto.services";
import { useFormatoMoneda } from "@/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import ModalEdicionMovimiento from "./ModalEdicionMovimiento";

dayjs.locale("es");

/**
 * Propiedades para el componente MovimientosRecientes.
 * Contiene la información de un movimiento individual para ser visualizado.
 */
interface MovimientosRecientesProps {
	item: {
		id?: number;
		categoria?: string;
		descripcion: string;
		monto: number;
		icon: any;
		iconName?: string;
		fecha?: string;
	};
}
/**
 * Componente que muestra una lista de movimientos recientes.
 * Actúa como un contenedor temático para el componente ItemMovimientosCards,
 * asegurando que la presentación se adhiera al tema de la aplicación.
 *
 * @param {MovimientosRecientesProps} props - Propiedades que incluyen los datos del movimiento
 * @returns {JSX.Element} Vista del movimiento reciente envolviendo la tarjeta de detalles
 */
const MovimientosRecientes = ({ item }: MovimientosRecientesProps) => {
	const { id, monto, descripcion, icon } = item;
	const [modalVisible, setModalVisible] = useState(false);
	const [newMonto, setNewMonto] = useState(monto.toString());
	const [newDescripcion, setNewDescripcion] = useState(descripcion);

	const queryClient = useQueryClient();
	const { user } = useAuthStore();

	const mutation = useMutation({
		mutationFn: (data: {
			monto: number;
			descripcion: string;
			user_id?: string;
		}) => updateGastoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El movimiento ha sido actualizado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo actualizar el movimiento.");
			console.error(error);
		},
	});

	// Actualizar el estado local cuando cambian los props (tras el refetch de React Query)
	useEffect(() => {
		setNewMonto(monto.toString());
		setNewDescripcion(descripcion);
	}, [monto, descripcion]);

	const deleteMutation = useMutation({
		mutationFn: () => deleteGastoServices(id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			queryClient.invalidateQueries({ queryKey: ["resumeIngresos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El movimiento ha sido eliminado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo eliminar el movimiento.");
			console.error(error);
		},
	});

	const handleUpdate = () => {
		if (!id) return;
		mutation.mutate({
			monto: parseFloat(newMonto),
			descripcion: newDescripcion,
			user_id: user?.id,
		});
	};

	const handleDelete = () => {
		if (!id) return;

		Alert.alert(
			"Confirmar Eliminación",
			"¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Eliminar",
					style: "destructive",
					onPress: () => deleteMutation.mutate(),
				},
			]
		);
	};

	return (
		<View>
			<Pressable onPress={() => setModalVisible(true)}>
				<View className='flex mx-4 my-2 p-4 border border-border-light rounded-2xl bg-white shadow-sm'>
					<View className='flex flex-row items-center gap-4'>
						{/* Icono de Gasto */}
						<View className='size-12 rounded-full bg-red-100 items-center justify-center'>
							<FontAwesome
								name={icon || "shopping-cart"}
								size={20}
								color='#ef4444'
							/>
						</View>

						{/* Información Central */}
						<View className='flex-1'>
							<Text className='font-Inter-Bold text-base text-text-dark'>
								{descripcion}
							</Text>
							<Text className='font-Inter-Regular text-xs text-text-muted'>
								{item.fecha
									? dayjs(item.fecha).format(
											"DD [de] MMMM, YYYY"
										)
									: "Hoy"}
							</Text>
						</View>

						{/* Monto y Acción */}
						<View className='items-end gap-1'>
							<Text className='font-Inter-Bold text-xl text-red-600'>
								- {useFormatoMoneda(monto)}
							</Text>
							<FontAwesome
								name='chevron-right'
								size={14}
								color='#d1d5db'
							/>
						</View>
					</View>
				</View>
			</Pressable>

			<ModalEdicionMovimiento
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newMonto={newMonto}
				setNewMonto={setNewMonto}
				newDescripcion={newDescripcion}
				setNewDescripcion={setNewDescripcion}
				mutation={mutation}
				deleteMutation={deleteMutation}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
			/>
		</View>
	);
};

export default MovimientosRecientes;
