import { View } from 'react-native'

interface CardsComponentProps  {
    children: React.ReactNode;
}
const CardsComponent = ({ children }: CardsComponentProps) => {
	return (
		<View className='bg-white p-4 m-4 border border-border-light rounded-lg w-fit '>
			{children}
		</View>
	);
};

export default CardsComponent