import { motion } from 'framer-motion'

export default function About() {
    return (
        <div className="split-section">
            <div className="split-image">
                <motion.img 
                    src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" 
                    alt="Automotive Excellence"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                />
            </div>
            <div className="split-content">
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: '-50px' }}
                >
                    <h2>Automotive<br />Perfection</h2>
                    <p>
                        We believe driving shouldn't just be functional — it should be an experience. 
                        Arngren was founded on the principle that the machines we command should inspire us.
                    </p>
                    <a href="#featured" className="btn btn-outline" style={{ color: 'var(--bg-primary)', borderColor: 'var(--bg-primary)' }}>
                        Discover Our Story
                    </a>
                </motion.div>
            </div>
        </div>
    )
}
