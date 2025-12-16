'use client';

import { useState } from 'react';
import RecurrenceAnalysis from '@/components/RecurrenceAnalysis';
import TimeComplexityAnalysis from '@/components/TimeComplexityAnalysis';
import OptimalBSTForm from '@/components/OptimalBSTForm';
import BSTVisualization from '@/components/BSTVisualization';
import { constructOptimalBST, BSTData, BSTResult } from '@/lib/optimal-bst';

type Tab = 'recurrence' | 'complexity' | 'bst';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('recurrence');
  const [bstResult, setBstResult] = useState<BSTResult | null>(null);

  const handleBSTSubmit = (data: BSTData[]) => {
    const result = constructOptimalBST(data);
    setBstResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Algorithm Analysis & Optimal BST
          </h1>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Data Structures & Algorithms - Final Exam</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('recurrence')}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${activeTab === 'recurrence'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            1. Recurrence Equation
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${activeTab === 'complexity'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            2. Time Complexity
          </button>
          <button
            onClick={() => setActiveTab('bst')}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${activeTab === 'bst'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            3. Optimal BST
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'recurrence' && <RecurrenceAnalysis />}
          {activeTab === 'complexity' && <TimeComplexityAnalysis />}
          {activeTab === 'bst' && (
            <div className="space-y-8">
              <OptimalBSTForm onSubmit={handleBSTSubmit} />
              {bstResult && <BSTVisualization result={bstResult} />}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>Algorithm Analysis Tool - Built with Next.js & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}
