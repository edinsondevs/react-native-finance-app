import { ButtomComponent, InputComponent } from "@/components";
import { InterfaceModalEdicionProps } from "@/interfaces";
import React from "react";
import { Modal, Text, View } from "react-native";

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
}: InterfaceModalEdicionProps) => {
	const isAnyPending = mutation.isPending || deleteMutation.isPending;

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
