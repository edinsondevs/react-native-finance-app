import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

// ✅ IMPORTAR DIRECTAMENTE, NO DESDE components/index.ts
import { InterfaceModalEdicionProps } from "@/interfaces";
import ButtomComponent from "./ButtomComponent";
import InputComponent from "./InputComponent";
import { DatePickerModal } from "./form-fields";

const ModalEdicionIngreso = ({
	modalVisible,
	setModalVisible,
	newMonto,
	setNewMonto,
	newDescripcion,
	setNewDescripcion,
	mutation,
	deleteMutation,
	handleUpdate,
	handleDelete,
	newFecha,
	setNewFecha,
	newOrigen,
	setNewOrigen,
}: InterfaceModalEdicionProps) => {
	const isAnyPending = mutation.isPending || deleteMutation.isPending;
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}>
			<View className='flex-1 justify-center items-center bg-black/50'>
				<View className='bg-white w-[90%] p-6 rounded-lg gap-4'>
					<Text className='text-xl font-bold text-center mb-4'>
						Editar Ingreso
					</Text>

					<Text className='font-bold'>Monto</Text>
					<InputComponent
						placeholder='Monto'
						value={newMonto}
						setValue={setNewMonto}
						keyboardType='numeric'
						iconDollar
						editable={!isAnyPending}
					/>

					{newOrigen !== undefined && setNewOrigen !== undefined && (
						<>
							<Text className='font-bold mt-2'>Origen</Text>
							<InputComponent
								placeholder='Ej. Salario, Venta'
								value={newOrigen}
								setValue={setNewOrigen}
								editable={!isAnyPending}
							/>
						</>
					)}

					<Text className='font-bold mt-2'>Descripción</Text>
					<InputComponent
						placeholder='Descripción'
						value={newDescripcion}
						setValue={setNewDescripcion}
						editable={!isAnyPending}
					/>

					{newFecha && setNewFecha && (
						<>
							<Text className='font-bold mt-2'>Fecha</Text>
							<Pressable
								onPress={() => setDatePickerVisible(true)}>
								<View>
									<InputComponent
										value={dayjs(newFecha).format(
											"DD/MM/YYYY",
										)}
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
							<DatePickerModal
								visible={datePickerVisible}
								value={newFecha}
								onClose={() => setDatePickerVisible(false)}
								onSelect={(date) => setNewFecha(date)}
							/>
						</>
					)}

					<View className='mt-4 gap-2'>
						<ButtomComponent
							text={
								mutation.isPending
									? "Guardando..."
									: "Guardar Cambios"
							}
							onPressFunction={handleUpdate}
							color='bg-primary'
							disabled={isAnyPending}
						/>
						<View className='flex-row gap-2'>
							<View className='flex-1'>
								<ButtomComponent
									text={
										deleteMutation.isPending
											? "Eliminando..."
											: "Eliminar"
									}
									onPressFunction={handleDelete}
									color='bg-red-500'
									disabled={isAnyPending}
								/>
							</View>
							<View className='flex-1'>
								<ButtomComponent
									text='Cancelar'
									onPressFunction={() =>
										setModalVisible(false)
									}
									color='transparent'
									textColor='text-text-black'
									disabled={isAnyPending}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ModalEdicionIngreso;
