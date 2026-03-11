import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Product {
    id: number
    title: string
    price: number
    image: string
    badge?: string
}

interface ProductCardProps {
    product: Product
    index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="product-image-wrap">
                {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                )}
                <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <span className="product-price">${product.price}</span>
            </div>
            <button className="product-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Add to Cart <ArrowRight size={18} />
            </button>
        </motion.div>
    )
}

export type { Product }
