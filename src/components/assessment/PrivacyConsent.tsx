import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PrivacyConsentProps {
    onAccept: () => void;
}

export const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onAccept }) => {
    const [hasConsented, setHasConsented] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in text-[var(--color-foreground)] px-2 sm:px-0">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                    <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl font-bold font-plus-jakarta text-blue-900 mb-4">Privacy Policy & Consent</h2>
                <p className="text-[var(--color-muted)] max-w-2xl mx-auto mb-8">
                    Before beginning your risk assessment, please review our privacy policy and provide your consent to proceed.
                </p>
            </div>

            <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm">

                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-blue-50">
                    <FileText className="text-[var(--color-primary)] w-6 h-6" />
                    <h3 className="text-xl font-bold font-plus-jakarta text-blue-900">Privacy Policy for Nova PreScreen</h3>
                </div>

                <div className="space-y-4 text-sm text-[var(--color-muted)] h-72 overflow-y-auto pr-4 custom-scrollbar mb-8">
                    <p>1. Nova PreScreen is committed to protecting the privacy, confidentiality, and security of patient information collected through our AI-enabled health pre-screening platform. This Privacy Policy explains how we collect, use, process, store, and safeguard personal and medical information when individuals use our screening tools, digital forms, assessments, or integrated healthcare services.</p>
                    <p>2. Nova PreScreen collects personal information such as name, age, gender, contact details, and relevant identification information where necessary. We also collect health-related data including symptoms, medical history, risk factors, lifestyle inputs, uploaded reports, and responses to screening questionnaires. In certain cases, device and technical data such as IP address, browser type, and session data may be collected to maintain system functionality and security.</p>
                    <p>3. The primary purpose of collecting this information is to provide AI-assisted health risk screening, generate preliminary assessments, and support healthcare professionals in early detection and triage. Nova PreScreen does not replace licensed medical practitioners. All screening outputs are intended to assist, not substitute, professional medical judgment.</p>
                    <p>4. Patient data may be used to generate risk scores, flag potential health concerns, and improve screening accuracy. Where feasible, anonymized or de-identified data may be used to refine algorithms, improve model performance, enhance user experience, and strengthen system reliability. Identifiable medical data is not used for commercial sale or marketing to third parties.</p>
                    <p>5. Nova PreScreen may share relevant patient information with authorized healthcare providers, hospitals, clinics, or diagnostic partners only when necessary for patient care, referral, or follow-up. We may also share limited data with trusted service providers such as secure cloud hosting partners or IT vendors who support platform operations. All such parties are bound by strict confidentiality and data protection obligations.</p>
                    <p>6. We implement robust technical and organizational safeguards to protect patient data. These include encrypted data transmission, secure server infrastructure, access controls based on role authorization, password protection, audit logs, and periodic security assessments. Access to identifiable patient information is restricted to authorized personnel who require it for legitimate operational purposes.</p>
                    <p>7. Nova PreScreen retains patient data only for as long as necessary to fulfill screening, healthcare coordination, legal, and regulatory requirements. Retention periods are determined based on applicable healthcare standards and statutory obligations. Upon expiry of retention requirements, data is securely deleted or irreversibly anonymized.</p>
                    <p>8. Users have the right to request access to their data, seek correction of inaccurate information, withdraw consent where processing is consent-based, and request deletion of data subject to legal limitations. Requests may require identity verification to ensure patient safety and prevent unauthorized access.</p>
                    <p>9. In the event of a data breach that poses a risk to patient information, Nova PreScreen will promptly investigate the incident, take remedial measures, and notify affected individuals and relevant authorities as required under applicable law. We maintain internal protocols for incident response and risk mitigation.</p>
                </div>

                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-blue-50">
                    <ShieldCheck className="text-[var(--color-primary)] w-6 h-6" />
                    <h3 className="text-xl font-bold font-plus-jakarta text-blue-900">Patient Consent Form</h3>
                </div>

                <div className="space-y-4 text-sm text-[var(--color-muted)] h-72 overflow-y-auto pr-4 custom-scrollbar mb-8">
                    <p>1. I confirm that I have read and understood the Privacy Policy of Nova PreScreen. I acknowledge that the Policy explains how my personal information, health data, and related details will be collected, processed, stored, used, and protected. I understand that it is my responsibility to review the Privacy Policy before proceeding with the use of the platform.</p>
                    <p>2. I voluntarily consent to the collection of my personal information, including but not limited to my name, age, gender, contact details, medical history, symptoms, uploaded medical reports, and responses to screening questionnaires. I understand that this information is necessary for the functioning of the AI-assisted pre-screening services.</p>
                    <p>3. I understand that Nova PreScreen provides AI-enabled health screening and risk assessment tools intended to assist in early detection and triage. I acknowledge that the platform does not provide a final medical diagnosis and does not replace consultation with a licensed medical practitioner.</p>
                    <p>4. I acknowledge that screening outputs generated by the system are based on the information I provide. I understand that incomplete, inaccurate, or misleading information may affect the reliability of the screening results, and I accept responsibility for the accuracy of the data I submit.</p>
                    <p>5. I consent to the use of my information for the purposes of generating screening results, improving system accuracy, maintaining records, and supporting healthcare coordination. I understand that anonymized or de-identified data may be used for research, analytics, and system enhancement, without revealing my identity.</p>
                    <p>6. I consent to the sharing of relevant information with authorized healthcare providers, clinics, hospitals, or diagnostic partners when necessary for referral, follow-up, or medical evaluation. I understand that certain trusted technology and cloud service providers may process data strictly for operational and security purposes under confidentiality obligations.</p>
                    <p>7. I understand that Nova PreScreen implements reasonable administrative, technical, and organizational safeguards to protect my data. While strong security measures are in place, I acknowledge that no digital system can guarantee absolute protection against all potential risks.</p>
                    <p>8. I understand that I may have the right to request access to my information, request corrections to inaccurate data, withdraw consent where legally permissible, or request deletion of my data subject to applicable legal and regulatory requirements. I understand that identity verification may be required before such requests are processed.</p>
                    <p>9. By signing this form or selecting the "I Agree" option electronically, I confirm that I have read and understood this Consent Form, that I voluntarily agree to the terms stated above, and that I consent to the collection and processing of my data by Nova PreScreen as described herein.</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start space-x-4">
                    <div className="pt-1">
                        <input
                            type="checkbox"
                            id="consent-checkbox"
                            checked={hasConsented}
                            onChange={(e) => setHasConsented(e.target.checked)}
                            className="w-6 h-6 rounded border-blue-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] transition-colors cursor-pointer"
                        />
                    </div>
                    <label htmlFor="consent-checkbox" className="text-sm font-medium text-blue-900 cursor-pointer select-none leading-relaxed">
                        I confirm that I have read and understood the Privacy Policy and Consent Form. I acknowledge that I am proceeding voluntarily, and I explicitly grant Nova PreScreen permission to process my assessment data in accordance with these terms.
                    </label>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={onAccept}
                    disabled={!hasConsented}
                    className={cn(
                        "flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300",
                        hasConsented
                            ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 hover:scale-105 shadow-md shadow-blue-500/20"
                            : "bg-blue-100 text-blue-400 cursor-not-allowed border border-blue-200"
                    )}
                >
                    <span>Proceed to Assessment</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                </button>
            </div>

        </div>
    );
};
