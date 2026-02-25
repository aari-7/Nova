export interface AssessmentData {
    // Contact Info
    fullName: string;
    phone: string;
    email: string;
    gender: 'male' | 'female' | '';

    // Section A: General (Boolean traits mapped to Yes/No natively, storing as boolean)
    age50Plus: boolean | null;
    firstDegreeRelative: boolean | null;
    personalHistory: boolean | null;
    tobaccoUse: boolean | null;
    secondhandSmoke: boolean | null;
    alcoholAboveModerate: boolean | null;
    bmi25Plus: boolean | null;
    exerciseUnder150: boolean | null;
    sunburnTanning: boolean | null;
    occupationalExposure: boolean | null;
    unexplainedWeightLoss: boolean | null;
    persistentCough: boolean | null;
    unusualBleeding: boolean | null;
    persistentLump: boolean | null;
    multipleCTScans: boolean | null;
    highProcessedMeat: boolean | null;
    changingMoles: boolean | null;
    persistentHeartburn: boolean | null;
    immunosuppressed: boolean | null;
    chronicHepatitis: boolean | null;
    radonExposure: boolean | null;

    // Section B: Men Only
    prostateCancerRelative?: boolean | null;
    urinarySymptoms?: boolean | null;
    testicularLump?: boolean | null;
    undescendedTesticle?: boolean | null;

    // Section C: Women Only
    breastOvarianRelative?: boolean | null;
    breastLumps?: boolean | null;
    papSmearWithin3Years?: 'yes' | 'no' | 'not sure' | '';
    abnormalBleeding?: boolean | null;

    // Section D: Conditional
    packYears?: number; // 0 for none, 1-3 for ranges
    asbestosSilicaExposure?: boolean | null;
    chemicalDieselExposure?: boolean | null;
    ionizingRadiation?: boolean | null;
    earlyOnsetRelative?: boolean | null;
    multipleRelatives?: boolean | null;
}

export interface PatientSubmission {
    id: string;
    name: string;
    phone: string;
    gender: 'male' | 'female' | '';
    score: number;
    risk: 'Low' | 'Moderate' | 'High';
    date: string;
    rawAnswers: AssessmentData;
}

export const initialAssessmentData: AssessmentData = {
    fullName: '',
    phone: '',
    email: '',
    gender: '',

    age50Plus: null,
    firstDegreeRelative: null,
    personalHistory: null,
    tobaccoUse: null,
    secondhandSmoke: null,
    alcoholAboveModerate: null,
    bmi25Plus: null,
    exerciseUnder150: null,
    sunburnTanning: null,
    occupationalExposure: null,
    unexplainedWeightLoss: null,
    persistentCough: null,
    unusualBleeding: null,
    persistentLump: null,
    multipleCTScans: null,
    highProcessedMeat: null,
    changingMoles: null,
    persistentHeartburn: null,
    immunosuppressed: null,
    chronicHepatitis: null,
    radonExposure: null,
};
