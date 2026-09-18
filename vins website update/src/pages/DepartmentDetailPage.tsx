import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, UserCheck, FlaskConical, Award, Briefcase, 
  Calendar, Sparkles, Send, Mail, GraduationCap, Users, Trophy, Target, Compass
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { NavigationTab } from '../types';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface DepartmentDetailPageProps {
  departmentId: string;
  onBack: () => void;
  onNavigateAdmission: (tab: NavigationTab, anchorId?: string) => void;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  departmentId,
  onBack,
  onNavigateAdmission
}) => {
  const [selectedLabImg, setSelectedLabImg] = useState<{ name: string; path: string } | null>(null);

  const dept = DEPARTMENTS_DATA.find((d) => d.id === departmentId) || DEPARTMENTS_DATA[0];

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Top Back Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0A2540] bg-white border-2 border-[#0A2540]/30 hover:border-[#0A2540] hover:bg-[#0A2540] hover:text-white px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-current" />
          Back to All Departments
        </button>

        {/* 1. Wide Banner Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-3d-deep bg-[#0A2540] border border-white/20">
            <img
              src={dept.courseImage || dept.bannerPath}
              alt={dept.name}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/60 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#0A2540] font-black text-xs uppercase tracking-wider shadow-md">
                    Department of {dept.degree}
                  </span>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white tracking-tight">{dept.name}</h1>
                  <p className="text-xs sm:text-sm text-white/90 max-w-2xl">{dept.description}</p>
                </div>
                
                <div className="bg-white/95 text-[#0A2540] p-5 rounded-2xl border border-white/30 text-right shrink-0 shadow-3d-soft">
                  <p className="text-3xl font-black text-[#0A2540] font-playfair leading-none">{dept.placementPercentage}%</p>
                  <p className="text-xs text-[#0A2540]/70 font-bold mt-1">Placement Record</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8 Columns Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview & Profile */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Department Profile</h2>
                  <p className="text-xs text-[#0A2540]/80 font-medium">Academic Overview &amp; Laboratory Infrastructure</p>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                {dept.profileText || dept.overviewText}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-[#0A2540]">
                <div className="bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 shadow-xs">
                  <span className="text-[#0A2540]/70 block text-[11px] font-semibold">Sanctioned Intake</span>
                  <strong className="text-[#0A2540] text-base font-black">{dept.intake} Seats</strong>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 shadow-xs">
                  <span className="text-[#0A2540]/70 block text-[11px] font-semibold">Program Duration</span>
                  <strong className="text-[#0A2540] text-base font-black">{dept.durationYears} Years</strong>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 shadow-xs">
                  <span className="text-[#0A2540]/70 block text-[11px] font-semibold">Affiliation</span>
                  <strong className="text-[#0A2540] text-base font-black">Anna University</strong>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            {(dept.vision || dept.mission) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dept.vision && (
                  <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-7 border border-white/25 space-y-3 shadow-xl">
                    <div className="flex items-center gap-2 text-white border-b border-white/20 pb-2">
                      <Compass className="w-5 h-5 text-white" />
                      <h3 className="font-bold text-sm uppercase tracking-wider">Department Vision</h3>
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      {dept.vision}
                    </p>
                  </div>
                )}

                {dept.mission && (
                  <div className="bg-white text-[#0A2540] rounded-3xl p-6 sm:p-7 border-2 border-[#0A2540]/25 space-y-3 shadow-md">
                    <div className="flex items-center gap-2 text-[#0A2540] border-b-2 border-[#0A2540]/15 pb-2">
                      <Target className="w-5 h-5 text-[#0A2540]" />
                      <h3 className="font-bold text-sm uppercase tracking-wider">Department Mission</h3>
                    </div>
                    <p className="text-xs text-[#0A2540]/90 leading-relaxed font-medium">
                      {dept.mission}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Faculty & Staff Members List */}
            {dept.staffMembers && dept.staffMembers.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#0A2540]/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Faculty &amp; Staff Members</h2>
                      <p className="text-xs text-[#0A2540]/80 font-medium">{dept.staffMembers.length} Experienced Academic Faculty</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/20">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A2540] text-white font-bold">
                      <tr>
                        <th className="p-3.5 w-14 text-center">S.No</th>
                        <th className="p-3.5">Faculty Name</th>
                        <th className="p-3.5">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-semibold">
                      {dept.staffMembers.map((staff, idx) => (
                        <tr key={idx} className="hover:bg-[#0A2540]/5 transition-colors">
                          <td className="p-3.5 text-center font-black">{idx + 1}</td>
                          <td className="p-3.5 font-bold text-sm">{staff.name}</td>
                          <td className="p-3.5">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#0A2540] text-white text-xs font-bold shadow-xs">
                              {staff.designation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Laboratories List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Laboratories &amp; Practical Workshops</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dept.labsList.map((lab, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 flex items-center gap-3 text-xs font-bold text-[#0A2540] shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#0A2540] shrink-0" />
                    <span>{lab}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rank Holders */}
            {dept.rankHolders && dept.rankHolders.length > 0 && (
              <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 border border-white/25 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                  <Trophy className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white font-playfair">Anna University Rank Holders</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {dept.rankHolders.map((rank, idx) => (
                    <div key={idx} className="bg-white text-[#0A2540] p-4 rounded-2xl border border-white space-y-1 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A2540] text-sm">{rank.name}</span>
                        <span className="px-2.5 py-0.5 bg-[#0A2540] text-white rounded-full font-bold text-[10px]">
                          Rank {rank.rank}
                        </span>
                      </div>
                      <p className="text-[#0A2540]/80 font-medium">{rank.degree}</p>
                      <p className="text-[#0A2540] text-xs font-bold">CGPA Score: <strong>{rank.cgpa}</strong></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities & Symposiums */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Activities &amp; Symposiums</h2>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#0A2540] font-medium">
                {dept.activities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 shadow-xs">
                    <Award className="w-5 h-5 text-[#0A2540] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right 4 Columns Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* HOD Card */}
            <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 border border-white/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/20 pb-3">
                <UserCheck className="w-5 h-5 text-white" />
                <h3 className="font-bold text-base text-white">Head of Department</h3>
              </div>

              <div className="aspect-square rounded-2xl overflow-hidden bg-white border-2 border-white/30">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                  alt={dept.hodName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 text-xs text-white">
                <h4 className="font-black text-white text-base">{dept.hodName}</h4>
                <p className="text-white/90 font-medium">{dept.hodQualification}</p>
                <p className="text-white flex items-center gap-2 pt-1 font-semibold">
                  <Mail className="w-4 h-4 text-white" />
                  {dept.hodEmail}
                </p>
              </div>
            </div>

            {/* Key Recruiters */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-[#0A2540]/15 pb-3">
                <Briefcase className="w-5 h-5 text-[#0A2540]" />
                <h3 className="font-bold text-base text-[#0A2540] font-playfair">Key Recruiters</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {dept.topRecruiters.map((company, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white text-[#0A2540] font-bold text-xs border-2 border-[#0A2540]/25">
                    {company}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Apply Card */}
            <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-white/20">
              <h3 className="font-black text-xl font-playfair">Apply for {dept.name}</h3>
              <p className="text-xs font-medium text-white/90 leading-relaxed">
                Reserve your seat for academic year 2026 - 2027. Anna University Counselling Code: 4982.
              </p>
              <button
                onClick={() => onNavigateAdmission('admissions', 'online-form')}
                className="w-full py-3.5 bg-white hover:bg-white/90 text-[#0A2540] font-black rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4 text-[#0A2540]" />
                Apply Online Now
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
