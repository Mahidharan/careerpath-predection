import { Database, Github, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm z-10 py-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          <span className="text-sm font-medium text-slate-300">Career Prediction</span>
        </div>

        <p className="text-sm">
          Powered by React, Tailwind & Flask + Scikit-Learn
        </p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="/dataset" className="hover:text-violet-400 transition-colors">
            <Database className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
