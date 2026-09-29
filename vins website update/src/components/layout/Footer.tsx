import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { NavigationTab } from '../../types';
import { submitContactForm } from '../../services/api';

interface FooterProps {
  onTabChange: (tab: NavigationTab, anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && (formState.email || formState.phone)) {
      setSubmitted(true);
      await submitContactForm({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        subject: 'Quick Inquiry from Website Footer',
        message: formState.message || 'Admissions / Course Inquiry',
        source: 'footer',
      });
      setTimeout(() => {
        setFormState({ name: '', email: '', phone: '', message: '' });
      }, 5000);
    }
  };

  return (
    <footer className="bg-white text-slate-900 border-t-2 border-orange-100">
      {/* Quick Contact Inquiry Banner Box - Pure White Background with Orange Accents */}
      <div className="py-10 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-200/70 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[#FF6B00] font-black uppercase text-xs tracking-widest block">Quick Inquiry</span>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 leading-snug">
                  Get in Touch with Admissions Office
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  Enter your details below for degree counseling, fee structure, scholarship assistance, and campus visits.
                </p>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="bg-orange-50 text-slate-900 border-2 border-[#FF6B00] p-6 rounded-2xl flex items-center gap-4 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-[#FF6B00] shrink-0" />
                    <div>
                      <h4 className="font-bold text-base text-slate-900">Inquiry Submitted Successfully!</h4>
                      <p className="text-xs text-slate-700 font-medium">
                        Thank you {formState.name || 'Student'}. Our admissions officer will call or email you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full bg-white text-slate-900 border-2 border-slate-200 hover:border-[#FF6B00]/60 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 mb-1">Mail ID *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full bg-white text-slate-900 border-2 border-slate-200 hover:border-[#FF6B00]/60 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="w-full bg-white text-slate-900 border-2 border-slate-200 hover:border-[#FF6B00]/60 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
                      />
                    </div>

                    <div className="sm:col-span-3 flex items-center justify-end gap-3 pt-1">
                      <button
                        type="submit"
                        className="bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center flex items-center gap-2 border border-transparent"
                      >
                        <Send className="w-4 h-4 text-white" />
                        <span>Submit Inquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Upper 4 Columns - Clean White Background with Black Text & Orange Interactive Elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: College Info & Official Footer Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border-2 border-orange-200 shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/logo/ving logo.jpg" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                  }}
                  alt="VINS Official Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold font-poppins text-slate-900 leading-tight">VINS Christian College</h3>
                <p className="text-xs text-[#FF6B00] font-bold uppercase tracking-wider">of Engineering, Nagercoil</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Approved by AICTE, New Delhi &amp; Affiliated to Anna University, Chennai. College Code: <strong className="text-slate-900 font-bold">4982</strong>. Empowering future engineers with technical competence, research leadership, and high human values.
            </p>
          </div>

          {/* Column 2: Useful Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-orange-300 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
              <li>
                <button onClick={() => onTabChange('about')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> About VINS &amp; Founder Desk
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('admissions')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> Admissions 2026-27 (Code: 4982)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('department')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> Engineering &amp; MBA Departments
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('placement')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> Training &amp; Placement Cell (90%+)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('facilities')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> Library, Hostels &amp; Laboratories
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('campus')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> Campus Events &amp; Student Life
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('naac')} className="hover:text-[#FF6B00] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00] font-black">›</span> NAAC SSR &amp; IQAC Quality Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-orange-300 pb-2 inline-block">
              Campus Location &amp; Info
            </h4>
            <div className="space-y-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span className="font-semibold text-slate-900">{COLLEGE_INFO.phone1} / 231155</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span className="hover:text-[#FF6B00] transition-colors">{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-[11px] text-slate-500">Nearest Railway: Nagercoil Jn (6km)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Opening Hours & Statutory */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-orange-300 pb-2 inline-block">
              Office Hours &amp; Counseling
            </h4>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Monday - Saturday:</p>
                  <p className="text-slate-500">8:30 AM - 4:30 PM IST</p>
                </div>
              </div>
              <div className="bg-orange-50/70 border border-orange-200 p-3.5 rounded-2xl space-y-1">
                <p className="text-slate-900 font-bold text-xs">Affiliation Notice:</p>
                <p className="text-[11px] text-slate-700 font-medium">
                  Anna University Counselling Code: <strong className="text-[#FF6B00] font-black">4982</strong>
                </p>
              </div>
              <button
                onClick={() => onTabChange('contact')}
                className="w-full py-2.5 bg-white hover:bg-[#FF6B00] text-slate-900 hover:text-white border-2 border-[#FF6B00] font-bold rounded-full text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <span>Reach Admissions Helpline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip - Clean Light Gray / White with Black Text and Orange Hover */}
      <div className="bg-slate-100 border-t border-slate-200 py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <p className="text-center sm:text-left">© 2026 VINS Christian College of Engineering, Chunkankadai, Nagercoil. All Rights Reserved.</p>
          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-700">
            <button onClick={() => onTabChange('committees')} className="hover:text-[#FF6B00] cursor-pointer transition-colors">Anti-Ragging Policy</button>
            <span>•</span>
            <button onClick={() => onTabChange('naac')} className="hover:text-[#FF6B00] cursor-pointer transition-colors">IQAC &amp; NAAC</button>
            <span>•</span>
            <button onClick={() => onTabChange('contact')} className="hover:text-[#FF6B00] cursor-pointer transition-colors">Contact Us</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
