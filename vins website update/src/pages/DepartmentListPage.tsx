import React, { useState } from 'react';
import { Search, Filter, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { useAdminData } from '../context/AdminDataContext';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { TiltCard } from '../components/common/TiltCard';

interface DepartmentListPageProps {
  onSelectDepartment: (id: string) => void;
}

export const DepartmentListPage: React.FC<DepartmentListPageProps> = ({ onSelectDepartment }) => {
  const { departments } = useAdminData();
  const allDepts = departments && departments.length > 0 ? departments : DEPARTMENTS_DATA;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'UG' | 'PG' | 'Management'>('All');

  const filteredDepts = allDepts.filter((dept) => {
    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dept.degree.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header Banner - Premium Academic */}
        <ScrollReveal direction="up" distance={20}>
          <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-3d-deep space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="badge-academic bg-white/15 text-white border border-white/30 relative z-10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ACADEMIC EXCELLENCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight leading-tight relative z-10">
              Academic Departments &amp; Courses
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed relative z-10">
              Offering Undergraduate B.E. engineering branches, Postgraduate M.E. research specializations, and the Master of Business Administration (MBA) affiliated to Anna University.
            </p>
          </div>
        </ScrollReveal>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#0A2540]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#0A2540] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search department or degree..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#0A2540]/25 rounded-2xl text-sm font-bold text-[#0A2540] placeholder-[#0A2540]/50 focus:outline-none focus:border-[#0A2540]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter className="w-4 h-4 text-[#0A2540] shrink-0 hidden sm:inline" />
            {(['All', 'UG', 'PG', 'Management'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                {cat === 'All' ? 'All Programs' : cat === 'UG' ? 'UG Engineering (B.E.)' : cat === 'PG' ? 'PG Engineering (M.E.)' : 'MBA Management'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Department Cards - 3D Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept, idx) => (
            <ScrollReveal key={dept.id} delay={idx * 0.06} direction="up" distance={18}>
              <TiltCard
                maxTilt={4}
                scale={1.02}
                translateZ={10}
                onClick={() => onSelectDepartment(dept.id)}
                className="h-full"
              >
                <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-3d-soft hover:shadow-3d-hover transition-all cursor-pointer flex flex-col justify-between h-full group">
                  {/* Course Image Banner */}
                  <div className="relative h-48 overflow-hidden bg-[#0A2540]">
                    {dept.courseImage ? (
                      <img
                        src={dept.courseImage}
                        alt={`${dept.name} course`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0A2540] to-[#1E40AF] flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent opacity-70" />

                    {/* Degree badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#0A2540]/90 text-white font-bold text-[11px] shadow-md border border-white/25 backdrop-blur-sm">
                        {dept.degree} · {dept.category}
                      </span>
                    </div>

                    {/* Intake badge overlay */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-[#0A2540] font-bold text-[11px] shadow-md border border-[#0A2540]/20 backdrop-blur-sm">
                        {dept.intake} Seats
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3 flex-1">
                    <h3 className="text-base sm:text-lg font-bold font-playfair text-[#0A2540] group-hover:text-[#8B0000] transition-colors leading-snug">
                      {dept.name}
                    </h3>

                    <p className="text-xs text-[#0A2540]/75 line-clamp-2 leading-relaxed">
                      {dept.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-semibold text-[#0A2540]/70">HoD: <span className="text-[#0A2540] font-bold">{dept.hodName}</span></p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {dept.placementPercentage}% Placed
                    </span>
                    <span className="text-xs font-black text-[#8B0000] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Course
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
};
