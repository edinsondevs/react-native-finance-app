import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/constants";

export default function TabLayout() {
	return (
		<Tabs
			
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				headerShown: true,
				animation: "shift",
			}}>
			<Tabs.Screen
				name='gastos/index'
				options={{
					headerTitle: "Gastos",
					headerTitleContainerStyle: {
						flex: 1,
					},
					headerStyle: {
						height: 80,
					},
					title: "Gastos",
					tabBarIcon: ({ color }) => (
						<FontAwesome
							size={28}
							name='money'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='ingresos/index'
				options={{
					title: "Ingresos",
					tabBarIcon: ({ color }) => (
						<FontAwesome
							size={28}
							name='dollar'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='ajustes/index'
				options={{
					title: "Ajustes",
					tabBarIcon: ({ color }) => (
						<FontAwesome
							size={28}
							name='wrench'
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
