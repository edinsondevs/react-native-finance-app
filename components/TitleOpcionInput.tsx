import { Text } from 'react-native'
import { JSX } from 'react'
import { InterfaceHeaderComponentProps } from '@/interfaces';

/*
 * @component TitleOpcionInput
 * Componente que permite crear un título.
 * @param {string} title - Título que se muestra en el componente.
 */

const TitleOpcionInput = ({
	title,
}: Pick<InterfaceHeaderComponentProps, 'title'>): JSX.Element => {
	return (
		<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
			{title}
		</Text>
	);
};

export default TitleOpcionInput