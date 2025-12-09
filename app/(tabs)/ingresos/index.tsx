import { View, Text } from 'react-native'
import React from 'react'
import { CircleButton } from '@/components';
import { router } from 'expo-router';

const IngresosScreen = () => {
  return (
		<View className='flex-1'>
			<Text>IngresosScreen </Text>
			<View className='bottom-0 right-0 m-6 absolute'>
				<CircleButton
					text='+'
          color='bg-secondary'
					onPressFunction={() =>
						router.push("/(tabs)/ingresos/AgregarIngresos")
					}
				/>
			</View>
		</View>
  );
}

export default IngresosScreen