import { AssessmentData } from '../types/assessment';

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface AssessmentResult {
    score: number;
    riskLevel: RiskLevel;
}

export const calculateScore = (data: AssessmentData): AssessmentResult => {
    let score = 0;

    // Section A
    if (data.age50Plus) score += 2;
    if (data.firstDegreeRelative) score += 3;
    if (data.personalHistory) score += 3;
    if (data.tobaccoUse) score += 3;
    if (data.secondhandSmoke) score += 1;
    if (data.alcoholAboveModerate) score += 1;
    if (data.bmi25Plus) score += 2;
    if (data.exerciseUnder150) score += 1;
    if (data.sunburnTanning) score += 2;
    if (data.occupationalExposure) score += 2;
    if (data.unexplainedWeightLoss) score += 2;
    if (data.persistentCough) score += 1;
    if (data.unusualBleeding) score += 2;
    if (data.persistentLump) score += 2;
    if (data.multipleCTScans) score += 1;
    if (data.highProcessedMeat) score += 1;
    if (data.changingMoles) score += 1;
    if (data.persistentHeartburn) score += 1;
    if (data.immunosuppressed) score += 2;
    if (data.chronicHepatitis) score += 2;
    if (data.radonExposure) score += 1;

    // Section B
    if (data.gender === 'male') {
        if (data.prostateCancerRelative) score += 3;
        if (data.urinarySymptoms) score += 1;
        if (data.testicularLump) score += 2;
        if (data.undescendedTesticle) score += 2;
    }

    // Section C
    if (data.gender === 'female') {
        if (data.breastOvarianRelative) score += 3;
        if (data.breastLumps) score += 2;
        if (data.papSmearWithin3Years === 'no') score += 2;
        // Note requirement: Pap smear within 3 years (0/2pts)
        if (data.abnormalBleeding) score += 2;
    }

    // Section D
    if (data.tobaccoUse && data.packYears) {
        score += data.packYears; // 1-3 pts
    }

    if (data.occupationalExposure) {
        if (data.asbestosSilicaExposure) score += 3;
        if (data.chemicalDieselExposure) score += 2;
        if (data.ionizingRadiation) score += 2;
    }

    if (data.firstDegreeRelative || data.prostateCancerRelative || data.breastOvarianRelative) {
        if (data.earlyOnsetRelative) score += 1;
        if (data.multipleRelatives) score += 1;
    }

    // Determine Level
    let riskLevel: RiskLevel = 'Low';
    if (score >= 25) {
        riskLevel = 'High';
    } else if (score >= 13) {
        riskLevel = 'Moderate';
    } // 0-12 is Low

    return { score, riskLevel };
};
