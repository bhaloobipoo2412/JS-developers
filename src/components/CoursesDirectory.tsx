import React, { useState } from 'react';
import { 
  Search, 
  Code, 
  Sparkles, 
  Clock, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  X,
  FileText,
  UserCheck
} from 'lucide-react';
import { Course, CourseCategory } from '../types';
import { COURSES_DATA } from '../data/coursesData';

interface CoursesDirectoryProps {
  onEnroll: (course: Course) => void;
  selectedCourseId?: string | null;
  onClearSelectedCourse?: () => void;
}

export const CoursesDirectory: React.FC<CoursesDirectoryProps> = ({
  onEnroll,
  selectedCourseId,
  onClearSelectedCourse
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusModalCourse, setSyllabusModalCourse] = useState<Course | null>(null);

  // If a course was clicked in the 3D brochure, open its modal or focus on it
  React.useEffect(() => {
    if (selectedCourseId) {
      const match = COURSES_DATA.find(c => c.id === selectedCourseId);
      if (match) {
        setSyllabusModalCourse(match);
      }
    }
  }, [selectedCourseId]);

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#00F2FE] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Courses ({COURSES_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('web-app')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'web-app'
                ? 'bg-[#00F2FE] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Web & App Development
          </button>
          <button
            onClick={() => setSelectedCategory('creative-ai')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'creative-ai'
                ? 'bg-[#00F2FE] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Creative Tech & AI
          </button>
          <button
            onClick={() => setSelectedCategory('career-skills')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'career-skills'
                ? 'bg-[#00F2FE] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            YouTube & Freelancing
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search React, AI, AutoCAD, MERN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
          />
        </div>
      </div>

      {/* Courses Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between relative group border border-slate-800/80 hover:border-[#00F2FE]/40"
          >
            <div>
              {/* Category & Certification Meta - clean unboxed typography per anti-pill design */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00F2FE] uppercase tracking-wider text-[11px]">
                    {course.category === 'web-app' ? 'Web & Software' : course.category === 'creative-ai' ? 'Creative & AI' : 'Career Growth'}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-[11px] text-slate-400">{course.level}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ASCI Certified</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-white font-display mb-1.5 group-hover:text-[#00F2FE] transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-cyan-300/80 font-medium mb-3">
                {course.subtitle}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {course.description}
              </p>

              {/* Tools & Tech Chips */}
              <div className="mb-4">
                <div className="text-[10px] uppercase font-mono text-slate-400 mb-1.5">
                  Core Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.tools.slice(0, 5).map((tool, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                  {course.tools.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                      +{course.tools.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSyllabusModalCourse(course)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3 h-3 text-[#00F2FE]" />
                  <span>Syllabus</span>
                </button>
                <button
                  onClick={() => onEnroll(course)}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-[#00F2FE] hover:bg-cyan-300 rounded-lg transition-all flex items-center gap-1 shadow-sm shadow-[#00F2FE]/20"
                >
                  <span>Enroll</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SYLLABUS DETAIL MODAL */}
      {syllabusModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[#00F2FE]/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSyllabusModalCourse(null);
                if (onClearSelectedCourse) onClearSelectedCourse();
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#00F2FE]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-2">
                <span>COURSE SYLLABUS DIRECTORY</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Duration: {syllabusModalCourse.duration}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-1">
                {syllabusModalCourse.title}
              </h2>
              <p className="text-sm text-cyan-300 font-medium mb-4">
                {syllabusModalCourse.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {syllabusModalCourse.description}
              </p>

              {/* Module Outline */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Curriculum Modules Breakdown:
                </h4>
                <div className="space-y-2">
                  {syllabusModalCourse.modules.map((mod, mIdx) => (
                    <div 
                      key={mIdx} 
                      className="p-3 rounded-xl bg-[#090F1E] border border-slate-800/80 flex items-start gap-3 text-xs text-slate-200"
                    >
                      <span className="font-mono text-[#00F2FE] font-bold shrink-0 mt-0.5">
                        0{mIdx + 1}.
                      </span>
                      <span className="leading-relaxed">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software House Certified Banner */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 mb-6">
                <div className="flex items-center gap-2 font-medium">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Includes Software House Capstone & Official ASCI Certification</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 uppercase">
                  Verified
                </span>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Admissions open for Lahore batch & online cohort
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const c = syllabusModalCourse;
                    setSyllabusModalCourse(null);
                    onEnroll(c);
                  }}
                  className="px-5 py-2.5 bg-[#00F2FE] hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-[#00F2FE]/25 flex items-center gap-1.5 transition-all"
                >
                  <span>Apply for this Course</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
