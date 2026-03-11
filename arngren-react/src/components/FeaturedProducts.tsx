import ProductCard from './ProductCard'
import type { Product } from './ProductCard'

const products: Product[] = [
    {
        id: 1,
        title: 'Porsche 911 GT3',
        price: 169700,
        image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
        badge: 'New Arrival',
    },
    {
        id: 2,
        title: 'Mercedes G-Wagon',
        price: 179000,
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    },
    {
        id: 3,
        title: 'Yamaha Raptor ATV',
        price: 12500,
        image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
        badge: 'Off-Road',
    },
    {
        id: 4,
        title: 'Vespa Primavera',
        price: 7499,
        image: 'https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg',
    },
    {
        id: 5,
        title: 'Canyon Roadlite',
        price: 2498,
        image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
    },
    {
        id: 6,
        title: 'Range Rover Sport',
        price: 155000,
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    },
]

export default function FeaturedProducts() {
    return (
        <>
            <h2 className="section-title">The Fleet</h2>
            <div className="products-grid">
                {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                ))}
            </div>
        </>
    )
}
