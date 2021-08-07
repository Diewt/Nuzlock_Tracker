import pokedex from "@/lib/pokeapi";

export default async function handler({ query: { id } }, res) {

    const response = await pokedex.getPokemonByName(id);

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    return res.status(200).json(response);
}