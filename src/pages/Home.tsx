import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, BookOpen, ChevronRight, Heart, Brain, Search, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--color-background)] px-4 pt-20 pb-32">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,_var(--color-primary)_0%,_transparent_70%)] opacity-10 blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,_var(--color-accent)_0%,_transparent_70%)] opacity-10 blur-[100px]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 text-left"
                    >
                        <div>
                            <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                                <Activity className="w-4 h-4 mr-2" />
                                Advanced Cancer Awareness Platform
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--color-foreground)] leading-[1.1]">
                                Early Awareness <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Saves Lives.</span>
                            </h1>
                        </div>

                        <p className="text-xl text-[var(--color-muted)] max-w-xl leading-relaxed">
                            Nova PreScreen combines medical guidelines with intelligent risk assessment to help you stay ahead of your health. Secure, private, and professional.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                to="/assessment"
                                className="w-full sm:w-auto px-10 py-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/25 flex items-center justify-center group"
                            >
                                Start Assessment
                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/types"
                                className="w-full sm:w-auto px-10 py-5 bg-[var(--color-card)] border border-[var(--border-color)] hover:border-[var(--color-primary)] text-[var(--color-foreground)] rounded-2xl font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-black/5"
                            >
                                Learn More
                            </Link>
                        </div>

                        <div className="flex items-center space-x-8 pt-4 border-t border-[var(--border-color)] w-fit">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-[var(--color-foreground)]">3 min</span>
                                <span className="text-sm text-[var(--color-muted)]">Fast Assessment</span>
                            </div>
                            <div className="w-px h-10 bg-[var(--border-color)]"></div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-[var(--color-foreground)]">100%</span>
                                <span className="text-sm text-[var(--color-muted)]">Private & Secure</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        {/* Abstract Medical UI Elements */}
                        <div className="relative z-10 bg-[var(--color-card)] rounded-[2.5rem] p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-[var(--border-color)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 -z-10"></div>
                            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">Health Monitor</div>
                                        <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest font-bold">Active Shield</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest font-bold mb-1">Status</div>
                                    <div className="flex items-center text-green-500 font-bold text-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                                        PROTECTED
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="h-24 w-full bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-end px-4 py-2 space-x-1">
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 50, 75, 40].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="flex-1 bg-blue-400/30 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-[var(--border-color)]">
                                        <Activity className="w-5 h-5 text-blue-500 mb-2" />
                                        <div className="text-xs text-[var(--color-muted)] mb-1">Risk Probability</div>
                                        <div className="text-xl font-bold">Low Awareness</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-[var(--border-color)]">
                                        <Clock className="w-5 h-5 text-orange-500 mb-2" />
                                        <div className="text-xs text-[var(--color-muted)] mb-1">Next Checkup</div>
                                        <div className="text-xl font-bold">24 Days</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Decoration Icons */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-background)] rounded-2xl shadow-xl flex items-center justify-center border border-[var(--border-color)] z-20"
                        >
                            <ShieldCheck className="w-12 h-12 text-green-500" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-10 w-20 h-20 bg-[var(--color-background)] rounded-2xl shadow-xl flex items-center justify-center border border-[var(--border-color)] z-20"
                        >
                            <Brain className="w-10 h-10 text-purple-500" />
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* How it Works Section */}
            < section className="py-32 bg-[var(--color-background)] px-4" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">Our Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Smart Analysis in Seconds</h2>
                        <p className="text-[var(--color-muted)] text-lg">We use medical standards to translate your indicators into objective risk profiles.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Search className="w-8 h-8" />,
                                title: "1. Comprehensive Input",
                                desc: "Answer simple but vital questions about your medical history and lifestyle factors.",
                                color: "blue"
                            },
                            {
                                icon: <Activity className="w-8 h-8" />,
                                title: "2. Real-time Calculation",
                                desc: "Our engine processes your data against known risk benchmarks for clinical accuracy.",
                                color: "orange"
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "3. Actionable Report",
                                desc: "Download a detailed PDF report with precise lifestyle recommendations and next steps.",
                                color: "green"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-[var(--color-card)] p-10 rounded-[2rem] shadow-sm border border-[var(--border-color)] relative group overflow-hidden"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${item.color}-50 text-${item.color}-600 dark:bg-${item.color}-900/20 dark:text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;

