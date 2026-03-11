import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Predict Career', path: '/predict' },
    { name: 'Dataset', path: '/dataset' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
              <Brain className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-50">
              Future<span className="text-blue-400">Path</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Predict Button */}
          <div className="flex items-center">
            <Link
              to="/predict"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
