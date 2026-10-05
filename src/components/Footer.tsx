import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Code, 
  Terminal, 
  ArrowUpRight,
  Send
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-300">
      {/* Background Top Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FE]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Grid: Contact Info, Map & Lead Devs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand & Official ASCI Project Statement */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white font-medium">JS Developers</strong> is an entrepreneurial mission of innovation and technical competence. A premier project of ASCI providing high-impact software house practical training in Lahore, Pakistan.
            </p>

            {/* Official Accreditation Seal */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
                <span>JS Developers — A project of ASCI</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official accreditation and authorized credential partner.
              </p>
            </div>
          </div>

          {/* Col 2: Direct Contact Details from Brochure & Flyer */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#00F2FE]">
              Direct Contact Lines
            </div>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Mobile / WhatsApp 1:</div>
                  <a href="tel:+923294589432" className="text-white hover:text-[#00F2FE] font-mono font-medium transition-colors">
                    +92 329 4589432
                  </a>
                  <div className="text-[11px] text-slate-400 mt-1">Mobile 2:</div>
                  <a href="tel:+923264243566" className="text-white hover:text-[#00F2FE] font-mono font-medium transition-colors">
                    +92 326 4243566
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Official Inquiries:</div>
                  <a href="mailto:jsdevelopersofficial@gmail.com" className="text-white hover:text-[#00F2FE] font-mono transition-colors block">
                    jsdevelopersofficial@gmail.com
                  </a>
                  <div className="text-[11px] text-slate-400 mt-1">Direct Developer Inquiries:</div>
                  <a href="mailto:mrssaboor04@gmail.com" className="text-slate-300 hover:text-[#00F2FE] font-mono transition-colors block text-[11px]">
                    mrssaboor04@gmail.com
                  </a>
                  <a href="mailto:jahanzaib2721@gmail.com" className="text-slate-300 hover:text-[#00F2FE] font-mono transition-colors block text-[11px]">
                    jahanzaib2721@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Web Portal:</div>
                  <span className="text-white font-mono">
                    www.jsdevelopers.com
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Campus Location:</div>
                  <span className="text-white">
                    Lahore, Punjab, Pakistan
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Lahore Map & Lead Developers Mention */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#00F2FE]">
              Lahore Campus Center
            </div>

            {/* Live Google Maps Embed */}
            <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-800 relative shadow-inner">
              <iframe
                title="JS Developers Lahore Center Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.9938085376!2d74.19430349605481!3d31.482940344445836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23e200a89d71c48!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] contrast-[85%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[#00F2FE] border border-slate-800">
                Lahore, PK
              </div>
            </div>

            {/* Lead Developers Explicit Crediting */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Lead Developers & Founders
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#00F2FE]" />
                  Muhammad Saboor ul iman
                </span>
                <span className="text-[10px] font-mono text-cyan-300">Lead Architect</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Muhammad Jahanzaib Akhtar
                </span>
                <span className="text-[10px] font-mono text-cyan-300">Lead Engineer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Social Media & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} JS Developers (A project of ASCI). All rights reserved.
          </div>

          {/* Social Links Updated per brochure requirements */}
          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com/jsdevelopers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00F2FE] transition-colors flex items-center gap-1"
            >
              <span>Twitter/X</span>
              <span className="text-[10px] font-mono text-[#00F2FE]">@jsdevelopers</span>
            </a>
            <a
              href="https://instagram.com/jsdevelopers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00F2FE] transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <span className="text-[10px] font-mono text-[#00F2FE]">@jsdevelopers</span>
            </a>
            <a
              href="https://wa.me/923294589432"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <span className="text-[10px] font-mono text-emerald-400">+92 329 4589432</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
