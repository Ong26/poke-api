import { NativeSafeAreaViewProps } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export const SafeAreaOptions: Partial<NativeSafeAreaViewProps> = {
	edges: ["top"],
	style: { flex: 1, backgroundColor: colors.orange[100] },
};
