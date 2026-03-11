import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface MenuOverlayProps {
    onClose: () => void
    onNavigate: (section: string) => void
}

const links = [
    { label: 'Shop', section: 'featured' },
    { label: 'Collections', section: 'categories' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
]

export default function MenuOverlay({ onClose, onNavigate }: MenuOverlayProps) {
    return (
        <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <button className="menu-close" onClick={onClose} aria-label="Close menu">
                <X size={40} strokeWidth={1} />
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
                {links.map((link, i) => (
                    <motion.div
                        key={link.section}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <a
                            className="menu-nav-link"
                            href={`#${link.section}`}
                            onClick={(e) => {
                                e.preventDefault()
                                onNavigate(link.section)
                            }}
                        >
                            {link.label}
                        </a>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
