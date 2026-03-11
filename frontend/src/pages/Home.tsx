import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Compass, LineChart, Sparkles, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Machine Learning Powered</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Find Your Perfect <br className="hidden md:block" />
          <span className="text-gradient">Career Path</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Navigate your future with AI. Input your skills, interests, and logic scores 
          to get a data-driven prediction for the tech career that suits you best.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/predict"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            <Compass className="w-5 h-5" />
            <span>Start Prediction</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 px-8 py-4 rounded-xl text-lg font-medium transition-all hover:text-white"
          >
            <BrainCircuit className="w-5 h-5" />
            <span>How it Works</span>
          </Link>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 px-4"
      >
        <div className="glass-card p-6 flex flex-col items-center text-center group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-200">Personalized Insights</h3>
          <p className="text-slate-400 text-sm">
            Analyze 8 distinct dimensions including logic, creativity, and specific tech interests.
          </p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-200">Instant Results</h3>
          <p className="text-slate-400 text-sm">
            Get immediate feedback powered by a pre-trained Random Forest Classification model.
          </p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LineChart className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-200">Probability Metrics</h3>
          <p className="text-slate-400 text-sm">
            View detailed confidence percentages for every possible career match.
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;
