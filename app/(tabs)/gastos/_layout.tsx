import { Stack } from "expo-router";

export default function GastosLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='index'
				options={{
					title: "Gastos",
				}}
			/>
			<Stack.Screen
				name='AgregarGastos'
				options={{
					title: "Agregar Gasto",
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen name='MovimientosRecientes' />
		</Stack>
	);
}
