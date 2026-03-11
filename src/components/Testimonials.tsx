import { motion } from 'framer-motion'

export default function Testimonials() {
    return (
        <motion.div
            style={{ textAlign: 'center', maxWidth: '800px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div style={{ marginBottom: '2rem', color: 'var(--accent-color)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            <p style={{ fontSize: 'var(--fs-h2)', fontWeight: 500, lineHeight: 1.3, marginBottom: '2rem' }}>
                "The curation of vehicles at Arngren is unparalleled. Purchasing my Taycan was an experience defined by elegance and exceptional service from start to finish."
            </p>
            <div style={{ fontSize: 'var(--fs-small)', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                — James H., MotorTrend
            </div>
        </motion.div>
    )
}
