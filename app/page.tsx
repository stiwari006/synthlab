'use client';

import { useState } from 'react';
import { GeneratorForm } from '@/components/GeneratorForm';
import { DataPreview } from '@/components/DataPreview';
import { Header } from '@/components/Header';

export default function Home() {
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            SynthLab
          </h1>
          <p className="text-xl text-purple-200 mb-2">
            Generate High-Quality Synthetic Training Data in Minutes
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Describe your data needs in plain English. Get production-ready synthetic datasets 
            powered by Claude AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <GeneratorForm 
            onGenerate={setGeneratedData}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
          
          <DataPreview 
            data={generatedData}
            isGenerating={isGenerating}
          />
        </div>

        {/* Use Cases */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧪',
                title: 'ML Training',
                desc: 'Generate balanced datasets for model training without privacy concerns'
              },
              {
                icon: '🔒',
                title: 'Privacy Compliance',
                desc: 'Use synthetic data instead of real customer data for testing and development'
              },
              {
                icon: '📊',
                title: 'Data Augmentation',
                desc: 'Expand small datasets with statistically similar synthetic examples'
              },
              {
                icon: '🎯',
                title: 'Edge Cases',
                desc: 'Generate rare scenarios and edge cases that are hard to find in real data'
              },
              {
                icon: '⚡',
                title: 'Rapid Prototyping',
                desc: 'Build and test data pipelines before real data is available'
              },
              {
                icon: '🌍',
                title: 'Data Diversity',
                desc: 'Create demographically balanced datasets to reduce AI bias'
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-lg p-6 hover:bg-white/15 transition">
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-purple-200 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
