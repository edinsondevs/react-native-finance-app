import { Stack } from "expo-router";

const EstadisticasLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
};

export default EstadisticasLayout;
