import { Text } from 'react-native'
import React, { JSX } from 'react'

interface PropsTitle {
    title: string;
}

const TitleOpcionInput = ({ title }: PropsTitle): JSX.Element => {
	return (
		<Text className='text-lg font-Inter-Bold pb-2 text-text-dark'>
			{title}
		</Text>
	);
};

export default TitleOpcionInput