import React, { useState } from 'react';
import { MapPin, Phone, Mail, GraduationCap, Clock, ExternalLink, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { NavigationTab } from '../../types';

interface FooterProps {
  onTabChange: (tab: NavigationTab, anchorId?: string) => void;
}

import { submitContactForm } from '../../services/api';

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
    <footer className="bg-[#0A2540] text-white border-t border-white/15">
      {/* Quick Contact Inquiry Banner Box */}
      <div className="bg-[#0A2540] border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#061727] p-6 sm:p-8 rounded-3xl border-2 border-white/15 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[#FF6B00] font-extrabold uppercase text-xs tracking-widest block">Quick Inquiry</span>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white leading-snug">
                  Get in Touch with Admissions Office
                </h3>
                <p className="text-sm text-white/80 font-normal">
                  Enter your details below for degree counseling, fee structure, scholarship assistance, and campus visits.
                </p>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="bg-white text-[#0A2540] border border-white p-6 rounded-2xl flex items-center gap-4 shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#FF6B00] shrink-0" />
                    <div>
                      <h4 className="font-bold text-base text-[#0A2540]">Inquiry Submitted Successfully!</h4>
                      <p className="text-xs text-slate-700 font-medium">
                        Thank you {formState.name || 'Student'}. Our admissions officer will call or email you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full bg-white text-[#0A2540] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Mail ID *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full bg-white text-[#0A2540] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="w-full bg-white text-[#0A2540] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-3 flex items-center justify-end gap-3 pt-1">
                      <button
                        type="submit"
                        className="bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full cursor-pointer shadow-lg active:scale-95 transition-all w-full sm:w-auto justify-center flex items-center gap-2 border border-white/20"
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

      {/* Upper 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: College Info & Official Footer Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-white/20 shrink-0 flex items-center justify-center overflow-hidden">
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
                <h3 className="text-base font-bold font-poppins text-white leading-tight">VINS Christian College</h3>
                <p className="text-xs text-[#FF6B00] font-semibold uppercase tracking-wider">of Engineering, Nagercoil</p>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Approved by AICTE, New Delhi &amp; Affiliated to Anna University, Chennai. College Code: <strong className="text-white font-bold">4982</strong>. Empowering future engineers with technical competence, research leadership, and high human values.
            </p>
          </div>

          {/* Column 2: Useful Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest border-b border-white/15 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/75">
              <li>
                <button onClick={() => onTabChange('about')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> About VINS &amp; Founder Desk
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('admissions')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> Admissions 2026-27 (Code: 4982)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('department')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> Engineering &amp; MBA Departments
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('placement')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> Training &amp; Placement Cell (90%+)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('facilities')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> Library, Hostels &amp; Laboratories
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('campus')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> Campus Events &amp; Student Life
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('naac')} className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#FF6B00]">›</span> NAAC SSR &amp; IQAC Quality Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest border-b border-white/15 pb-2 inline-block">
              Campus Location &amp; Info
            </h4>
            <div className="space-y-3 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>{COLLEGE_INFO.phone1} / 231155</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-[11px] text-white/60">Nearest Railway: Nagercoil Jn (6km)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Opening Hours & Statutory */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest border-b border-white/15 pb-2 inline-block">
              Office Hours &amp; Counseling
            </h4>
            <div className="space-y-3 text-xs text-white/75">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday - Saturday:</p>
                  <p className="text-white/60">8:30 AM - 4:30 PM IST</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/15 p-3.5 rounded-2xl space-y-1">
                <p className="text-white font-bold text-xs">Affiliation Notice:</p>
                <p className="text-[11px] text-white/90">
                  Anna University Counselling Code: <strong className="text-[#FF6B00]">4982</strong>
                </p>
              </div>
              <button
                onClick={() => onTabChange('contact')}
                className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-full text-xs transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-white/20"
              >
                <span>Reach Admissions Helpline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip - Deep Navy (#061727) Background with White & Orange Accent */}
      <div className="bg-[#061727] border-t border-white/15 py-4.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80">
          <p className="font-medium text-center sm:text-left">© 2026 VINS Christian College of Engineering, Chunkankadai, Nagercoil. All Rights Reserved.</p>
          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-white/80">
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
