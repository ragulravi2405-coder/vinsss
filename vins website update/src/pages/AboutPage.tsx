import React, { useState, useEffect } from 'react';
import { Target, Compass, Award, UserCheck, Network, Building2, MapPin, CheckCircle2, Sparkles, GraduationCap, Quote, Landmark } from 'lucide-react';
import { 
  COLLEGE_INFO, 
  VISION_MISSION_DATA, 
  COLLEGE_PROFILE_DATA, 
  FOUNDER_CHAIRMAN_DATA, 
  PRINCIPAL_DESK_DATA 
} from '../data/collegeData';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { TiltCard } from '../components/common/TiltCard';

interface AboutPageProps {
  initialAnchor?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ initialAnchor = 'vision' }) => {
  const [activeSection, setActiveSection] = useState(initialAnchor);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header Banner — Deep Navy Blue with Cinematic 3D Parallax Depth */}
      <ScrollReveal direction="up" distance={20}>
        <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
          <img
            src="/images/college events and news galeery/h9.jpg"
            alt="VINS College Campus"
            className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-90 pointer-events-none scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#061727]/85 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="badge-academic bg-gradient-to-r from-[#8B0000] to-[#5B0000] text-white border border-white/25 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Established 2004 · Chunkankadai, Nagercoil</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight">
              About VINS Group of Engineering Colleges
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-normal">
              Founded by Shri Nanjil M. Vincent in Chunkankadai, Nagercoil, Kanyakumari District. Approved by AICTE, New Delhi &amp; Affiliated to Anna University, Chennai.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Grid: Left Sub-Nav + Right Content Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sub-Nav Sidebar */}
        <div className="lg:col-span-3 sticky top-24 bg-white rounded-3xl border-2 border-[#0A2540]/15 p-4 shadow-md space-y-1.5">
          <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider block px-3 py-1">
            Section Directory
          </span>

          {[
            { id: 'vision',     Icon: Target,    label: 'Vision & Mission' },
            { id: 'profile',    Icon: Building2,  label: 'College Profile' },
            { id: 'chairman',   Icon: Award,      label: 'Founder Chairman' },
            { id: 'principal',  Icon: UserCheck,  label: "Principal's Desk" },
            { id: 'organogram', Icon: Network,    label: 'Administrative Organogram' },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSection === id
                  ? 'bg-[#0A2540] text-white shadow-md'
                  : 'text-[#0A2540] hover:bg-[#1E40AF]/10 hover:text-[#1E40AF]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${activeSection === id ? 'text-[#8B0000]' : 'text-[#1E40AF]'}`} />
              {label}
            </button>
          ))}
        </div>

        {/* Right Content Sections */}
        <div className="lg:col-span-9 space-y-10">
          
          {/* Section 1: Vision & Mission */}
          <div id="vision" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B0000] flex items-center justify-center shadow-md">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A2540]">Vision &amp; Mission</h2>
                <p className="text-xs text-[#1E40AF] font-semibold">Institutional Goals &amp; Long-Term Educational Objectives</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision Card with 3D Tilt */}
              <TiltCard maxTilt={5} scale={1.015} className="h-full">
                <div className="bg-white rounded-2xl p-6 sm:p-7 space-y-3 border border-gray-200 hover:border-[#8B0000]/40 transition-all shadow-3d-soft h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#0A2540] font-bold text-sm uppercase tracking-wider">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B0000] flex items-center justify-center">
                        <Compass className="w-4 h-4 text-[#8B0000]" />
                      </div>
                      <span className="font-playfair text-base">Our Vision</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#0A2540]/85 leading-relaxed italic">
                      &ldquo;{VISION_MISSION_DATA.vision}&rdquo;
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Mission Card with 3D Tilt */}
              <TiltCard maxTilt={5} scale={1.015} className="h-full">
                <div className="bg-[#0A2540] rounded-2xl p-6 sm:p-7 space-y-3 border border-white/15 shadow-3d-card text-white h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                      <div className="w-8 h-8 rounded-lg bg-white/15 text-amber-300 flex items-center justify-center">
                        <Target className="w-4 h-4 text-amber-300" />
                      </div>
                      <span className="font-playfair text-base">Our Mission</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {VISION_MISSION_DATA.mission}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Section 2: College Profile */}
          <div id="profile" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1E40AF] flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A2540]">College Profile</h2>
                <p className="text-xs text-[#1E40AF] font-semibold">History, AICTE Approval, and Campus Infrastructure</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#0A2540]/85 leading-relaxed">
              <div className="bg-blue-50 border border-[#1E40AF]/20 rounded-2xl p-5">
                <p className="font-bold text-[#0A2540] text-sm">
                  {COLLEGE_PROFILE_DATA.welcomeText}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs text-[#0A2540]/85 leading-relaxed">{COLLEGE_PROFILE_DATA.historyP1}</p>
                <p className="text-xs text-[#0A2540]/85 leading-relaxed">{COLLEGE_PROFILE_DATA.womensCollegeP}</p>
                <p className="text-xs text-[#0A2540]/85 leading-relaxed font-semibold">📍 {COLLEGE_PROFILE_DATA.connectivity}</p>
              </div>

              {/* Official AICTE / Anna University Affiliation Notice */}
              <div className="bg-[#0A2540] rounded-2xl p-5 border border-white/15 flex items-center gap-4 mt-4 shadow-md">
                <Landmark className="w-8 h-8 text-[#8B0000] shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">Statutory Approval &amp; Affiliation Status</h4>
                  <p className="text-[11px] text-white/85">
                    VINS Christian College of Engineering is permanently approved by AICTE, New Delhi and affiliated with Anna University, Chennai. Anna University Counselling TNEA Code: <strong className="text-[#8B0000]">{COLLEGE_INFO.code}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Founder Chairman Desk */}
          <div id="chairman" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
            <div className="flex items-center gap-4 border-b-2 border-[#0A2540]/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B0000] flex items-center justify-center shadow-md">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A2540]">Founder Chairman</h2>
                <p className="text-xs text-[#1E40AF] font-bold">{FOUNDER_CHAIRMAN_DATA.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Chairman Photo with 3D Depth */}
              <div className="md:col-span-4 space-y-3">
                <div className="img-3d-frame bg-[#0A2540] aspect-[3/4] border-2 border-[#0A2540]/15 shadow-3d-card">
                  <img
                    src="/images/chairman and pricipal img/chairman img.jpg"
                    alt={FOUNDER_CHAIRMAN_DATA.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-[#0A2540] text-white p-4 sm:p-5 rounded-2xl border border-white/10 text-xs space-y-2 shadow-3d-soft">
                  <p className="font-bold text-base font-playfair text-white">{FOUNDER_CHAIRMAN_DATA.name}</p>
                  <p className="text-white/80 font-medium">{FOUNDER_CHAIRMAN_DATA.designation}</p>
                  <div className="pt-2 border-t border-white/15 text-[11px] text-white/70 space-y-1">
                    <p>📍 {COLLEGE_INFO.location}</p>
                    <p>🎓 Founder: VINS Group of Engineering Colleges</p>
                  </div>
                </div>
              </div>

              {/* Chairman Message */}
              <div className="md:col-span-8 space-y-4">
                <div className="bg-blue-50 border border-[#1E40AF]/20 p-4 rounded-2xl text-[#0A2540]">
                  <p className="italic text-xs leading-relaxed text-[#0A2540]/85">&ldquo;{FOUNDER_CHAIRMAN_DATA.aboutIntro}&rdquo;</p>
                </div>

                <div className="space-y-3 text-xs text-[#0A2540]/85 leading-relaxed">
                  <h3 className="font-bold font-poppins text-[#0A2540] text-sm uppercase tracking-wide flex items-center gap-2 border-b-2 border-[#0A2540]/10 pb-2">
                    <Quote className="w-4 h-4 text-[#8B0000]" />
                    Chairman's Address to Students &amp; Parents
                  </h3>
                  {FOUNDER_CHAIRMAN_DATA.messageParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t-2 border-[#0A2540]/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#0A2540]">{FOUNDER_CHAIRMAN_DATA.name}</p>
                    <p className="text-[#1E40AF] font-bold">Founder Chairman, Vins Group of Engineering Colleges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Principal Desk */}
          <div id="principal" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
            <div className="flex items-center gap-4 border-b-2 border-[#0A2540]/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1E40AF] flex items-center justify-center shadow-md">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A2540]">Principal's Desk</h2>
                <p className="text-xs text-[#1E40AF] font-bold">{PRINCIPAL_DESK_DATA.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Principal Photo with 3D Depth */}
              <div className="md:col-span-4 space-y-3">
                <div className="img-3d-frame bg-[#0A2540] aspect-[3/4] border-2 border-[#0A2540]/15 shadow-3d-card">
                  <img
                    src="/images/chairman and pricipal img/principal img.jpg"
                    alt={PRINCIPAL_DESK_DATA.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 text-xs space-y-1 text-center shadow-3d-soft">
                  <p className="font-bold text-base font-playfair text-[#0A2540]">{PRINCIPAL_DESK_DATA.name}</p>
                  <p className="text-[#8B0000] font-bold">Principal, Vins Christian College of Engineering</p>
                </div>
              </div>

              {/* Principal Message */}
              <div className="md:col-span-8 space-y-4">
                <h3 className="font-bold font-poppins text-[#0A2540] text-sm uppercase tracking-wide border-b-2 border-[#0A2540]/10 pb-2 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#8B0000]" />
                  Academic Leadership &amp; Vision Message
                </h3>
                <div className="space-y-3 text-xs text-[#0A2540]/85 leading-relaxed">
                  {PRINCIPAL_DESK_DATA.messageParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t-2 border-[#0A2540]/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#0A2540]">{PRINCIPAL_DESK_DATA.name}</p>
                    <p className="text-[#1E40AF] font-bold">Principal, Vins Christian College of Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Administrative Organogram */}
          <div id="organogram" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/15 shadow-md space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0A2540] flex items-center justify-center shadow-md">
                <Network className="w-5 h-5 text-[#8B0000]" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A2540]">Administrative Organogram</h2>
                <p className="text-xs text-[#1E40AF] font-semibold">Institutional Governance Hierarchy &amp; Organizational Structure</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-[#1E40AF]/20 rounded-2xl p-6 flex flex-col items-center space-y-4">
              {/* Top box */}
              <div className="bg-[#0A2540] text-white font-bold text-xs rounded-2xl shadow-md text-center w-64 px-4 py-3 border border-white/15">
                Board of Management / Founder Chairman
              </div>
              <div className="w-0.5 h-6 bg-[#0A2540]/30" />
              {/* Middle box */}
              <div className="bg-[#8B0000] text-white font-bold rounded-2xl shadow-md text-center w-64 px-4 py-3 text-sm border border-white/20">
                Principal &amp; Academic Council
              </div>
              <div className="w-0.5 h-6 bg-[#0A2540]/30" />
              {/* Bottom row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                <div className="bg-white border-2 border-[#1E40AF]/20 hover:border-[#8B0000]/50 text-[#0A2540] font-bold text-xs rounded-2xl shadow-xs text-center px-3 py-3 transition-all">
                  Heads of Departments (HODs)
                </div>
                <div className="bg-white border-2 border-[#1E40AF]/20 hover:border-[#8B0000]/50 text-[#0A2540] font-bold text-xs rounded-2xl shadow-xs text-center px-3 py-3 transition-all">
                  Training &amp; Placement Head
                </div>
                <div className="bg-white border-2 border-[#1E40AF]/20 hover:border-[#8B0000]/50 text-[#0A2540] font-bold text-xs rounded-2xl shadow-xs text-center px-3 py-3 transition-all">
                  Administrative Officer &amp; Labs
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
