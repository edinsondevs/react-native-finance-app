import React from "react";
import { Pressable, Text } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";

interface ButtomComponentProps extends PressableProps {
	onPressFunction: () => void;
	text: string;
	color?:
		| "bg-primary"
		| "bg-secondary"
		| "bg-google-red"
		| "bg-github-dark"
		| "transparent";
	width?:
		| "w-auto"
		| "w-24"
		| "w-32"
		| "w-40"
		| "w-48"
		| "w-64"
		| "w-80"
		| "w-96"
		| "w-full";
	circular?: boolean;
	textColor?: "text-text-white" | "text-text-black";
}

const ButtomComponent = ({
	onPressFunction,
	text,
	textColor = "text-text-white",
	color = "bg-primary",
	width = "w-full",
}: ButtomComponentProps) => {
	const border =
		color === "transparent"
			? "border border-border-light"
			: "border-transparent";

	return (
		<Pressable
			className={`${color} p-3
			${width} 
			rounded-${"lg"} 
			justify-center items-center ${border} `}
			onPress={onPressFunction}>
			<Text className={`${textColor} text-center Inter-Bold text-lg`}>
				{text}
			</Text>
		</Pressable>
	);
};

export default ButtomComponent;
