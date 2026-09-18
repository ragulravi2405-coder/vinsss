import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, BookOpen, Download, Phone, Mail, CheckCircle2, 
  Send, Sparkles, AlertCircle, FileText, Clock, MapPin, Building,
  Award, ShieldCheck, HelpCircle
} from 'lucide-react';
import { COLLEGE_INFO, DOCUMENTS_LIST, UG_COURSES_LIST, PG_COURSES_LIST, ELIGIBILITY_CRITERIA_DATA } from '../data/collegeData';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';
import { submitAdmissionForm } from '../services/api';
import { useAdminData } from '../context/AdminDataContext';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface AdmissionsPageProps {
  initialAnchor?: string;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ initialAnchor = 'eligibility-ug' }) => {
  const { documents } = useAdminData();
  const allDocs = documents && documents.length > 0 ? documents : DOCUMENTS_LIST;

  const [activeSection, setActiveSection] = useState(initialAnchor);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [formCategory, setFormCategory] = useState<'UG' | 'PG'>('UG');

  // Live Online Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    academicYear: '2027 - 2028',
    preferredCourse: 'be-cse',
    qualification: 'HSC',
    percentage: '',
    city: 'Nagercoil'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initialAnchor) {
      setActiveSection(initialAnchor);
      const element = document.getElementById(initialAnchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialAnchor]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitAdmissionForm({
        fullName: formData.fullName,
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        academicYear: formData.academicYear,
        category: formCategory,
        preferredCourse: formData.preferredCourse,
        qualification: formData.qualification,
        percentage: formData.percentage,
        city: formData.city,
      });
      if (result.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prospectusDoc = allDocs.find(d => d.id === 'doc-prospectus') || allDocs[0];
  const applicationDoc = allDocs.find(d => d.id === 'doc-application') || allDocs[1] || allDocs[0];
  const scholarshipDoc = allDocs.find(d => d.id === 'doc-scholarship') || allDocs[2] || allDocs[0];

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Admissions Hero Section */}
        <ScrollReveal direction="up" distance={24}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-14 lg:p-16 rounded-3xl border border-white/20 shadow-3d-deep relative overflow-hidden space-y-6">
            {/* Decorative depth orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E40AF]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#8B0000]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Badge Label: ADMISSIONS OPEN 2026-2027 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B0000] text-white font-bold text-xs tracking-wider uppercase shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
            <span>ADMISSIONS OPEN 2026-2027</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-poppins text-white tracking-tight leading-tight max-w-4xl">
            Begin Your Engineering Journey at VINS
          </h1>

          {/* Description Subtext */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-3xl leading-relaxed font-normal">
            Join a distinguished community where curious minds are empowered with cutting-edge skills, global recruitment access, and leadership values.
          </p>

          {/* Action Buttons & Helplines */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('online-form')}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-[#8B0000] hover:bg-[#5B0000] text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer border border-white/20"
            >
              APPLY ONLINE NOW
            </button>

            <button
              onClick={() => scrollTo('scholarships')}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-[#0A2540] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              SCHOLARSHIPS &amp; AID
            </button>
          </div>

          {/* Quick Helpline Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-white border-t border-white/20">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Phone className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Counseling Code: <strong className="text-[#8B0000]">4982</strong> | Admission Hotline: <strong>+91 9787747072 / +91 9787747071</strong></span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <div className="flex items-center gap-2 text-white font-semibold">
              <Mail className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>vinsengg@gmail.com</span>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sub-Nav Sidebar */}
          <div className="lg:col-span-3 sticky top-24 bg-white rounded-3xl border-2 border-[#0A2540]/15 p-4 shadow-md space-y-1.5">
            <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider block px-3 py-1">
              Admissions Directory
            </span>

            {[
              { id: 'eligibility-ug', label: '1. Eligibility Criteria - UG' },
              { id: 'eligibility-pg', label: '2. Eligibility Criteria - PG' },
              { id: 'programs', label: '3. Sanctioned Intake & Courses' },
              { id: 'prospectus', label: '4. College Prospectus (PDF)' },
              { id: 'online-form', label: '5. Online Application Form Live ★' },
              { id: 'helpline', label: '6. Admissions Office Helpline' },
              { id: 'scholarships', label: '7. Scholarship Schemes' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeSection === nav.id
                    ? 'bg-[#0A2540] text-white shadow-md'
                    : 'text-[#0A2540] hover:bg-[#1E40AF]/10 hover:text-[#1E40AF]'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-10">
            
            {/* Section 1: UG Eligibility Criteria */}
            <div id="eligibility-ug" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#0A2540]/15 pb-4">
                <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">As per Government Norms</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-poppins">UG Courses — Eligibility Criteria</h2>
                <p className="text-xs text-[#0A2540]/80 mt-1 font-medium">Qualified Examinations and Minimum Marks for Admission to B.E. Degree Courses</p>
              </div>

              {/* HSC Criteria Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#8B0000]" />
                  <span>1. HSC (10+2) Eligibility</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                  A pass in the HSC or its equivalent with a minimum average percentage in <strong>Mathematics, Physics and Chemistry</strong> put together as given below:
                </p>

                <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A2540] text-white font-bold">
                      <tr>
                        <th className="p-3.5 w-16 text-center">S.No.</th>
                        <th className="p-3.5">Community</th>
                        <th className="p-3.5">A pass with minimum average marks in Maths, Physics &amp; Chemistry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-bold">
                      {ELIGIBILITY_CRITERIA_DATA.ugHsc.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#0A2540]/5">
                          <td className="p-3.5 text-center font-black">{idx + 1}</td>
                          <td className="p-3.5 font-bold">{row.community}</td>
                          <td className="p-3.5 font-black text-[#0A2540] bg-[#0A2540]/5">{row.minMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Diploma Criteria Table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8B0000]" />
                  <span>2. Diploma Candidates (Direct 2nd Year Lateral Entry)</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                  Candidates who have passed <strong>10+3 Diploma</strong> (any stream) recognized by Central / State Governments can join directly in second year of Engineering.
                </p>

                <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A2540] text-white font-bold">
                      <tr>
                        <th className="p-3.5">Community Category</th>
                        <th className="p-3.5">Required Minimum Aggregate Marks in Diploma Semesters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-bold">
                      {ELIGIBILITY_CRITERIA_DATA.ugDiploma.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#0A2540]/5">
                          <td className="p-3.5 font-bold">{row.community}</td>
                          <td className="p-3.5 font-black text-[#0A2540]">{row.minMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 2: PG Eligibility Criteria */}
            <div id="eligibility-pg" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#0A2540]/15 pb-4">
                <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">As per Government Norms</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-poppins">PG Courses — Eligibility Criteria</h2>
                <p className="text-xs text-[#0A2540]/80 mt-1 font-medium">Eligibility Qualifications for admission to M.B.A. / M.E. degree programmes</p>
              </div>

              {/* MBA Criteria */}
              <div className="rounded-3xl border-2 border-[#1E40AF]/20 overflow-hidden shadow-lg">

                {/* Header strip — Deep Navy */}
                <div className="bg-[#0A2540] px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B0000] flex items-center justify-center shadow-md shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      MBA (Master of Business Administration)
                    </h3>
                    <p className="text-[11px] text-white/70 font-medium mt-0.5">PG Management Programme</p>
                  </div>
                </div>

                {/* Body — White background */}
                <div className="bg-white px-6 py-5 space-y-4">

                  {/* Description with highlighted percentages */}
                  <div className="bg-blue-50 border border-[#1E40AF]/20 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-[#0A2540] leading-relaxed font-medium">
                    A pass in a recognized Bachelor&apos;s degree of minimum 3 years duration with at least&nbsp;
                    <span className="inline-flex items-center gap-1 font-black text-[#8B0000]">
                      50% marks
                    </span>
                    &nbsp;
                    <span className="text-[#0A2540]/80">(</span>
                    <span className="font-black text-[#8B0000]">45%</span>
                    <span className="text-[#0A2540]/80"> for reserved categories)</span>
                    &nbsp;in the qualifying degree examination:
                  </div>

                  {/* Pattern Cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ELIGIBILITY_CRITERIA_DATA.mbaPatterns.map((pat, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-3 bg-white border-2 border-[#1E40AF]/15 hover:border-[#8B0000]/60 hover:bg-red-50/40 rounded-2xl px-4 py-3 transition-all duration-200 shadow-xs"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#8B0000] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </span>
                        <span className="text-xs font-semibold text-[#0A2540] leading-snug">{pat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer note */}
                  <div className="flex items-start gap-2 pt-1 text-[11px] text-[#1E40AF] font-semibold">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#1E40AF]/10 flex items-center justify-center shrink-0 text-[10px] font-black text-[#1E40AF]">i</span>
                    <span>Candidates must meet the minimum qualifying marks as mandated by Anna University / TANCET norms.</span>
                  </div>
                </div>
              </div>

              {/* M.E. Programs Criteria */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0A2540]">M.E. Degree Programmes Eligibility</h3>
                <p className="text-xs sm:text-sm text-[#0A2540]/90 font-medium">
                  Pass in a recognized Bachelor&apos;s degree or equivalent in the relevant field with at least <strong>50% marks</strong> (<strong>45%</strong> for reserved categories):
                </p>

                <div className="space-y-2.5">
                  {ELIGIBILITY_CRITERIA_DATA.mePrograms.map((me, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border-2 border-[#0A2540]/15 space-y-1 shadow-xs">
                      <p className="text-xs font-bold text-[#0A2540] text-sm">{me.program}</p>
                      <p className="text-xs text-[#0A2540]/80 font-medium"><strong>Qualifying Degree:</strong> {me.qualifyingDegree}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Programs Offered (Intake & Est Year) */}
            <div id="programs" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#0A2540]/15 pb-4">
                <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">Sanctioned Intake &amp; Details</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-poppins">Courses Offered</h2>
              </div>

              {/* UG Courses List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">Undergraduate (UG) Courses</h3>
                <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A2540] text-white font-bold">
                      <tr>
                        <th className="p-3.5 w-14 text-center">S.No</th>
                        <th className="p-3.5">Degree &amp; Branch</th>
                        <th className="p-3.5 text-center">Est. Year</th>
                        <th className="p-3.5 text-center">Sanctioned Intake</th>
                        <th className="p-3.5 text-center">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-bold">
                      {UG_COURSES_LIST.map((c, idx) => (
                        <tr key={c.id} className="hover:bg-[#0A2540]/5">
                          <td className="p-3.5 text-center font-black">{idx + 1}</td>
                          <td className="p-3.5 font-bold text-sm">{c.name}</td>
                          <td className="p-3.5 text-center">{c.establishmentYear}</td>
                          <td className="p-3.5 text-center font-black bg-[#0A2540]/5">{c.sanctionedIntake}</td>
                          <td className="p-3.5 text-center">{c.durationYears} Yrs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PG Courses List */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">Postgraduate (PG) Courses</h3>
                <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A2540] text-white font-bold">
                      <tr>
                        <th className="p-3.5 w-14 text-center">S.No</th>
                        <th className="p-3.5">Degree &amp; Branch</th>
                        <th className="p-3.5 text-center">Est. Year</th>
                        <th className="p-3.5 text-center">Sanctioned Intake</th>
                        <th className="p-3.5 text-center">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-bold">
                      {PG_COURSES_LIST.map((c, idx) => (
                        <tr key={c.id} className="hover:bg-[#0A2540]/5">
                          <td className="p-3.5 text-center font-black">{idx + 1}</td>
                          <td className="p-3.5 font-bold text-sm">{c.name}</td>
                          <td className="p-3.5 text-center">{c.establishmentYear}</td>
                          <td className="p-3.5 text-center font-black bg-[#0A2540]/5">{c.sanctionedIntake}</td>
                          <td className="p-3.5 text-center">{c.durationYears} Yrs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 4: Prospectus Downloads & Documents */}
            <div id="prospectus" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#0A2540]/15 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">Official Downloads</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-poppins">College Prospectus &amp; Application Forms</h2>
                </div>
                <span className="px-3.5 py-1 bg-[#8B0000] text-white font-bold text-xs rounded-full">PDF Download</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-[#0A2540]/20 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                      <BookOpen className="w-6 h-6 text-[#8B0000]" />
                    </div>
                    <h3 className="font-bold text-[#0A2540] text-lg font-poppins">College Official Prospectus</h3>
                    <p className="text-xs text-[#0A2540]/80 font-medium">
                      Detailed official prospectus detailing eligibility, campus infrastructure, hostel, bus routes, placement history, and fee structure.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(prospectusDoc)}
                    className="w-full py-3.5 bg-[#0A2540] hover:bg-[#1E40AF] text-white font-bold rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#8B0000]" />
                    View &amp; Download Prospectus (PDF)
                  </button>
                </div>

                <div className="bg-[#0A2540] text-white p-6 rounded-3xl border border-white/20 space-y-4 flex flex-col justify-between shadow-xl">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#0A2540] flex items-center justify-center font-bold shadow-md">
                      <FileText className="w-6 h-6 text-[#8B0000]" />
                    </div>
                    <h3 className="font-bold text-white text-lg font-poppins">Printable Application Form</h3>
                    <p className="text-xs text-white/90 font-medium">
                      Printable offline application form for B.E., M.E., and MBA courses for direct submission at the campus admission cell.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(applicationDoc)}
                    className="w-full py-3.5 bg-[#8B0000] hover:bg-[#5B0000] text-white font-bold rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-white/20"
                  >
                    <Download className="w-4 h-4 text-white" />
                    Download Application Form (PDF)
                  </button>
                </div>
              </div>
            </div>

            {/* Section 5: Live Online Admission Form (UG / PG) */}
            <div id="online-form" className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl space-y-6 scroll-mt-28">
              <div className="flex flex-wrap items-center justify-between border-b border-white/15 pb-4 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#8B0000] uppercase tracking-widest">Instant Seat Reservation</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-poppins">Online Application Form</h2>
                </div>

                {/* Form Switcher Buttons */}
                <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setFormCategory('UG')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formCategory === 'UG' ? 'bg-[#8B0000] text-white shadow-md' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    B.E. Online Form
                  </button>
                  <button
                    onClick={() => setFormCategory('PG')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formCategory === 'PG' ? 'bg-[#8B0000] text-white shadow-md' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    M.E. &amp; MBA Form
                  </button>
                </div>
              </div>

              {formSubmitted ? (
                <div className="bg-white text-[#0A2540] rounded-3xl p-8 text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 bg-[#8B0000] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2540] font-poppins">Application Received Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#0A2540]/90 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you, <strong>{formData.fullName}</strong>. Your online application for academic year <strong>{formData.academicYear}</strong> has been logged. Our VINS Admission Officer will reach out to you on <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => { setFormSubmitted(false); setSubmitError(null); }}
                    className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#5B0000] text-white font-bold rounded-full text-xs transition-all cursor-pointer shadow-md"
                  >
                    Submit Another Registration
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-white font-bold mb-1.5">Academic Year *</label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-[#0A2540] rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="2027 - 2028">Academic Year 2027 - 2028</option>
                      <option value="2026 - 2027">Academic Year 2026 - 2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Full Student Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter full student name"
                      className="w-full px-4 py-3 bg-white text-[#0A2540] placeholder-slate-400 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-[#0A2540] font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10 digit mobile phone number"
                      className="w-full px-4 py-3 bg-white text-[#0A2540] placeholder-slate-400 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-4 py-3 bg-white text-[#0A2540] placeholder-slate-400 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">
                      {formCategory === 'UG' ? 'Select Preferred B.E. / B.Tech Branch *' : 'Select Preferred M.E. / MBA Branch *'}
                    </label>
                    <select
                      value={formData.preferredCourse}
                      onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-[#0A2540] font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      {formCategory === 'UG' ? (
                        UG_COURSES_LIST.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name} (Intake: {course.sanctionedIntake})
                          </option>
                        ))
                      ) : (
                        PG_COURSES_LIST.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name} (Intake: {course.sanctionedIntake})
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Aggregate Marks / Cutoff %</label>
                    <input
                      type="text"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      placeholder="e.g. 85.5% or Cutoff 165"
                      className="w-full px-4 py-3 bg-white text-[#0A2540] placeholder-slate-400 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-1.5">Town / City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Nagercoil / Kanyakumari"
                      className="w-full px-4 py-3 bg-white text-[#0A2540] placeholder-slate-400 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-3 space-y-3">
                    {submitError && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-2xl px-4 py-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-red-700">{submitError}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#8B0000] hover:bg-[#5B0000] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-white/20"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting to Database...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 text-white" />
                          Submit {formCategory} Online Admission Registration
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Section 6: Admission Helpline & Contact Details */}
            <div id="helpline" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#0A2540]/15 pb-4">
                <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">Direct Campus Contact</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-poppins">Admission Helpline &amp; Office Hours</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-5 rounded-2xl border-2 border-[#0A2540]/15 space-y-3 shadow-xs">
                  <div className="flex items-center gap-3 text-[#0A2540]">
                    <Phone className="w-5 h-5 text-[#8B0000] shrink-0" />
                    <p className="font-bold text-[#0A2540] text-sm">Admission Hotline Numbers</p>
                  </div>
                  <div className="space-y-1 text-[#0A2540]/80 pl-8 font-medium">
                    <p><strong>Hotline 1:</strong> +91 9787747072</p>
                    <p><strong>Hotline 2:</strong> +91 9787747071</p>
                    <p><strong>Cell Contact:</strong> 9787747072, 9787455000, 9787747740</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-[#0A2540]/15 space-y-3 shadow-xs">
                  <div className="flex items-center gap-3 text-[#0A2540]">
                    <Mail className="w-5 h-5 text-[#8B0000] shrink-0" />
                    <p className="font-bold text-[#0A2540] text-sm">Email Admissions &amp; Queries</p>
                  </div>
                  <div className="space-y-1 text-[#0A2540]/80 pl-8 font-medium">
                    <p><strong>Email:</strong> vinsengg@gmail.com</p>
                    <p><strong>Info Mail:</strong> info@vins.ac.in</p>
                    <p><strong>Counselling Code:</strong> 4982 (Anna University)</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-[#0A2540]/15 space-y-3 shadow-xs">
                  <div className="flex items-center gap-3 text-[#0A2540]">
                    <Building className="w-5 h-5 text-[#8B0000] shrink-0" />
                    <p className="font-bold text-[#0A2540] text-sm">Campus Address</p>
                  </div>
                  <p className="text-[#0A2540]/80 leading-relaxed pl-8 font-medium">
                    Vins Christian College of Engineering,<br />
                    Vins Nagar, Chunkankadai,<br />
                    Nagercoil - 629 807, Kanyakumari District,<br />
                    Tamil Nadu, India.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-[#0A2540]/15 space-y-3 shadow-xs">
                  <div className="flex items-center gap-3 text-[#0A2540]">
                    <Clock className="w-5 h-5 text-[#8B0000] shrink-0" />
                    <p className="font-bold text-[#0A2540] text-sm">Admission Cell Working Hours</p>
                  </div>
                  <div className="space-y-1 text-[#0A2540]/80 pl-8 font-medium">
                    <p><strong>Mon - Fri:</strong> 9.00 am - 5.00 pm</p>
                    <p><strong>Sat:</strong> 9.00 am - 12.00 pm</p>
                    <p><strong>Sun:</strong> Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Scholarship Schemes */}
            <div id="scholarships" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-4 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#0A2540]/15 pb-3 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] font-poppins">Scholarships &amp; Fee Waivers</h2>
                <span className="px-3.5 py-1 bg-[#8B0000] text-white font-bold text-xs rounded-full">Merit Aids</span>
              </div>

              <p className="text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-medium">
                VINS Engineering offers merit scholarships up to 100% tuition waiver for school toppers, first-generation graduates, sports achievers at state level, and single-parent wards.
              </p>

              <button
                onClick={() => setSelectedDoc(scholarshipDoc)}
                className="px-6 py-3 bg-[#0A2540] hover:bg-[#1E40AF] text-white text-xs font-bold rounded-full transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-[#8B0000]" />
                Download Scholarship Application Form (DOCX)
              </button>
            </div>

          </div>
        </div>

        {/* Document Modal */}
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      </div>
    </div>
  );
};
