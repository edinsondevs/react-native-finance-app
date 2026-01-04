import { updateGastoServices } from "@/api/services/gastos/update.gasto.services";
import { ItemMovimientosCards } from "@/components";
import ThemedView from "@/presentation/ThemedView";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Pressable } from "react-native";
import ModalEdicionMovimiento from "./ModalEdicionMovimiento";

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

	const mutation = useMutation({
		mutationFn: (data: { monto: number; descripcion: string }) =>
			updateGastoServices(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gastos", "all"] });
			queryClient.invalidateQueries({ queryKey: ["resumeGastos"] });
			setModalVisible(false);
			Alert.alert("Éxito", "El movimiento ha sido actualizado.");
		},
		onError: (error) => {
			Alert.alert("Error", "No se pudo actualizar el movimiento.");
			console.error(error);
		},
	});

	const handleUpdate = () => {
		if (!id) return;
		mutation.mutate({
			monto: parseFloat(newMonto),
			descripcion: newDescripcion,
		});
	};

	return (
		<>
			<Pressable onPress={() => setModalVisible(true)}>
				<ThemedView margin>
					<ItemMovimientosCards
						description={descripcion}
						amount={monto}
						icon={icon}
					/>
				</ThemedView>
			</Pressable>

			<ModalEdicionMovimiento
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newMonto={newMonto}
				setNewMonto={setNewMonto}
				newDescripcion={newDescripcion}
				setNewDescripcion={setNewDescripcion}
				mutation={mutation}
				handleUpdate={handleUpdate}
			/>
		</>
	);
};

export default MovimientosRecientes;
