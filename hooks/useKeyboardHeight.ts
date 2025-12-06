import { useEffect, useState } from "react";
import { Keyboard, useWindowDimensions } from "react-native";

export const useKeyboardHeight = () => {

	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const { height: screenHeight } = useWindowDimensions();

	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardDidShow", (e) => {
			setKeyboardHeight(e.endCoordinates.height);
		});

		const hideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardHeight(0);
		});

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);

	return {
		keyboardHeight,
		screenHeight,
		availableHeight: screenHeight - keyboardHeight,
	};
}