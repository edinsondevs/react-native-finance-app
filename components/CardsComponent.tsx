import { View, ViewProps } from 'react-native'

interface CardsComponentProps extends ViewProps  {
    children: React.ReactNode;
}
const CardsComponent = ({ children, ...rest }: CardsComponentProps) => {
	return (
		<View className={`bg-white p-4 m-4 border border-border-light rounded-lg w-fit ${rest.className}`}>
			{children}
		</View>
	);
};

export default CardsComponent