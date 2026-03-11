import { useEffect, useRef } from 'react'

/**
 * CustomCursor — adaptive color cursor that reads the background beneath it
 * and dynamically switches between light/dark to stay perfectly visible.
 *
 * States:
 * - Default: 10px filled dot
 * - Interactive (links, buttons): 50px ring
 * - Media (cards, images, video): 80px frosted circle with label
 */
export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const pos = useRef({ x: -100, y: -100 })
    const target = useRef({ x: -100, y: -100 })
    const size = useRef(10)
    const targetSize = useRef(10)
    const isDark = useRef(false) // true = cursor is over a dark background → use light cursor

    useEffect(() => {
        if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return

        const cursor = cursorRef.current
        const label = labelRef.current
        if (!cursor || !label) return

        // ─── Sample background color under the cursor ───
        const sampleBackground = (x: number, y: number) => {
            // Temporarily hide cursor to not sample itself
            cursor.style.display = 'none'
            const el = document.elementFromPoint(x, y)
            cursor.style.display = ''

            if (!el) return false

            // Walk up to find an element with a visible background
            let node: Element | null = el
            while (node && node !== document.documentElement) {
                const bg = window.getComputedStyle(node).backgroundColor
                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    return isColorDark(bg)
                }
                node = node.parentElement
            }
            return false // default: light background
        }

        const isColorDark = (color: string): boolean => {
            // Parse rgb/rgba string
            const match = color.match(/\d+/g)
            if (!match || match.length < 3) return false
            const r = parseInt(match[0])
            const g = parseInt(match[1])
            const b = parseInt(match[2])
            // Relative luminance formula
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
            return luminance < 0.45
        }

        // ─── Mouse move ───
        let sampleCounter = 0
        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX
            target.current.y = e.clientY

            // Sample background every 6th frame to reduce overhead
            sampleCounter++
            if (sampleCounter % 6 === 0) {
                const dark = sampleBackground(e.clientX, e.clientY)
                if (dark !== isDark.current) {
                    isDark.current = dark
                    cursor.dataset.theme = dark ? 'light' : 'dark'
                }
            }
        }

        // ─── Detect hover state ───
        const getCursorState = (el: Element | null): { size: number; label: string; style: string } => {
            if (!el) return { size: 10, label: '', style: 'default' }

            let node: Element | null = el
            while (node) {
                const tag = node.tagName.toLowerCase()
                const cls = node.className?.toString() || ''

                if (tag === 'input' || tag === 'textarea' || tag === 'select') {
                    return { size: 0, label: '', style: 'hidden' }
                }
                if (cls.includes('product-card') || cls.includes('category-block') || cls.includes('hero-video-section')) {
                    return { size: 80, label: 'Explore', style: 'media' }
                }
                if (cls.includes('split-image') || cls.includes('split-content')) {
                    return { size: 80, label: 'View', style: 'media' }
                }
                if (tag === 'a' || tag === 'button' || cls.includes('btn') || cls.includes('nav-link') || cls.includes('footer-link')) {
                    return { size: 50, label: '', style: 'interactive' }
                }
                node = node.parentElement
            }
            return { size: 10, label: '', style: 'default' }
        }

        const onOver = (e: MouseEvent) => {
            const state = getCursorState(e.target as Element)
            targetSize.current = state.size
            if (label) label.textContent = state.label
            if (cursor) cursor.dataset.state = state.style
        }

        // ─── Animation loop ───
        let rafId: number
        const lerp = (a: number, b: number, f: number) => a + (b - a) * f

        const animate = () => {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.18)
            pos.current.y = lerp(pos.current.y, target.current.y, 0.18)
            size.current = lerp(size.current, targetSize.current, 0.15)

            const s = size.current
            const half = s / 2
            cursor.style.transform = `translate3d(${pos.current.x - half}px, ${pos.current.y - half}px, 0)`
            cursor.style.width = `${s}px`
            cursor.style.height = `${s}px`

            rafId = requestAnimationFrame(animate)
        }

        // Set initial theme
        cursor.dataset.theme = 'dark'
        cursor.dataset.state = 'default'

        window.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('mouseover', onOver, { passive: true })
        rafId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div ref={cursorRef} className="custom-cursor" data-state="default" data-theme="dark">
            <span ref={labelRef} className="cursor-label"></span>
        </div>
    )
}
