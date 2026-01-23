import { supabase } from "@/api/lib/supabase";
import { ButtomComponent, InputComponent, LinkComponent } from "@/components";
import * as Linking from "expo-linking"; // Importar Linking para generar URLs dinámicas
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 * Componente de Reset de Contraseña
 *
 * Este componente permite al usuario restablecer su contraseña mediante
 * el ingreso de su correo electrónico. Sigue el mismo diseño visual
 * que la pantalla de login para mantener consistencia en la UI.
 *
 * Funcionalidades:
 * - Validación de email en tiempo real
 * - Integración con Supabase Auth
 * - Manejo de estados de carga
 * - Navegación fluida con expo-router
 * - Deep linking para redirigir al usuario después de hacer clic en el enlace
 */
export default function ResetPassword() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Maneja el envío del formulario de reset de contraseña
	 * Valida el email y envía la solicitud de reset mediante Supabase
	 */
	const handleResetPassword = async () => {
		// Validar que el email no esté vacío
		if (!email.trim()) {
			Alert.alert("Error", "Por favor introduce tu correo electrónico");
			return;
		}

		// Validar formato de email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Alert.alert(
				"Error",
				"Por favor introduce un correo electrónico válido",
			);
			return;
		}

		setIsLoading(true);

		try {
			// Usamos la URL base simple para asegurar que Supabase la acepte
			// La navegación a updatePassword la manejaremos al detectar los tokens en la app
			let redirectUrl = Linking.createURL(""); // URL base

			// Fix para desarrollo: asegurar que usa la IP real
			if (redirectUrl.includes("localhost")) {
				redirectUrl = redirectUrl.replace("localhost", "192.168.1.9");
			}

			// Asegurarse de que el esquema sea exp:// en desarrollo
			if (__DEV__ && !redirectUrl.startsWith("exp://")) {
				redirectUrl = `exp://192.168.1.9:8081`;
			}

			// En producción también usamos la raíz para consistencia con la lógica del Login
			if (!__DEV__) {
				redirectUrl = "finanzas-app://";
			}

			console.log("🚀 Enviando a Supabase redirectTo:", redirectUrl);

			// Enviar email de reset de contraseña usando Supabase
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: redirectUrl,
			});

			if (error) {
				throw error;
			}

			Alert.alert(
				"Correo enviado",
				"Te hemos enviado un enlace para restablecer tu contraseña. Por favor revisa tu correo electrónico.",
				[
					{
						text: "OK",
						onPress: () => {
							// Navegar de regreso al login
							router.back();
						},
					},
				],
			);

			// Limpiar el campo de email
			setEmail("");
		} catch (error: any) {
			Alert.alert(
				"Error",
				error.message ||
					"Hubo un problema al enviar el correo. Por favor intenta de nuevo.",
			);
			console.error("Error en reset password:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className='flex-1'>
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
				{/* Título principal */}
				<View className='mb-4 max-w-xs'>
					<Text className='text-4xl text-center font-Nunito-ExtraBold'>
						App de Finanzas Personales
					</Text>
				</View>

				{/* Texto de instrucciones */}
				<View className='mb-6 max-w-xs'>
					<Text className='text-sm text-center text-text-gray font-Inter-Medium'>
						Introduce tu correo electrónico y te enviaremos un
						enlace para restablecer tu contraseña
					</Text>
				</View>

				{/* Formulario */}
				<View className='gap-4 w-full px-6'>
					<Text className='text-text-gray font-Inter-ExtraBold'>
						Correo Electrónico
					</Text>
					<InputComponent
						value={email}
						setValue={setEmail}
						autoComplete='email'
						placeholder='Introduce tu correo electrónico'
						keyboardType='email-address'
						editable={!isLoading}
					/>

					{/* Botón de enviar */}
					<View className='mt-4 items-center'>
						<ButtomComponent
							disabled={isLoading || !email}
							color={
								isLoading || !email
									? "bg-button-disabled"
									: "bg-primary"
							}
							onPressFunction={handleResetPassword}
							text={isLoading ? "Enviando..." : "Enviar Enlace"}
						/>
					</View>
				</View>

				{/* Link para volver al login */}
				<View className='mt-6 flex-row justify-center items-center gap-2'>
					<Text className='text-text-gray font-Inter-Medium'>
						¿Recordaste tu contraseña?
					</Text>
					<LinkComponent
						text='Iniciar Sesión'
						onPress={() => router.back()}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
