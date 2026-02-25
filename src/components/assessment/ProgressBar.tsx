import React from 'react';

interface Props {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
    const progress = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100));

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[var(--color-muted)]">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-[var(--color-primary)]">
                    {Math.round(progress)}% Complete
                </span>
            </div>
            <div className="w-full bg-blue-50 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};
