import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { isAndroid } from "../constants";
import colors from "tailwindcss/colors";

const LoadingIndicator = () => {
	return <ActivityIndicator color={isAndroid ? colors.orange[500] : colors.orange[600]} />;
};

export default LoadingIndicator;
