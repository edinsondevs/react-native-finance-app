import { ButtomComponent, InputComponent, LinkComponent, ModalsAlerts } from "@/components";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthStore } from "../../store/useAuthStore";

import { Colors } from "@/styles/constants";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn, loading } = useAuthStore();

	// Efecto para detectar si venimos de un reset de contraseña
	useEffect(() => {
		const checkDeepLink = async () => {
			const url = await Linking.getInitialURL();
			if (url) handleUrl(url);
		};

		const handleUrl = (url: string) => {
			// Si la URL tiene access_token, es probable que sea un reset de password
			if (url.includes("access_token") && url.includes("refresh_token")) {
				// Extraer tokens manualmente
				let accessToken = null;
				let refreshToken = null;

				// Intentar parsear fragmento o query
				const safeUrl = url.includes("#") ? url : url.replace("?", "#"); // Normalizar a hash si es necesario
				if (safeUrl.includes("#")) {
					const fragment = safeUrl.split("#")[1];
					const params = new URLSearchParams(fragment);
					accessToken = params.get("access_token");
					refreshToken = params.get("refresh_token");
				}

				if (accessToken && refreshToken) {
					router.replace({
						pathname: "/login/updatePassword",
						params: {
							access_token: accessToken,
							refresh_token: refreshToken,
						},
					});
				}
			}
		};

		checkDeepLink();
		const sub = Linking.addEventListener("url", (e) => handleUrl(e.url));
		return () => sub.remove();
	}, []);

	async function onPressFunction() {
		if (!email || !password) {
			Alert.alert("Error", "Por favor ingresa correo y contraseña");
			return;
		}

		await signIn(email, password);
		const { error, user } = useAuthStore.getState();

		if (error) {
			Alert.alert("Error al iniciar sesión", error);
		} else if (user) {
			router.replace("/(tabs)/gastos");
		}
	}

	return (
		<View className='flex-1'>
			<ModalsAlerts
				visible={loading}
				color={Colors.primary}
				text='Iniciando Sesión...'
				transparent={false}
			/>
			<KeyboardAwareScrollView
				className='flex-1'
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
				showsVerticalScrollIndicator={false}
				enableOnAndroid={true}>
				<View className='mb-4 max-w-xs  '>
					<Text className='text-4xl text-center font-Nunito-ExtraBold '>
						App de Finanzas Personales
					</Text>
				</View>
				<View className='gap-4 w-full px-6 mt-8'>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Correo Eléctronico
					</Text>
					<InputComponent
						value={email}
						setValue={setEmail}
						autoComplete='email'
						placeholder='Introduce tu correo electrónico'
						keyboardType='email-address'
					/>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Contraseña
					</Text>
					<InputComponent
						value={password}
						setValue={setPassword}
						placeholder='Introduce tu contraseña'
						secureTextEntry
					/>

					<LinkComponent
						text='¿Olvidaste tu contraseña?'
						onPress={() => router.push("/login/resetPassword")}
					/>

					<View className='mt-4 items-center'>
						<ButtomComponent
							disabled={loading || !email || !password}
							color={
								loading || !email || !password
									? "bg-button-disabled"
									: "bg-primary"
							}
							onPressFunction={onPressFunction}
							text={loading ? "Cargando..." : "Iniciar Sesión"}
						/>
					</View>
				</View>

				<View className='mt-6 flex-row justify-center items-center gap-2'>
					<Text className='text-text-gray font-Inter-Medium'>
						¿No tienes una cuenta?
					</Text>
					<LinkComponent
						text='Regístrate'
						onPress={() => router.push("/register")}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

export default LoginScreen;
