import React, { useState } from 'react';
import { 
  Download, 
  Send, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Mail, 
  User, 
  BookOpen,
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateBrochurePdf } from '../utils/generateBrochurePdf';
import { COURSES_DATA } from '../data/coursesData';

interface BrochureDownloadSectionProps {
  initialCourseTitle?: string;
}

export const BrochureDownloadSection: React.FC<BrochureDownloadSectionProps> = ({
  initialCourseTitle
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredCourse, setPreferredCourse] = useState(initialCourseTitle || COURSES_DATA[0].title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate and download the high-resolution official PDF
      generateBrochurePdf({
        fullName,
        phone,
        email,
        preferredCourse
      });

      // Fire confetti celebratory effect
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#00F2FE', '#38BDF8', '#0EA5E9', '#FFFFFF']
      });

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setErrorMessage('Encountered an issue generating the brochure. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-[#00F2FE]/30 relative overflow-hidden shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Informational Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] tracking-widest uppercase">
            <FileText className="w-4 h-4 text-[#00F2FE]" />
            <span>Instant Official Syllabus Package</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Get Our Official Program Brochure & Course Syllabus
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Download the comprehensive program curriculum, tuition schedule, software house internship paths, and ASCI certification roadmap directly to your device.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
              <span>Complete week-by-week module breakdowns & project rubrics</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
              <span>Direct contact lines to Lead Developers Muhammad Saboor & Jahanzaib</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0" />
              <span>Instant PDF download + automated WhatsApp syllabus notification</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Your contact details are strictly used for admissions counseling.</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6">
          <div className="bg-[#080E1C] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center mx-auto border border-[#00F2FE]/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white font-display">
                  Official Brochure Generated!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you <strong className="text-white">{fullName}</strong>! Your customized PDF brochure has downloaded to your device. Our admissions office in Lahore has logged your interest for <strong className="text-[#00F2FE]">{preferredCourse}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors"
                  >
                    Download Another Copy
                  </button>
                  <a
                    href={`https://wa.me/923294589432?text=Hello%20JS%20Developers,%20my%20name%20is%20${encodeURIComponent(fullName)}%20and%20I%20am%20interested%20in%20the%20${encodeURIComponent(preferredCourse)}%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hamza Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 3XX XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Course */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Preferred Course Track *
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredCourse}
                      onChange={(e) => setPreferredCourse(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE] transition-colors"
                    >
                      {COURSES_DATA.map((course) => (
                        <option key={course.id} value={course.title} className="bg-slate-950 text-white">
                          {course.title} ({course.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00F2FE] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00F2FE]/25 disabled:opacity-60 cursor-pointer mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'Generating High-Res PDF...' : 'Download Official PDF Syllabus'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
