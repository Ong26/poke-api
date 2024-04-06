import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, View, Text } from "react-native";
import { Option } from "../types";
type Props = {
	placeholder?: string;
	label: string;
	data: Option[];
	value?: string;
	width?: number;
	setValue?: (value: string) => void;
};
const DropDown = ({ placeholder = "Select Item", label, data, value, width = 70, setValue }: Props) => {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<View className="flex-1 flex-col">
			<Text>{label}</Text>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: "blue", width }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				itemContainerStyle={{ padding: 0, margin: 0 }}
				itemTextStyle={{ fontSize: 14 }}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? placeholder : "..."}
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
				renderItem={({ label, value }, selected) => {
					return (
						<View>
							<Text style={{ fontSize: 14, padding: 10, color: selected ? "red" : "black" }}>{label}</Text>
						</View>
					);
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	dropdown: { paddingRight: 8, paddingVertical: 0, height: 12 },
	icon: { marginRight: 5 },
	label: {
		position: "absolute",
		backgroundColor: "white",
		color: "orange",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 8,
	},
	placeholderStyle: {
		fontSize: 12,
		fontWeight: "bold",
	},
	selectedTextStyle: {
		fontSize: 12,
		fontWeight: "bold",
	},
});
export default DropDown;
