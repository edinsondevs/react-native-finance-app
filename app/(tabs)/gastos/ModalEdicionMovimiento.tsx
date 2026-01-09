import { View, Text, Modal } from 'react-native'
import React from 'react'
import { ButtomComponent, InputComponent } from '@/components';

interface Props {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	newMonto: string;
	setNewMonto: (monto: string) => void;
	newDescripcion: string;
	setNewDescripcion: (descripcion: string) => void;
	mutation: any;
	handleUpdate: () => void;
}

const ModalEdicionMovimiento = ({
	modalVisible,
	setModalVisible,
	newMonto,
	setNewMonto,
	newDescripcion,
	setNewDescripcion,
	mutation,
	handleUpdate,
}: Props) => {
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
					/>

					<Text className='font-bold'>Descripción</Text>
					<InputComponent
						placeholder='Descripción'
						value={newDescripcion}
						setValue={setNewDescripcion}
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
							disabled={mutation.isPending}
						/>
						<ButtomComponent
							text='Cancelar'
							onPressFunction={() => setModalVisible(false)}
							color='transparent'
							textColor='text-text-black'
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ModalEdicionMovimiento