import { motion } from 'framer-motion';
import { Brain, Database, Code2, Server } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h1>
        <p className="text-lg text-slate-400">
          The technology and methodology behind our career predictions.
        </p>
      </div>

      <div className="space-y-12">
        <div className="glass-panel p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold">The Machine Learning Model</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">
            FuturePath utilizes a <strong>Random Forest Classifier</strong> built with Scikit-Learn.
            Random Forest is an ensemble learning method that operates by constructing a multitude
            of decision trees during training. It outputs the class that is the mode
            of the classes output by individual trees, providing highly accurate and stable predictions
            resilient to overfitting.
          </p>
        </div>

        <div className="glass-panel p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <Database className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold">The Data</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            The model is trained on a synthesized dataset mapping individuals' cognitive
            abilities (logic, creativity, math) and specific interests (design, business, technology)
            to ideal target careers in the tech industry: Software Engineer, Data Scientist,
            Cybersecurity Analyst, AI Engineer, UI/UX Designer, and Business Analyst.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center mt-12 mb-8">Technology Stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-200">
              <Code2 className="text-blue-400" />
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-1 ml-2">
              <li>React & TypeScript</li>
              <li>Vite Build Tool</li>
              <li>Tailwind CSS & Glassmorphism</li>
              <li>Recharts (Data Visualization)</li>
              <li>Framer Motion (Animations)</li>
            </ul>
          </div>

          <div className="glass-card p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-200">
              <Server className="text-emerald-400" />
              <h3 className="text-xl font-semibold">Backend & ML</h3>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-1 ml-2">
              <li>Python 3</li>
              <li>Flask (REST API)</li>
              <li>Scikit-Learn (Model Creation)</li>
              <li>Pandas (Data Manipulation)</li>
              <li>Numpy</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
