// hooks/useCapitalize.ts
import { useCallback } from "react";

const useCapitalize = () => {
	const capitalize = useCallback((str: string): string => {
		if (!str || typeof str !== "string") return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}, []);

	const capitalizeWords = useCallback((str: string): string => {
		if (!str || typeof str !== "string") return str;
		return str
			.split(" ")
			.map(
				(word) =>
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			)
			.join(" ");
	}, []);

	const capitalizeAll = useCallback((str: string): string => {
		if (!str || typeof str !== "string") return str;
		return str.toUpperCase();
	}, []);

	return {
		capitalize,
		capitalizeWords,
		capitalizeAll,
	};
};

export default useCapitalize;
