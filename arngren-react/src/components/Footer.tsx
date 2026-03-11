import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="footer-main">
                    <div>
                        <a href="#" className="footer-logo">arngren.</a>
                    </div>
                    
                    <div>
                        <h4 className="footer-col-title">Showroom</h4>
                        <a href="#featured" className="footer-link">All Vehicles</a>
                        <a href="#categories" className="footer-link">Exotic</a>
                        <a href="#categories" className="footer-link">Luxury</a>
                        <a href="#categories" className="footer-link">Electric</a>
                    </div>
                    
                    <div>
                        <h4 className="footer-col-title">Company</h4>
                        <a href="#about" className="footer-link">Journal</a>
                        <a href="#" className="footer-link">Locations</a>
                        <a href="#" className="footer-link">Financing</a>
                        <a href="#about" className="footer-link">Contact</a>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Social</h4>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <a href="#" className="footer-link"><Instagram size={24} strokeWidth={1.5} /></a>
                            <a href="#" className="footer-link"><Twitter size={24} strokeWidth={1.5} /></a>
                            <a href="#" className="footer-link"><Youtube size={24} strokeWidth={1.5} /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Arngren Automotive. All Rights Reserved.</span>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
