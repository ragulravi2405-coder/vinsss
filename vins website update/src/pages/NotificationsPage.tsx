import React, { useState } from 'react';
import { NOTIFICATIONS_DATA, CollegeNotification } from '../data/notificationsData';
import { Bell, Search, Filter, Calendar, FileText, Download, ShieldCheck, ChevronRight, CheckCircle2, Megaphone, Sparkles, X } from 'lucide-react';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';
import { useAdminData } from '../context/AdminDataContext';

interface NotificationsPageProps {
  onNavigateAdmission?: (tab: 'admissions') => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigateAdmission }) => {
  const { notifications } = useAdminData();
  const allNotices = notifications && notifications.length > 0 ? notifications : NOTIFICATIONS_DATA;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pdfOnly, setPdfOnly] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<DocumentItem | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<CollegeNotification | null>(null);

  const categories = ['All', 'Admissions', 'Exams', 'Placements', 'Events', 'Circulars', 'Scholarships'];

  const filteredNotices = allNotices.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.issuedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPdf = !pdfOnly || !!item.pdfAttachment;
    return matchesSearch && matchesCategory && matchesPdf;
  });

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen pb-20 font-sans">
      
      {/* Top Header Banner - Strict Magenta Pink + White */}
      <div className="bg-[#0A2540] text-white py-12 border-b border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/30 tracking-widest font-cinzel">
                <Bell className="w-4 h-4 text-white animate-bounce" />
                <span>OFFICIAL INFORMATION HUB</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-playfair font-bold text-white tracking-tight">
                College Circulars &amp; Notifications
              </h1>
              <p className="text-xs sm:text-base text-white/95 max-w-2xl leading-relaxed font-medium">
                Stay updated with the latest live announcements, Anna University exam schedules, campus placement drives, admission notices, and downloadable official PDF circulars.
              </p>
            </div>

            {onNavigateAdmission && (
              <button
                onClick={() => onNavigateAdmission('admissions')}
                className="bg-white hover:bg-white/90 text-[#0A2540] text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg active:scale-95 shrink-0 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#0A2540]" />
                <span>Apply Online 2026-27</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#0A2540]/20 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#0A2540] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search circulars, exams, placement news..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#0A2540]/25 rounded-2xl text-sm text-[#0A2540] placeholder-[#0A2540]/50 font-bold focus:outline-none focus:border-[#0A2540]"
              />
            </div>

            {/* Checkbox for PDF attachments */}
            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-[#0A2540] bg-white px-4 py-2.5 rounded-2xl border-2 border-[#0A2540]/20 hover:border-[#0A2540] transition-colors">
              <input
                type="checkbox"
                checked={pdfOnly}
                onChange={(e) => setPdfOnly(e.target.checked)}
                className="w-4 h-4 text-[#0A2540] accent-[#0A2540] rounded"
              />
              <FileText className="w-4 h-4 text-[#0A2540]" />
              Show Only Notices with PDF Attachments
            </label>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                {cat === 'All' ? 'All Notices' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-[#0A2540]">
              Showing <span className="underline">{filteredNotices.length}</span> active circulars &amp; announcements
            </span>
            <span className="text-xs font-semibold text-[#0A2540]/70">Official VINS College Notices</span>
          </div>

          {filteredNotices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#0A2540]/20 space-y-3">
              <Bell className="w-12 h-12 text-[#0A2540]/40 mx-auto" />
              <h3 className="text-lg font-bold text-[#0A2540]">No Notifications Found</h3>
              <p className="text-sm text-[#0A2540]/70">Try adjusting your search criteria or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#0A2540]/20 shadow-xs hover:shadow-xl hover:border-[#0A2540] transition-all space-y-4 relative overflow-hidden"
                >
                  {/* Priority Ribbon */}
                  {notice.isUrgent && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0A2540]" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#0A2540] text-white border border-[#0A2540]">
                        {notice.category}
                      </span>

                      {notice.isNew && (
                        <span className="bg-white text-[#0A2540] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border-2 border-[#0A2540]">
                          NEW
                        </span>
                      )}

                      <span className="flex items-center gap-1.5 text-xs font-bold text-[#0A2540]/70 ml-2">
                        <Calendar className="w-4 h-4 text-[#0A2540]" />
                        {notice.date}
                      </span>
                    </div>

                    <span className="text-xs text-[#0A2540] font-bold bg-white border border-[#0A2540]/30 px-3.5 py-1 rounded-full self-start sm:self-auto">
                      Issued by: <strong>{notice.issuedBy}</strong>
                    </span>

                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] leading-snug hover:underline transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-[#0A2540]/85 leading-relaxed font-medium">
                      {notice.summary}
                    </p>
                  </div>

                  {/* Attachment Box & Buttons */}
                  <div className="pt-3 border-t-2 border-[#0A2540]/10 flex flex-wrap items-center justify-between gap-3">
                    
                    {notice.pdfAttachment ? (
                      <div className="flex items-center gap-2.5 bg-white border-2 border-[#0A2540]/20 px-3.5 py-2 rounded-2xl text-xs text-[#0A2540] font-bold">
                        <FileText className="w-4 h-4 text-[#0A2540] shrink-0" />
                        <span>Attached PDF: <strong>{notice.pdfAttachment.title}</strong> ({notice.pdfAttachment.fileSize})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#0A2540]/60 italic font-medium">No external document attached</span>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => setExpandedNotice(notice)}
                        className="px-4 py-2 bg-white hover:bg-[#0A2540] text-[#0A2540] hover:text-white border-2 border-[#0A2540]/30 font-bold rounded-full text-xs transition-all cursor-pointer"
                      >
                        Details
                      </button>

                      {notice.pdfAttachment && (
                        <button
                          onClick={() => setSelectedPdf(notice.pdfAttachment!)}
                          className="px-4 py-2 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold rounded-full text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-white" />
                          <span>View Circular</span>
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Notice Details Modal */}
      {expandedNotice && (
        <div className="fixed inset-0 z-50 bg-[#0A2540]/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-[#0A2540] space-y-0">
            <div className="bg-[#0A2540] text-white p-6 flex items-start justify-between">
              <div>
                <span className="bg-white text-[#0A2540] text-xs font-black uppercase px-3 py-1 rounded-full">
                  {expandedNotice.category}
                </span>
                <h3 className="font-playfair text-xl font-bold mt-3 text-white">{expandedNotice.title}</h3>
              </div>
              <button 
                onClick={() => setExpandedNotice(null)}
                className="p-1 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0A2540] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#0A2540] bg-white p-3.5 rounded-2xl border-2 border-[#0A2540]/20 font-bold">
                <span>Issued Date: {expandedNotice.date}</span>
                <span>Issued By: {expandedNotice.issuedBy}</span>
              </div>

              <p className="text-sm text-[#0A2540]/90 leading-relaxed bg-white p-4 rounded-2xl border-2 border-[#0A2540]/20 font-medium">
                {expandedNotice.fullDetails}
              </p>

              {expandedNotice.pdfAttachment && (
                <div className="bg-white border-2 border-[#0A2540]/30 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#0A2540] text-white rounded-2xl">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0A2540]">Official Circular Document (PDF)</h4>
                      <p className="text-[11px] text-[#0A2540]/80 font-medium">Click button to view or download full signed order.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPdf(expandedNotice.pdfAttachment!);
                    }}
                    className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold px-4 py-2.5 rounded-full text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>Open PDF</span>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white px-6 py-4 border-t-2 border-[#0A2540]/15 flex justify-end">
              <button
                onClick={() => setExpandedNotice(null)}
                className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold px-6 py-2 rounded-full text-xs transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal Viewer */}
      <DocumentViewerModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />

    </div>
  );
};
