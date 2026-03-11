import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 4;
        }
    }, [])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    })
    
    // Parallax effect for the text
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section className="hero-video-section" ref={ref} id="hero">
            {/* Background Video */}
            <div className="hero-video-container">
                <div className="hero-video-overlay"></div>
                <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    playsInline
                    className="hero-video"
                    onLoadedMetadata={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 4;
                        }
                    }}
                    onEnded={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 4;
                            videoRef.current.play();
                        }
                    }}
                >
                    <source src="/porsche.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content Overlay */}
            <motion.div 
                className="hero-video-content"
                style={{ y, opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="hero-video-badge">The 2026 Collection</span>
                </motion.div>

                <motion.h1
                    className="hero-video-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    Motion<br />Perfected.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <a href="#featured" className="btn btn-glass">
                        Explore Vehicles
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="hero-scroll-text">Scroll to Discover</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown size={24} strokeWidth={1.5} />
                </motion.div>
            </motion.div>
        </section>
    )
}
