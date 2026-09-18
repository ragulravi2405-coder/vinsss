import React, { useState } from 'react';
import { 
  ShieldAlert, UserCheck, HeartHandshake, FileText, CheckCircle2, Send, Sparkles, PhoneCall, Award, Users, AlertTriangle, BookOpen
} from 'lucide-react';
import { COMMITTEES_INFO } from '../data/collegeData';

export const CommitteesPage: React.FC = () => {
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [grievanceData, setGrievanceData] = useState({
    name: '',
    role: 'Student',
    category: 'Academic',
    message: ''
  });

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grievanceData.name && grievanceData.message) {
      setGrievanceSubmitted(true);
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    'anti-ragging': <ShieldAlert className="w-5 h-5 text-red-500" />,
    icc: <UserCheck className="w-5 h-5 text-amber-500" />,
    'sc-st': <HeartHandshake className="w-5 h-5 text-sky-500" />,
    grievance: <FileText className="w-5 h-5 text-emerald-500" />
  };

  const additionalCommittees = [
    {
      title: 'Anti-Ragging Squad & Patrol Team',
      mandate: '24/7 Campus & Hostel Surveillance Patrol',
      head: 'Prof. S. Rajalingam, Vice Principal',
      contact: '+91 94431 22345',
      membersCount: 8,
      desc: 'Conducts surprise checks across campus hostels, bus terminals, and cafeteria to guarantee 100% ragging-free atmosphere.'
    },
    {
      title: 'Disciplinary & Campus Welfare Committee',
      mandate: 'Student Behavior & Campus Decorum',
      head: 'Dr. M. K. Kumaran, HOD Mechanical',
      contact: '+91 94422 88100',
      membersCount: 6,
      desc: 'Oversees campus code of conduct, dress code guidelines, ID card protocol, and maintains healthy academic decorum.'
    },
    {
      title: 'Research Advisory & Ethics Board',
      mandate: 'Plagiarism Audit & PhD Project Approvals',
      head: 'Dr. T. S. Ramesh, Dean R&D',
      contact: '+91 94899 33211',
      membersCount: 10,
      desc: 'Reviews research proposals, manages Anna University supervisor list, and conducts Turnitin plagiarism checks.'
    },
    {
      title: 'Women Empowerment & Gender Sensitization Cell',
      mandate: 'Self-Defense, Counseling & Leadership',
      head: 'Dr. P. Sundari, HOD Science & Humanities',
      contact: '+91 94866 55432',
      membersCount: 7,
      desc: 'Organizes monthly self-defense workshops, health awareness seminars, and career mentorship for female students.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-xl text-white p-8 sm:p-12 rounded-3xl border border-[#dedcd7]/25 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Statutory Governance & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">
          Statutory Committees, Anti-Ragging & Grievance Redressal
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-3xl leading-relaxed">
          VINS Christian College of Engineering strictly complies with UGC, AICTE, and Anna University regulations. We maintain a zero-tolerance policy towards ragging, harassment, and discrimination.
        </p>
      </div>

      {/* UGC Anti-Ragging Toll-Free Helpline Emergency Banner */}
      <div className="bg-red-950 text-white p-6 sm:p-8 rounded-3xl border border-red-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-800/80 rounded-2xl shrink-0 text-white">
            <AlertTriangle className="w-8 h-8 animate-pulse text-amber-400" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-red-300 text-xs font-black uppercase tracking-wider">
              <span>National Anti-Ragging Mandatory Helpline</span>
            </div>
            <h2 className="text-xl font-black text-white">Zero-Tolerance Anti-Ragging Campus</h2>
            <p className="text-xs text-red-200 max-w-xl">
              Ragging is a punishable criminal offense. Students subjected to or witnessing any form of ragging can contact our 24/7 Nodal Squad or the National UGC Helpline.
            </p>
          </div>
        </div>

        <div className="bg-red-900/90 border border-red-700/80 p-4 rounded-2xl shrink-0 space-y-1 text-center sm:text-right w-full md:w-auto">
          <p className="text-[11px] text-red-200 font-bold uppercase">24/7 UGC National Helpline Toll-Free:</p>
          <a href="tel:18001805522" className="text-xl font-black text-amber-300 hover:underline block flex items-center justify-center sm:justify-end gap-1.5">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>1800-180-5522</span>
          </a>
          <p className="text-[10px] text-red-300">Email: helpline@antiragging.in</p>
        </div>
      </div>

      {/* Grid of 4 Core Statutory Committees */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Statutory AICTE & UGC Mandated Cells</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMITTEES_INFO.map((comm) => (
            <div key={comm.id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold">
                    {iconMap[comm.id]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{comm.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold">UGC / AICTE Statutory Mandate</p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{comm.description}</p>
              </div>

              <div className="pt-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-[#252528]">Presiding Nodal Officer / Chairperson:</p>
                <p className="text-slate-800 font-medium">{comm.contactPerson}</p>
                <p className="text-amber-800 font-bold flex items-center gap-1 mt-1">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>Direct Cell: {comm.phone}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Internal Governance Cells */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <Users className="w-4 h-4 text-amber-600" />
          <span>Internal Academic & Campus Governance Squads</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalCommittees.map((cell, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{cell.title}</h3>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {cell.mandate}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500">{cell.membersCount} Members</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{cell.desc}</p>

              <div className="pt-2 text-xs border-t border-slate-100 flex items-center justify-between text-slate-700">
                <span className="font-semibold text-slate-800">Convener: {cell.head}</span>
                <span className="font-bold text-amber-800">{cell.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidential Online Grievance Submission Box */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-8 sm:p-10 border border-amber-400/40/30 shadow-2xl space-y-6">
        <div className="border-b border-[#dedcd7]/20 pb-4">
          <div className="inline-flex items-center gap-2 text-[#d3d1cc] font-bold text-xs uppercase mb-1">
            <FileText className="w-4 h-4" />
            <span>Official Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Confidential Online Grievance Submission</h2>
          <p className="text-xs text-white/70 mt-1">
            Directly routed to the Principal &amp; Grievance Redressal Nodal Committee for confidential investigation.
          </p>
        </div>

        {grievanceSubmitted ? (
          <div className="bg-[#28272b] border border-amber-400/40/30 rounded-2xl p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#d3d1cc] mx-auto" />
            <h3 className="font-bold text-white text-lg">Grievance Ticket Successfully Registered</h3>
            <p className="text-xs text-white/70 max-w-lg mx-auto">
              Your ticket reference has been transmitted to the Grievance Redressal Nodal Committee. Strict confidentiality will be maintained.
            </p>
            <button
              onClick={() => setGrievanceSubmitted(false)}
              className="px-5 py-2.5 bg-[#48474b] hover:bg-[#59575d] text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleGrievanceSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-white/90 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={grievanceData.name}
                onChange={(e) => setGrievanceData({ ...grievanceData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
              />
            </div>

            <div>
              <label className="block text-white/90 font-semibold mb-1">Role / Affiliation</label>
              <select
                value={grievanceData.role}
                onChange={(e) => setGrievanceData({ ...grievanceData, role: e.target.value })}
                className="w-full px-4 py-3 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
              >
                <option value="Student">Enrolled Student</option>
                <option value="Parent">Parent / Guardian</option>
                <option value="Faculty">Faculty / Staff Member</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-white/90 font-semibold mb-1">Grievance Category</label>
              <select
                value={grievanceData.category}
                onChange={(e) => setGrievanceData({ ...grievanceData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
              >
                <option value="Academic">Academic / Examinations / Internal Assessment</option>
                <option value="Hostel">Hostel &amp; Mess Amenities</option>
                <option value="Transport">Bus Fleet &amp; Transport Service</option>
                <option value="Anti-Ragging">Anti-Ragging / Harassment Report</option>
                <option value="General">General Infrastructure Inquiry</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-white/90 font-semibold mb-1">Grievance / Inquiry Description *</label>
              <textarea
                required
                rows={4}
                value={grievanceData.message}
                onChange={(e) => setGrievanceData({ ...grievanceData, message: e.target.value })}
                placeholder="Provide specific details regarding your concern..."
                className="w-full px-4 py-3 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#48474b] hover:bg-[#59575d] text-white font-black uppercase tracking-wider rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/40/20"
              >
                <Send className="w-4 h-4 text-white" />
                Transmit Confidential Grievance Ticket
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
