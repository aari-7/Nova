import React from 'react';
import { AssessmentData } from '../../types/assessment';
import { QuestionRadio } from './QuestionRadio';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
    data: AssessmentData;
    updateData: (data: Partial<AssessmentData>) => void;
    onSubmit: () => void;
    onPrev: () => void;
}

export const SectionD: React.FC<Props> = ({ data, updateData, onSubmit, onPrev }) => {
    // Determine which conditional questions need to be asked
    const needsSmokerQs = data.tobaccoUse === true;
    const needsOccupationalQs = data.occupationalExposure === true;
    const needsFamilyQs =
        data.firstDegreeRelative === true ||
        data.prostateCancerRelative === true ||
        data.breastOvarianRelative === true;

    const noFollowUpsNeeded = !needsSmokerQs && !needsOccupationalQs && !needsFamilyQs;

    // Validation logic
    const smokerComplete = !needsSmokerQs || (data.packYears !== undefined);
    const occupationalComplete = !needsOccupationalQs || (
        data.asbestosSilicaExposure !== null && data.asbestosSilicaExposure !== undefined &&
        data.chemicalDieselExposure !== null && data.chemicalDieselExposure !== undefined &&
        data.ionizingRadiation !== null && data.ionizingRadiation !== undefined
    );
    const familyComplete = !needsFamilyQs || (
        data.earlyOnsetRelative !== null && data.earlyOnsetRelative !== undefined &&
        data.multipleRelatives !== null && data.multipleRelatives !== undefined
    );

    const isComplete = noFollowUpsNeeded || (smokerComplete && occupationalComplete && familyComplete);

    // If no follow-ups are needed, we still show a screen to let them know they are done
    return (
        <div className="space-y-8 px-2 sm:px-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Final Follow-Up Questions</h2>
                <p className="text-[var(--color-muted)]">
                    {noFollowUpsNeeded
                        ? "Based on your answers, we have all the info we need. Please proceed to see your results."
                        : "Based on some of your answers, we have a few specific follow-up questions to refine your risk assessment."}
                </p>
            </div>

            <div className="space-y-8">
                {needsSmokerQs && (
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30 space-y-4">
                        <h3 className="font-bold text-orange-800 dark:text-orange-200">Tobacco Use Follow-up</h3>
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-3">
                                Estimate your "pack-years" (Packs per day × Years smoked):
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { label: "Less than 10", val: 1 },
                                    { label: "10 to 20", val: 2 },
                                    { label: "More than 20", val: 3 }
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        type="button"
                                        onClick={() => updateData({ packYears: opt.val })}
                                        className={`py-3 px-4 rounded-xl border-2 transition-all ${data.packYears === opt.val
                                            ? 'border-[var(--color-primary)] bg-[var(--color-card)] text-[var(--color-primary)] font-semibold shadow-sm'
                                            : 'border-[var(--border-color)] text-[var(--color-muted)] hover:bg-[var(--color-background)]'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {needsOccupationalQs && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-6">
                        <h3 className="font-bold text-blue-800 dark:text-blue-200">Occupational Exposure Follow-up</h3>
                        <QuestionRadio
                            id="q31"
                            question="Were you exposed to asbestos or crystalline silica?"
                            value={data.asbestosSilicaExposure ?? null}
                            onChange={(val) => updateData({ asbestosSilicaExposure: val })}
                        />
                        <QuestionRadio
                            id="q32"
                            question="Were you exposed to industrial chemicals, solvents, or diesel exhaust?"
                            value={data.chemicalDieselExposure ?? null}
                            onChange={(val) => updateData({ chemicalDieselExposure: val })}
                        />
                        <QuestionRadio
                            id="q33"
                            question="Were you exposed to occupational ionizing radiation?"
                            value={data.ionizingRadiation ?? null}
                            onChange={(val) => updateData({ ionizingRadiation: val })}
                        />
                    </div>
                )}

                {needsFamilyQs && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/30 space-y-6">
                        <h3 className="font-bold text-green-800 dark:text-green-200">Family History Follow-up</h3>
                        <QuestionRadio
                            id="q34"
                            question="Was any relative diagnosed before age 50?"
                            value={data.earlyOnsetRelative ?? null}
                            onChange={(val) => updateData({ earlyOnsetRelative: val })}
                        />
                        <QuestionRadio
                            id="q35"
                            question="Do you have multiple relatives on the same side of the family with cancer?"
                            value={data.multipleRelatives ?? null}
                            onChange={(val) => updateData({ multipleRelatives: val })}
                        />
                    </div>
                )}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 text-sm">
                <button type="button" onClick={onPrev} className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--color-card)] transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back</span>
                </button>
                <button type="button" onClick={onSubmit} disabled={!isComplete} className="flex items-center justify-center space-x-2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-md shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    <span>Submit Assessment</span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};
