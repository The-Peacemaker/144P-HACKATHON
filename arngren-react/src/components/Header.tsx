import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

interface HeaderProps {
    scrolled: boolean
    onMenuOpen: () => void
}

export default function Header({ scrolled, onMenuOpen }: HeaderProps) {
    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-inner">
                <a href="#" className="logo">arngren.</a>

                <nav className="nav-links">
                    <a href="#featured" className="nav-link">Shop</a>
                    <a href="#categories" className="nav-link">Collections</a>
                    <a href="#about" className="nav-link">Journal</a>
                </nav>

                <div className="header-actions">
                    <button className="cart-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={20} strokeWidth={2.5} />
                        <span>Cart (0)</span>
                    </button>
                    <button
                        className="hamburger"
                        onClick={onMenuOpen}
                        aria-label="Open menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </header>
    )
}
