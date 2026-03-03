import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { IngresoInterfaces } from "@/api/services/interfaces";
import { useAuthStore } from "@/store/useAuthStore";

import { FnIngresos } from "@/helpers/functions/ingresos";
import { useFormatoMoneda, useIngresosMutations } from "@/hooks";

// ✅ IMPORTAR DIRECTAMENTE, NO DESDE components/index.ts
import ModalEdicionIngreso from "./ModalEdicionIngreso";

/**
 * @component ItemIngreso
 * Representa una tarjeta individual para un registro de ingreso de dinero.
 *
 * Funcionalidad:
 * - Muestra detalles del ingreso: monto, origen, fecha y descripción.
 * - Formatea el monto a moneda local.
 * - Permite abrir un modal de edición/eliminación si el usuario es el propietario.
 * - Deshabilita la interacción si el registro no pertenece al usuario actual (SOLID: seguridad en UI).
 *
 * @param props - Datos parciales del ingreso según IngresoInterfaces.
 */

const ItemIngreso = ({
	id,
	monto = 0,
	fecha,
	origen,
	descripcion = "",
	user_id,
}: Partial<IngresoInterfaces>) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [newMonto, setNewMonto] = useState(monto.toString());
	const [newDescripcion, setNewDescripcion] = useState(descripcion);
	const { user } = useAuthStore();

	// Usar el custom hook para las mutaciones
	const { updateMutation, deleteMutation } = useIngresosMutations({
		id,
		onSuccessCallback: () => setModalVisible(false),
	});

	// Validar si el movimiento es del usuario actual
	const bgColorAvailable =
		user_id === user?.id ? "bg-white" : "bg-button-disabled";

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				disabled={user_id !== user?.id}>
				<View
					className={`flex mx-4 my-2 p-4 border border-border-light rounded-2xl ${bgColorAvailable} shadow-sm`}>
					<View className='flex flex-row items-center gap-4'>
						{/* Icono de Ingreso */}
						<View className='size-12 rounded-full bg-green-100 items-center justify-center'>
							<FontAwesome
								name='arrow-up'
								size={20}
								color='#10b981'
							/>
						</View>

						{/* Información Central */}
						<View className='flex-1'>
							<Text className='font-Inter-Bold text-lg text-text-dark'>
								{origen}
							</Text>
							<Text className='font-Inter-Regular text-xs text-text-muted'>
								{fecha
									? dayjs(fecha).format("DD [de] MMMM, YYYY")
									: ""}
							</Text>
						</View>

						{/* Monto y Acción */}
						<View className='items-end gap-1'>
							<Text className='font-Inter-Bold text-xl text-green-600'>
								+ {useFormatoMoneda(monto)}
							</Text>
							<FontAwesome
								name='chevron-right'
								size={14}
								color='#d1d5db'
							/>
						</View>
					</View>

					{descripcion ? (
						<View className='mt-3 pt-3 border-t border-gray-50'>
							<Text className='font-Inter-Regular text-sm text-text-muted italic'>
								{descripcion}
							</Text>
						</View>
					) : null}
				</View>
			</Pressable>

			<ModalEdicionIngreso
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newMonto={newMonto}
				setNewMonto={setNewMonto}
				newDescripcion={newDescripcion}
				setNewDescripcion={setNewDescripcion}
				mutation={updateMutation}
				deleteMutation={deleteMutation}
				handleUpdate={() =>
					FnIngresos.handleUpdate(
						{ id, updateMutation },
						newMonto,
						newDescripcion,
					)
				}
				handleDelete={() =>
					FnIngresos.handleDelete({ id, deleteMutation })
				}
			/>
		</>
	);
};

export default ItemIngreso;
