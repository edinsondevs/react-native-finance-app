import { Stack } from "expo-router";

export default function _layout() {
	return (
		<Stack screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name='index'
				options={{ 
                    title: "Ajustes" 
                }}
			/>
		</Stack>
	);
}
