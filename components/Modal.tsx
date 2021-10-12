import {motion} from 'framer-motion'
import Backdrop from '@/components/Backdrop'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

const Modal = ({ handleClose, children }) => {

    return(
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='m-auto px-1 rounded-xl flex flex-col items-center'
                style={{'width':'clamp(50%, 700px, 90%)', 'height':'min(50%, 300px'}}
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                {children}
                <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    )
};

export default Modal;