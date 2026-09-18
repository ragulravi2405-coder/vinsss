import React, { useState } from 'react';
import { 
  Library, Cpu, Volume2, Video, Utensils, Dumbbell, Trophy, Bus, CheckCircle2, Sparkles, Award, Globe, Wifi, Image as ImageIcon, ExternalLink
} from 'lucide-react';
import { FACILITIES_DATA, SPECIAL_FACILITIES_LIST } from '../data/collegeData';
import { AssetBadge } from '../components/common/AssetBadge';

export const FacilitiesPage: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES_DATA[0].id);

  const facilityIconMap: Record<string, React.ReactNode> = {
    library: <Library className="w-5 h-5 text-amber-500" />,
    elearning: <Cpu className="w-5 h-5 text-amber-500" />,
    auditorium: <Volume2 className="w-5 h-5 text-amber-500" />,
    conferencing: <Video className="w-5 h-5 text-amber-500" />,
    cafeteria: <Utensils className="w-5 h-5 text-amber-500" />,
    gym: <Dumbbell className="w-5 h-5 text-amber-500" />,
    sports: <Trophy className="w-5 h-5 text-amber-500" />,
    transport: <Bus className="w-5 h-5 text-amber-500" />
  };

  const activeFac = FACILITIES_DATA.find((f) => f.id === selectedFacility) || FACILITIES_DATA[0];

  const projectGallery = [
    { title: 'Central Automated Library & Reading Hall', category: 'Academic Facility', path: 'src/assets/images/facilities/library.jpg' },
    { title: 'Advanced Computing Center & NPTEL Lab', category: 'IT Infrastructure', path: 'src/assets/images/facilities/elearning.jpg' },
    { title: 'Air-Conditioned Auditorium', category: 'Campus Amenity', path: 'src/assets/images/facilities/auditorium.jpg' },
    { title: 'Seismometer Seismic Earthquake Monitor Station', category: 'Research Lab', path: 'src/assets/images/facilities/seismometer.jpg' },
    { title: 'Smart Virtual Classrooms & Video Conferencing', category: 'E-Learning', path: 'src/assets/images/facilities/conferencing.jpg' },
    { title: 'Playground & Athletic Sports Complex', category: 'Sports', path: 'src/assets/images/facilities/sports.jpg' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white p-8 sm:p-12 rounded-3xl border border-amber-400/40/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#d3d1cc] text-xs font-semibold border border-white/20 font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-[#eceae6]" />
          <span>Campus Infrastructure &amp; Facilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">World-Class Facilities &amp; Research Centers</h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          From South Tamil Nadu's only Seismometer station to EDUSAT satellite links, 100 Mbps fiber, and fully automated E-Journals digital library.
        </p>
      </div>

      {/* Special Highlights Grid (Key Institutional Achievements) */}
      <div className="space-y-6">
        <div className="border-b border-[#dedcd7]/60 pb-3">
          <h2 className="text-2xl font-bold text-[#252528]">Key Facilities &amp; Institutional Highlights</h2>
          <p className="text-xs text-[#6B4C14]">Unique Academic, Technological &amp; Research Endeavors at VINS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIAL_FACILITIES_LIST.map((sf, idx) => (
            <div 
              key={idx}
              className="gold-card rounded-3xl p-6 border border-amber-400/40 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-[#ebe9e4] text-[#252528] text-[10px] font-bold inline-block border border-amber-400/40">
                  {sf.badge}
                </span>
                <h3 className="font-bold text-[#252528] text-base">{sf.title}</h3>
                <p className="text-xs text-[#3A2A08] leading-relaxed">{sf.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#dedcd7]/60 flex items-center justify-between text-[11px] font-semibold text-[#54524e]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6B4C14]" />
                  Verified Campus Facility
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Selection Pills Bar */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#252528] border-b border-[#dedcd7]/60 pb-2">Explore Primary Campus Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 gold-card p-2 rounded-2xl border border-amber-400/40 shadow-sm text-xs font-bold">
          {FACILITIES_DATA.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setSelectedFacility(fac.id)}
              className={`p-3 rounded-xl transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer ${
                selectedFacility === fac.id
                  ? 'bg-[#fef3c7] text-[#0f172a] shadow-md border border-amber-400/40/20'
                  : 'text-[#54524e] hover:bg-[#ebe9e4]'
              }`}
            >
              <span className={selectedFacility === fac.id ? 'text-[#0f172a]' : 'text-[#54524e]'}>
                {facilityIconMap[fac.id]}
              </span>
              <span className="truncate w-full">{fac.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Facility Detailed Card */}
      <div className="gold-card rounded-3xl border border-amber-400/40 overflow-hidden shadow-xl space-y-6">
        
        {/* Banner Section */}
        <div className="relative aspect-[21/9] bg-[#28272b]">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1600"
            alt={activeFac.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252528] via-[#252528]/60 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
            <h2 className="text-2xl sm:text-3xl font-black text-white">{activeFac.name}</h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">{activeFac.shortDesc}</p>
            <div className="mt-3">
              <AssetBadge path={activeFac.bannerPath} variant="banner" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          <p className="text-xs sm:text-sm text-[#3a3936] leading-relaxed">
            {activeFac.fullDesc}
          </p>

          <div className="space-y-3">
            <h3 className="font-bold text-[#252528] text-sm">Key Infrastructure Features:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeFac.highlights.map((item, idx) => (
                <div key={idx} className="bg-[#f6f5f2] p-3.5 rounded-xl border border-amber-400/40 flex items-center gap-2.5 text-xs font-semibold text-[#252528]">
                  <CheckCircle2 className="w-4 h-4 text-[#54524e] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Project & Facilities Image Gallery */}
      <section className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5 text-[#54524e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#252528]">Campus Facilities &amp; Project Gallery</h2>
            <p className="text-xs text-[#6B4C14]">Visual Facilities, Research Infrastructure &amp; Campus Spots</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectGallery.map((p, idx) => (
            <div key={idx} className="bg-[#28272b] rounded-2xl overflow-hidden aspect-video relative group border border-amber-400/40 shadow-sm flex flex-col justify-between">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-[#252528]/70 p-4 flex flex-col justify-end text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[#eceae6] text-[10px] font-bold w-fit mb-1 backdrop-blur-sm border border-white/20">
                  {p.category}
                </span>
                <p className="text-xs font-bold text-white">{p.title}</p>
                <AssetBadge path={p.path} variant="subtle" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
