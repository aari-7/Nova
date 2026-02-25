import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Shield, Mail, Globe, Lock } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[var(--color-background)] border-t border-[var(--border-color)] pt-20 pb-12 transition-colors">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="inline-block group">
                            <Logo className="h-10 sm:h-12 group-hover:opacity-80 transition-opacity" />
                        </Link>
                        <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-md">
                            Advancing early cancer detection through accessible, evidence-based screening tools and institutional-grade risk assessment technology.
                        </p>
                        <div className="flex items-center space-x-5 text-[var(--color-muted)]">
                            <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><Globe className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><Mail className="w-5 h-5" /></a>
                            <Link to="/admin" className="hover:text-[var(--color-primary)] transition-colors"><Lock className="w-5 h-5" /></Link>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h3 className="font-plus-jakarta font-bold text-[var(--color-foreground)] mb-6 uppercase tracking-widest text-xs">Resources</h3>
                        <ul className="space-y-4 text-sm font-semibold text-[var(--color-muted)]">
                            <li><Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Platform Home</Link></li>
                            <li><Link to="/types" className="hover:text-[var(--color-primary)] transition-colors">Cancer Directory</Link></li>
                            <li><Link to="/stages" className="hover:text-[var(--color-primary)] transition-colors">Clinical Stages</Link></li>
                            <li><Link to="/assessment" className="hover:text-[var(--color-primary)] transition-colors">Risk Portal</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="font-plus-jakarta font-bold text-[var(--color-foreground)] mb-6 uppercase tracking-widest text-xs">Knowledge</h3>
                        <ul className="space-y-4 text-sm font-semibold text-[var(--color-muted)]">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Research Base</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Methodology</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Data Privacy</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-[var(--border-color)] flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                    <div className="text-sm font-medium text-[var(--color-muted)]">
                        &copy; {new Date().getFullYear()} Nova Health Surveillance Systems. Professional License Ver. 2.4
                    </div>
                    <div className="flex items-center bg-blue-50/50 dark:bg-blue-900/10 px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-900/30 max-w-2xl">
                        <Shield className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                        <p className="text-[10px] sm:text-xs text-blue-800 dark:text-blue-300 font-bold leading-relaxed">
                            DISCLAIMER: This platform provides risk assessment based on clinical benchmarks. It is not a substitute for diagnostic medical procedures. Always consult with oncology specialists.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

