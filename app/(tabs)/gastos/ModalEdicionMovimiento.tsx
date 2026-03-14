import { Category } from "@/api/services/interfaces";
import { ButtomComponent, CustomSelector, InputComponent } from "@/components";
import { DatePickerModal } from "@/components/form-fields";
import { InterfaceModalEdicionProps } from "@/interfaces";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

const ModalEdicionMovimiento = ({
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
	newCategoriaId,
	setNewCategoriaId,
	categoriasData = [],
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
						Editar Movimiento
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

					<Text className='font-bold'>Descripción</Text>
					<InputComponent
						placeholder='Descripción'
						value={newDescripcion}
						setValue={setNewDescripcion}
						editable={!isAnyPending}
					/>

					{categoriasData.length > 0 && setNewCategoriaId && (
						<>
							<Text className='font-bold mt-2'>Categoría</Text>
							<CustomSelector<Category>
								data={categoriasData}
								labelKey='name'
								valueKey='id'
								iconKey='icon'
								placeholder='Selecciona una categoría'
								value={
									categoriasData.find(
										(c) =>
											c.id.toString() ===
											newCategoriaId?.toString(),
									) || null
								}
								onSelect={(item) =>
									setNewCategoriaId(item.id.toString())
								}
							/>
						</>
					)}

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

export default ModalEdicionMovimiento;
