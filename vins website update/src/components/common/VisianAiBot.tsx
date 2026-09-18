import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, 
  ExternalLink, ArrowRight, Bot, GraduationCap, Building, Briefcase, 
  Phone, Bus, Award, BookOpen, ShieldCheck, MapPin, Smile
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    tab: NavigationTab;
    anchorId?: string;
  };
}

interface VisianAiBotProps {
  onNavigate?: (tab: NavigationTab, anchorId?: string, departmentId?: string) => void;
}

const QUICK_PROMPTS = [
  { icon: '🎓', label: 'Admissions 2027', query: 'How to apply for admission in VINS?' },
  { icon: '🏛️', label: 'TNEA Code', query: 'What is the Anna University Counselling Code?' },
  { icon: '💻', label: 'Courses & Depts', query: 'What courses and departments are offered?' },
  { icon: '💼', label: 'Placements', query: 'Tell me about VINS campus placements and salary packages' },
  { icon: '🚌', label: 'Bus Routes', query: 'Is college bus transport available?' },
  { icon: '🏡', label: 'Hostel & Mess', query: 'Are hostel facilities available for boys and girls?' },
  { icon: '📞', label: 'Contact Help', query: 'Where is VINS located and how to contact?' },
];

export const VisianAiBot: React.FC<VisianAiBotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Vanakkam! I'm Visian 🤖, your official AI assistant for VINS Christian College of Engineering, Nagercoil. How can I help you today? You can ask me anything about admissions, courses, fees, placements, hostel, or bus routes!",
      timestamp: 'Just now',
    },
  ]);

  // Hide greeting bubble after 10 seconds or when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowGreetingBubble(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-fresh',
        sender: 'bot',
        text: "Chat cleared! I'm ready to answer any questions about VINS College. What would you like to know?",
        timestamp: 'Just now',
      },
    ]);
  };

  // Comprehensive Knowledge-Based AI Response Engine
  const generateBotResponse = (query: string): { text: string; actionButton?: Message['actionButton'] } => {
    const q = query.toLowerCase().trim();

    // 1. TNEA Counselling Code
    if (q.includes('tnea') || q.includes('counselling code') || q.includes('counseling code') || q.includes('college code') || q.includes('anna university code') || (q.includes('code') && (q.includes('tnea') || q.includes('vins')))) {
      return {
        text: "🏛️ **VINS Anna University Counselling Code is: 4982**\n\nWhen applying for Tamil Nadu Engineering Admissions (TNEA) single-window counselling, select College Code **4982** (VINS Christian College of Engineering, Chunkankadai, Nagercoil). Both Government Quota and Management seats are available.",
        actionButton: {
          label: 'Open Admissions Desk',
          tab: 'admissions',
          anchorId: 'online-form',
        },
      };
    }

    // 2. Admissions & Eligibility
    if (q.includes('admission') || q.includes('apply') || q.includes('eligib') || q.includes('join') || q.includes('seat') || q.includes('cutoff') || q.includes('cut off') || q.includes('12th') || q.includes('direct admission') || q.includes('lateral')) {
      return {
        text: "🎓 **Admissions 2027-2028 at VINS College are Open!**\n\n• **B.E. / B.Tech (4 Years):** Passed 10+2 with Physics, Chemistry & Mathematics (PCM).\n• **Lateral Entry (3 Years):** Direct 2nd-year admission for Diploma & B.Sc graduates.\n• **Postgraduate (M.E. & MBA):** Recognized Bachelor's degree in relevant discipline.\n• **TNEA Code:** 4982\n\nYou can fill the direct online inquiry form right now to block your preferred branch!",
        actionButton: {
          label: 'Apply Online Now',
          tab: 'admissions',
          anchorId: 'online-form',
        },
      };
    }

    // 3. Courses / Departments
    if (q.includes('course') || q.includes('department') || q.includes('branch') || q.includes('cse') || q.includes('computer') || q.includes('ai') || q.includes('artificial intelligence') || q.includes('data science') || q.includes('ece') || q.includes('eee') || q.includes('mech') || q.includes('civil') || q.includes('biomedical') || q.includes('robotics') || q.includes('mba') || q.includes('pg') || q.includes('ug')) {
      return {
        text: "💻 **Programmes Offered at VINS College:**\n\n**Undergraduate (B.E. / B.Tech):**\n1. B.E. Computer Science & Engineering (CSE)\n2. B.Tech Artificial Intelligence & Data Science (AI & DS)\n3. B.E. Robotics & Automation\n4. B.Tech Biomedical Engineering (BME)\n5. B.E. Electronics & Communication Engineering (ECE)\n6. B.E. Electrical & Electronics Engineering (EEE)\n7. B.E. Mechanical Engineering (MECH)\n8. B.E. Civil Engineering (CIVIL)\n\n**Postgraduate:**\n• Master of Business Administration (MBA)\n• M.E. in Specialised Engineering disciplines",
        actionButton: {
          label: 'View All Departments',
          tab: 'department',
        },
      };
    }

    // 4. Placements & Salary Packages
    if (q.includes('placement') || q.includes('package') || q.includes('salary') || q.includes('recruit') || q.includes('job') || q.includes('company') || q.includes('companies') || q.includes('tcs') || q.includes('zoho') || q.includes('wipro') || q.includes('infosys') || q.includes('highest')) {
      return {
        text: "💼 **VINS Placement Highlights:**\n\n• **96%+ Placement Record** across engineering streams.\n• **Top Recruiters:** TCS, Infosys, Wipro, Cognizant, Zoho, HCL, Accenture, Mindtree, Tech Mahindra, Sutherland, Hexaware, and more.\n• **Dedicated Training:** Full-time Corporate Relations cell offering coding bootcamps, Aptitude prep, soft skills training, and guaranteed campus interview opportunities.",
        actionButton: {
          label: 'Explore Placement Statistics',
          tab: 'placement',
        },
      };
    }

    // 5. Fees & Scholarships
    if (q.includes('fee') || q.includes('cost') || q.includes('scholarship') || q.includes('first graduate') || q.includes('concession') || q.includes('sc/st') || q.includes('bc/mbc') || q.includes('sports quota') || q.includes('discount')) {
      return {
        text: "💰 **Tuition Fees & Scholarships at VINS:**\n\n• Government prescribed tuition fees structure for TNEA quota seats.\n• **First Graduate (FG) Concession:** Full fee reduction as per Tamil Nadu Government norms.\n• **Merit Scholarships:** Generous fee waivers for students with outstanding 12th marks.\n• **Post-Matric Scholarships:** For SC/ST/SCC and BC/MBC/DNC students.\n• **Sports Quota Scholarships:** Attractive concessions for district/state/national athletes.",
        actionButton: {
          label: 'View Scholarship Schemes',
          tab: 'admissions',
          anchorId: 'scholarships',
        },
      };
    }

    // 6. Bus Routes & Transportation
    if (q.includes('bus') || q.includes('transport') || q.includes('route') || q.includes('van') || q.includes('travel') || q.includes('pick up') || q.includes('pickup')) {
      return {
        text: "🚌 **Extensive College Bus Fleet (40+ Buses):**\n\nDaily pickup and drop transportation covers all major routes:\n• Nagercoil Town, Chunkankadai, Asaripallam\n• Marthandam, Kuzhithurai, Kaliyakkavilai, Parasala (Kerala Border)\n• Thuckalay, Padmanabhapuram, Karungal, Colachel\n• Kanyakumari, Suchindram, Radhapuram, Vallioor (Tirunelveli)\n• Karungal, Manavalakurichi, Monday Market\n\nSafe and punctual transportation for all day-scholar students and faculty.",
        actionButton: {
          label: 'Check Campus Facilities',
          tab: 'facilities',
        },
      };
    }

    // 7. Hostel & Mess
    if (q.includes('hostel') || q.includes('mess') || q.includes('food') || q.includes('stay') || q.includes('room') || q.includes('living') || q.includes('accommodation') || q.includes('canteen')) {
      return {
        text: "🏡 **Hostel & Living Facilities:**\n\n• **Separate Hostels:** Secure, modern hostels for Boys and Girls on campus.\n• **Food & Mess:** Hygienic, nutritious vegetarian and non-vegetarian meals prepared in steam-equipped kitchens.\n• **Amenities:** 24x7 security surveillance (CCTV), Wi-Fi internet, study halls, recreation rooms, hot water, and medical care assistance.",
        actionButton: {
          label: 'Explore Hostels & Campus',
          tab: 'campus',
        },
      };
    }

    // 8. Campus & Infrastructure (Labs, Library, Sports)
    if (q.includes('campus') || q.includes('facility') || q.includes('facilities') || q.includes('library') || q.includes('lab') || q.includes('sports') || q.includes('ground') || q.includes('gym') || q.includes('wifi') || q.includes('infrastructure')) {
      return {
        text: "🏛️ **World-Class Campus Infrastructure:**\n\n• **Central Library:** 50,000+ technical volumes, IEEE/Elsevier digital journals, DELNET e-books.\n• **Advanced Laboratories:** AI & Robotics Lab, Apple iMac Lab, IoT Embedded Studio, Heavy Machines Workshop.\n• **Sports Complex:** Cricket ground, football turf, volleyball, badminton, indoor gymnasium.\n• **Campus:** Lush green, Wi-Fi enabled, with solar power and spacious auditoriums.",
        actionButton: {
          label: 'View Campus Infrastructure',
          tab: 'facilities',
        },
      };
    }

    // 9. Contact, Location, Address
    if (q.includes('contact') || q.includes('location') || q.includes('address') || q.includes('phone') || q.includes('number') || q.includes('email') || q.includes('where') || q.includes('reach') || q.includes('direction') || q.includes('map')) {
      return {
        text: "📍 **Contact VINS Christian College of Engineering:**\n\n• **Address:** Vins Nagar, Chunkankadai, Nagercoil, Kanyakumari District, Tamil Nadu - 629003.\n• **Landline:** 04652 - 232560 / 232561\n• **Admission Helpline:** +91 94431 00000 / 94899 00000\n• **Official Email:** info@vinsengg.ac.in / admissions@vinsengg.ac.in\n• **Nearest Railway Station:** Nagercoil Town / Nagercoil Junction (5 km)",
        actionButton: {
          label: 'Open Contact & Location Page',
          tab: 'contact',
        },
      };
    }

    // 10. NAAC & Accreditation
    if (q.includes('naac') || q.includes('accredit') || q.includes('aicte') || q.includes('approval') || q.includes('ranking') || q.includes('affiliation')) {
      return {
        text: "⭐ **Accreditations & Recognitions:**\n\n• **NAAC Accredited:** Recognized for academic quality, research, and campus governance.\n• **AICTE Approved:** Approved by the All India Council for Technical Education, New Delhi.\n• **Anna University Affiliated:** Curriculum and degree examinations governed by Anna University, Chennai.\n• **TNEA Code:** 4982",
        actionButton: {
          label: 'View NAAC Accreditation',
          tab: 'naac',
        },
      };
    }

    // 11. Greetings & Pleasantries
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('vanakkam') || q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening') || q.includes('who are you') || q.includes('name')) {
      return {
        text: "Hello! Vanakkam! 😊 I am **Visian**, the AI assistant for VINS Christian College of Engineering. I can assist you with courses, counselling code 4982, online admissions, campus facilities, placements, and hostel details. What would you like to explore today?",
      };
    }

    // 12. Thanks / Gratitude
    if (q.includes('thank') || q.includes('nandri') || q.includes('ok') || q.includes('super') || q.includes('good') || q.includes('great')) {
      return {
        text: "You are most welcome! 😊 If you have any more doubts about VINS College, please feel free to ask anytime. Wishing you the best in your engineering career!",
        actionButton: {
          label: 'Apply for Admissions',
          tab: 'admissions',
        },
      };
    }

    // 13. General / Fallback Smart Response
    return {
      text: `Thank you for asking! VINS Christian College of Engineering (TNEA Code 4982, Chunkankadai, Nagercoil) offers high-demand engineering degrees (CSE, AI & DS, Robotics, ECE, EEE, MECH, Civil, Biomedical) and MBA with 96%+ placement track record.\n\nFor specific guidance on "${query}", our Admission Helpline is ready to assist you directly:\n📞 **+91 94431 00000**\n✉️ **admissions@vinsengg.ac.in**`,
      actionButton: {
        label: 'Submit Admission Inquiry',
        tab: 'admissions',
        anchorId: 'online-form',
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and realistic response
    setTimeout(() => {
      const { text: responseText, actionButton } = generateBotResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: 'Just now',
        actionButton,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionButtonClick = (action: Message['actionButton']) => {
    if (!action) return;
    if (onNavigate) {
      onNavigate(action.tab, action.anchorId);
    }
    // On mobile, close chat window so user sees the page
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ── 1. FLOATING CUTE VISIAN BOT BUTTON (BOTTOM-RIGHT) ── */}
      <div 
        className="fixed z-40 pointer-events-auto transition-all duration-300 right-3 bottom-20 sm:right-6 sm:bottom-24"
        style={{ bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom, 1rem) + 4.5rem))' }}
      >
        <div className="relative flex items-center justify-end">
          
          {/* Cute Floating Greeting Speech Bubble */}
          <AnimatePresence>
            {showGreetingBubble && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.85 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={handleOpen}
                className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 cursor-pointer bg-white text-[#0A2540] px-3.5 py-2 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-2 whitespace-nowrap group hover:scale-105 transition-transform"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-[#0A2540]">
                  Hi! I'm <strong className="text-[#FF6B00]">Visian 🤖</strong> Got questions?
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGreetingBubble(false);
                  }}
                  className="w-4 h-4 rounded-full text-slate-400 hover:text-slate-700 flex items-center justify-center text-[10px] ml-1"
                  aria-label="Close tooltip"
                >
                  ✕
                </button>

                {/* Speech Bubble Arrow */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-amber-400/50 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cute Robot Mascot Button */}
          <motion.button
            onClick={isOpen ? handleClose : handleOpen}
            aria-label={isOpen ? "Close Visian AI" : "Open Visian AI Chat"}
            title="Chat with Visian AI"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0A2540] via-[#0F365E] to-[#FF6B00] p-1 shadow-2xl hover:shadow-[0_12px_30px_rgba(255,107,0,0.55)] border-2 border-amber-300 transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            {/* Ambient Animated Glow Ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/50 via-[#FF6B00]/50 to-amber-300/50 blur-sm opacity-70 group-hover:opacity-100 animate-pulse pointer-events-none" />

            {/* Inner Avatar Container */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img
                src="/images/bot/visian.png"
                alt="Visian AI Robot"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to bot icon if image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Bot className="w-7 h-7 text-[#FF6B00] hidden only:block" />
            </div>

            {/* Online Green Pulsing Indicator Badge */}
            <div className="absolute top-0 right-0 z-20 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>

            {/* Bot Mini Tag Label */}
            <div className="absolute -bottom-1.5 z-20 px-2 py-0.5 rounded-full bg-[#0A2540] text-amber-300 border border-amber-400/60 text-[9px] font-black tracking-wider uppercase shadow-md leading-none">
              VISIAN
            </div>
          </motion.button>

        </div>
      </div>

      {/* ── 2. VISIAN AI INTERACTIVE CHAT WINDOW MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 25 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 right-2 bottom-3 sm:right-6 sm:bottom-6 w-[95vw] sm:w-[420px] max-w-[430px] h-[84vh] sm:h-[580px] max-h-[640px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(10,37,64,0.35)] border border-amber-400/40 flex flex-col overflow-hidden font-sans select-none"
            style={{ 
              bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.25))'
            }}
          >
            {/* CHAT HEADER */}
            <div className="relative bg-gradient-to-r from-[#0A2540] via-[#0F365E] to-[#0A2540] text-white p-3.5 sm:p-4 border-b border-amber-400/30 flex items-center justify-between shadow-md">
              {/* Top Accent Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-[#FF6B00] to-amber-400" />

              <div className="flex items-center gap-3 min-w-0">
                {/* Robot Avatar in Header */}
                <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-br from-amber-400 to-[#FF6B00] shadow-md shrink-0">
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src="/images/bot/visian.png"
                      alt="Visian"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-playfair font-black text-sm sm:text-base text-white tracking-wide truncate">
                      Visian AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded-md bg-[#FF6B00] text-[9px] font-black uppercase text-white tracking-wider">
                      BOT
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    VINS Campus Intelligence
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  title="Minimize chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QUICK SUGGESTION CHIPS BAR */}
            <div className="bg-[#f8f9fc] border-b border-gray-200/80 px-2.5 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.query)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-[#0A2540] hover:text-[#FF6B00] border border-gray-200 hover:border-amber-400/60 text-[11px] font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <span>{qp.icon}</span>
                  <span>{qp.label}</span>
                </button>
              ))}
            </div>

            {/* MESSAGE STREAM LIST */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-slate-50 via-white to-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-[13px] leading-relaxed select-text shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#0A2540] to-[#0F365E] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-amber-400/30 rounded-tl-none shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {/* Bot Avatar Icon on Bot Messages */}
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-amber-200/60 text-[11px] font-bold text-[#FF6B00]">
                        <Bot className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Visian</span>
                      </div>
                    )}

                    {/* Message Content with simple formatting */}
                    <div className="whitespace-pre-line space-y-1.5">
                      {msg.text}
                    </div>

                    {/* Action Button Navigation Shortcut */}
                    {msg.actionButton && (
                      <div className="mt-2.5 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleActionButtonClick(msg.actionButton)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-xs shadow-md transition-all cursor-pointer group"
                        >
                          <span>{msg.actionButton.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator Bubble */}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="bg-white border border-amber-300 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#FF6B00] animate-bounce" />
                    <span className="text-xs text-slate-500 font-medium">Visian is typing</span>
                    <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-ping" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT FIELD BAR */}
            <div className="p-2.5 sm:p-3 bg-white border-t border-gray-200/80 shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about admissions, code 4982, courses..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md ${
                    inputValue.trim()
                      ? 'bg-gradient-to-tr from-[#0A2540] to-[#FF6B00] text-white hover:scale-105 active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Small Bot Disclaimer */}
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span>VINS AI Academic Assistant • Anna Univ Code 4982</span>
                <span className="font-semibold text-emerald-600">● Live</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
