import { Text, Pressable } from "react-native";
import { InterfaceLinkComponentProps } from "@/interfaces";

/*
 * @component LinkComponent
 * Componente que permite crear un link.
 * @param {string} text - Texto que se muestra en el link.
 * @param {function} onPress - Función que se ejecuta al presionar el link.
 */

const LinkComponent = ({ text, onPress }: InterfaceLinkComponentProps) => {
	return (
		<Pressable
			className=''
			onPress={onPress}>
			<Text className='text-primary underline text-right font-Inter-Medium'>
				{text}
			</Text>
		</Pressable>
	);
};

export default LinkComponent;
