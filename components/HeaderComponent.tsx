import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

interface Props {
	title: string;
	icon?: boolean;
}

const HeaderComponent = ({ title, icon = false }: Props) => {
	return (
		<View className='flex flex-row justify-between p-4'>
			<View className='flex flex-1 flex-row items-center '>
				{icon && (
					<Text>
						<Image
							style={{ width: 40, height: 40, borderRadius: 25 }}
							source={"https://picsum.photos/seed/696/3000/2000"}
							placeholder='usuario logueado'
							contentFit='cover'
							transition={1000}
						/>
					</Text>
				)}
				<Text className='text-2xl self-center font-bold mb-6 mt-4 px-4 text-primary'>
					{title}
				</Text>
			</View>
		</View>
	);
};

export default HeaderComponent;
