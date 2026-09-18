import React from 'react';
import { 
  Briefcase, Award, CheckCircle2, Building2, TrendingUp, Users, Sparkles, Phone, Mail, User, BookOpen, Calendar, Image as ImageIcon, ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { PLACEMENT_STATS, PLACEMENT_OFFICER_INFO } from '../data/collegeData';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { TiltCard } from '../components/common/TiltCard';

export const PlacementPage: React.FC = () => {
  const topRecruitersList = [
    'Azentra Global', 'TCS', 'Cognizant', 'Wipro', 'Infosys', 'L&T Construction', 'Nokia', 'Oracle', 
    'Zoho', 'CTS', 'HCL Technologies', 'Accenture', 'Tech Mahindra', 'Hyundai Motors',
    'Brakes India', 'TVS Motors', 'Jain Irrigation', 'Sobha Developers', 'PwC Cyber',
    'Nirmiti Precision', 'PHA India (Korean MNC)', 'Competition Team Tech'
  ];

  const responsibilitiesList = [
    'To invite prospective companies/ organizations to campus for recruitment',
    'To register students for the jobs with prescribed qualifications',
    'To arrange for various facilities required on the date of interview',
    'To collect appointment letters and distribute them to selected students',
    'To provide in-plant training at companies/ organizations',
    'To achieve maximum possible placements for students',
    'To guide students on various interview techniques, group discussions, aptitude tests',
    'Arrange off-campus and campus recruitment process'
  ];

  const otherActivitiesList = [
    'Arrangement of Personality Development Workshops',
    'Training students in aptitude tests, interview techniques, group discussions',
    'Notification regarding various competitive examinations',
    'Organizing industrial visits',
    'Guiding students who desire to pursue Higher Education'
  ];

  const placementFacilitiesList = [
    'Separate cell established with one full time staff incharge for placement',
    'Corporate recruitment data update & industry interface',
    'Guide students to approach companies',
    'Survey on recruiters\' expectations from students',
    'Feedback from employers of past batches',
    'Alumni networking & career guidance',
    'Organizes training sessions on soft skill development'
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header Banner - Premium Academic */}
        <ScrollReveal direction="up" distance={20}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="badge-academic bg-white/15 text-white border border-white/30 relative z-10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>TRAINING &amp; PLACEMENT CELL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight relative z-10">
              Campus Placements &amp; Career Development
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed relative z-10">
              Our dedicated Training &amp; Placement Cell bridges the gap between academic knowledge and industry requirements, ensuring every student achieves their career goals.
            </p>
          </div>
        </ScrollReveal>



        {/* Grid: About Placement Cell & Placement Officer Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8 Cols: About Department */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">About the Placement Department</h2>
                <p className="text-xs text-[#0A2540]/80 font-semibold">Guiding Students Towards Successful Engineering Careers</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
              <p>
                The Placement cell is one of the pivotal departments in VINS. Knowing that you will be guided after your graduation so that you land a job helps you feel secure. This is the reason why we have a dedicated placement cell that helps, guides, and advises students about the future.
              </p>
              <p>
                In VINS, students come from all walks of life. They come from different parts of the District including rural areas. Some individuals may not be aware of corporate interview procedures, while others need confidence coaching. Our dedicated placement trainers groom every student in communication, aptitude, coding, and soft skills.
              </p>
            </div>

            {/* Functioning Model */}
            <div className="pt-4 border-t-2 border-[#0A2540]/15 space-y-3">
              <h3 className="font-bold text-[#0A2540] text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0A2540]" />
                Functioning Model &amp; &apos;One Person One Job&apos; Policy
              </h3>
              <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                For placement, a large number of prospective employers are contacted throughout the academic year to conduct campus recruitments. The objective of the T&amp;P Cell is <strong>100% employment opportunity</strong> for all eligible students through our transparent <strong>&apos;One Person One Job&apos;</strong> policy.
              </p>
              <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                The Cell is assisted by student coordinators from various study branches, ensuring top-tier arrangements and hospitality for visiting corporate delegates.
              </p>
            </div>
          </div>

          {/* Right 4 Cols: Placement Officer Contact Card */}
          <div className="lg:col-span-4 bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-white/20 pb-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0A2540] flex items-center justify-center font-bold">
                <User className="w-5 h-5 text-[#0A2540]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Placement Officer</h3>
                <p className="text-xs text-white/80">Head of T&amp;P Cell</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-white text-[#0A2540] p-5 rounded-2xl border border-white space-y-1.5 shadow-md">
                <p className="font-black text-[#0A2540] text-lg leading-tight">{PLACEMENT_OFFICER_INFO.name}</p>
                <p className="text-[#0A2540] font-bold text-xs">{PLACEMENT_OFFICER_INFO.title}</p>
                <p className="text-[#0A2540]/80 text-[11px] font-semibold">{PLACEMENT_OFFICER_INFO.designation}</p>
                <p className="text-[#0A2540]/80 text-[11px] font-semibold">{PLACEMENT_OFFICER_INFO.department}</p>
              </div>

              <div className="space-y-2 pt-2">
                <a 
                  href={`tel:${PLACEMENT_OFFICER_INFO.phone.split('/')[0].trim()}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#0A2540] font-bold transition-all border border-white/30 shadow-xs"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{PLACEMENT_OFFICER_INFO.phone}</span>
                </a>

                <a 
                  href={`mailto:${PLACEMENT_OFFICER_INFO.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#0A2540] font-bold transition-all border border-white/30 shadow-xs"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{PLACEMENT_OFFICER_INFO.email}</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 bg-white/15 border border-white/30 rounded-2xl text-xs text-white/95 leading-relaxed font-medium">
              For campus recruitment drives and corporate tie-ups, reach our T&amp;P desk directly.
            </div>
          </div>

        </div>

        {/* Facilities & Summer Training Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Placement Facilities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-[#0A2540] text-lg font-playfair">Placement Facilities &amp; Support</h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#0A2540]/90 font-medium">
              {placementFacilitiesList.map((fac, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#0A2540]/20 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Summer Training & PPT */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-[#0A2540] text-lg font-playfair">Summer Training &amp; Pre-Placement Talk</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#0A2540]/20 space-y-1.5 shadow-xs">
                <strong className="text-[#0A2540] block font-bold text-sm">Summer Training (6-8 Weeks):</strong>
                <p>
                  Each student undertakes structured summer training in reputable MNCs and industrial plants for 6-8 weeks as part of the curriculum, completing live project deliverables.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#0A2540]/20 space-y-1.5 shadow-xs">
                <strong className="text-[#0A2540] block font-bold text-sm">Pre-Placement Talk (PPT):</strong>
                <p>
                  Interactive sessions giving recruiters and candidates an open platform to discuss company vision, CTC compensation packages, career trajectories, and project domains.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Objectives & Cell Responsibilities */}
        <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-10 border border-white/25 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <h3 className="font-playfair text-xl sm:text-3xl font-bold text-white">
              Training &amp; Placement Cell Mandate
            </h3>
            <span className="bg-white text-[#0A2540] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Student Career Growth
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                Core Objectives
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 font-medium">
                {otherActivitiesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/15 p-3.5 rounded-2xl border border-white/25">
                    <span className="w-5 h-5 rounded-full bg-white text-[#0A2540] text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                Key Responsibilities &amp; Operations
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 font-medium">
                {responsibilitiesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white/15 p-3.5 rounded-2xl border border-white/25">
                    <span className="text-white font-black">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Placement Record Visualization */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0A2540]/20 shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A2540]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-widest">ANNUAL PLACEMENT DATA</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-playfair">Placement Statistics &amp; Package Trends</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-[#0A2540]">
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#0A2540] rounded" /> Offers Count</span>
              <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#0A2540]/50 rounded" /> Highest CTC (LPA)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 h-80 bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 shadow-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PLACEMENT_STATS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0A2540" strokeOpacity={0.15} />
                  <XAxis dataKey="year" stroke="#0A2540" fontSize={11} fontWeight={600} />
                  <YAxis stroke="#0A2540" fontSize={11} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A2540', borderColor: '#FFFFFF', borderRadius: '12px', color: '#FFFFFF', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar dataKey="offersCount" name="Total Offer Letters" fill="#0A2540" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="placedPercentage" name="Placed Percentage (%)" fill="#0A2540" fillOpacity={0.4} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-4 h-80 bg-[#0A2540] text-white p-6 rounded-2xl border border-white/30 space-y-4 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                  Salary Packages Trend
                </h3>
                <p className="text-xs text-white/80 mt-1 font-medium">Highest CTC salary package offered over past academic years.</p>
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PLACEMENT_STATS}>
                    <XAxis dataKey="year" stroke="#FFFFFF" fontSize={10} />
                    <YAxis stroke="#FFFFFF" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', color: '#0A2540', fontSize: '11px', borderRadius: '8px', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="highestCTC" name="Highest CTC (LPA)" stroke="#FFFFFF" strokeWidth={3} dot={{ r: 5, fill: '#FFFFFF' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 bg-white text-[#0A2540] rounded-xl font-bold text-xs text-center shadow-md">
                Highest salary package touched <strong>12.0 LPA</strong> in campus drives.
              </div>
            </div>

          </div>
        </section>

        {/* Placement Activity Gallery */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0A2540]/20 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Placement Activity Gallery &amp; Campus Drives</h2>
              <p className="text-xs text-[#0A2540]/80 font-semibold">On-Campus Recruitment Sessions, Interviews &amp; Letter Distributions</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              'WhatsApp Image 2026-08-13 at 9.07.40 PM (1).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.40 PM (2).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.40 PM.jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.41 PM.jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.42 PM (1).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.42 PM (2).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.42 PM (3).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.42 PM.jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.43 PM (1).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.43 PM (2).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.43 PM.jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.44 PM (1).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.44 PM (2).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.44 PM.jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.45 PM (1).jpeg',
              'WhatsApp Image 2026-08-13 at 9.07.45 PM (2).jpeg'
            ].map((filename, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden aspect-video relative group border-2 border-[#0A2540]/20 shadow-xs hover:shadow-xl hover:border-[#0A2540] transition-all duration-300 cursor-pointer">
                <img
                  src={`/images/placement imgaes/${filename}`}
                  alt={`Placement Drive Photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0A2540]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white">
                  <p className="text-xs font-black text-white">Campus Placement Drive</p>
                  <p className="text-[10px] text-white/90 font-medium">VINS Training &amp; Placement Cell</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Recruiting Companies Grid */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0A2540]/20 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Major Visiting Recruiters</h2>
              <p className="text-xs text-[#0A2540]/80 font-semibold">Corporate Partners Hiring VINS Engineering Graduates</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {topRecruitersList.map((company, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border-2 border-[#0A2540]/20 hover:border-[#0A2540] hover:bg-[#0A2540] hover:text-white text-center font-bold text-[#0A2540] text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center min-h-[64px] cursor-pointer"
              >
                {company}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
