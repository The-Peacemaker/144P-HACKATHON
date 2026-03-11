import { motion } from 'framer-motion'
import { PackageOpen, ShieldCheck, HeadphonesIcon, Truck } from 'lucide-react'

const values = [
    {
        icon: <Truck size={28} strokeWidth={1.5} />,
        title: 'Free Delivery',
        description: 'Complimentary shipping on all orders over $150.',
    },
    {
        icon: <ShieldCheck size={28} strokeWidth={1.5} />,
        title: 'Secure Payments',
        description: 'Checkout securely with AES-256 bit encryption.',
    },
    {
        icon: <PackageOpen size={28} strokeWidth={1.5} />,
        title: 'Easy Returns',
        description: 'Not satisfied? Return within 30 days, no questions asked.',
    },
    {
        icon: <HeadphonesIcon size={28} strokeWidth={1.5} />,
        title: '24/7 Support',
        description: 'Our customer experience team is always here to help.',
    },
]

export default function WhyChooseUs() {
    return (
        <>
            <h2 className="section-title">Why Arngren</h2>
            <div className="values-grid">
                {values.map((v, i) => (
                    <motion.div
                        key={v.title}
                        className="value-item"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <div className="value-icon">{v.icon}</div>
                        <h3 className="value-title">{v.title}</h3>
                        <p className="value-desc">{v.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    )
}
