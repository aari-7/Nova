import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, List, LogOut, CheckCircle, Search, Trash2, RefreshCcw, ExternalLink, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PatientSubmission } from '../types/assessment';

const MOCK_SUBMISSIONS: PatientSubmission[] = [
    { id: '1', name: 'John Doe', phone: '(555) 123-4567', gender: 'male', score: 28, risk: 'High', date: '2023-10-01T10:00:00Z', rawAnswers: {} as any },
    { id: '2', name: 'Jane Smith', phone: '(555) 987-6543', gender: 'female', score: 14, risk: 'Moderate', date: '2023-10-02T14:30:00Z', rawAnswers: {} as any },
    { id: '3', name: 'Robert Johnson', phone: '(555) 555-5555', gender: 'male', score: 5, risk: 'Low', date: '2023-10-02T09:15:00Z', rawAnswers: {} as any },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<PatientSubmission[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadData = () => {
        setIsLoading(true);
        const stored = localStorage.getItem('nova_submissions');
        if (stored) {
            setSubmissions(JSON.parse(stored));
        } else {
            // Seed with mock data if empty for first time view
            setSubmissions(MOCK_SUBMISSIONS);
            localStorage.setItem('nova_submissions', JSON.stringify(MOCK_SUBMISSIONS));
        }
        setTimeout(() => setIsLoading(false), 500);
    };

    useEffect(() => {
        // Basic auth check
        if (sessionStorage.getItem('isAdmin') !== 'true') {
            navigate('/admin');
        } else {
            loadData();
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    const clearAllData = () => {
        if (window.confirm('Are you sure you want to clear all patient data? This cannot be undone.')) {
            localStorage.removeItem('nova_submissions');
            setSubmissions([]);
        }
    };

    const filteredSubmissions = submissions.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm)
    );

    const getRiskStats = () => {
        return {
            total: submissions.length,
            high: submissions.filter(s => s.risk === 'High').length,
            moderate: submissions.filter(s => s.risk === 'Moderate').length,
            low: submissions.filter(s => s.risk === 'Low').length,
        };
    };

    const stats = getRiskStats();

    return (
        <div className="min-h-screen bg-[var(--color-background)] font-inter">
            {/* Top Navigation */}
            <nav className="bg-[var(--color-background)] border-b border-[var(--border-color)] sticky top-0 z-30 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <Users className="h-6 w-6" />
                            </div>
                            <span className="font-plus-jakarta font-bold text-2xl tracking-tight text-[var(--color-foreground)]">
                                Nova<span className="text-[var(--color-primary)]">Admin</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="hidden sm:flex items-center space-x-2 text-sm font-medium px-4 py-2 bg-[var(--color-card)] border border-[var(--border-color)] rounded-full text-[var(--color-muted)]">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>System Online</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-[var(--color-muted)] hover:text-red-500 p-2 transition-colors flex items-center space-x-2 group"
                            >
                                <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="hidden sm:inline font-semibold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Patient Submissions</h1>
                        <p className="text-[var(--color-muted)]">Manage and review screening results from the Nova PreScreen portal.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={loadData}
                            className="p-3 bg-[var(--color-card)] border border-[var(--border-color)] rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all shadow-sm"
                            title="Refresh Data"
                        >
                            <RefreshCcw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={clearAllData}
                            className="p-3 bg-[var(--color-card)] border border-[var(--border-color)] rounded-xl text-[var(--color-muted)] hover:text-red-500 transition-all shadow-sm"
                            title="Clear All Data"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-[var(--color-card)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                                <List className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">Total</span>
                        </div>
                        <div className="text-3xl font-bold">{stats.total}</div>
                        <div className="text-sm text-[var(--color-muted)] mt-1">Submissions received</div>
                    </div>

                    <div className="bg-[var(--color-card)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider text-red-500">Urgent</span>
                        </div>
                        <div className="text-3xl font-bold text-red-500">{stats.high}</div>
                        <div className="text-sm text-[var(--color-muted)] mt-1">High risk cases</div>
                    </div>

                    <div className="bg-[var(--color-card)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                                <Activity className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider text-orange-500">Monitor</span>
                        </div>
                        <div className="text-3xl font-bold text-orange-500">{stats.moderate}</div>
                        <div className="text-sm text-[var(--color-muted)] mt-1">Moderate risk cases</div>
                    </div>

                    <div className="bg-[var(--color-card)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider text-green-500">Clear</span>
                        </div>
                        <div className="text-3xl font-bold text-green-500">{stats.low}</div>
                        <div className="text-sm text-[var(--color-muted)] mt-1">Low risk cases</div>
                    </div>
                </div>

                {/* Data Table Container */}
                <div className="bg-[var(--color-card)] rounded-[2.5rem] border border-[var(--border-color)] shadow-xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center bg-[var(--color-background)]">
                        <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-4 sm:mb-0">Patient Directory</h3>
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--border-color)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm"
                                placeholder="Search by name or contact..."
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[var(--color-background)] text-[var(--color-muted)] text-[10px] uppercase tracking-[0.2em] font-black border-b border-[var(--border-color)]">
                                    <th className="px-8 py-4 text-left">Patient Details</th>
                                    <th className="px-8 py-4 text-left">Contact Info</th>
                                    <th className="px-8 py-4 text-center">Screening Date</th>
                                    <th className="px-8 py-4 text-center">Score</th>
                                    <th className="px-8 py-4 text-left">Risk Analysis</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                <AnimatePresence mode="popLayout">
                                    {filteredSubmissions.length > 0 ? filteredSubmissions.map((person) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={person.id}
                                            className="hover:bg-gray-50/80 dark:hover:bg-gray-800/10 transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/10">
                                                        {person.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-bold text-[var(--color-foreground)] text-base group-hover:text-[var(--color-primary)] transition-colors">{person.name}</div>
                                                        <div className="text-[var(--color-muted)] text-xs capitalize font-medium">{person.gender}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-[var(--color-foreground)] font-semibold text-sm">{person.phone}</div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="text-[var(--color-muted)] text-sm font-medium">
                                                    {new Date(person.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 font-bold text-sm">
                                                    {person.score}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-black rounded-full uppercase tracking-widest ${person.risk === 'High'
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                                    : person.risk === 'Moderate'
                                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                                        : 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                                    }`}>
                                                    {person.risk}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 text-[var(--color-primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all inline-flex items-center space-x-2 font-bold text-xs uppercase tracking-wider">
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span className="hidden lg:inline">Report</span>
                                                </button>
                                            </td>
                                        </motion.tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center justify-center text-[var(--color-muted)]">
                                                    <Search className="h-12 w-12 mb-4 opacity-20" />
                                                    <p className="font-bold text-xl mb-1">No matching patients found</p>
                                                    <p className="text-sm">Try adjusting your search or filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

