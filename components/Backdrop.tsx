import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick}) => {
    return(
        <motion.div
            className='absolute inset-0 h-full w-full flex items-center content-center'
            style={{'background':'#000000e1'}}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
        >
            {children}
        </motion.div>
    )
}

export default Backdrop;