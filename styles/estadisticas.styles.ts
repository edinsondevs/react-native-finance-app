import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	scrollView: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	totalCard: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
		marginBottom: 8,
	},
	totalAmount: {
		fontSize: 32,
		fontWeight: "bold",
	},
	chartCard: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	chartLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
		marginBottom: 16,
	},
	legendContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 16,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
		marginBottom: 8,
	},
	legendDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 4,
	},
	legendText: {
		fontSize: 12,
		color: "#4b5563",
	},
	chartContainer: {
		paddingBottom: 10,
	},
	monthLabel: {
		marginTop: 16,
		marginBottom: 8,
		textAlign: "center",
		fontSize: 11,
		color: "#9ca3af",
		fontWeight: "bold",
		fontStyle: "italic",
	},
	tabsContainer: {
		flexDirection: "row",
		marginBottom: 16,
		backgroundColor: "#f3f4f6",
		padding: 4,
		borderRadius: 12,
	},
	tabButton: {
		flex: 1,
		paddingVertical: 8,
		borderRadius: 8,
		alignItems: "center",
	},
	tabButtonActive: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	tabText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#9ca3af",
	},
	contentContainer: {
		marginBottom: 16,
	},
	horizontalScroll: {
		paddingBottom: 10,
	},
});
