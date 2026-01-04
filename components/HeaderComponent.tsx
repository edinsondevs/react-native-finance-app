import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
// import { FontAwesome } from '@expo/vector-icons';

const HeaderComponent = () => {
	const { user } = useAuthStore();
	const displayName = user?.displayName || "Usuario";

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
				<Text className='self-center font-Inter-Bold text-2xl '>
					Hola, {displayName}
				</Text>
			</View>

			{/* <View>
				<FontAwesome
					name='bell-o'
					size={24}
					color='black'
				/>
			</View> */}
		</View>
	);
};

export default HeaderComponent;
