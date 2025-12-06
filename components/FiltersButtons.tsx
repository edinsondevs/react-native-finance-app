import { View } from 'react-native'
import ChipComponent from './ChipComponent';

const FiltersButtons = () => {
  return (
		<View className='flex flex-row justify-around'>
			<ChipComponent
				onPressFunction={() => alert("Filtro por fecha")}
				text='Este mes'
			/>
			<ChipComponent
				onPressFunction={() => alert("Filtro por fecha")}
				text='Esta Semana'
			/>
			<ChipComponent
				onPressFunction={() => alert("Filtro por fecha")}
				text='Este Año'
			/>
		</View>
  );
}

export default FiltersButtons