import { View } from 'react-native'
import ChipComponent from './ChipComponent';

/*
 * @component FiltersButtons
 * Componente que permite seleccionar una fecha.
 * @param {function} onPressFunction - Función que se ejecuta al cerrar el date picker.
 * @param {string} text - Texto que se muestra en el chip.
 */

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