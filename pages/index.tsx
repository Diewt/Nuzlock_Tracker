import { GetStaticProps } from 'next'

import Container from '@/components/Container';
import PokeCard from '@/components/PokeCard';
import pokedex from '@/lib/pokeapi';
import { formatLabel } from '@/lib/helper_functions';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const itemSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

import { PokeResponse, Option, Sprites, HomeProps } from '@/lib/interfaces';
import { useState } from 'react';

// on build time, fetch whole list of pokemon and format options for the select
export const getStaticProps: GetStaticProps = async () => {
	const pokemonList: PokeResponse[] = (await pokedex.getPokemonsList()).results;
	const naturesList: PokeResponse[] = (await pokedex.getNaturesList()).results;
	const itemList: PokeResponse[] = (await pokedex.getItemsList()).results;

	const pokemonSprites: Sprites = {};
	const pokemonOptions: Option[] = pokemonList.map(pokemon => {
		const name: string = pokemon.name;
		const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
		const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
		pokemonSprites[name] = spriteUrl;

		return { value: name, label: formatLabel(name) } as Option;
	});

	const natureOptions: Option[] = naturesList.map(nature => {
		return { value: nature.name, label: formatLabel(nature.name) } as Option;
	});

	const itemSprites: Sprites = {};
	const itemOptions: Option[] = itemList.map(item => {
		const name: string = item.name;
		const spriteUrl: string = itemSpriteUrl + item.name + '.png';
		itemSprites[name] = spriteUrl;

		return { value: name, label: formatLabel(name) } as Option;
	});

	return {
		props: {
			options: {
				pokemonOptions,
				natureOptions,
				itemOptions
			},
			sprites: {
				pokemonSprites,
				itemSprites
			}
		}
	}
}

export default function Home({ options, sprites }: HomeProps) {

	let [pokemonCards, setPokemonCards] = useState([]);

	const appendPokemonCard = () => {
		if (pokemonCards.length >= 6)
			alert("Reached the max party size of 6 pokemon.");

		setPokemonCards([...pokemonCards, <PokeCard key={pokemonCards.length} cardIndex={pokemonCards.length} options={options} sprites={sprites} />])
	}

	return (
		<Container>
			<div className="min-h-full h-96 max-h-full">
				<div className="flex flex-row space-x-4">
					<h1 className="text-2xl p-4">Party Tracker</h1>
					<button className="rounded-md bg-green-400 h-auto w-auto px-2 mt-2.5" onClick={appendPokemonCard}>Add A Pokemon</button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{pokemonCards.map(pokemonCard => pokemonCard)}
				</div>
			</div>
		</Container>
	)
}