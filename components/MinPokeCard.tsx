//import Modal from 'react-modal';
import PokeCard from '@/components/PokeCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal'

//Modal.setAppElement('body')

export default function MinPokeCard({ cardIndex, options, sprites, backgroundSprite }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    // functions for closing and opening the modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    if (!backgroundSprite)
        backgroundSprite = "https://play.pokemonshowdown.com/sprites/bw/0.png";

    return (
        <div>
            <motion.input
                className="w-24 h-24 rounded-full border-8 border-gray-400"
                whileHover={{ scale:1.1 }}
                whileTap= {{ scale:0.9 }}
                onClick={() => (modalIsOpen ? closeModal() : openModal())}
                type="image"
                src={backgroundSprite}
            />

            {modalIsOpen && <Modal modalIsOpen={modalIsOpen} handleClose={close}> 
                <PokeCard cardIndex={cardIndex} options={options} sprites={sprites} />
            </Modal> }

        </div>
    );
}