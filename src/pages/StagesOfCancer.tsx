import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, Target, ShieldAlert, ChevronRight, Info } from 'lucide-react';

const STAGES = [
    {
        id: '0',
        title: 'Stage 0',
        subtitle: 'Carcinoma in Situ',
        description: 'Abnormal cells are identified but remain confined to their original location. They have not invaded neighboring tissue.',
        risk: 'Pre-Cancerous',
        color: 'blue',
        icon: ShieldAlert
    },
    {
        id: 'I',
        title: 'Stage I & II',
        subtitle: 'Localized Growth',
        description: 'Cancer is localized to the primary organ. Stage I indicates a smaller tumor, while Stage II reflects a more developed presence without significant spread.',
        risk: 'Early Stage',
        color: 'green',
        icon: Target
    },
    {
        id: 'III',
        title: 'Stage III',
        subtitle: 'Regional Spread',
        description: 'Malignancy has progressed to surrounding tissues and potentially the local lymphatic system.',
        risk: 'Regional',
        color: 'orange',
        icon: Layers
    },
    {
        id: 'IV',
        title: 'Stage IV',
        subtitle: 'Metastatic Disease',
        description: 'Primary cancer has spread to distant organs and systems through the bloodstream or lymphatic network.',
        risk: 'Advanced',
        color: 'red',
        icon: Activity
    }
];

const TNM_SYSTEM = [
    { key: 'T', name: 'Tumor', detail: 'The scale and penetration depth of the primary mass.' },
    { key: 'N', name: 'Node', detail: 'Involvement of regional lymph node clusters.' },
    { key: 'M', name: 'Metastasis', detail: 'Evidence of systemic spread to secondary organs.' }
];

const StagesOfCancer = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--color-background)] px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Info className="w-4 h-4" />
                        <span>Clinical Framework</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[var(--color-foreground)] mb-6 tracking-tight"
                    >
                        Cancer <span className="text-[var(--color-primary)]">Staging</span> Protocols
                    </motion.h1>
                    <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto font-medium">
                        Standardized staging describes the progression of malignancy, providing the clinical foundation for treatment selection and prognosis.
                    </p>
                </div>

                <div className="relative mb-32">
                    {/* Progress Line */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-[var(--border-color)] -z-10"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {STAGES.map((stage, index) => (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative bg-[var(--color-card)] rounded-[2.5rem] p-8 border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                            >
                                <div className={`w-16 h-16 rounded-[1.5rem] bg-${stage.color}-500 flex items-center justify-center text-white shadow-xl shadow-${stage.color}-500/20 mb-8 absolute -top-8 left-8 lg:static lg:-top-0 lg:left-0`}>
                                    <stage.icon className="w-8 h-8" />
                                </div>

                                <div className="mt-6 lg:mt-0 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-black text-[var(--color-foreground)]">{stage.title}</h3>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4">{stage.subtitle}</p>
                                    <p className="text-[var(--color-muted)] text-sm font-medium leading-relaxed mb-6">
                                        {stage.description}
                                    </p>
                                    <div className="mt-auto pt-4">
                                        <div className={`inline-block px-3 py-1 rounded-full bg-${stage.color}-100 dark:bg-${stage.color}-900/30 text-${stage.color}-600 dark:text-${stage.color}-400 text-[10px] font-black uppercase tracking-wider`}>
                                            {stage.risk}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-[var(--color-card)] rounded-[3rem] p-8 md:p-12 border border-[var(--border-color)] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-3xl font-black text-[var(--color-foreground)] mb-6">The TNM Staging Standard</h3>
                            <p className="text-[var(--color-muted)] font-medium mb-8 leading-relaxed">
                                Developed by the AJCC and the UICC, the TNM system is the premier international standard for cancer documentation and surveillance.
                            </p>
                            <div className="grid gap-6">
                                {TNM_SYSTEM.map((item) => (
                                    <div key={item.key} className="flex items-start bg-[var(--color-background)] p-6 rounded-[2rem] border border-[var(--border-color)]">
                                        <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0 mr-6">
                                            {item.key}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[var(--color-foreground)] mb-1">{item.name}</h4>
                                            <p className="text-sm text-[var(--color-muted)] font-medium">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[3rem] p-12 border border-[var(--border-color)] flex items-center justify-center">
                                <Activity className="w-48 h-48 text-[var(--color-primary)] opacity-20 animate-pulse" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[var(--color-card)] p-8 rounded-[2rem] border border-[var(--border-color)] shadow-xl max-w-xs">
                                <p className="text-sm font-bold text-[var(--color-foreground)] mb-2 italic">"Precision at Every Step"</p>
                                <p className="text-xs text-[var(--color-muted)] font-medium leading-relaxed">Accurate staging is the most important factor in determine patient prognosis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StagesOfCancer;

