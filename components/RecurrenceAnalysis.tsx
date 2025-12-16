'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { analyzeCode } from '@/lib/code-analyzer';

const DEFAULT_CODE = `int XYZ(int Arr[], int L, int R) {
    if(L == R) 
        return (Arr[L] > 0) ? Arr[L] : 0;
    
    int C = (L + R)/2;
    int A = XYZ(Arr, L, C);
    int B = XYZ(Arr, C+1, R);
    
    int D = 0, E = 0;
    for(int i = C; i >= L; --i) {
        E += Arr[i];
        if(E > D) D = E;
    }
    
    int F = 0, G = 0;
    for(int j = C+1; j <= R; ++j) {
        G += Arr[j];
        if(G > F) F = G;
    }
    
    return Max3(A, B, D+F);
}`;

const DEFAULT_DESCRIPTION = "This function finds the maximum contiguous subarray sum using divide and conquer.";
const DEFAULT_RECURRENCE = "T(n) = 2T(n/2) + Θ(n)";
const DEFAULT_RECURRENCE_EXPLANATION = "Two recursive calls on halves of the array + Linear work to find max crossing sum";
const DEFAULT_TIME_COMPLEXITY = "Θ(n log n)";
const DEFAULT_MASTER_THEOREM = "a=2, b=2, f(n)=Θ(n). Since f(n) = Θ(n^log_b(a)), this is Case 2 of Master Theorem.";

export default function RecurrenceAnalysis() {
    const [codeContent, setCodeContent] = useState(DEFAULT_CODE);
    const [isEditMode, setIsEditMode] = useState(false);

    // Analysis fields
    const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
    const [recurrence, setRecurrence] = useState(DEFAULT_RECURRENCE);
    const [recurrenceExplanation, setRecurrenceExplanation] = useState(DEFAULT_RECURRENCE_EXPLANATION);
    const [timeComplexity, setTimeComplexity] = useState(DEFAULT_TIME_COMPLEXITY);
    const [masterTheorem, setMasterTheorem] = useState(DEFAULT_MASTER_THEOREM);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCode = localStorage.getItem('algorithmCode');
        const savedDescription = localStorage.getItem('algorithmDescription');
        const savedRecurrence = localStorage.getItem('algorithmRecurrence');
        const savedRecurrenceExp = localStorage.getItem('algorithmRecurrenceExp');
        const savedComplexity = localStorage.getItem('algorithmComplexity');
        const savedMasterTheorem = localStorage.getItem('algorithmMasterTheorem');

        if (savedCode) setCodeContent(savedCode);
        if (savedDescription) setDescription(savedDescription);
        if (savedRecurrence) setRecurrence(savedRecurrence);
        if (savedRecurrenceExp) setRecurrenceExplanation(savedRecurrenceExp);
        if (savedComplexity) setTimeComplexity(savedComplexity);
        if (savedMasterTheorem) setMasterTheorem(savedMasterTheorem);
    }, []);

    // Save to localStorage when code changes
    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCodeContent(value);
            localStorage.setItem('algorithmCode', value);
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        switch (field) {
            case 'description':
                setDescription(value);
                localStorage.setItem('algorithmDescription', value);
                break;
            case 'recurrence':
                setRecurrence(value);
                localStorage.setItem('algorithmRecurrence', value);
                break;
            case 'recurrenceExp':
                setRecurrenceExplanation(value);
                localStorage.setItem('algorithmRecurrenceExp', value);
                break;
            case 'complexity':
                setTimeComplexity(value);
                localStorage.setItem('algorithmComplexity', value);
                break;
            case 'masterTheorem':
                setMasterTheorem(value);
                localStorage.setItem('algorithmMasterTheorem', value);
                break;
        }
    };

    // Reset to default
    const handleReset = () => {
        setCodeContent(DEFAULT_CODE);
        setDescription(DEFAULT_DESCRIPTION);
        setRecurrence(DEFAULT_RECURRENCE);
        setRecurrenceExplanation(DEFAULT_RECURRENCE_EXPLANATION);
        setTimeComplexity(DEFAULT_TIME_COMPLEXITY);
        setMasterTheorem(DEFAULT_MASTER_THEOREM);

        localStorage.removeItem('algorithmCode');
        localStorage.removeItem('algorithmDescription');
        localStorage.removeItem('algorithmRecurrence');
        localStorage.removeItem('algorithmRecurrenceExp');
        localStorage.removeItem('algorithmComplexity');
        localStorage.removeItem('algorithmMasterTheorem');

        setIsEditMode(false);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-3 sm:mb-4">Recurrence Equation Analysis</h3>

                <div className="space-y-4 text-gray-200">
                    {/* Code Editor Section */}
                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                            <p className="text-sm font-semibold text-gray-300">Algorithm Code:</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setIsEditMode(!isEditMode)}
                                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold transition-all ${isEditMode
                                            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                        }`}
                                >
                                    {isEditMode ? '📝 Editing' : '✏️ Edit Analysis'}
                                </button>
                                <button
                                    onClick={() => {
                                        const analyzed = analyzeCode(codeContent);
                                        setDescription(analyzed.description);
                                        setRecurrence(analyzed.recurrence);
                                        setRecurrenceExplanation(analyzed.recurrenceExplanation);
                                        setTimeComplexity(analyzed.timeComplexity);
                                        setMasterTheorem(analyzed.masterTheorem);

                                        // Save to localStorage
                                        localStorage.setItem('algorithmDescription', analyzed.description);
                                        localStorage.setItem('algorithmRecurrence', analyzed.recurrence);
                                        localStorage.setItem('algorithmRecurrenceExp', analyzed.recurrenceExplanation);
                                        localStorage.setItem('algorithmComplexity', analyzed.timeComplexity);
                                        localStorage.setItem('algorithmMasterTheorem', analyzed.masterTheorem);
                                    }}
                                    className="px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-all"
                                    title="Automatically analyze the code"
                                >
                                    🤖 Auto Analyze
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-3 py-1.5 text-xs sm:text-sm rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-all"
                                    title="Reset to default XYZ function"
                                >
                                    🔄 Reset All
                                </button>
                            </div>
                        </div>

                        {/* Monaco Editor */}
                        <div className="rounded-lg overflow-hidden border border-gray-700">
                            <Editor
                                height="300px"
                                defaultLanguage="cpp"
                                value={codeContent}
                                onChange={handleCodeChange}
                                theme="vs-dark"
                                options={{
                                    readOnly: !isEditMode,
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    lineNumbers: 'on',
                                    scrollBeyondLastLine: false,
                                    wordWrap: 'on',
                                    automaticLayout: true,
                                    tabSize: 4,
                                    renderWhitespace: 'selection',
                                }}
                            />
                        </div>

                        {isEditMode && (
                            <p className="text-xs text-yellow-400 mt-2">
                                💡 All changes are automatically saved. Click "Reset All" to restore defaults.
                            </p>
                        )}
                    </div>

                    {/* Algorithm Description */}
                    <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-indigo-300 mb-2">Algorithm Description:</h4>
                        {isEditMode ? (
                            <textarea
                                value={description}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 min-h-[60px]"
                                placeholder="Describe what this algorithm does..."
                            />
                        ) : (
                            <p className="text-sm sm:text-base text-gray-200">{description}</p>
                        )}
                    </div>

                    <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-indigo-300 mb-2 sm:mb-3">Analysis:</h4>

                        <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                            {/* Step 1: Recurrence Equation */}
                            <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Step 1: Identify the recurrence</h5>

                                {isEditMode ? (
                                    <>
                                        <label className="text-xs text-gray-400 block mb-1">Recurrence Equation:</label>
                                        <input
                                            type="text"
                                            value={recurrence}
                                            onChange={(e) => handleFieldChange('recurrence', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 font-mono text-sm text-gray-200 focus:outline-none focus:border-purple-500 mb-3"
                                            placeholder="e.g., T(n) = 2T(n/2) + Θ(n)"
                                        />
                                        <label className="text-xs text-gray-400 block mb-1">Explanation:</label>
                                        <textarea
                                            value={recurrenceExplanation}
                                            onChange={(e) => handleFieldChange('recurrenceExp', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500 min-h-[60px]"
                                            placeholder="Explain the recurrence..."
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-mono bg-gray-900/50 p-2 rounded mb-2">
                                            {recurrence}
                                        </p>
                                        <p className="text-sm text-gray-300">{recurrenceExplanation}</p>
                                    </>
                                )}
                            </div>

                            {/* Step 2: Master Theorem */}
                            <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Step 2: Solve using Master Theorem</h5>

                                {isEditMode ? (
                                    <>
                                        <label className="text-xs text-gray-400 block mb-1">Master Theorem Analysis:</label>
                                        <textarea
                                            value={masterTheorem}
                                            onChange={(e) => handleFieldChange('masterTheorem', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500 min-h-[80px]"
                                            placeholder="e.g., a=2, b=2, f(n)=Θ(n). Case 2 applies..."
                                        />
                                    </>
                                ) : (
                                    <div className="mt-3 p-3 bg-gray-900/50 rounded">
                                        <p className="text-sm text-gray-200">{masterTheorem}</p>
                                    </div>
                                )}
                            </div>

                            {/* Solution */}
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Solution:</h5>

                                {isEditMode ? (
                                    <>
                                        <label className="text-xs text-gray-400 block mb-1">Time Complexity:</label>
                                        <input
                                            type="text"
                                            value={timeComplexity}
                                            onChange={(e) => handleFieldChange('complexity', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-green-700 rounded px-3 py-2 font-mono text-lg text-green-400 focus:outline-none focus:border-green-500"
                                            placeholder="e.g., Θ(n log n)"
                                        />
                                    </>
                                ) : (
                                    <p className="text-lg sm:text-xl font-mono text-green-400">
                                        T(n) = {timeComplexity}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
