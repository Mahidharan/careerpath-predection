import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';

const skills = [
  { id: 'Math_Score', label: 'Math & Quantitative', color: 'bg-blue-500' },
  { id: 'Programming_Skill', label: 'Programming & Coding', color: 'bg-violet-500' },
  { id: 'Communication_Skill', label: 'Communication & Soft Skills', color: 'bg-emerald-500' },
  { id: 'Creativity', label: 'Creative Design & Thinking', color: 'bg-pink-500' },
  { id: 'Logical_Thinking', label: 'Logical & Critical Thinking', color: 'bg-amber-500' },
  { id: 'Interest_Tech', label: 'Interest in Technology', color: 'bg-cyan-500' },
  { id: 'Interest_Design', label: 'Interest in Design & Art', color: 'bg-rose-500' },
  { id: 'Interest_Business', label: 'Interest in Business & Management', color: 'bg-indigo-500' },
];

const Predict = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, number>>(
    skills.reduce((acc, skill) => ({ ...acc, [skill.id]: 50 }), {})
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Navigate to result page with prediction data
        navigate('/result', { state: { predictionData: data, inputData: formData } });
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err) {
      setError('Failed to connect to the backend server. Make sure the Python API is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-3">
          <BrainCircuit className="w-10 h-10 text-blue-400" />
          <span className="text-gradient">Skill Assessment</span>
        </h1>
        <p className="text-slate-400">
          Rate your aptitude and interest levels accurately for the best prediction results (0-100).
        </p>
      </div>

      <div className="glass-panel p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={skill.id} 
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300 tracking-wide">
                    {skill.label}
                  </label>
                  <span className="text-2xl font-bold text-slate-50 font-mono w-12 text-right">
                    {formData[skill.id]}
                  </span>
                </div>
                
                <div className="relative pt-1">
                  <input
                    type="range"
                    name={skill.id}
                    min="0"
                    max="100"
                    value={formData[skill.id]}
                    onChange={handleSliderChange}
                  />
                  {/* Custom progress background */}
                  <div 
                    className={`absolute top-[10px] left-0 h-2 rounded-full pointer-events-none ${skill.color}`}
                    style={{ width: `${formData[skill.id]}%`, opacity: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-700/50 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-violet-600 outline-none hover:from-blue-500 hover:to-violet-500 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Analyzing Skills...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-blue-200 group-hover:text-white transition-colors" />
                  <span>Analyze My Future</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Predict;
