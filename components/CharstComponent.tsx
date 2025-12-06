import React from 'react'
import { PieChart } from 'react-native-gifted-charts';

interface CharstComponentProps {
    data: any
}

const CharstComponent = ({data}: CharstComponentProps ) => {
  return (
		<PieChart
			data={data}
			showText
			textColor='black'
			radius={150}
			textSize={20}
			focusOnPress
			showValuesAsLabels
			showTextBackground
			textBackgroundRadius={26}
		/>
  );
}

export default CharstComponent