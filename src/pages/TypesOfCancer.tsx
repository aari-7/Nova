import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Activity, Dna, Droplets, Bone, UserCheck } from 'lucide-react';

const CANCER_TYPES = [
    {
        title: 'Carcinomas',
        icon: Microscope,
        description: 'The most common type of cancer, originating in epithelial cells that cover the body\'s internal and external surfaces.',
        subtypes: ['Adenocarcinoma', 'Basal Cell Carcinoma', 'Squamous Cell Carcinoma'],
        color: 'blue'
    },
    {
        title: 'Sarcomas',
        icon: Bone,
        description: 'Malignancies that form in bone and soft tissues, including muscle, fat, blood vessels, and fibrous tissue.',
        subtypes: ['Osteosarcoma', 'Liposarcoma', 'Leiomyosarcoma'],
        color: 'indigo'
    },
    {
        title: 'Leukemias',
        icon: Droplets,
        description: 'Cancers that begin in the blood-forming tissue of the bone marrow, affecting the production of white blood cells.',
        subtypes: ['Acute Myeloid (AML)', 'Chronic Lymphocytic (CLL)'],
        color: 'red'
    },
    {
        title: 'Lymphomas',
        icon: Activity,
        description: 'Cancer that begins in the cells of the immune system, specifically the lymphatic system.',
        subtypes: ['Hodgkin Lymphoma', 'Non-Hodgkin Lymphoma'],
        color: 'purple'
    },
    {
        title: 'Melanomas',
        icon: UserCheck,
        description: 'A serious type of skin cancer that begins in cells called melanocytes, which produce pigment.',
        subtypes: ['Superficial Spreading', 'Nodular Melanoma'],
        color: 'orange'
    },
    {
        title: 'Germ Cell Tumors',
        icon: Dna,
        description: 'Cancers that begin in cells that give rise to sperm or eggs, occurring anywhere in the body.',
        subtypes: ['Teratoma', 'Seminoma', 'Dysgerminoma'],
        color: 'green'
    }
];

const TypesOfCancer = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-[var(--color-background)] px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[var(--color-foreground)] mb-6 tracking-tight"
                    >
                        Cancer <span className="text-[var(--color-primary)]">Classifications</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto font-medium"
                    >
                        Cancer is a group of over 100 related diseases. Understanding the specific classification is critical for determining effective clinical protocols.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CANCER_TYPES.map((type, index) => (
                        <motion.div
                            key={type.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-[var(--color-card)] rounded-[2.5rem] border border-[var(--border-color)] p-8 hover:shadow-2xl hover:shadow-black/5 transition-all relative overflow-hidden flex flex-col h-full"
                        >
                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-${type.color}-100 dark:bg-${type.color}-900/30 flex items-center justify-center text-${type.color}-600 dark:text-${type.color}-400 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <type.icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">{type.title}</h2>
                                <p className="text-[var(--color-muted)] font-medium mb-6 text-sm leading-relaxed">
                                    {type.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-[var(--border-color)]">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--color-muted)] mb-3">Key Variations</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {type.subtypes.map(sub => (
                                            <span key={sub} className="px-3 py-1 bg-[var(--color-background)] rounded-full text-[10px] font-bold text-[var(--color-muted)]">
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TypesOfCancer;

