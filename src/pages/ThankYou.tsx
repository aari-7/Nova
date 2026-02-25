import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, AlertTriangle, AlertCircle, CheckCircle, ChevronRight, Share2, ClipboardCheck, ArrowLeft, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AssessmentData } from '../types/assessment';
import { AssessmentResult, RiskLevel } from '../utils/scoringEngine';
import { Logo } from '../components/ui/Logo';

const getRecommendations = (riskLevel: RiskLevel) => {
    if (riskLevel === 'High') {
        return [
            "Profound Clinical Consultation: Immediate review by an oncology specialist is recommended.",
            "Diagnostic Screening: Prioritize imaging (MRI/CT) and specific tumor marker panels.",
            "Genetic Assessment: Evaluate hereditary patterns with a certified counselor.",
            "Lifestyle Intervention: Critical shifts in nutrition and physical activity protocols."
        ];
    } else if (riskLevel === 'Moderate') {
        return [
            "Routine Surveillance: Biannual diagnostic check-ups with your provider.",
            "Nutritional Balancing: Increase antioxidant-rich intake and minimize carcinogen exposure.",
            "Physical Activity: Maintain a baseline of 150+ minutes of target-zone aerobic activity.",
            "Vigilant Monitoring: Systematic self-examination for any anatomical or physiological shifts."
        ];
    }
    return [
        "Optimal Maintenance: Continue established high-performance health habits.",
        "Annual Physicals: Maintain consistent yearly clinical baseline evaluations.",
        "Systemic Defense: Focus on immune system support and UV protection protocols.",
        "Ongoing Awareness: Maintain literacy on evolving early detection benchmarks."
    ];
};

const ThankYou = () => {
    const navigate = useNavigate();
    const [resultProps, setResultProps] = useState<{ data: AssessmentData, result: AssessmentResult, date: string } | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('assessmentResult');
        if (!stored) {
            navigate('/');
        } else {
            setResultProps(JSON.parse(stored));
        }
    }, [navigate]);

    const handleDownloadPDF = async () => {
        if (!pdfRef.current || !resultProps) {
            console.error("Missing PDF ref or results data");
            return;
        }

        setIsExporting(true);
        console.log("Starting PDF generation for:", resultProps.data.fullName);

        try {
            // Smaller delay for UI updates
            await new Promise(resolve => setTimeout(resolve, 500));

            const element = pdfRef.current;
            const canvas = await html2canvas(element, {
                scale: 2, // Scale 2 is usually sufficient and faster than 3
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (doc) => {
                    // You can modify the cloned document here if needed
                    console.log("DOM cloned for PDF generation");
                }
            });

            console.log("Canvas generated successfully:", canvas.width, "x", canvas.height);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
            const rawName = resultProps?.data?.fullName || 'Patient';
            const fileName = `Nova_Health_Report_${rawName.replace(/\s+/g, '_')}.pdf`;
            pdf.save(fileName);
            console.log("PDF saved successfully as:", fileName);
        } catch (error) {
            console.error("PDF generation encountered a critical error:", error);
            alert("Sorry, there was an issue generating your PDF. Please try again or use your browser's print feature.");
        } finally {
            setIsExporting(false);
        }
    };

    if (!resultProps) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
                <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    const { data, result, date } = resultProps;

    // Safely parse data points just in case there's old corrupted sessionStorage
    const fullName = data?.fullName || 'Patient';
    const riskLevel = result?.riskLevel || 'Low';
    const score = result?.score || 0;
    const gender = data?.gender || 'Unspecified';
    const phone = data?.phone || 'Not Provided';
    const isAge50Plus = data?.age50Plus ? 'Positive' : 'Nominal';
    const parsedDate = date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date';

    const RiskIcon = riskLevel === 'High' ? AlertTriangle : riskLevel === 'Moderate' ? AlertCircle : CheckCircle;

    const getRiskStyles = (level: string) => {
        switch (level) {
            case 'High': return { color: 'text-red-500', bg: 'bg-red-500', light: 'bg-red-50 dark:bg-red-900/10', border: 'border-red-500/10' };
            case 'Moderate': return { color: 'text-orange-500', bg: 'bg-orange-500', light: 'bg-orange-50 dark:bg-orange-900/10', border: 'border-orange-500/10' };
            default: return { color: 'text-green-500', bg: 'bg-green-500', light: 'bg-green-50 dark:bg-green-900/10', border: 'border-green-500/10' };
        }
    };

    const styles = getRiskStyles(riskLevel);

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
                    <Link to="/" className="flex items-center text-sm font-black uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Return to Portal
                    </Link>
                    <div className="flex items-center space-x-3">
                        <button className="p-3 bg-[var(--color-card)] border border-[var(--border-color)] rounded-xl text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isExporting}
                            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {isExporting ? <RefreshCcw className="w-5 h-5 animate-spin mr-2" /> : <Download className="w-5 h-5 mr-2" />}
                            {isExporting ? 'Processing' : 'Export Full Report'}
                        </button>
                    </div>
                </div>

                {/* Report Area */}
                <div ref={pdfRef} className="bg-[var(--color-card)] rounded-[3rem] border border-[var(--border-color)] shadow-2xl overflow-hidden p-8 md:p-16 relative">
                    {/* Top Watermark */}
                    <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden md:block">
                        <Logo className="h-20" />
                    </div>

                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--border-color)] pb-12 mb-12 space-y-6 md:space-y-0">
                        <div>
                            <Logo className="h-10 mb-4" />
                            <div className="flex items-center text-[var(--color-muted)] font-bold text-[10px] uppercase tracking-[0.2em]">
                                <ClipboardCheck className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                                Screening Reference: #{Math.floor(Math.random() * 1000000)}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-[var(--color-foreground)]">Risk Profile Report</p>
                            <p className="text-sm text-[var(--color-muted)] font-medium">Issued: {parsedDate}</p>
                        </div>
                    </header>

                    <main>
                        <div className="mb-12 px-4 md:px-0">
                            <h2 className="text-3xl font-black text-[var(--color-foreground)] mb-2">Subject: {fullName}</h2>
                            <p className="text-[var(--color-muted)] font-medium text-lg leading-relaxed">
                                Comparative analysis based on institutional early-cancer detection benchmarks and biological risk factors.
                            </p>
                        </div>

                        {/* Result Overview */}
                        <div className={`grid md:grid-cols-12 gap-8 mb-16 rounded-[2.5rem] p-8 border ${styles.border} ${styles.light}`}>
                            <div className="md:col-span-8 flex flex-col justify-center">
                                <div className="flex items-center mb-4">
                                    <div className={`p-2 rounded-lg ${styles.bg} text-white mr-3 shadow-lg`}>
                                        <RiskIcon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-sm font-black uppercase tracking-[0.25em] ${styles.color}`}>Calculated Risk Level</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-[var(--color-foreground)] mb-4">{riskLevel}</h3>
                                <p className="text-[var(--color-muted)] font-medium leading-relaxed">
                                    Your profile indicates a {riskLevel.toLowerCase()} cumulative score relative to current oncological surveillance matrices.
                                </p>
                            </div>
                            <div className="md:col-span-4 flex items-center justify-center">
                                <div className="relative w-40 h-40">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200 dark:text-gray-800" />
                                        <circle
                                            cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                            strokeDasharray={440}
                                            strokeDashoffset={440 - (440 * (score / 50))}
                                            className={`${styles.color} transition-all duration-1000`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black text-[var(--color-foreground)]">{score}</span>
                                        <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest">Points</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <section className="mb-16">
                            <h3 className="text-xl font-black text-[var(--color-foreground)] mb-8 uppercase tracking-widest flex items-center">
                                <span className="w-10 h-0.5 bg-[var(--color-primary)] mr-4"></span>
                                Clinical Action Plan
                            </h3>
                            <div className="grid gap-4">
                                {getRecommendations(riskLevel as RiskLevel).map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-start bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-[var(--border-color)] border-l-[6px] border-l-[var(--color-primary)]"
                                    >
                                        <div className="font-black text-[var(--color-primary)] mr-4 opacity-50 text-xl font-plus-jakarta">0{idx + 1}</div>
                                        <p className="font-bold text-[var(--color-foreground)] text-sm leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Data Points */}
                        <section className="pt-12 border-t border-[var(--border-color)]">
                            <h3 className="text-xl font-black text-[var(--color-foreground)] mb-8 uppercase tracking-widest">Profile Metrics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                                {[
                                    { label: 'Primary Subject', value: fullName },
                                    { label: 'Classification', value: gender, capitalize: true },
                                    { label: 'Contact Node', value: phone },
                                    { label: 'Age Factor-50', value: isAge50Plus }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2">{item.label}</p>
                                        <p className={`text-base font-bold text-[var(--color-foreground)] ${item.capitalize ? 'capitalize' : ''}`}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>

                    <footer className="mt-20 pt-10 border-t border-[var(--border-color)] text-center">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.3em] leading-relaxed">
                            Generated by Nova PreScreen Institutional Engine &bull; Confidential Clinical Information &bull; Ver 2.4.0
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;

