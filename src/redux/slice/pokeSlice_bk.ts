import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Pokemon = {
	name: string;
	id: string;
	url: string;
};

type Filter = {
	name: string;
};
type Sort = {
	field: keyof Pokemon;
	order: "asc" | "desc";
};
export const pokeApi = createApi({
	reducerPath: "pokeApi",
	tagTypes: ["pokemon"],
	baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon" }),
	endpoints: (builder) => ({
		getAll: builder.query<Pokemon[], any>({
			query: (params) => ({ url: "?limit=10000" }),
			keepUnusedDataFor: 300,
			providesTags: [{ type: "pokemon", id: "LIST" }],
			transformResponse: (response: { results: Pokemon[] }) => {
				return response.results.map((pokemon) => {
					const id = pokemon.url.split("/")[6];
					return { ...pokemon, id };
				});
			},
		}),
		getByName: builder.query({
			query: (name) => `/${name}`,
		}),
	}),
});

// const sortField = sort?.field || "name";
// const sortOrder = sort?.order === "desc" ? -1 : 1;
// return response.results.sort((a, b) => sortOrder * (a[sortField] < b[sortField] ? -1 : 1));
