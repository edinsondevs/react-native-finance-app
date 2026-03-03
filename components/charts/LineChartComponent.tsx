import { colors } from "@/styles/constants";
import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface LineChartComponentProps {
	mainData: any[];
	dataSets: any[];
	monthLabels: string[];
	chartColors: string[];
}

/**
 * @component LineChartComponent
 * Visualización de gráfica de líneas para tendencias de gastos diarios.
 *
 * Funcionalidad:
 * - Renderiza múltiples datasets (uno por usuario) en la misma gráfica.
 * - Soporta scroll horizontal automático basado en la cantidad de días del mes.
 * - Implementa un 'pointerConfig' personalizado para mostrar tooltips detallados
 *   al interactuar con los puntos de la gráfica ($ total por día y usuario).
 * - Formatea automáticamente las etiquetas del eje Y (k para miles, M para millones).
 *
 * @param mainData - Dataset principal (proporcina la estructura base).
 * @param dataSets - Array de datasets configurados por usuario.
 * @param monthLabels - Etiquetas para el eje X (días del mes).
 * @param chartColors - Paleta de colores para los datasets.
 */

const LineChartComponent = ({
	mainData,
	dataSets,
	monthLabels,
	chartColors,
}: LineChartComponentProps) => {
	return (
		<LineChart
			data={mainData}
			dataSet={dataSets}
			areaChart
			curved
			height={220}
			width={monthLabels.length * 40 + 60} // Ancho dinámico basado en días
			spacing={40}
			initialSpacing={20}
			endSpacing={40}
			yAxisLabelWidth={55}
			startFillColor={colors.primary}
			endFillColor='rgba(9, 255, 91, 0.1)'
			startOpacity={0.4}
			endOpacity={0.1}
			thickness={3}
			hideDataPoints={false}
			dataPointsRadius={4}
			textColor1='gray'
			textFontSize={10}
			hideRules
			xAxisColor='lightgray'
			yAxisColor='lightgray'
			noOfSections={4}
			isAnimated
			formatYLabel={(value) => {
				if (Number(value) >= 1000000)
					return `${(Number(value) / 1000000).toFixed(1)}M`;
				if (Number(value) >= 1000)
					return `${(Number(value) / 1000).toFixed(0)}k`;
				return value;
			}}
			xAxisLabelsVerticalShift={10}
			xAxisLabelsHeight={30}
			xAxisLabelTextStyle={{
				color: "gray",
				fontSize: 12,
			}}
			pointerConfig={{
				pointerStripColor: "lightgray",
				pointerStripWidth: 2,
				pointerColor: colors.primary,
				radius: 6,
				pointerLabelComponent: (items: any) => {
					return (
						<View
							style={{
								backgroundColor: "white",
								padding: 8,
								borderRadius: 8,
								minWidth: 120,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
								borderWidth: 1,
								borderColor: "#f0f0f0",
							}}>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 12,
									marginBottom: 4,
									textAlign: "center",
								}}>
								Día {items[0].label}
							</Text>
							{items.map((item: any, index: number) => (
								<View
									key={index}
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										marginTop: 2,
									}}>
									<Text
										style={{
											fontSize: 16,
											color: chartColors[
												index % chartColors.length
											],
											marginRight: 6,
											lineHeight: 16,
										}}>
										●
									</Text>
									<Text
										style={{
											fontSize: 11,
											color: "#333",
											fontWeight: "500",
										}}>
										${item.value.toLocaleString("es-AR")}
									</Text>
								</View>
							))}
						</View>
					);
				},
			}}
		/>
	);
};

export default LineChartComponent;
