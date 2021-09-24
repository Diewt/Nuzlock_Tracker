import Modal from 'react-modal';
import PokeCard from '@/components/PokeCard';
import { useState } from 'react';

Modal.setAppElement('body')

export default function MinPokeCard({ cardIndex, options, sprites, backgroundSprite }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    // functions for closing and opening the modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = (event) => {
        event.stopPropagation();
        setIsOpen(false);
    }

    if (!backgroundSprite)
        backgroundSprite = "https://play.pokemonshowdown.com/sprites/bw/0.png";

    return (
        <div>
            <input
                className="w-24 h-24 rounded-full border-8 border-gray-400"
                onClick={openModal}
                type="image"
                src={backgroundSprite}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel={"Pokemon Card"}
                overlayClassName="fixed inset-0 bg-opacity-75 m-auto bg-white"
                className="bg-gradient-to-r from-white to-gray-100 mx-auto my-36 
                rounded overflow-visible shadow-2xl h-auto max-w-2xl"
            >
                <PokeCard cardIndex={cardIndex} options={options} sprites={sprites} />
            </Modal>
        </div>
    );
}