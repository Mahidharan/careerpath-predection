import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal } from 'lucide-react';

interface DatasetInfo {
  total_rows: number;
  features: string[];
  sample: any[];
}

const Dataset = () => {
  const [data, setData] = useState<DatasetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch('http://localhost:5000/dataset_info');
        const json = await response.json();

        if (json.success) {
          setData(json);
        } else {
          setError(json.error || 'Failed to initialize dataset info');
        }
      } catch (err) {
        setError('Failed to connect to backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataset();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto py-8"
    >
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-3">
          <Database className="w-10 h-10 text-violet-400" />
          <span className="text-gradient">Dataset Overview</span>
        </h1>
        <p className="text-slate-400">
          A glimpse into the synthesized data powering our predictive model.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center text-red-200">
          <p>{error}</p>
          <p className="text-sm mt-2 opacity-75">Is the Python backend running?</p>
        </div>
      )}

      {data && (
        <div className="space-y-8">
          <div className="glass-card p-6 flex flex-wrap gap-6 items-center justify-center">
            <div className="flex flex-col items-center bg-slate-800/50 px-8 py-4 rounded-xl border border-slate-700">
              <span className="text-3xl font-bold text-blue-400 mb-1">{data.total_rows}</span>
              <span className="text-sm text-slate-400">Total Records</span>
            </div>
            <div className="flex flex-col items-center bg-slate-800/50 px-8 py-4 rounded-xl border border-slate-700">
              <span className="text-3xl font-bold text-emerald-400 mb-1">{data.features.length}</span>
              <span className="text-sm text-slate-400">Features Provided</span>
            </div>
          </div>

          <div className="glass-panel overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/50 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold">Sample Data (First 10 Rows)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800/30 border-b border-slate-700/50">
                  <tr>
                    {Object.keys(data.sample[0] || {}).map((key) => (
                      <th key={key} scope="col" className="px-6 py-4 font-medium whitespace-nowrap">
                        {key.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {data.sample.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      {Object.values(row).map((val: any, jdx) => (
                        <td key={jdx} className="px-6 py-4">
                          {typeof val === 'number' ? (
                            <span className="text-blue-300 font-mono">{val}</span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20 whitespace-nowrap">
                              {val}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dataset;
