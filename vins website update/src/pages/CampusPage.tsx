import React, { useState } from 'react';
import { 
  Users, HeartHandshake, Lightbulb, Cpu, Trees, Music, CheckCircle2, Sparkles, Calendar, Award, Eye, X, Camera 
} from 'lucide-react';
import { CAMPUS_CLUBS, COLLEGE_DAY_GALLERY, CollegeDayGalleryItem } from '../data/collegeData';
import { useAdminData } from '../context/AdminDataContext';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const CampusPage: React.FC = () => {
  const { galleryImages, events } = useAdminData();
  const allCollegeDayPhotos: any[] = (galleryImages && galleryImages.length > 0)
    ? galleryImages
    : (events && events.length > 0 ? events : COLLEGE_DAY_GALLERY);

  const [activeClubId, setActiveClubId] = useState(CAMPUS_CLUBS[0].id);
  const [selectedDayCategory, setSelectedDayCategory] = useState<string>('All');
  const [selectedDayPhoto, setSelectedDayPhoto] = useState<any | null>(null);

  const clubIconMap: Record<string, React.ReactNode> = {
    nss: <Users className="w-5 h-5 text-[#0A2540]" />,
    yrc: <HeartHandshake className="w-5 h-5 text-[#0A2540]" />,
    edc: <Lightbulb className="w-5 h-5 text-[#0A2540]" />,
    'innovation-centre': <Cpu className="w-5 h-5 text-[#0A2540]" />,
    'nature-club': <Trees className="w-5 h-5 text-[#0A2540]" />,
    'cultural-events': <Music className="w-5 h-5 text-[#0A2540]" />
  };

  const dayCategories = ['All', 'Ceremony', 'Cultural Dance', 'Awards', 'Workshop', 'Campus', 'Seminar', 'Sports', 'Finale'];

  const filteredCollegeDayPhotos = selectedDayCategory === 'All'
    ? allCollegeDayPhotos
    : allCollegeDayPhotos.filter((item) => item.category === selectedDayCategory);

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header Banner - Premium */}
        <ScrollReveal direction="up" distance={20}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="badge-academic bg-white/15 text-white border border-white/30 relative z-10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>CAMPUS LIFE &amp; CULTURAL FESTS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight relative z-10">
              Campus Events &amp; Student Life
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed relative z-10">
              Extracurricular student development through NSS, YRC, EDC, Innovation Center, Nature Club, and our Annual College Day Stage Extravaganza.
            </p>
          </div>
        </ScrollReveal>

        {/* DEDICATED COLLEGE DAY CELEBRATIONS GALLERY SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0A2540]/20 shadow-md space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#0A2540]/15 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[#0A2540] font-black text-xs uppercase tracking-wider font-cinzel">
                <Camera className="w-4 h-4" />
                <span>Special Cultural Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#0A2540]">
                Annual College Day &amp; Cultural Fest Gallery
              </h2>
              <p className="text-xs sm:text-sm text-[#0A2540]/80 max-w-2xl font-medium">
                Highlights from our annual stage extravaganza featuring classical dance, rock band music night, award ceremony, theatrical dramas, and ethnic fashion parade.
              </p>
            </div>

            <div className="bg-white text-[#0A2540] border-2 border-[#0A2540] p-4 rounded-2xl flex items-center gap-3 shrink-0 shadow-md">
              <Award className="w-8 h-8 text-[#0A2540] shrink-0" />
              <div>
                <p className="text-xs font-black text-[#0A2540]">VINS Annual College Day</p>
                <p className="text-[11px] text-[#0A2540]/80 font-bold">1500+ Audience · AC Auditorium Stage</p>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {dayCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedDayCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedDayCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                {cat === 'All' ? 'All Events' : cat}
              </button>
            ))}
          </div>

          {/* College Day Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCollegeDayPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedDayPhoto(photo)}
                className="group bg-white rounded-3xl overflow-hidden border-2 border-[#0A2540]/20 shadow-md hover:shadow-2xl hover:border-[#0A2540] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/11] relative overflow-hidden bg-white">
                    <img
                      src={photo.imagePath}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A2540] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-white/30">
                      {photo.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white text-[#0A2540] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-[#0A2540]/20">
                      <Calendar className="w-3 h-3 text-[#0A2540]" />
                      {photo.date || 'Annual Day'}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-[#0A2540] group-hover:underline transition-colors line-clamp-2 leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] text-[#0A2540]/80 font-bold">
                      {photo.subtitle || `${photo.category} Showcase`}
                    </p>
                    <p className="text-xs text-[#0A2540]/80 line-clamp-2 leading-relaxed font-medium">
                      {photo.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#0A2540] text-white flex items-center justify-between text-xs font-black group-hover:bg-[#0A2540]/90 transition-all">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-white" />
                    <span>View Event Photo</span>
                  </span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid of All 6 Campus Clubs */}
        <div className="space-y-6">
          <div className="border-b-2 border-[#0A2540]/15 pb-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-playfair">VINS Student Clubs &amp; Societies</h2>
            <p className="text-xs text-[#0A2540]/80 font-semibold">Fostering Leadership, Social Responsibility &amp; Creative Expression</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_CLUBS.map((club) => (
              <div
                key={club.id}
                onClick={() => setActiveClubId(club.id)}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer space-y-4 flex flex-col justify-between group ${
                  activeClubId === club.id
                    ? 'border-[#0A2540] shadow-xl ring-2 ring-[#0A2540]/30'
                    : 'border-[#0A2540]/20 shadow-md hover:border-[#0A2540]'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border-2 border-[#0A2540]/30 group-hover:bg-[#0A2540] group-hover:text-white transition-all shadow-xs">
                    {clubIconMap[club.id]}
                  </div>

                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:underline transition-colors">
                    {club.name}
                  </h3>

                  <p className="text-xs text-[#0A2540]/90 leading-relaxed font-medium">
                    {club.description}
                  </p>

                  <div className="pt-2 border-t border-[#0A2540]/15 space-y-1.5">
                    <p className="text-xs font-bold text-[#0A2540]">Key Student Activities:</p>
                    <ul className="text-xs text-[#0A2540]/90 space-y-1 font-medium">
                      {club.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2540] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* College Day Photo Modal Lightbox */}
        {selectedDayPhoto && (
          <div className="fixed inset-0 z-50 bg-[#0A2540]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white text-[#0A2540] rounded-3xl max-w-3xl w-full overflow-hidden border-2 border-[#0A2540] shadow-2xl space-y-4 relative">
              <button
                onClick={() => setSelectedDayPhoto(null)}
                className="absolute top-4 right-4 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white p-2 rounded-full z-10 transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] bg-white relative">
                <img
                  src={selectedDayPhoto.imagePath}
                  alt={selectedDayPhoto.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0A2540] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase shadow-md">
                  {selectedDayPhoto.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#0A2540] font-bold border-b-2 border-[#0A2540]/15 pb-3">
                  <span>VINS Annual College Day Celebrations</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0A2540]" />
                    {selectedDayPhoto.date}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#0A2540] font-playfair">{selectedDayPhoto.title}</h3>
                <p className="text-xs font-bold text-[#0A2540]">{selectedDayPhoto.subtitle}</p>
                <p className="text-xs sm:text-sm text-[#0A2540]/90 leading-relaxed font-medium">{selectedDayPhoto.description}</p>

                {selectedDayPhoto.chiefGuest && (
                  <div className="bg-white border-2 border-[#0A2540]/20 p-4 rounded-2xl text-xs space-y-1 mt-2">
                    <p className="text-[#0A2540] font-bold">Dignitary / Chief Guest:</p>
                    <p className="text-[#0A2540]/90 font-medium">{selectedDayPhoto.chiefGuest}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
