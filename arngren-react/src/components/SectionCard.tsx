import { useRef, useEffect, type ReactNode } from 'react'

interface SectionCardProps {
    children: ReactNode
    id?: string
    bg?: string
    color?: string
    noPadding?: boolean
}

/**
 * SectionCard — scroll-driven paper-peel effect using raw scroll listeners.
 * 
 * Each wrapper is 150vh tall. The inner card is position:sticky, pinning to
 * the top while the extra 50vh scrolls through. A scroll listener animates
 * scale, brightness, and border-radius as the card is scrolled away,
 * creating a paper-peel stacking illusion.
 */
export default function SectionCard({
    children,
    id,
    bg = 'var(--bg-primary)',
    color,
    noPadding = false,
}: SectionCardProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let rafId: number

        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                const wrapper = wrapperRef.current
                const card = cardRef.current
                if (!wrapper || !card) return

                const rect = wrapper.getBoundingClientRect()
                const wrapperH = wrapper.offsetHeight
                const vh = window.innerHeight

                // How far we've scrolled into this wrapper
                const scrolled = -rect.top
                const totalScroll = wrapperH - vh
                if (totalScroll <= 0) return

                const progress = Math.max(0, Math.min(1, scrolled / totalScroll))

                // Only animate in the last 40% of the scroll range (the "runway")
                const t = Math.max(0, (progress - 0.6) / 0.4)

                // Eased transform (ease-out cubic)
                const eased = 1 - Math.pow(1 - t, 3)

                const scale = 1 - eased * 0.12        // 1 → 0.88
                const translateY = eased * -40         // 0 → -40px
                const brightness = 1 - eased * 0.45    // 1 → 0.55
                const radius = 48 - eased * 20         // 48 → 28

                card.style.transform = `scale(${scale}) translateY(${translateY}px)`
                card.style.filter = `brightness(${brightness})`
                card.style.borderTopLeftRadius = `${radius}px`
                card.style.borderTopRightRadius = `${radius}px`
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call
        return () => {
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            id={id}
            style={{ height: '150vh', position: 'relative' }}
        >
            <div
                ref={cardRef}
                className="paper-card"
                style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: bg,
                    color: color || undefined,
                    padding: noPadding ? 0 : undefined,
                    transformOrigin: 'center top',
                }}
            >
                {children}
            </div>
        </div>
    )
}
