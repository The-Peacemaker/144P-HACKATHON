import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
    {
        title: 'Exotic Cars',
        image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
        alt: 'Exotic sports car',
    },
    {
        title: 'Urban Commute',
        image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
        alt: 'City bicycle',
    },
    {
        title: 'Scooters',
        image: 'https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg',
        alt: 'Vespa scooter',
    },
    {
        title: 'Off-Road',
        image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
        alt: 'ATV quad bike',
    },
]

export default function Categories() {
    return (
        <>
            <h2 className="section-title">Classifications</h2>
            <div className="categories-layout">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.title}
                        className="category-block"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <img src={cat.image} alt={cat.alt} />
                        <div className="category-overlay"></div>
                        <div className="category-block-content">
                            <h3 className="category-block-title">{cat.title}</h3>
                            <a href="#" className="category-block-link">View Collection <ArrowRight size={16} /></a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    )
}
