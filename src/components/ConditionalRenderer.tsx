import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

type Props = {
	shouldRender: boolean;
	children: React.ReactNode;
	fallbackComponent?: React.ReactNode;
};

const ConditionalRenderer = ({ shouldRender, children, fallbackComponent = <></> }: Props) => {
	if (!shouldRender) return fallbackComponent;
	return children;
};

export default ConditionalRenderer;
