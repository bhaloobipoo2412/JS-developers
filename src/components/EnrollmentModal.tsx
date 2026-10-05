import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  User, 
  Phone, 
  Mail, 
  BookOpen, 
  Calendar, 
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: Course | null;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(
    preselectedCourse ? preselectedCourse.id : COURSES_DATA[0].id
  );
  const [batchTiming, setBatchTiming] = useState('Evening (6:00 PM – 8:00 PM)');
  const [learningMode, setLearningMode] = useState<'on-campus' | 'live-online'>('on-campus');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if preselectedCourse changes
  React.useEffect(() => {
    if (preselectedCourse) {
      setSelectedCourseId(preselectedCourse.id);
    }
  }, [preselectedCourse]);

  if (!isOpen) return null;

  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl max-h-[92vh] rounded-3xl border border-[#00F2FE]/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#00F2FE]/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="text-xs font-mono text-[#00F2FE] uppercase tracking-wider">
              Application Successfully Registered
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Welcome to JS Developers, {fullName}!
            </h3>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your enrollment request for <strong className="text-white">{currentCourse.title}</strong> ({learningMode === 'on-campus' ? 'Lahore On-Campus Lab' : 'Live Online Interactive'}) has been received. Our admissions coordinator will reach out via WhatsApp at <strong className="text-[#00F2FE]">{phone}</strong> within 24 hours.
            </p>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5 text-left max-w-md mx-auto">
              <div className="font-semibold text-white mb-1">Enrollment Summary:</div>
              <div>• Batch Schedule: {batchTiming}</div>
              <div>• Campus: Lahore Tech Hub (A project of ASCI)</div>
              <div>• Lead Mentor: Muhammad Saboor & Muhammad Jahanzaib</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/923294589432?text=Assalam%20o%20Alaikum%20JS%20Developers!%20My%20name%20is%20${encodeURIComponent(fullName)}.%20I%20just%20submitted%20my%20enrollment%20for%20${encodeURIComponent(currentCourse.title)}%20(${encodeURIComponent(batchTiming)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>Confirm on WhatsApp Instantly</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-1 uppercase">
              <Award className="w-4 h-4" />
              <span>Admissions Desk · JS Developers (ASCI)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Enroll in Professional Tech Training
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Lock in your seat for the upcoming Lahore campus cohort or live online interactive track.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="e.g. Usman Tariq"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                  />
                </div>
              </div>

              {/* Grid: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 3XX XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="usman@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Select Training Course *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE] transition-colors"
                  >
                    {COURSES_DATA.map((course) => (
                      <option key={course.id} value={course.id} className="bg-slate-950 text-white">
                        {course.title} — {course.duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Learning Mode Segmented Control */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Attendance Mode *
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setLearningMode('on-campus')}
                    className={`py-2 text-xs font-medium rounded-lg transition-all ${
                      learningMode === 'on-campus'
                        ? 'bg-[#00F2FE] text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Lahore On-Campus Lab
                  </button>
                  <button
                    type="button"
                    onClick={() => setLearningMode('live-online')}
                    className={`py-2 text-xs font-medium rounded-lg transition-all ${
                      learningMode === 'live-online'
                        ? 'bg-[#00F2FE] text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live Online Interactive
                  </button>
                </div>
              </div>

              {/* Batch Timing */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Preferred Batch Slot *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={batchTiming}
                    onChange={(e) => setBatchTiming(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE] transition-colors"
                  >
                    <option value="Morning (9:00 AM – 11:00 AM)" className="bg-slate-950">Morning (9:00 AM – 11:00 AM)</option>
                    <option value="Afternoon (2:00 PM – 4:00 PM)" className="bg-slate-950">Afternoon (2:00 PM – 4:00 PM)</option>
                    <option value="Evening (6:00 PM – 8:00 PM)" className="bg-slate-950">Evening (6:00 PM – 8:00 PM)</option>
                    <option value="Weekend Executive (Saturday & Sunday)" className="bg-slate-950">Weekend Executive (Saturday & Sunday)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#00F2FE] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00F2FE]/25 disabled:opacity-60 cursor-pointer mt-4"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Confirm Registration & Reserve Seat'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
