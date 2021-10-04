import { useContext, useEffect, useState } from "react";
import MinPokeCard from "@/components/MinPokeCard";
import { PokemonPartyContext } from "@/context/PokemonPartyContext";
import { supabase } from "@/lib/supabase";
import Modal from 'react-modal';

Modal.setAppElement('body')

export default function PokeParty({ options, sprites }) {

    let [pokemonPartySprites, setPokemonPartySprites] = useState([]);
    let [partyNickname, setPartyNickname] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);

    const { pokemonParty } = useContext(PokemonPartyContext);

    let [partyLink, setPartyLink] = useState("");

    // functions for closing and opening the modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = (event) => {
        event.stopPropagation();
        setIsOpen(false);
    }

    // when pokemonParty is updated
    useEffect(() => {
        setPokemonPartySprites([...Array(6)].map((e, i) => {

            let backgroundSprite: string;

            // if a pokemon has not been edited yet in the party
            if (Object.keys(pokemonParty[i]).length === 0)
                backgroundSprite = null;
            else if (Object.keys(pokemonParty[i]).length !== 0)
                backgroundSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonParty[i].pokemonInfo.id}.png`;

            return (
                <MinPokeCard
                    key={i}
                    cardIndex={i}
                    options={options}
                    sprites={sprites}
                    backgroundSprite={backgroundSprite} />
            );
        }
        ));
    }, [pokemonParty]);

    const changeNickname = (event) => {
        setPartyNickname(event.target.value);
    }

    const saveToDatabase = async (event) => {
        event.preventDefault();

        if (partyNickname === "")
            setPartyNickname(Math.random().toString(16).substr(2, length));

        const { data, error } = await supabase
            .from('pokeparty')
            .insert([
                {
                    party_nickname: partyNickname,
                    pokeparty: pokemonParty
                }
            ]);

        setPartyLink(data[0].uuid);

        if (error)
            alert(error);
        else
            openModal();
    }

    return (
        <div className="p-4">
            <input
                className="w-56 px-4 py-1 text-gray-900 rounded-full
                    focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Nickname Party"
                onChange={changeNickname}
            />
            <div className="flex flex-row space-x-2 p-2">
                {pokemonPartySprites.map(pokemonSprite => pokemonSprite)}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel={"Save/Share Modal"}
                overlayClassName="fixed inset-0 bg-opacity-75 m-auto bg-white"
                className="bg-gradient-to-r from-white to-gray-100 mx-auto my-36 
                rounded overflow-visible shadow-2xl h-auto max-w-2xl"
            >
                Your nuzlog party link is: {partyLink}
            </Modal>
            <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded float-right"
                onClick={saveToDatabase}
            >Share / Save</button>
        </div>
    );
}