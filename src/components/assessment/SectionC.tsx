import React from 'react';
import { AssessmentData } from '../../types/assessment';
import { QuestionRadio } from './QuestionRadio';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
    data: AssessmentData;
    updateData: (data: Partial<AssessmentData>) => void;
    onNext: () => void;
    onPrev: () => void;
}

export const SectionC: React.FC<Props> = ({ data, updateData, onNext, onPrev }) => {
    const isComplete =
        data.breastOvarianRelative !== undefined && data.breastOvarianRelative !== null &&
        data.breastLumps !== undefined && data.breastLumps !== null &&
        data.papSmearWithin3Years !== undefined && data.papSmearWithin3Years !== '' &&
        data.abnormalBleeding !== undefined && data.abnormalBleeding !== null;

    return (
        <div className="space-y-8 px-2 sm:px-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Women's Health Factors (Section C)</h2>
                <p className="text-[var(--color-muted)]">These questions apply specifically to female risk factors.</p>
            </div>

            <div className="space-y-6">
                <QuestionRadio id="q26" question="Does your mother, sister, or daughter have a history of breast or ovarian cancer?" value={data.breastOvarianRelative ?? null} onChange={(val) => updateData({ breastOvarianRelative: val })} />
                <QuestionRadio id="q27" question="Have you noticed any breast lumps, skin dimpling, or nipple changes/discharge?" value={data.breastLumps ?? null} onChange={(val) => updateData({ breastLumps: val })} />

                <div className="p-5 bg-[var(--color-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
                    <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-4">Have you had a Pap smear or HPV test within the last 3 years?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['yes', 'no', 'not sure'].map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => updateData({ papSmearWithin3Years: option as any })}
                                className={`py-3 px-4 rounded-xl border-2 transition-all capitalize ${data.papSmearWithin3Years === option
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold'
                                    : 'border-[var(--border-color)] text-[var(--color-muted)] hover:bg-[var(--color-background)]'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <QuestionRadio id="q29" question="Have you experienced abnormal vaginal bleeding or pelvic pain?" value={data.abnormalBleeding ?? null} onChange={(val) => updateData({ abnormalBleeding: val })} />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 text-sm">
                <button type="button" onClick={onPrev} className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--color-card)] transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back</span>
                </button>
                <button type="button" onClick={onNext} disabled={!isComplete} className="flex items-center justify-center space-x-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};
