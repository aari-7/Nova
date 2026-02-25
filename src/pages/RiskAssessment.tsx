import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ShieldCheck, Activity, ClipboardList } from 'lucide-react';
import { ProgressBar } from '../components/assessment/ProgressBar';
import { PrivacyConsent } from '../components/assessment/PrivacyConsent';
import { ContactInfo } from '../components/assessment/ContactInfo';
import { SectionA } from '../components/assessment/SectionA';
import { SectionB } from '../components/assessment/SectionB';
import { SectionC } from '../components/assessment/SectionC';
import { SectionD } from '../components/assessment/SectionD';
import { AssessmentData, initialAssessmentData } from '../types/assessment';
import { calculateScore } from '../utils/scoringEngine';

const RiskAssessment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<AssessmentData>(initialAssessmentData);

    const updateData = (fields: Partial<AssessmentData>) => {
        setData(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const submitAssessment = () => {
        const result = calculateScore(data);
        const newSubmission = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.fullName,
            phone: data.phone,
            gender: data.gender,
            score: result.score,
            risk: result.riskLevel,
            date: new Date().toISOString(),
            rawAnswers: data
        };

        // Persist to localStorage for the Admin Portal
        const submissionsKey = 'nova_submissions';
        const existingSubmissionsStr = localStorage.getItem(submissionsKey);
        const submissionsList = existingSubmissionsStr ? JSON.parse(existingSubmissionsStr) : [];
        submissionsList.unshift(newSubmission);
        localStorage.setItem(submissionsKey, JSON.stringify(submissionsList));

        // Save for Thank You page
        sessionStorage.setItem('assessmentResult', JSON.stringify({
            data,
            result,
            date: new Date().toISOString()
        }));

        navigate('/thank-you');
    };

    const renderStep = () => {
        switch (step) {
            case 0: return <PrivacyConsent onAccept={nextStep} />;
            case 1: return <ContactInfo data={data} updateData={updateData} onNext={nextStep} />;
            case 2: return <SectionA data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
            case 3:
                return data.gender === 'male'
                    ? <SectionB data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
                    : <SectionC data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
            case 4: return <SectionD data={data} updateData={updateData} onSubmit={submitAssessment} onPrev={prevStep} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header Information */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                    >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Secure Health Screening</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-black text-[var(--color-foreground)] mb-4 tracking-tight">Risk Assessment Portal</h1>
                    <p className="text-[var(--color-muted)] font-medium max-w-lg mx-auto">
                        Please provide accurate data to ensure clinical benchmark precision. Your information is end-to-end encrypted.
                    </p>
                </div>

                {/* Progress Tracking */}
                <AnimatePresence>
                    {step > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-10 px-8 py-6 bg-[var(--color-card)] rounded-[2rem] border border-[var(--border-color)] shadow-sm overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-500 rounded-lg text-white shadow-lg shadow-blue-500/20">
                                        <ClipboardList className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-muted)]">Assessment Progress</p>
                                        <p className="text-sm font-bold text-[var(--color-foreground)]">Section {step} of 4</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-[var(--color-primary)]">
                                        {Math.round((step / 4) * 100)}%
                                    </span>
                                </div>
                            </div>
                            <ProgressBar currentStep={step} totalSteps={4} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Container */}
                <div className="bg-[var(--color-card)] border border-[var(--border-color)] shadow-xl shadow-black/5 overflow-hidden rounded-[2.5rem]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 py-8 sm:p-12"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Badges */}
                <div className="mt-10 flex justify-center items-center space-x-8 opacity-40">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest">
                        <Activity className="w-4 h-4" />
                        <span>Clinical Compliance</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        <span>HIPAA Standards</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskAssessment;
