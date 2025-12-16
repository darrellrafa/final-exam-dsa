'use client';

import React from 'react';

export default function RecurrenceAnalysis() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-3 sm:mb-4">Recurrence Equation</h3>

                <div className="space-y-4 text-gray-200">
                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
                        <p className="mb-2 text-sm">Given the XYZ function:</p>
                        <pre className="text-indigo-300 whitespace-pre overflow-x-auto">
                            {`int XYZ(int Arr[], int L, int R) {
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
}`}
                        </pre>
                    </div>

                    <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-indigo-300 mb-2 sm:mb-3">Analysis:</h4>
                        <p className="mb-2 text-sm sm:text-base">This function finds the <strong>maximum contiguous subarray sum</strong> using divide and conquer.</p>

                        <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                            <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Step 1: Identify the recurrence</h5>
                                <p className="mb-2 text-sm">Let n = R - L + 1 (size of the array)</p>
                                <p className="font-mono bg-gray-900/50 p-2 rounded">
                                    T(n) = 2T(n/2) + Θ(n)
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-300">
                                    <li><strong>2T(n/2)</strong>: Two recursive calls on halves of the array</li>
                                    <li><strong>Θ(n)</strong>: Linear work to find max crossing sum (two loops traversing from middle)</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-purple-300 mb-2">Step 2: Solve using Master Theorem</h5>
                                <p className="mb-2">For recurrence T(n) = aT(n/b) + f(n):</p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>a = 2 (number of subproblems)</li>
                                    <li>b = 2 (factor by which problem size is reduced)</li>
                                    <li>f(n) = Θ(n) (work done outside recursion)</li>
                                </ul>

                                <div className="mt-3 p-3 bg-gray-900/50 rounded">
                                    <p className="mb-1">Calculate: n<sup>log<sub>b</sub>a</sup> = n<sup>log<sub>2</sub>2</sup> = n<sup>1</sup> = n</p>
                                    <p className="mb-2">Since f(n) = Θ(n) = Θ(n<sup>log<sub>b</sub>a</sup>)</p>
                                    <p className="text-green-400 font-semibold">
                                        This is <strong>Case 2</strong> of Master Theorem
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-3 sm:p-4 rounded-lg">
                                <h5 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Solution:</h5>
                                <p className="text-lg sm:text-xl font-mono text-green-400">
                                    T(n) = Θ(n log n)
                                </p>
                                <p className="text-sm mt-2 text-gray-300">
                                    By Master Theorem Case 2: T(n) = Θ(n<sup>log<sub>b</sub>a</sup> log n) = Θ(n log n)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
