import { supabase } from "@/api/lib/supabase";
import { ButtomComponent, InputComponent, LinkComponent } from "@/components";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function UpdatePassword() {
	const params = useLocalSearchParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSessionValid, setIsSessionValid] = useState(false);

	// Función para procesar la URL y extraer tokens (Backup)
	const handleUrl = async (url: string | null) => {
		if (!url) return;

		try {
			// Intentar extraer tokens
			// Método 1: Parseo manual de fragmentos y query params
			// Hack para asegurar que parseamos params incluso si la URL base es extraña
			const fakeBase = "http://dummy.com";
			const safeUrl = url.includes("://") ? url : `${fakeBase}${url}`;

			let accessToken = null;
			let refreshToken = null;
			let errorCode = null;

			// Detectar parámetros en el hash (#)
			if (safeUrl.includes("#")) {
				const hashPart = safeUrl.split("#")[1];
				const hashParams = new URLSearchParams(hashPart);
				accessToken = hashParams.get("access_token");
				refreshToken = hashParams.get("refresh_token");
				errorCode = hashParams.get("error_code");
			}

			// Detectar parámetros en el search (?) si no se encontraron en hash
			if (!accessToken && safeUrl.includes("?")) {
				const searchPart = safeUrl.split("?")[1].split("#")[0];
				const searchParams = new URLSearchParams(searchPart);
				accessToken = searchParams.get("access_token");
				refreshToken = searchParams.get("refresh_token");
				if (!errorCode) errorCode = searchParams.get("error_code");
			}

			// Método 2: Regex manual si el anterior falla
			if (!accessToken) {
				const accessMatch = url.match(/access_token=([^&]+)/);
				if (accessMatch) accessToken = accessMatch[1];

				const refreshMatch = url.match(/refresh_token=([^&]+)/);
				if (refreshMatch) refreshToken = refreshMatch[1];
			}

			if (errorCode) {
				Alert.alert(
					"Enlace Inválido",
					"Este enlace ha expirado o ya fue usado. Solicita uno nuevo.",
				);
				return;
			}

			if (accessToken && refreshToken) {
				const { data, error } = await supabase.auth.setSession({
					access_token: accessToken,
					refresh_token: refreshToken,
				});

				if (!error && data.session) {
					setIsSessionValid(true);
				} else {
					Alert.alert("Error", "Error al restaurar sesión.");
				}
			}
		} catch (e: any) {
			console.error("Error procesando link:", e);
		}
	};

	useEffect(() => {
		// Prioridad 1: Tokens pasados por navegación desde Login
		if (params.access_token && params.refresh_token) {
			const restoreSession = async () => {
				const { data, error } = await supabase.auth.setSession({
					access_token: params.access_token as string,
					refresh_token: params.refresh_token as string,
				});

				if (!error && data.session) {
					setIsSessionValid(true);
				} else {
					Alert.alert(
						"Error",
						"Error al restaurar sesión desde parámetros.",
					);
				}
			};
			restoreSession();
			return;
		}

		// Prioridad 2: Buscar en la URL (Deep Linking directo)
		Linking.getInitialURL().then(handleUrl);
		const subscription = Linking.addEventListener("url", (event) =>
			handleUrl(event.url),
		);
		return () => subscription.remove();
	}, [params]);

	const handleUpdatePassword = async () => {
		if (!isSessionValid) {
			Alert.alert(
				"Error",
				"No se ha detectado una sesión válida. Vuelve a abrir el enlace.",
			);
			return;
		}

		if (!password.trim() || password !== confirmPassword) {
			Alert.alert(
				"Error",
				"Las contraseñas no coinciden o están vacías.",
			);
			return;
		}

		if (password.length < 6) {
			Alert.alert(
				"Error",
				"La contraseña debe tener al menos 6 caracteres.",
			);
			return;
		}

		setIsLoading(true);

		try {
			const { error } = await supabase.auth.updateUser({
				password: password,
			});
			if (error) throw error;

			Alert.alert("Éxito", "Contraseña actualizada.", [
				{ text: "OK", onPress: () => router.replace("/login") },
			]);
			setPassword("");
			setConfirmPassword("");
		} catch (error: any) {
			Alert.alert("Error", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className='flex-1 bg-white'>
			<KeyboardAwareScrollView
				className='flex-1'
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				enableOnAndroid={true}>
				<View className='mb-4 max-w-xs'>
					<Text className='text-3xl text-center font-bold mb-2'>
						Nueva Contraseña
					</Text>
				</View>

				<View className='gap-4 w-full px-6'>
					<InputComponent
						value={password}
						setValue={setPassword}
						placeholder='Nueva contraseña (min 6)'
						secureTextEntry
						editable={!isLoading && isSessionValid}
					/>
					<InputComponent
						value={confirmPassword}
						setValue={setConfirmPassword}
						placeholder='Confirmar contraseña'
						secureTextEntry
						editable={!isLoading && isSessionValid}
					/>
					<View className='mt-4 items-center'>
						<ButtomComponent
							disabled={
								isLoading ||
								!password ||
								!confirmPassword ||
								!isSessionValid ||
								password !== confirmPassword
							}
							color={
								isLoading ||
								!isSessionValid ||
								!password ||
								!confirmPassword ||
								password !== confirmPassword
									? "bg-button-disabled"
									: "bg-primary"
							}
							onPressFunction={handleUpdatePassword}
							text={
								isLoading
									? "Enviando..."
									: "Actualizar Contraseña"
							}
						/>
					</View>
				</View>

				<View className='mt-6'>
					<LinkComponent
						text='Cancelar'
						onPress={() => router.replace("/login")}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
