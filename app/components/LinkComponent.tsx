import { Text, Pressable } from "react-native";
import React from "react";

interface LinkComponentProps {
    // Define aquí las props que necesites
    text: string;
    onPress: () => void;
}

const LinkComponent = ({text, onPress} : LinkComponentProps) => {
	return (
		<Pressable className='' onPress={onPress}>
			<Text className='text-primary underline text-right font-Medium'>
				{text}
			</Text>
		</Pressable>
	);
};

export default LinkComponent;
