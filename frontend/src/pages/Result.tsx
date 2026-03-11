import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, PieChart as PieChartIcon, Trophy } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

const Result = () => {
  const location = useLocation();
  const { predictionData, inputData } = location.state || {};

  if (!predictionData) {
    return <Navigate to="/predict" replace />;
  }

  const primaryCareer = predictionData.prediction;
  const probabilities = predictionData.probabilities || [];

  // Format input data for the Radar chart
  const radarData = Object.keys(inputData).map((key) => ({
    subject: key.replace('_', ' ').replace('Score', '').replace('Skill', '').trim(),
    A: inputData[key],
    fullMark: 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-8"
    >
      <div className="flex items-center mb-8">
        <Link to="/predict" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Assessment</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Result Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
            {/* Glossy gradient effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)] border-4 border-slate-900 z-10">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-xl font-medium text-slate-300 mb-2 z-10">Your Ideal Career Path</h2>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-6 z-10 leading-tight">
              {primaryCareer}
            </h1>

            <div className="bg-slate-900/50 border border-slate-700 w-full rounded-xl p-4 flex flex-col gap-2 z-10">
              <span className="text-sm font-medium text-slate-400">AI Confidence Score</span>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-bold text-slate-100">
                  {probabilities.length > 0 ? probabilities[0].probability : 0}%
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-6 z-10 leading-relaxed">
              Based on our Random Forest Machine Learning model, your unique combination of cognitive abilities and interests aligns most strongly with this role.
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-8">

          {/* Probability Bar Chart */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-6 h-6 text-violet-400" />
              <h3 className="text-xl font-bold">Role Match Probabilities</h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={probabilities} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="career" type="category" width={150} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '0.5rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="probability" radius={[0, 4, 4, 0]} barSize={20}>
                    {probabilities.map((_entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Radar Chart Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#334155" />
                  <Radar name="Your Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '0.5rem' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold mb-4">Skill Profile Analysis</h3>
              <p className="text-slate-400 mb-6 text-sm">
                Your input maps strongly to the expected requirements for a <strong>{primaryCareer}</strong>. The radar chart illustrates your dimensional footprint.
              </p>

              <div className="space-y-3">
                {probabilities.slice(1, 3).map((prob: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <span className="text-sm font-medium text-slate-300">Alternative: {prob.career}</span>
                    <span className="text-sm font-bold text-slate-400">{prob.probability}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Result;
