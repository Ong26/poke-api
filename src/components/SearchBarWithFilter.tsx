import React, { useCallback } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { debounce } from "../../utils/CommonUtils";
import { orderByArray, sortByArray } from "../constants/poke";
import pokemonApi from "../redux/api/pokeApi";
import { clearFilters, filterResults, orderBy, search, selectCategory, sortBy } from "../redux/slice/pokeSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Option } from "../types";
import DropDown from "./DropDown";
const SearchBarWithFilter = () => {
	const dispatch = useAppDispatch();
	const { data: categories = [] } = pokemonApi.useGetTypesQuery();
	const [trigger] = pokemonApi.useLazyGetTypeQuery({});
	const searchValue = useAppSelector((state) => state.poke.search);
	const sortByValue = useAppSelector((state) => state.poke.sortBy);
	const orderByValue = useAppSelector((state) => state.poke.orderBy);
	const categoryValue = useAppSelector((state) => state.poke.selectedCategory);
	const debounceChanged = useCallback(
		debounce(() => {
			dispatch(filterResults());
		}, 500),
		[]
	);
	const onChangeText = useCallback((txt: string) => {
		dispatch(search(txt));
		debounceChanged(txt);
	}, []);
	const clearFilter = useCallback(() => {
		trigger({ category: "all" });
		dispatch(clearFilters());
	}, []);
	return (
		<View className=" p-1 flex-col h-32 bg-orange-100 py-4">
			<TextInput
				value={searchValue}
				placeholder="Search"
				className="border-2 p-2 border-orange-400 bg-white"
				onChangeText={onChangeText}
				returnKeyType="search"
				cursorColor="orange"
				selectionColor="orange"
			/>
			<View className=" flex-1 flex-row mt-4 justify-between items-center">
				<View className="flex-1 flex-row">
					<DropDown
						placeholder="All"
						label="Category"
						data={categories as Option[]}
						value={categoryValue}
						setValue={(value) => {
							dispatch(selectCategory(value));
							trigger({ category: value });
						}}
						width={100}
					/>
					<DropDown placeholder="Sort By" label="Sort By" data={sortByArray} value={sortByValue} setValue={(value) => dispatch(sortBy(value))} />
					<DropDown placeholder="Order By" label="Order By" data={orderByArray} value={orderByValue} setValue={(value) => dispatch(orderBy(value))} />
				</View>
				<TouchableOpacity className="mr-1" onPress={clearFilter}>
					<Text className="text-orange-500 font-bold" style={styles.clearFilterText}>
						Clear Filters
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	clearFilterText: {
		fontSize: 10,
	},
});
export default SearchBarWithFilter;
