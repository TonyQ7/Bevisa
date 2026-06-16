export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-teal-500 flex items-center justify-center shadow-lg shadow-electric-500/20">
                <span className="font-sans font-extrabold text-white text-base tracking-tighter">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-electric-300 transition-colors">
                PRAXIS
              </span>
            </a>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI workforce readiness infrastructure. Licensing humans to safely operate digital labor in the enterprise.
            </p>

            <div className="flex gap-4">
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#passport" className="hover:text-electric-400 transition-colors">AI Work Passport</a></li>
              <li><a href="#product" className="hover:text-electric-400 transition-colors">Simulation Engine</a></li>
              <li><a href="#autonomy-ladder" className="hover:text-electric-400 transition-colors">Autonomy Ladder</a></li>
              <li><a href="#platform" className="hover:text-electric-400 transition-colors">Readiness Dashboard</a></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#" className="hover:text-electric-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-electric-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-electric-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Nav Links Column 3 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#" className="hover:text-electric-400 transition-colors">Documentation</a></li>
              <li>
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  API <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">Soon</span>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                  Blog <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">Soon</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 Praxis. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Contact: <a href="mailto:hello@praxis.work" className="text-slate-400 hover:text-white underline">hello@praxis.work</a></span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
