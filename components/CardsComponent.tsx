import { View } from 'react-native'
import { CardsComponentProps } from '@/interfaces';

const CardsComponent = ({ children, ...rest }: CardsComponentProps) => {
	return (
		<View className={`bg-white p-4 m-4 border border-border-light rounded-lg w-fit ${rest.className}`}>
			{children}
		</View>
	);
};

export default CardsComponent