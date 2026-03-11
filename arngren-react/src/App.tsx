import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import MenuOverlay from './components/MenuOverlay'
import Ticker from './components/Ticker'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import FeaturedProducts from './components/FeaturedProducts'
import Categories from './components/Categories'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Footer from './components/Footer'

// Preload all product & category images
const PRELOAD_IMAGES = [
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    'https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg',
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
]

function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
        cardsRef.current[index] = el
    }, [])

    // Preload all images on mount so cards appear instantly
    useEffect(() => {
        PRELOAD_IMAGES.forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [])

    useEffect(() => {
        let ticking = false

        const onScroll = () => {
            setScrolled(window.scrollY > 40)

            if (!ticking) {
                ticking = true
                requestAnimationFrame(() => {
                    const vh = window.innerHeight
                    cardsRef.current.forEach((card) => {
                        if (!card) return
                        const rect = card.getBoundingClientRect()
                        const scrolledPast = -rect.top
                        const runway = vh * 0.7

                        if (scrolledPast <= 0) {
                            card.style.transform = 'scale(1) translateY(0px)'
                            card.style.opacity = '1'
                            card.style.borderRadius = '48px 48px 0 0'
                            return
                        }

                        const t = Math.min(1, scrolledPast / runway)
                        const e = 1 - Math.pow(1 - t, 3)

                        const scale = 1 - e * 0.08         // 1 → 0.92
                        const translateY = e * -40          // 0 → -40px
                        const opacity = 1 - e * 0.6         // 1 → 0.4
                        const radius = 48 - e * 24           // 48 → 24

                        card.style.transform = `scale(${scale}) translateY(${translateY}px)`
                        card.style.opacity = `${opacity}`
                        card.style.borderRadius = `${radius}px ${radius}px 0 0`
                    })
                    ticking = false
                })
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (section: string) => {
        setMenuOpen(false)
        const el = document.getElementById(section)
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300)
        }
    }

    return (
        <>
            <CustomCursor />

            <Header
                scrolled={scrolled}
                onMenuOpen={() => setMenuOpen(true)}
            />

            <AnimatePresence>
                {menuOpen && (
                    <MenuOverlay
                        onClose={() => setMenuOpen(false)}
                        onNavigate={scrollTo}
                    />
                )}
            </AnimatePresence>

            <Hero />

            <Ticker
                texts={['WORLDWIDE DELIVERY', 'BESPOKE SOURCING', 'UNRIVALED PEDIGREE', 'AUTOMOTIVE EXCELLENCE']}
            />

            <div ref={(el) => setCardRef(el, 0)} className="paper-card" id="featured"
                style={{ background: 'var(--bg-primary)' }}>
                <FeaturedProducts />
            </div>

            <div ref={(el) => setCardRef(el, 1)} className="paper-card" id="benefits"
                style={{ background: 'var(--bg-secondary)' }}>
                <WhyChooseUs />
            </div>

            <div ref={(el) => setCardRef(el, 2)} className="paper-card" id="categories"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                <Categories />
            </div>

            <div ref={(el) => setCardRef(el, 3)} className="paper-card" id="testimonials"
                style={{ background: 'var(--bg-secondary)' }}>
                <Testimonials />
            </div>

            <div ref={(el) => setCardRef(el, 4)} className="paper-card" id="about"
                style={{ padding: 0 }}>
                <About />
            </div>

            <div ref={(el) => setCardRef(el, 5)} className="paper-card" id="contact"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                <Footer />
            </div>
        </>
    )
}

export default App
