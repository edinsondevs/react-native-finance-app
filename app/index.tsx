// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
	// Redirige automáticamente a login cuando abres la app
	return <Redirect href='/login' />;
}
