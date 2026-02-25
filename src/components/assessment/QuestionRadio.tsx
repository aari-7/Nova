import React from 'react';

interface Props {
    id: string;
    question: string;
    description?: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
}

export const QuestionRadio: React.FC<Props> = ({ id, question, description, value, onChange }) => {
    return (
        <div className="p-5 bg-[var(--color-card)] border border-[var(--border-color)] rounded-2xl shadow-sm hover:border-[var(--color-primary)] transition-colors">
            <div className="mb-4">
                <h3 className="text-lg font-medium text-[var(--color-foreground)]">{question}</h3>
                {description && (
                    <p className="text-sm text-[var(--color-muted)] mt-1">{description}</p>
                )}
            </div>

            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={() => onChange(true)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${value === true
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold'
                        : 'border-[var(--border-color)] text-[var(--color-muted)] hover:bg-[var(--color-background)]'
                        }`}
                >
                    Yes
                </button>
                <button
                    type="button"
                    onClick={() => onChange(false)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${value === false
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold'
                        : 'border-[var(--border-color)] text-[var(--color-muted)] hover:bg-[var(--color-background)]'
                        }`}
                >
                    No
                </button>
            </div>
        </div>
    );
};
