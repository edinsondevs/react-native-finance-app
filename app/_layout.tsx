import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
	initialWindowMetrics,
	SafeAreaProvider,
	SafeAreaView,
} from "react-native-safe-area-context";
import "../global.css";

// Mantiene la pantalla de presentación visible hasta que las fuentes estén cargadas.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
	// 1. Llama al hook useFonts y mapea un nombre a la ruta del archivo.
	const [fontsLoaded, fontError] = useFonts({
		"Inter_18pt-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
		"Inter_18pt-ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
		"Inter_18pt-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
		"Inter_18pt-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
		"Inter_18pt-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
		"Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
		"Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
		"Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
		"Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
		"Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
		"Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
		"Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
		"Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
		"Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
		"Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
	});

	useEffect(() => {
		// Fallback: Ocultar después de 5 segundos si algo falla
		const timeout = setTimeout(() => {
			SplashScreen.hideAsync().catch(() => {});
		}, 5000);

		if (fontsLoaded || fontError) {
			clearTimeout(timeout);
			// 2. Una vez que las fuentes están listas (o fallan), oculta la pantalla de presentación.
			SplashScreen.hideAsync().catch((err) => {
				console.warn("Failed to hide splash screen:", err);
			});
		}

		return () => clearTimeout(timeout);
	}, [fontsLoaded, fontError]);

	// 3. Si hay un error con las fuentes, podemos decidir si continuar (con fuentes del sistema) o mostrar un error.
	// Por ahora, continuaremos para evitar que la app se quede bloqueada.
	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaView
					style={{ flex: 1 }}
					edges={["top", "right", "left"]}>
					<Stack>
						<Stack.Screen
							name='login/index'
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='register/index'
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='(tabs)'
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</SafeAreaView>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
