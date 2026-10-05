/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  LayoutGrid, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Phone, 
  Download, 
  ArrowRight,
  Code2,
  Cpu
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FloatingTechStack } from './components/FloatingTechStack';
import { Brochure3DViewer } from './components/Brochure3DViewer';
import { CoursesDirectory } from './components/CoursesDirectory';
import { InteractiveRoadmap } from './components/InteractiveRoadmap';
import { BrochureDownloadSection } from './components/BrochureDownloadSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { Course } from './types';

export default function App() {
  const [courseViewMode, setCourseViewMode] = useState<'3d-brochure' | 'grid'>('3d-brochure');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [selectedCourseFromBrochure, setSelectedCourseFromBrochure] = useState<string | null>(null);

  const handleEnrollCourse = (course: Course) => {
    setEnrollingCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleBrochureCourseSelect = (courseId: string) => {
    setSelectedCourseFromBrochure(courseId);
    setCourseViewMode('grid');
    // Scroll to directory
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-[#00F2FE]/30 selection:text-[#00F2FE]">
      {/* Top Bar Navigation */}
      <Header
        onOpenEnrollModal={() => {
          setEnrollingCourse(null);
          setIsEnrollModalOpen(true);
        }}
        onOpenDownloadModal={() => scrollToSection('brochure-download')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <div id="home">
          <HeroSection
            onExploreCourses={() => {
              setCourseViewMode('grid');
              scrollToSection('courses');
            }}
            onOpen3DBrochure={() => {
              setCourseViewMode('3d-brochure');
              scrollToSection('courses');
            }}
            onEnrollNow={() => {
              setEnrollingCourse(null);
              setIsEnrollModalOpen(true);
            }}
          />
        </div>

        {/* FLOATING 3D TECH STACK SECTION */}
        <section className="py-12 border-y border-slate-800/80 bg-[#060A13]/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono uppercase text-[#00F2FE] tracking-widest flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Production Tooling & Tech Stack</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  Technologies Mastered at JS Developers
                </h2>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Software House Curricula · High Industry Demand
              </div>
            </div>

            <FloatingTechStack />
          </div>
        </section>

        {/* DIGITAL BROCHURE & COURSE DIRECTORY SECTION */}
        <section id="courses" className="py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header with 3D / 2D Toggle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE] tracking-widest uppercase">
                  <BookOpen className="w-4 h-4 text-[#00F2FE]" />
                  <span>Curriculum & Program Guide</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                  Our Short & Advanced Courses
                </h2>
                <p className="text-sm text-slate-400 max-w-xl">
                  Interactive multi-disciplinary IT and software training tracks designed for beginners, career changers, and professionals.
                </p>
              </div>

              {/* 3D vs Grid View Switcher */}
              <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 shrink-0">
                <button
                  onClick={() => setCourseViewMode('3d-brochure')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    courseViewMode === '3d-brochure'
                      ? 'bg-[#00F2FE] text-slate-950 shadow-md shadow-[#00F2FE]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interactive 3D Tri-Fold</span>
                </button>
                <button
                  onClick={() => setCourseViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    courseViewMode === 'grid'
                      ? 'bg-[#00F2FE] text-slate-950 shadow-md shadow-[#00F2FE]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>2D Course Grid</span>
                </button>
              </div>
            </div>

            {/* View Mode Render */}
            <div id="brochure">
              {courseViewMode === '3d-brochure' ? (
                <Brochure3DViewer
                  onOpenDownloadModal={() => scrollToSection('brochure-download')}
                  onSelectCourse={handleBrochureCourseSelect}
                />
              ) : (
                <CoursesDirectory
                  onEnroll={handleEnrollCourse}
                  selectedCourseId={selectedCourseFromBrochure}
                  onClearSelectedCourse={() => setSelectedCourseFromBrochure(null)}
                />
              )}
            </div>
          </div>
        </section>

        {/* INTERACTIVE 2D LEARNING JOURNEY / ROADMAP */}
        <section id="roadmap" className="py-16 sm:py-20 bg-[#060A14] border-t border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE] tracking-widest uppercase">
                <Compass className="w-4 h-4 text-[#00F2FE]" />
                <span>End-to-End Career Path</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Interactive Learning Journey Route
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A structured 6-step project workflow taking you from admission counseling to live software house projects and global job placement.
              </p>
            </div>

            <InteractiveRoadmap />
          </div>
        </section>

        {/* ABOUT & LEADERSHIP SECTION */}
        <section id="about" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSection />
          </div>
        </section>

        {/* LEAD GENERATION & DYNAMIC BROCHURE DOWNLOAD */}
        <section id="brochure-download" className="py-16 sm:py-20 bg-circuit-grid relative border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BrochureDownloadSection />
          </div>
        </section>
      </main>

      {/* FOOTER & LIVE LAHORE MAP */}
      <Footer />

      {/* ENROLLMENT MODAL */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        preselectedCourse={enrollingCourse}
      />
    </div>
  );
}
