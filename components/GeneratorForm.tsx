'use client';

import { useState } from 'react';

interface GeneratorFormProps {
  onGenerate: (data: any[]) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}

export function GeneratorForm({ onGenerate, isGenerating, setIsGenerating }: GeneratorFormProps) {
  const [prompt, setPrompt] = useState('');
  const [numRecords, setNumRecords] = useState(100);
  const [error, setError] = useState('');

  const examplePrompts = [
    "Customer support emails about product returns with sentiment labels",
    "E-commerce transactions with customer demographics and purchase history",
    "Medical patient records with diagnosis, symptoms, and treatment outcomes",
    "Restaurant reviews with ratings, cuisine type, and review sentiment",
    "Employee performance data with KPIs, department, and tenure",
    "Social media posts with engagement metrics and content categories"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe the data you need');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, numRecords })
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const result = await response.json();
      onGenerate(result.data);
    } catch (err) {
      setError('Failed to generate data. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Generate Dataset</h2>
      
      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Describe Your Data Needs
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Customer support emails about product returns, with sentiment labels, for an e-commerce fashion brand"
            className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-purple-300/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            disabled={isGenerating}
          />
        </div>

        {/* Example Prompts */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Try These Examples
          </label>
          <div className="space-y-2">
            {examplePrompts.slice(0, 3).map((example, i) => (
              <button
                key={i}
                onClick={() => setPrompt(example)}
                className="w-full text-left px-3 py-2 text-sm bg-slate-800/30 hover:bg-slate-800/50 border border-purple-300/20 rounded text-purple-200 transition"
                disabled={isGenerating}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Records */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Number of Records
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={numRecords}
              onChange={(e) => setNumRecords(parseInt(e.target.value))}
              className="flex-1"
              disabled={isGenerating}
            />
            <input
              type="number"
              value={numRecords}
              onChange={(e) => setNumRecords(parseInt(e.target.value))}
              className="w-20 px-3 py-2 bg-slate-800/50 border border-purple-300/30 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isGenerating}
            />
          </div>
          <p className="text-xs text-purple-300 mt-1">
            MVP limit: 1,000 records. Enterprise: unlimited.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Dataset...
            </span>
          ) : (
            'Generate Dataset'
          )}
        </button>

        {/* Pricing Hint */}
        <div className="text-center text-xs text-purple-300">
          <p>First 1,000 records free • $0.01 per record after</p>
        </div>
      </div>
    </div>
  );
}
