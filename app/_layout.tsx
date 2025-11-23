import * as SplashScreen from 'expo-splash-screen';
import { Stack } from "expo-router";
import {
	initialWindowMetrics,
	SafeAreaProvider,
	SafeAreaView,
} from "react-native-safe-area-context";
import "../global.css";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// Mantiene la pantalla de presentación visible hasta que las fuentes estén cargadas.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// 1. Llama al hook useFonts y mapea un nombre a la ruta del archivo.
	const [fontsLoaded] = useFonts({
		"RobotoCondensed-Bold": require("../assets/fonts/RobotoCondensed-Bold.ttf"),
		"RobotoCondensed-BoldItalic": require("../assets/fonts/RobotoCondensed-BoldItalic.ttf"),
		"RobotoCondensed-ExtraBold": require("../assets/fonts/RobotoCondensed-ExtraBold.ttf"),
		"RobotoCondensed-Italic": require("../assets/fonts/RobotoCondensed-Italic.ttf"),
		"RobotoCondensed-Light": require("../assets/fonts/RobotoCondensed-Light.ttf"),
		"RobotoCondensed-Medium": require("../assets/fonts/RobotoCondensed-Medium.ttf"),
		"RobotoCondensed-Regular": require("../assets/fonts/RobotoCondensed-Regular.ttf"),
		// Añade aquí todas las variaciones de fuente que planeas usar.
	});

  useEffect(() => {
    if (fontsLoaded) {
      // 2. Una vez que las fuentes están listas, oculta la pantalla de presentación.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 3. Muestra un cargador o null si las fuentes aún no están listas.
  if (!fontsLoaded) {
    return null; // O un componente de carga si lo prefieres
  }

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
						name='(tabs)'
						options={{
							headerShown: false,
						}}
					/>
					{/* <Stack.Screen
					name='(tabs)/ingresos'
					options={{
						title: "Ingresos",
						headerShown: true, // Oculta el encabezado del Stack para evitar el texto "(tabs)"
					}}
				/> */}
				</Stack>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
