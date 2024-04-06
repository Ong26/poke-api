import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./slice/pokeSlice";
import { useDispatch, useSelector } from "react-redux";
import { pokemonApi } from "./api/pokeApi";

const store = configureStore({
	reducer: {
		poke: pokeReducer,
		[pokemonApi.reducerPath]: pokemonApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ immutableCheck: { warnAfter: 64 }, serializableCheck: { warnAfter: 64 } }).concat(pokemonApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
