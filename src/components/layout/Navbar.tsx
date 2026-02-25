import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Cancer Types', path: '/types' },
        { name: 'Understanding Stages', path: '/stages' },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-md border-b border-[var(--border-color)] py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={closeMenu}>
                        <Logo className="h-8 sm:h-10" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "text-sm font-bold transition-all hover:text-[var(--color-primary)] relative py-2",
                                        location.pathname === link.path
                                            ? "text-[var(--color-primary)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-primary)] after:rounded-full"
                                            : "text-[var(--color-muted)]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4 border-l border-[var(--border-color)] pl-6">
                            <Link
                                to="/assessment"
                                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-7 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 flex items-center"
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Start Screening
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--color-foreground)] transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden mt-4 mx-4"
                    >
                        <div className="bg-[var(--color-card)] rounded-[2rem] p-6 shadow-2xl border border-[var(--border-color)] overflow-hidden">
                            <div className="space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={closeMenu}
                                        className={cn(
                                            "block px-4 py-4 rounded-2xl text-base font-bold transition-colors",
                                            location.pathname === link.path
                                                ? "text-[var(--color-primary)] bg-blue-50 dark:bg-blue-900/20"
                                                : "text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-gray-50 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                                <Link
                                    to="/assessment"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center w-full bg-[var(--color-primary)] text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-blue-500/25 active:scale-95 transition-transform"
                                >
                                    <Shield className="w-5 h-5 mr-2" />
                                    Start Free Screening
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

