'use client';

import React from 'react';

export default function TimeComplexityAnalysis() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">Time Complexity Analysis</h3>

                <div className="space-y-4 text-gray-200">
                    <div>
                        <h4 className="text-xl font-semibold text-cyan-300 mb-3">Detailed Breakdown:</h4>

                        <div className="space-y-3">
                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-300 mb-2">1. Base Case</h5>
                                <pre className="font-mono text-sm bg-gray-900/50 p-2 rounded text-gray-300">
                                    {`if(L == R) 
    return (Arr[L] > 0) ? Arr[L] : 0;`}
                                </pre>
                                <p className="mt-2 text-sm">
                                    <strong>Time:</strong> O(1) - Constant time operation
                                </p>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-300 mb-2">2. Divide Step</h5>
                                <pre className="font-mono text-sm bg-gray-900/50 p-2 rounded text-gray-300">
                                    {`int C = (L + R)/2;
int A = XYZ(Arr, L, C);
int B = XYZ(Arr, C+1, R);`}
                                </pre>
                                <p className="mt-2 text-sm">
                                    <strong>Time:</strong> 2T(n/2) - Two recursive calls on half-sized subarrays
                                </p>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-300 mb-2">3. Conquer Step - Left Side Crossing</h5>
                                <pre className="font-mono text-sm bg-gray-900/50 p-2 rounded text-gray-300">
                                    {`int D = 0, E = 0;
for(int i = C; i >= L; --i) {
    E += Arr[i];
    if(E > D) D = E;
}`}
                                </pre>
                                <p className="mt-2 text-sm">
                                    <strong>Time:</strong> O(n/2) - Loop from middle to left end
                                </p>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-300 mb-2">4. Conquer Step - Right Side Crossing</h5>
                                <pre className="font-mono text-sm bg-gray-900/50 p-2 rounded text-gray-300">
                                    {`int F = 0, G = 0;
for(int j = C+1; j <= R; ++j) {
    G += Arr[j];
    if(G > F) F = G;
}`}
                                </pre>
                                <p className="mt-2 text-sm">
                                    <strong>Time:</strong> O(n/2) - Loop from middle to right end
                                </p>
                            </div>

                            <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-300 mb-2">5. Combine Step</h5>
                                <pre className="font-mono text-sm bg-gray-900/50 p-2 rounded text-gray-300">
                                    {`return Max3(A, B, D+F);`}
                                </pre>
                                <p className="mt-2 text-sm">
                                    <strong>Time:</strong> O(1) - Constant time comparison
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-cyan-300 mb-3">Total Time Complexity:</h5>
                                <div className="space-y-2">
                                    <p className="font-mono">
                                        T(n) = 2T(n/2) + O(n/2) + O(n/2) + O(1)
                                    </p>
                                    <p className="font-mono">
                                        T(n) = 2T(n/2) + O(n)
                                    </p>
                                    <p className="font-mono text-cyan-400 text-xl mt-3">
                                        T(n) = Θ(n log n)
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-green-300 mb-2">Explanation:</h5>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>At each level of recursion, we do O(n) work (scanning both halves for crossing sum)</li>
                                    <li>The recursion tree has log n levels (dividing array in half each time)</li>
                                    <li>Total work = O(n) per level × log n levels = <strong>O(n log n)</strong></li>
                                    <li>This is optimal for general divide-and-conquer max subarray algorithms</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                                <h5 className="font-semibold text-yellow-300 mb-2">📝 Note:</h5>
                                <p className="text-sm">
                                    While this divide-and-conquer approach runs in O(n log n),
                                    the maximum subarray problem can be solved more efficiently using
                                    Kadane's algorithm in O(n) time. However, the divide-and-conquer
                                    approach demonstrates important algorithmic concepts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
