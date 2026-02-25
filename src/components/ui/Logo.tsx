import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <div className="relative">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-primary)] drop-shadow-sm"
                >
                    <path
                        d="M12 2L4 5V11C4 16.03 7.41 20.72 12 22C16.59 20.72 20 16.03 20 11V5L12 2Z"
                        className="fill-[var(--color-primary)] opacity-10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 11V16M9 13.5H15M12 7H12.01"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="absolute inset-0 bg-[var(--color-primary)] blur-lg opacity-20 -z-10 animate-pulse"></div>
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-plus-jakarta font-black text-xl tracking-tighter text-[var(--color-foreground)]">
                    NOVA<span className="text-[var(--color-primary)]">.</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-black text-[var(--color-muted)] mt-1 opacity-70">
                    PreScreen
                </span>
            </div>
        </div>
    );
};
