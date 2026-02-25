import React from 'react';
import { AssessmentData } from '../../types/assessment';
import { ArrowRight, Info } from 'lucide-react';

interface Props {
    data: AssessmentData;
    updateData: (data: Partial<AssessmentData>) => void;
    onNext: () => void;
}

export const ContactInfo: React.FC<Props> = ({ data, updateData, onNext }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    const isComplete = data.fullName.trim() !== '' && data.phone.trim() !== '' && data.gender !== '';

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-2 sm:px-0">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start space-x-3 mb-8 border border-blue-100 dark:border-blue-900/30">
                <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    <strong className="text-[var(--color-foreground)]">Privacy Notice:</strong> Your information is handled securely and is used solely to generate your risk assessment report. We do not sell your personal data.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        required
                        value={data.fullName}
                        onChange={(e) => updateData({ fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                        placeholder="John Doe"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            required
                            value={data.phone}
                            onChange={(e) => updateData({ phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-1">
                            Email Address (Optional)
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => updateData({ email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                        Biological Sex (For Assessment Accuracy) *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => updateData({ gender: 'male' })}
                            className={`p-4 rounded-xl border-2 transition-all flex justify-center items-center ${data.gender === 'male'
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold'
                                : 'border-[var(--border-color)] text-[var(--color-muted)] hover:border-[var(--color-primary)]'
                                }`}
                        >
                            Male
                        </button>
                        <button
                            type="button"
                            onClick={() => updateData({ gender: 'female' })}
                            className={`p-4 rounded-xl border-2 transition-all flex justify-center items-center ${data.gender === 'female'
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold'
                                : 'border-[var(--border-color)] text-[var(--color-muted)] hover:border-[var(--color-primary)]'
                                }`}
                        >
                            Female
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={!isComplete}
                    className="flex items-center space-x-2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
};
