import { Stack } from "expo-router";

export default function HistorialLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='index'
				options={{
					title: "Historial Anual",
				}}
			/>
		</Stack>
	);
}
