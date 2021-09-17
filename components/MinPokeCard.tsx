import Modal from 'react-modal';
import PokeCard from '@/components/PokeCard';
import { useState } from 'react';
import { PokeCardProps } from '@/lib/interfaces';

Modal.setAppElement('body')

export default function MinPokeCard({ cardIndex, options, sprites }: PokeCardProps) {

    const [modalIsOpen, setIsOpen] = useState(false);

    // functions for closing and opening the modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = (event) => {
        event.stopPropagation();
        setIsOpen(false);
    }

    return (
        <div>
            <button
                className="w-24 h-24 rounded-full bg-gray-400"
                style={{ "backgroundImage": "url(https://play.pokemonshowdown.com/sprites/bw/0.png)" }}
                onClick={openModal} />
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