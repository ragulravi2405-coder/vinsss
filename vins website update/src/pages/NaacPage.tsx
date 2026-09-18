import React, { useState } from 'react';
import { 
  Award, FileText, CheckCircle2, ShieldCheck, Download, Users, Sparkles, ExternalLink, Play, Video, Image as ImageIcon
} from 'lucide-react';
import { NAAC_CRITERIA, IQAC_MEMBERS, RTI_MEMBERS, DOCUMENTS_LIST } from '../data/collegeData';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface NaacPageProps {
  initialView?: 'naac' | 'iqac';
}

export const NaacPage: React.FC<NaacPageProps> = ({ initialView = 'naac' }) => {
  const [activeTab, setActiveTab] = useState<'naac' | 'iqac' | 'rti'>(initialView === 'iqac' ? 'iqac' : 'naac');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const institutionalRecords = [
    'DVV Clarifications', 'Extended Profile', 'Best Practices', 'Institutional Distinctiveness',
    'Stakeholders Feedback', 'Capacity Building Programs', 'Institutional Perspective Plan', 'Annual Quality Reports'
  ];

  const naacGallery = [
    { title: 'NAAC Inspection & Peer Team Review', path: 'src/assets/images/naac/gallery1.jpg' },
    { title: 'IQAC Quality Enhancement Workshop', path: 'src/assets/images/naac/gallery2.jpg' },
    { title: 'Academic & Administrative Audit (AAA)', path: 'src/assets/images/naac/gallery3.jpg' },
    { title: 'Outcome Based Education (OBE) Seminar', path: 'src/assets/images/naac/gallery4.jpg' }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header Banner - Premium */}
        <ScrollReveal direction="up" distance={20}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="badge-academic bg-white/15 text-white border border-white/30 relative z-10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>INTERNAL QUALITY ASSURANCE CELL (IQAC)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight relative z-10">
              NAAC Accreditation &amp; Quality Cell (IQAC)
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed relative z-10">
              Developing a conscious, consistent, and catalytic system for academic excellence, statutory audits, and quality culture at VINS Christian College of Engineering.
            </p>

          {/* Action Buttons: Official NAAC SSR Portal Link & Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.vinsengineeringcollege.org/naac/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-white/90 text-[#0A2540] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#0A2540]" />
              Official NAAC Portal &amp; SSR (Click Here)
            </a>

            <div className="flex items-center gap-2 bg-white/15 p-1 rounded-full border border-white/25">
              <button
                onClick={() => setActiveTab('naac')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'naac' ? 'bg-white text-[#0A2540] shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                NAAC Criteria &amp; SSR
              </button>

              <button
                onClick={() => setActiveTab('iqac')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'iqac' ? 'bg-white text-[#0A2540] shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                IQAC Composition
              </button>

              <button
                onClick={() => setActiveTab('rti')}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'rti' ? 'bg-white text-[#0A2540] shadow-md' : 'text-white hover:bg-white/10'
                }`}
              >
                RTI Committee
              </button>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Video Embed Section */}
        <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/20 pb-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0A2540] flex items-center justify-center font-bold">
                <Video className="w-5 h-5 text-[#0A2540]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-playfair">VINS Campus &amp; Academic Video</h2>
                <p className="text-xs text-white/80">Institutional Overview &amp; Accreditation Video Showcase</p>
              </div>
            </div>

            <a
              href="https://youtu.be/LtP5bsUIWew?si=_WX5lBdkREoxqx1B"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-[#0A2540] hover:bg-white/90 text-xs font-bold rounded-full transition-all flex items-center gap-2 self-start sm:self-auto shadow-md"
            >
              <Play className="w-4 h-4 fill-current text-[#0A2540]" />
              Watch on YouTube
            </a>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white border-2 border-white/30 relative">
            <iframe
              src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew"
              title="VINS Engineering College Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* View 1: NAAC Criteria */}
        {activeTab === 'naac' && (
          <div className="space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NAAC_CRITERIA.map((crit) => (
                <div
                  key={crit.id}
                  className="bg-white rounded-3xl p-6 border-2 border-[#0A2540]/20 shadow-sm hover:shadow-xl hover:border-[#0A2540] transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-black text-base shadow-sm">
                      0{crit.id}
                    </div>

                    <h3 className="font-bold text-[#0A2540] text-lg leading-snug">
                      {crit.title}
                    </h3>

                    <p className="text-xs text-[#0A2540]/90 leading-relaxed font-medium">{crit.description}</p>

                    <div className="pt-2 border-t-2 border-[#0A2540]/10 space-y-1.5">
                      <p className="text-xs font-bold text-[#0A2540]">Key Quality Indicators:</p>
                      <ul className="text-xs text-[#0A2540]/90 space-y-1 font-medium">
                        {crit.keyIndicators.map((ind, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2540] shrink-0 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-[#0A2540]/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0A2540]/70">Criterion 0{crit.id} SSR PDF</span>
                    <a
                      href="https://www.vinsengineeringcollege.org/naac/index.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#0A2540] text-white text-xs font-bold rounded-full hover:bg-[#0A2540]/90 flex items-center gap-1 shadow-xs transition-all"
                    >
                      View SSR
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Records & SSR Links */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#0A2540]/15 pb-4 gap-3">
                <div>
                  <h3 className="font-bold text-[#0A2540] text-xl font-playfair">
                    Institutional Quality Reports &amp; Disclosures
                  </h3>
                  <p className="text-xs text-[#0A2540]/80 font-medium">Official statutory documentation submitted to NAAC</p>
                </div>
                <a
                  href="https://www.vinsengineeringcollege.org/naac/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold text-xs rounded-full transition-all flex items-center gap-2 shadow-md self-start sm:self-auto"
                >
                  <ExternalLink className="w-4 h-4" />
                  NAAC Portal Link
                </a>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {institutionalRecords.map((rec, idx) => (
                  <a
                    key={idx}
                    href="https://www.vinsengineeringcollege.org/naac/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-white hover:bg-[#0A2540] text-[#0A2540] hover:text-white border-2 border-[#0A2540]/20 hover:border-[#0A2540] font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
                  >
                    <FileText className="w-4 h-4 text-current" />
                    {rec}
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* View 2: IQAC Overview & Members */}
        {activeTab === 'iqac' && (
          <div className="space-y-8">
            
            {/* About IQAC Text */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">ABOUT IQAC</h2>
                  <p className="text-xs text-[#0A2540] font-bold">Established 2nd July 2019</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">
                <p>
                  The IQAC of the college was established on <strong>2nd July 2019</strong> after a year&apos;s time of inspection of the college. The prime task of the IQAC is to develop a system for conscious, consistent and catalytic improvement in the overall performance of the Institution. The cell precisely plans the quality initiatives of the institution by ensuring the quality culture, institutionalizing and internalizing quality parameters in adherence to the norms of National Assessment and Accreditation Council of India.
                </p>
                <p>
                  Since quality enhancement is a continuous process, IQAC meets regularly, conducts academic and administrative audits and ensures timely submission of records to accreditation and ranking bodies.
                </p>
              </div>
            </div>

            {/* 10 IQAC Members Table */}
            <div className="bg-white rounded-3xl border-2 border-[#0A2540]/20 overflow-hidden shadow-md space-y-4 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b-2 border-[#0A2540]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0A2540]" />
                  <h3 className="font-bold text-[#0A2540] text-lg font-playfair">Composition of IQAC Members</h3>
                </div>
                <span className="text-xs font-bold text-[#0A2540] bg-white px-3 py-1 rounded-full border border-[#0A2540]/20">AY 2025-26</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border-2 border-[#0A2540]/20">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A2540] text-white font-bold">
                    <tr>
                      <th className="p-3.5 text-center w-16">S.No</th>
                      <th className="p-3.5">Member Name</th>
                      <th className="p-3.5">Designation</th>
                      <th className="p-3.5">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0A2540]/15 text-[#0A2540] font-semibold">
                    {IQAC_MEMBERS.map((m) => (
                      <tr key={m.sNo} className="hover:bg-[#0A2540]/5 transition-colors">
                        <td className="p-3.5 text-center font-black">{m.sNo}</td>
                        <td className="p-3.5 font-bold text-base">{m.name}</td>
                        <td className="p-3.5 text-xs">{m.designation}</td>
                        <td className="p-3.5">
                          <span className="px-3 py-1 rounded-full bg-[#0A2540] text-white font-bold text-[11px]">
                            {m.position}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* View 3: RTI Members */}
        {activeTab === 'rti' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-6">
            <div className="border-b-2 border-[#0A2540]/15 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">Right to Information (RTI) Members</h2>
                <p className="text-xs text-[#0A2540]/80 font-medium">Statutory Disclosure &amp; Grievance Redressal Cell</p>
              </div>
              <span className="px-4 py-1.5 bg-[#0A2540] text-white font-bold text-xs rounded-full">
                Statutory Body
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#0A2540] text-white p-5 rounded-2xl space-y-1 shadow-md">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Chairperson</span>
                <p className="font-bold text-base text-white">{RTI_MEMBERS.chairperson.name}</p>
                <p className="text-white/90">{RTI_MEMBERS.chairperson.role}</p>
              </div>

              <div className="bg-[#0A2540] text-white p-5 rounded-2xl space-y-1 shadow-md">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Management Rep</span>
                <p className="font-bold text-base text-white">{RTI_MEMBERS.managementRep.name}</p>
                <p className="text-white/90">{RTI_MEMBERS.managementRep.role}</p>
              </div>

              <div className="bg-[#0A2540] text-white p-5 rounded-2xl space-y-1 shadow-md">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Co-ordinator</span>
                <p className="font-bold text-base text-white">{RTI_MEMBERS.coordinator.name}</p>
                <p className="text-white/90">{RTI_MEMBERS.coordinator.role}</p>
              </div>

              <div className="bg-[#0A2540] text-white p-5 rounded-2xl space-y-1 shadow-md">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Secretary</span>
                <p className="font-bold text-base text-white">{RTI_MEMBERS.secretary.name}</p>
                <p className="text-white/90">{RTI_MEMBERS.secretary.role}</p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#0A2540]/15 space-y-3">
              <h3 className="font-bold text-[#0A2540] text-base">Committee Members:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RTI_MEMBERS.members.map((mem, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 text-xs space-y-0.5 shadow-xs">
                    <p className="font-bold text-[#0A2540] text-sm">{mem.name}</p>
                    <p className="text-[#0A2540]/80 font-medium">{mem.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports & IQAC Photo Gallery Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0A2540]/20 shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-[#0A2540]/15 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0A2540] font-playfair">IQAC Quality Audit &amp; Review Gallery</h2>
              <p className="text-xs text-[#0A2540]/80 font-semibold">Inspection Sessions, Quality Workshops &amp; NAAC Seminars</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {naacGallery.map((g, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden aspect-video relative group border-2 border-[#0A2540]/20 shadow-xs hover:border-[#0A2540] transition-all">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600"
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-[#0A2540]/85 p-3 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-bold text-white leading-tight">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Modal */}
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      </div>
    </div>
  );
};
