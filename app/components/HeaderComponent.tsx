import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';

const HeaderComponent = () => {
  return (
		<View className='flex flex-row  justify-between p-4'>
			<View className='flex flex-1 flex-row gap-4 items-stretch'>
				<Text>
					<Image
						style={{ width: 40, height: 40, borderRadius: 25 }}
						source='https://picsum.photos/seed/696/3000/2000'
						placeholder='usuario logueado'
						contentFit='cover'
						transition={1000}
					/>
				</Text>
				<Text className='self-center font-ExtraBold text-2xl font-'>
					Hola, Edinson
				</Text>
			</View>

			<View>
				<FontAwesome
					name='bell-o'
					size={24}
					color='black'
				/>
			</View>
		</View>
  );
}

export default HeaderComponent