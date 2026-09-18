import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Lock, Globe, X, ArrowRight, BookOpen, GraduationCap, Building2, FileText, Sparkles, Trophy, Award, Bell, ExternalLink } from 'lucide-react';
import { COLLEGE_INFO, DOCUMENTS_LIST } from '../../data/collegeData';
import { DEPARTMENTS_DATA } from '../../data/departmentsData';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { DocumentItem, CustomNavButton, NavigationTab } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';

interface TopBarProps {
  onNavigate?: (tab: string, anchorId?: string, departmentId?: string) => void;
  currentTab?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate, currentTab }) => {
  const { customNavButtons, siteTheme, documents } = useAdminData();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allDocs = documents && documents.length > 0 ? documents : DOCUMENTS_LIST;

  // Dynamic custom buttons for topbar
  const topbarButtons = customNavButtons.filter(b => b.location === 'topbar' && b.isActive);

  const renderButtonIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-3 h-3 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-3 h-3 text-sky-500" />;
      case 'Trophy': return <Trophy className="w-3 h-3 text-amber-500" />;
      case 'Award': return <Award className="w-3 h-3 text-emerald-500" />;
      case 'Bell': return <Bell className="w-3 h-3 text-rose-500 animate-pulse" />;
      case 'FileText': return <FileText className="w-3 h-3 text-indigo-500" />;
      case 'Globe': return <Globe className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const handleCustomButtonClick = (btn: CustomNavButton) => {
    if (btn.actionType === 'url' && btn.targetUrl) {
      if (btn.openInNewTab) {
        window.open(btn.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = btn.targetUrl;
      }
    } else if (btn.actionType === 'tab' && btn.targetTab) {
      onNavigate?.(btn.targetTab, btn.targetAnchor);
    }
  };

  // Search items list
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...DEPARTMENTS_DATA.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (d.shortName && d.shortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(d => ({
      type: 'Department',
      title: `${d.shortName ? `${d.shortName} - ` : ''}${d.name}`,
      subtitle: `Degree: ${d.degree} · Intake: ${d.intake} seats`,
      action: () => {
        onNavigate?.('department', undefined, d.id);
        setIsSearchOpen(false);
      }
    })),
    ...allDocs.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileType.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(doc => ({
      type: 'Official Document',
      title: doc.title,
      subtitle: `${doc.category || doc.fileType} · ${doc.fileSize}`,
      action: () => {
        setSelectedDoc(doc);
        setIsSearchOpen(false);
      }
    })),
    {
      type: 'Quick Page',
      title: 'Admissions 2026-2027 (Code: 4982)',
      subtitle: 'Eligibility, Fees & Online Application',
      action: () => {
        onNavigate?.('admissions', 'online-form');
        setIsSearchOpen(false);
      }
    },
    {
      type: 'Quick Page',
      title: 'Placements & Top Recruiters',
      subtitle: 'Placement statistics, training & corporate partners',
      action: () => {
        onNavigate?.('placement');
        setIsSearchOpen(false);
      }
    },
    {
      type: 'Quick Page',
      title: 'NAAC & Accreditation',
      subtitle: 'SSR, IIQA, Certificates & AQAR Reports',
      action: () => {
        onNavigate?.('naac');
        setIsSearchOpen(false);
      }
    }
  ].slice(0, 8);

  return (
    <>
      {/* Top Bar - Layer 2: Glassmorphic Deep Navy Blue (#0A2540) with 3D Depth */}
      <div className="bg-[#0A2540] text-white text-[11px] sm:text-[13px] border-b border-white/15 select-none">
        <div className="max-w-[1600px] mx-auto px-2.5 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-2">
          
          {/* Left: Email & Phone Number with Interactive 3D Lift */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[13px] font-medium text-white/95 min-w-0">
            <a 
              href="tel:+914651255000" 
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-amber-400/40 hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-semibold group-hover:text-amber-200 transition-colors">+91 4651 255 000</span>
            </a>

            <span className="hidden min-[480px]:inline text-white/30">|</span>

            <a 
              href="mailto:info@vinschristiancollege.in" 
              className="hidden min-[420px]:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-amber-400/40 hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap truncate max-w-[170px] sm:max-w-none cursor-pointer"
            >
              <Mail className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FF6B00] group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate group-hover:text-amber-200 transition-colors">info@vinschristiancollege.in</span>
            </a>
          </div>

          {/* Right: Social Icons & 3D Admin Portal Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-white font-medium text-[11px] sm:text-[13px] shrink-0">
            {/* Social Icons with Smooth Hover Lift */}
            <div className="hidden min-[640px]:flex items-center gap-1.5 text-white">
              <a 
                href="#" 
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FF6B00] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer" 
                title="Facebook"
              >
                <span className="font-bold text-[11px]">f</span>
              </a>
              <a 
                href="#" 
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FF6B00] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer" 
                title="Instagram"
              >
                <span className="font-bold text-[10px]">📷</span>
              </a>
              <a 
                href="#" 
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FF6B00] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer" 
                title="YouTube"
              >
                <span className="font-bold text-[10px]">▶</span>
              </a>
              <span className="text-white/30 ml-1">|</span>
            </div>

            {/* Admin Portal Button with Tactile 3D Click */}
            <button 
              onClick={() => onNavigate?.('admin')}
              className="bg-[#FF6B00] hover:bg-[#E05E00] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-[10px] sm:text-xs"
              title="Open Admin Content Portal"
            >
              <Lock className="w-3 h-3 text-white shrink-0" />
              <span>Admin Portal</span>
            </button>
          </div>

        </div>
      </div>

      {/* QUICK SEARCH MODAL - Mobile Responsive */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A2540]/80 backdrop-blur-sm flex items-start justify-center pt-8 sm:pt-20 p-3 sm:p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#0A2540] w-full max-w-sm sm:max-w-2xl rounded-3xl shadow-2xl overflow-hidden text-[#0A2540] font-sans">
            <div className="p-3.5 sm:p-4 border-b-2 border-[#0A2540]/15 flex items-center gap-2 sm:gap-3 bg-[#0A2540]">
              <Search className="w-4 sm:w-5 h-4 sm:h-5 text-white shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search departments, admissions..."
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-white/70"
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-1 text-white hover:bg-white/20 rounded-full shrink-0 cursor-pointer"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto p-3 sm:p-4 space-y-2 bg-white">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-4 sm:py-6 text-[#0A2540] space-y-2">
                  <p className="text-xs sm:text-sm font-medium">Quickly search across VINS College portal</p>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-2">
                    {['CSE', 'Mechanical', 'Admissions', 'Placement', 'AICTE', 'NAAC'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 bg-[#0A2540]/10 hover:bg-[#0A2540] hover:text-white rounded-full text-xs font-bold text-[#0A2540] transition-colors cursor-pointer border-2 border-[#0A2540]/20"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1.5">
                  {searchResults.map((res, i) => (
                    <div
                      key={i}
                      onClick={res.action}
                      className="p-3 rounded-2xl bg-white hover:bg-[#1E40AF]/10 border-2 border-[#0A2540]/20 hover:border-[#1E40AF] cursor-pointer flex items-center justify-between group transition-all active:scale-95"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider block">
                          {res.type}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate">
                          {res.title}
                        </h4>
                        <p className="text-xs text-[#0A2540]/70 truncate">{res.subtitle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0A2540] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-[#0A2540]">
                  <p className="text-xs sm:text-sm font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="p-2.5 sm:p-3 bg-white border-t-2 border-[#0A2540]/15 flex items-center justify-between text-xs text-[#0A2540] font-bold">
              <span>Press ESC to close</span>
              <span className="hidden sm:inline text-[#FF6B00] counselling-badge">Counselling Code: 4982</span>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};

