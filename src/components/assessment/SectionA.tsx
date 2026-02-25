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

export const SectionA: React.FC<Props> = ({ data, updateData, onNext, onPrev }) => {
    const isComplete =
        data.age50Plus !== null &&
        data.firstDegreeRelative !== null &&
        data.personalHistory !== null &&
        data.tobaccoUse !== null &&
        data.secondhandSmoke !== null &&
        data.alcoholAboveModerate !== null &&
        data.bmi25Plus !== null &&
        data.exerciseUnder150 !== null &&
        data.sunburnTanning !== null &&
        data.occupationalExposure !== null &&
        data.unexplainedWeightLoss !== null &&
        data.persistentCough !== null &&
        data.unusualBleeding !== null &&
        data.persistentLump !== null &&
        data.multipleCTScans !== null &&
        data.highProcessedMeat !== null &&
        data.changingMoles !== null &&
        data.persistentHeartburn !== null &&
        data.immunosuppressed !== null &&
        data.chronicHepatitis !== null &&
        data.radonExposure !== null;

    return (
        <div className="space-y-8 px-2 sm:px-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">General Risk Factors (Section A)</h2>
                <p className="text-[var(--color-muted)]">Please answer these 21 general health questions. All are required.</p>
            </div>

            <div className="space-y-6">
                <QuestionRadio id="q1" question="Are you 50 years of age or older?" value={data.age50Plus} onChange={(val) => updateData({ age50Plus: val })} />
                <QuestionRadio id="q2" question="Do you have any first-degree relatives with cancer?" value={data.firstDegreeRelative} onChange={(val) => updateData({ firstDegreeRelative: val })} />
                <QuestionRadio id="q3" question="Do you have a personal history of cancer or pre-cancerous lesions?" value={data.personalHistory} onChange={(val) => updateData({ personalHistory: val })} />
                <QuestionRadio id="q4" question="Do you currently use tobacco products or have you used them in the past?" value={data.tobaccoUse} onChange={(val) => updateData({ tobaccoUse: val })} />
                <QuestionRadio id="q5" question="Are you frequently exposed to secondhand smoke?" value={data.secondhandSmoke} onChange={(val) => updateData({ secondhandSmoke: val })} />
                <QuestionRadio id="q6" question="Do you consume alcohol above moderate levels?" description="More than 1 drink/day for women, 2 drinks/day for men." value={data.alcoholAboveModerate} onChange={(val) => updateData({ alcoholAboveModerate: val })} />
                <QuestionRadio id="q7" question="Is your Body Mass Index (BMI) 25 or higher?" value={data.bmi25Plus} onChange={(val) => updateData({ bmi25Plus: val })} />

                <QuestionRadio id="q8" question="Do you exercise LESS than 150 minutes per week?" value={data.exerciseUnder150} onChange={(val) => updateData({ exerciseUnder150: val })} />
                <QuestionRadio id="q9" question="Do you have frequent sunburns or use tanning beds?" value={data.sunburnTanning} onChange={(val) => updateData({ sunburnTanning: val })} />
                <QuestionRadio id="q10" question="Have you had occupational exposure to known carcinogens?" description="Such as asbestos, silica, radon, heavy metals, or chemical fumes." value={data.occupationalExposure} onChange={(val) => updateData({ occupationalExposure: val })} />
                <QuestionRadio id="q11" question="Have you experienced unexplained weight loss of 10+ lbs?" value={data.unexplainedWeightLoss} onChange={(val) => updateData({ unexplainedWeightLoss: val })} />
                <QuestionRadio id="q12" question="Do you have a persistent cough or have you been coughing blood?" value={data.persistentCough} onChange={(val) => updateData({ persistentCough: val })} />
                <QuestionRadio id="q13" question="Have you experienced unusual bleeding or bruising?" value={data.unusualBleeding} onChange={(val) => updateData({ unusualBleeding: val })} />
                <QuestionRadio id="q14" question="Have you noticed a new persistent lump or mass?" value={data.persistentLump} onChange={(val) => updateData({ persistentLump: val })} />

                <QuestionRadio id="q15" question="Have you had multiple CT scans or prior radiation therapy?" value={data.multipleCTScans} onChange={(val) => updateData({ multipleCTScans: val })} />
                <QuestionRadio id="q16" question="Do you have a diet high in processed or red meat?" value={data.highProcessedMeat} onChange={(val) => updateData({ highProcessedMeat: val })} />
                <QuestionRadio id="q17" question="Do you have changing moles or skin lesions?" value={data.changingMoles} onChange={(val) => updateData({ changingMoles: val })} />
                <QuestionRadio id="q18" question="Do you suffer from persistent heartburn or difficulty swallowing?" value={data.persistentHeartburn} onChange={(val) => updateData({ persistentHeartburn: val })} />
                <QuestionRadio id="q19" question="Are you immunocompromised or taking immunosuppressants?" value={data.immunosuppressed} onChange={(val) => updateData({ immunosuppressed: val })} />
                <QuestionRadio id="q20" question="Do you have chronic Hepatitis B or C?" value={data.chronicHepatitis} onChange={(val) => updateData({ chronicHepatitis: val })} />
                <QuestionRadio id="q21" question="Have you been exposed to excessive radon or nuclear energy?" value={data.radonExposure} onChange={(val) => updateData({ radonExposure: val })} />
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
