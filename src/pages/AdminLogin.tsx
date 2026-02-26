import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulating a slightly longer check for premium feel
        setTimeout(() => {
            if (username === 'shreyan' && password === 'aariisthebest') {
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Authentication failed. Please verify credentials.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col justify-center relative overflow-hidden px-4">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-20 h-20 bg-[var(--color-card)] shadow-2xl rounded-3xl flex items-center justify-center border border-[var(--border-color)]">
                        <Fingerprint className="h-10 w-10 text-[var(--color-primary)]" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-black tracking-tight text-[var(--color-foreground)]">
                        Secure Access
                    </h2>
                    <p className="mt-2 text-[var(--color-muted)] font-medium">
                        Nova PreScreen Admin Identity Portal
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[var(--color-card)]/80 backdrop-blur-xl py-10 px-8 shadow-2xl border border-[var(--border-color)] rounded-[2.5rem] sm:px-12"
                >
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 text-red-600 dark:bg-red-900/20 px-4 py-3 rounded-2xl text-sm font-bold flex items-center mb-6 border border-red-100 dark:border-red-900/30"
                            >
                                <ShieldCheck className="w-5 h-5 mr-3 shrink-0" /> {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--color-foreground)] ml-1">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[var(--color-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--color-background)]/50 focus:ring-4 focus:ring-blue-500/10 focus:border-[var(--color-primary)] transition-all outline-none font-medium"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[var(--color-foreground)] ml-1">
                                Security Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[var(--color-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--color-background)]/50 focus:ring-4 focus:ring-blue-500/10 focus:border-[var(--color-primary)] transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-blue-500/25"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Authorize Session</span>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                <p className="mt-10 text-center text-xs text-[var(--color-muted)] font-bold tracking-widest uppercase">
                    Institutional Access Only &bull; End-to-End Encrypted
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;

