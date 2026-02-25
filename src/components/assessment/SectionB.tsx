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

export const SectionB: React.FC<Props> = ({ data, updateData, onNext, onPrev }) => {
    const isComplete =
        data.prostateCancerRelative !== undefined && data.prostateCancerRelative !== null &&
        data.urinarySymptoms !== undefined && data.urinarySymptoms !== null &&
        data.testicularLump !== undefined && data.testicularLump !== null &&
        data.undescendedTesticle !== undefined && data.undescendedTesticle !== null;

    return (
        <div className="space-y-8 px-2 sm:px-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Men's Health Factors (Section B)</h2>
                <p className="text-[var(--color-muted)]">These questions apply specifically to male risk factors.</p>
            </div>

            <div className="space-y-6">
                <QuestionRadio id="q22" question="Does your father or brother have a history of prostate cancer?" value={data.prostateCancerRelative ?? null} onChange={(val) => updateData({ prostateCancerRelative: val })} />
                <QuestionRadio id="q23" question="Do you experience frequent urination, difficulty starting urination, or blood in urine?" value={data.urinarySymptoms ?? null} onChange={(val) => updateData({ urinarySymptoms: val })} />
                <QuestionRadio id="q24" question="Have you noticed a testicular lump or swelling?" value={data.testicularLump ?? null} onChange={(val) => updateData({ testicularLump: val })} />
                <QuestionRadio id="q25" question="Did you have an undescended testicle during childhood?" value={data.undescendedTesticle ?? null} onChange={(val) => updateData({ undescendedTesticle: val })} />
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
