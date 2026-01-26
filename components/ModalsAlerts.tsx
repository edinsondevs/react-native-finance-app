import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

interface ModalsAlertInterface {
	visible?: boolean;
	animationType?: 'slide' | 'fade' | 'none';
	transparent?: boolean;
	onRequestClose?: () => void;
    color?: string;
    text?: string;
}

const ModalsAlerts = ({visible = false, animationType = 'slide', transparent = true, onRequestClose, color = '#00ff00', text = 'Cargando...'}: ModalsAlertInterface) => {
  return (
		<View>
			<Modal
				visible={visible}
				animationType={animationType}
				transparent={transparent}
				onRequestClose={onRequestClose}>
				<View className='flex-1 justify-center px-6 bg-black/30  '>
					<View className='bg-button-disabled p-4 rounded-3xl items-center h-72 justify-center shadow-lg shadow-black/50 border border-gray-200 '>
						<Text className='mb-5 text-lg font-bold'>{text}</Text>
						<ActivityIndicator
							size='large'
							color={color}
						/>
					</View>
				</View>
			</Modal>
		</View>
  );
}

export default ModalsAlerts