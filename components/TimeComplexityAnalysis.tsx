'use client';

import React, { useState, useEffect } from 'react';
import { analyzeCode } from '@/lib/code-analyzer';

interface ComplexityStep {
    title: string;
    code: string;
    complexity: string;
}

const DEFAULT_STEPS: ComplexityStep[] = [
    {
        title: "1. Base Case",
        code: `if(L == R) 
    return (Arr[L] > 0) ? Arr[L] : 0;`,
        complexity: "O(1) - Constant time operation"
    },
    {
        title: "2. Divide Step",
        code: `int C = (L + R)/2;
int A = XYZ(Arr, L, C);
int B = XYZ(Arr, C+1, R);`,
        complexity: "2T(n/2) - Two recursive calls on half-sized subarrays"
    },
    {
        title: "3. Conquer - Left Crossing",
        code: `int D = 0, E = 0;
for(int i = C; i >= L; --i) {
    E += Arr[i];
    if(E > D) D = E;
}`,
        complexity: "O(n/2) - Loop from middle to left end"
    },
    {
        title: "4. Conquer - Right Crossing",
        code: `int F = 0, G = 0;
for(int j = C+1; j <= R; ++j) {
    G += Arr[j];
    if(G > F) F = G;
}`,
        complexity: "O(n/2) - Loop from middle to right end"
    },
    {
        title: "5. Combine Step",
        code: `return Max3(A, B, D+F);`,
        complexity: "O(1) - Constant time comparison"
    }
];

const DEFAULT_TOTAL = "T(n) = 2T(n/2) + O(n)";
const DEFAULT_RESULT = "Θ(n log n)";
const DEFAULT_EXPLANATION = "At each level of recursion, we do O(n) work. The recursion tree has log n levels. Total work = O(n) × log n = O(n log n).";

export default function TimeComplexityAnalysis() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [steps, setSteps] = useState<ComplexityStep[]>(DEFAULT_STEPS);
    const [totalComplexity, setTotalComplexity] = useState(DEFAULT_TOTAL);
    const [finalResult, setFinalResult] = useState(DEFAULT_RESULT);
    const [explanation, setExplanation] = useState(DEFAULT_EXPLANATION);

    // Load from localStorage
    useEffect(() => {
        const savedSteps = localStorage.getItem('complexitySteps');
        const savedTotal = localStorage.getItem('complexityTotal');
        const savedResult = localStorage.getItem('complexityResult');
        const savedExplanation = localStorage.getItem('complexityExplanation');

        if (savedSteps) setSteps(JSON.parse(savedSteps));
        if (savedTotal) setTotalComplexity(savedTotal);
        if (savedResult) setFinalResult(savedResult);
        if (savedExplanation) setExplanation(savedExplanation);
    }, []);

    const handleStepChange = (index: number, field: keyof ComplexityStep, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setSteps(newSteps);
        localStorage.setItem('complexitySteps', JSON.stringify(newSteps));
    };

    const handleAddStep = () => {
        const newSteps = [...steps, { title: "New Step", code: "// code here", complexity: "O(?)" }];
        setSteps(newSteps);
        localStorage.setItem('complexitySteps', JSON.stringify(newSteps));
    };

    const handleRemoveStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
        localStorage.setItem('complexitySteps', JSON.stringify(newSteps));
    };

    const handleReset = () => {
        setSteps(DEFAULT_STEPS);
        setTotalComplexity(DEFAULT_TOTAL);
        setFinalResult(DEFAULT_RESULT);
        setExplanation(DEFAULT_EXPLANATION);

        localStorage.removeItem('complexitySteps');
        localStorage.removeItem('complexityTotal');
        localStorage.removeItem('complexityResult');
        localStorage.removeItem('complexityExplanation');

        setIsEditMode(false);
    };

    const handleFieldChange = (field: string, value: string) => {
        switch (field) {
            case 'total':
                setTotalComplexity(value);
                localStorage.setItem('complexityTotal', value);
                break;
            case 'result':
                setFinalResult(value);
                localStorage.setItem('complexityResult', value);
                break;
            case 'explanation':
                setExplanation(value);
                localStorage.setItem('complexityExplanation', value);
                break;
        }
    };

    const handleAutoAnalyze = () => {
        // Get code from localStorage (shared with RecurrenceAnalysis tab)
        const savedCode = localStorage.getItem('algorithmCode');
        if (!savedCode) {
            alert('Please enter code in Tab 1 first!');
            return;
        }

        const analyzed = analyzeCode(savedCode);

        // Update with analyzed steps
        if (analyzed.steps.length > 0) {
            setSteps(analyzed.steps);
            localStorage.setItem('complexitySteps', JSON.stringify(analyzed.steps));
        }

        setTotalComplexity(analyzed.recurrence);
        setFinalResult(analyzed.timeComplexity);
        setExplanation(analyzed.masterTheorem);

        localStorage.setItem('complexityTotal', analyzed.recurrence);
        localStorage.setItem('complexityResult', analyzed.timeComplexity);
        localStorage.setItem('complexityExplanation', analyzed.masterTheorem);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">Time Complexity Analysis</h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setIsEditMode(!isEditMode)}
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold transition-all ${isEditMode
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                }`}
                        >
                            {isEditMode ? '📝 Editing' : '✏️ Edit Breakdown'}
                        </button>
                        <button
                            onClick={handleAutoAnalyze}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-all"
                            title="Auto-analyze code from Tab 1"
                        >
                            🤖 Auto Analyze
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-all"
                        >
                            🔄 Reset All
                        </button>
                    </div>
                </div>

                {isEditMode && (
                    <p className="text-xs text-yellow-400 mb-3">
                        💡 All changes are automatically saved. Add/remove steps or edit complexity analysis as needed.
                    </p>
                )}

                <div className="space-y-4 text-gray-200">
                    <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3">Detailed Breakdown:</h4>

                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <div key={index} className="bg-gray-800/30 p-3 sm:p-4 rounded-lg relative">
                                    {isEditMode && (
                                        <button
                                            onClick={() => handleRemoveStep(index)}
                                            className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xl"
                                            title="Remove step"
                                        >
                                            ×
                                        </button>
                                    )}

                                    {isEditMode ? (
                                        <>
                                            <input
                                                type="text"
                                                value={step.title}
                                                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                                className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-1.5 mb-2 text-sm font-semibold text-blue-300 focus:outline-none focus:border-cyan-500"
                                                placeholder="Step title"
                                            />
                                            <textarea
                                                value={step.code}
                                                onChange={(e) => handleStepChange(index, 'code', e.target.value)}
                                                className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 mb-2 font-mono text-xs sm:text-sm text-gray-300 focus:outline-none focus:border-cyan-500 min-h-[60px]"
                                                placeholder="Code snippet"
                                            />
                                            <input
                                                type="text"
                                                value={step.complexity}
                                                onChange={(e) => handleStepChange(index, 'complexity', e.target.value)}
                                                className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                                                placeholder="Time complexity"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h5 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">{step.title}</h5>
                                            <pre className="font-mono text-xs sm:text-sm bg-gray-900/50 p-2 rounded text-gray-300 overflow-x-auto">
                                                {step.code}
                                            </pre>
                                            <p className="mt-2 text-sm">
                                                <strong>Time:</strong> {step.complexity}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))}

                            {isEditMode && (
                                <button
                                    onClick={handleAddStep}
                                    className="w-full py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm transition-colors"
                                >
                                    + Add Step
                                </button>
                            )}

                            {/* Total Complexity */}
                            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Total Time Complexity:</h5>
                                {isEditMode ? (
                                    <>
                                        <input
                                            type="text"
                                            value={totalComplexity}
                                            onChange={(e) => handleFieldChange('total', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-cyan-700 rounded px-3 py-2 mb-2 font-mono text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                                            placeholder="e.g., T(n) = 2T(n/2) + O(n)"
                                        />
                                        <label className="text-xs text-gray-400 block mb-1">Final Result:</label>
                                        <input
                                            type="text"
                                            value={finalResult}
                                            onChange={(e) => handleFieldChange('result', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-cyan-700 rounded px-3 py-2 font-mono text-lg text-cyan-400 focus:outline-none focus:border-cyan-500"
                                            placeholder="e.g., Θ(n log n)"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-mono text-sm sm:text-base mb-2">{totalComplexity}</p>
                                        <p className="font-mono text-cyan-400 text-lg sm:text-xl mt-2">
                                            T(n) = {finalResult}
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Explanation */}
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Explanation:</h5>
                                {isEditMode ? (
                                    <textarea
                                        value={explanation}
                                        onChange={(e) => handleFieldChange('explanation', e.target.value)}
                                        className="w-full bg-gray-900/50 border border-green-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-green-500 min-h-[80px]"
                                        placeholder="Explain how you arrived at this complexity..."
                                    />
                                ) : (
                                    <p className="text-sm text-gray-200">{explanation}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
