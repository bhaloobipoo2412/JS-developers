import React from 'react';
import { 
  Award, 
  Terminal, 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import campusImage from '../assets/images/lahore_tech_campus_1790314583765.jpg';
import labImage from '../assets/images/hero_tech_lab_1790314550452.jpg';

export const AboutSection: React.FC = () => {
  return (
    <div className="w-full space-y-12">
      {/* Overview Block with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
            <span>A Project of ASCI · Lahore Tech Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Where Practical Skills Become Global Software Careers
          </h2>

          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4">
            <p>
              <strong className="text-white font-semibold">JS Developers</strong> was established as an entrepreneurial mission of innovation and technical excellence. Unlike traditional institutes constrained by outdated textbook curricula, JS Developers operates as an active software house development environment.
            </p>
            <p>
              Under our official project partnership with <strong className="text-[#00F2FE]">ASCI</strong>, we focus on high-impact domestic and international market capabilities—from full-stack React and Node.js web architecture to AI workflow automation, professional AutoCAD design, and remote freelancing mastery.
            </p>
          </div>

          {/* Three Pillar Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-mono text-xs text-[#00F2FE] mb-1">01 / PRACTICE</div>
              <div className="text-sm font-bold text-white mb-1">Software House Lab</div>
              <div className="text-xs text-slate-400">Students build on client repositories using industry git branching and pull requests.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-mono text-xs text-[#00F2FE] mb-1">02 / CREDENTIAL</div>
              <div className="text-sm font-bold text-white mb-1">ASCI Endorsement</div>
              <div className="text-xs text-slate-400">Graduates receive verified credentials backed by ASCI institutional standards.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="font-mono text-xs text-[#00F2FE] mb-1">03 / OUTCOME</div>
              <div className="text-sm font-bold text-white mb-1">Career Placement</div>
              <div className="text-xs text-slate-400">Direct hiring interviews with Pakistani software houses & overseas remote contracts.</div>
            </div>
          </div>
        </div>

        {/* Right Campus Lab Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-[#00F2FE]/30 shadow-2xl group">
            <img
              src={campusImage}
              alt="JS Developers Tech Campus in Lahore"
              className="w-full h-80 sm:h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-slate-700/80 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00F2FE]" />
                  Lahore Tech Training Hub
                </span>
                <span className="font-mono text-[11px] text-[#00F2FE]">Admissions Open</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                State-of-the-art dual monitor workstations, gigabit fiber connection, and dedicated mentor pods.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LEAD DEVELOPERS & FOUNDERS SPOTLIGHT */}
      <div className="pt-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#00F2FE] mb-2">
            Executive Leadership & Instructors
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Meet the Lead Developers Behind JS Developers
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Trained and mentored directly by seasoned software engineers who write production code daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Muhammad Saboor ul iman */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00F2FE]/30 relative overflow-hidden group hover:border-[#00F2FE] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#00F2FE] uppercase tracking-wider block">
                  Lead Developer & Co-Founder
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  Muhammad Saboor ul iman
                </h4>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Full Stack Architecture & AI Solutions Specialist
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE] shrink-0">
                <Code className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Expert in modern MERN stack ecosystems, React 19 micro-frontends, serverless backends, and integrating Generative AI pipelines into enterprise products. Leads curriculum design and senior code reviews.
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#00F2FE]" />
                <a href="mailto:mrssaboor04@gmail.com" className="hover:text-[#00F2FE] font-mono transition-colors">
                  mrssaboor04@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#00F2FE]" />
                <a href="tel:+923294589432" className="hover:text-[#00F2FE] font-mono transition-colors">
                  +92 329 4589432
                </a>
              </div>
            </div>
          </div>

          {/* Muhammad Jahanzaib Akhtar */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Lead Developer & Co-Founder
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  Muhammad Jahanzaib Akhtar
                </h4>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Systems Engineering & AutoCAD Technical Specialist
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Terminal className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Specializes in systems administration, Linux/Windows networking infrastructure, 2D/3D precision drafting with AutoCAD, and scalable deployment operations. Oversees student lab environments and hardware infrastructure.
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:jahanzaib2721@gmail.com" className="hover:text-cyan-400 font-mono transition-colors">
                  jahanzaib2721@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href="tel:+923264243566" className="hover:text-cyan-400 font-mono transition-colors">
                  +92 326 4243566
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
