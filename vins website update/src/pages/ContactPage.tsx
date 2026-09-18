import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, Sparkles 
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';
import { submitContactForm } from '../services/api';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { TiltCard } from '../components/common/TiltCard';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      await submitContactForm({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        subject: contactForm.subject,
        message: contactForm.message,
        source: 'contact_page',
      });
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header Banner - Premium */}
        <ScrollReveal direction="up" distance={20}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="badge-academic bg-white/15 text-white border border-white/30 relative z-10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight relative z-10">
              Contact VINS Christian College
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed relative z-10">
              Reach our admission desk, principal&apos;s office, or campus administration located at Chunkankadai, Nagercoil, Kanyakumari District, Tamil Nadu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Columns: Address & Phone details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-6">
              <h2 className="text-2xl font-bold text-[#0A2540] font-playfair border-b-2 border-[#0A2540]/15 pb-3">
                Campus Address &amp; Contact
              </h2>

              <div className="space-y-4 text-xs text-[#0A2540]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A2540] text-sm">VINS Campus Address:</p>
                    <p className="text-[#0A2540]/90 leading-relaxed font-medium mt-0.5">{COLLEGE_INFO.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A2540] text-sm">Phone Numbers:</p>
                    <p className="text-[#0A2540]/90 font-medium">{COLLEGE_INFO.phone1} / {COLLEGE_INFO.phone2}</p>
                    <p className="text-[#0A2540] font-black mt-0.5">Helpline: {COLLEGE_INFO.helpline}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A2540] text-sm">Official Emails:</p>
                    <p className="text-[#0A2540]/90 font-medium">{COLLEGE_INFO.email}</p>
                    <p className="text-[#0A2540]/90 font-medium">{COLLEGE_INFO.infoEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-2 border-t-2 border-[#0A2540]/15">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A2540] text-sm">Office Working Hours:</p>
                    <p className="text-[#0A2540]/90 font-medium">Monday - Saturday: 8:30 AM - 4:30 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation & Landmark Info */}
            <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-7 border border-white/25 space-y-2 text-xs shadow-xl">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-white" />
                Nearest Directions Landmark
              </h3>
              <p className="text-white/95 leading-relaxed font-medium">
                Situated on the Nagercoil - Trivandrum National Highway (NH 66) at Chunkankadai, 6 km from Nagercoil Junction Railway Station.
              </p>
            </div>
          </div>

          {/* Right 7 Columns: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-6">
            <div className="border-b-2 border-[#0A2540]/15 pb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-playfair">Send an Enquiry Message</h2>
              <p className="text-xs text-[#0A2540]/80 font-medium mt-1">Fill out the contact form below and our campus team will respond within 24 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="bg-white border-2 border-[#0A2540] rounded-3xl p-8 text-center space-y-3 shadow-md">
                <CheckCircle2 className="w-12 h-12 text-[#0A2540] mx-auto" />
                <h3 className="font-bold text-[#0A2540] text-xl font-playfair">Thank You for Contacting VINS!</h3>
                <p className="text-xs sm:text-sm text-[#0A2540]/90 font-medium">
                  Your enquiry regarding <strong>{contactForm.subject}</strong> has been received. We have sent a confirmation note to <strong>{contactForm.email}</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0A2540] text-white font-bold rounded-full text-xs hover:bg-[#0A2540]/90 cursor-pointer shadow-md transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#0A2540] font-bold mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-white border-2 border-[#0A2540]/20 rounded-2xl text-[#0A2540] placeholder-[#0A2540]/50 font-bold focus:outline-none focus:border-[#0A2540]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A2540] font-bold mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-white border-2 border-[#0A2540]/20 rounded-2xl text-[#0A2540] placeholder-[#0A2540]/50 font-bold focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0A2540] font-bold mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Mobile number"
                      className="w-full px-4 py-3 bg-white border-2 border-[#0A2540]/20 rounded-2xl text-[#0A2540] placeholder-[#0A2540]/50 font-bold focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0A2540] font-bold mb-1.5">Enquiry Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-[#0A2540]/20 rounded-2xl text-[#0A2540] font-bold focus:outline-none focus:border-[#0A2540]"
                  >
                    <option value="General Enquiry">General Campus Enquiry</option>
                    <option value="Admissions B.E.">B.E. Engineering Admissions</option>
                    <option value="Admissions M.E. / MBA">M.E. / MBA Admissions</option>
                    <option value="Placement Drive">Placement &amp; Recruitment Drives</option>
                    <option value="Hostel & Transport">Hostel &amp; Fleet Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0A2540] font-bold mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Type your query or message here..."
                    className="w-full px-4 py-3 bg-white border-2 border-[#0A2540]/20 rounded-2xl text-[#0A2540] placeholder-[#0A2540]/50 font-medium focus:outline-none focus:border-[#0A2540]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-black rounded-full text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
