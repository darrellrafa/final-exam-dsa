'use client';

import React from 'react';
import { BSTResult, getTreeStructure } from '@/lib/optimal-bst';
import { calculateTreePositions, getFlatNodeList, getEdges } from '@/lib/tree-builder';

interface BSTVisualizationProps {
    result: BSTResult;
}

export default function BSTVisualization({ result }: BSTVisualizationProps) {
    const { tree, costTable, rootTable, keys, frequencies, totalCost } = result;

    // Calculate positions for visualization
    const positionedTree = tree ? calculateTreePositions(tree) : null;
    const nodes = positionedTree ? getFlatNodeList(positionedTree) : [];
    const edges = positionedTree ? getEdges(positionedTree) : [];

    // Get text representation
    const treeText = tree ? getTreeStructure(tree) : '';

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Total Cost */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-green-300 mb-1 sm:mb-2">Total Optimal Cost</h3>
                <p className="text-3xl sm:text-4xl font-bold text-green-400">{totalCost}</p>
            </div>

            {/* Cost Table */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 sm:mb-4">Cost Table</h3>
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-1 sm:p-2 text-gray-400 text-xs sm:text-sm">i\\j</th>
                                {keys.map((_, j) => (
                                    <th key={j} className="p-1 sm:p-2 text-purple-300 text-xs sm:text-sm">{j}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {costTable.slice(0, keys.length).map((row, i) => (
                                <tr key={i} className="border-b border-gray-700/50">
                                    <td className="p-2 font-semibold text-purple-300">{i}</td>
                                    {row.slice(0, keys.length).map((cost, j) => (
                                        <td
                                            key={j}
                                            className={`p-2 text-center ${cost === 0 ? 'text-gray-600' : 'text-white bg-purple-500/10'
                                                }`}
                                        >
                                            {cost === 0 ? '-' : cost}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    cost[i][j] = minimum cost of BST containing keys from index i to j
                </p>
            </div>

            {/* Root Table */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 sm:mb-4">Root Table</h3>
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-2 text-gray-400">i\\j</th>
                                {keys.map((_, j) => (
                                    <th key={j} className="p-2 text-cyan-300">{j}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rootTable.slice(0, keys.length).map((row, i) => (
                                <tr key={i} className="border-b border-gray-700/50">
                                    <td className="p-2 font-semibold text-cyan-300">{i}</td>
                                    {row.slice(0, keys.length).map((rootIdx, j) => (
                                        <td
                                            key={j}
                                            className={`p-2 text-center ${i > j ? 'text-gray-600' : 'text-white bg-cyan-500/10'
                                                }`}
                                        >
                                            {i > j ? '-' : `${rootIdx} (${keys[rootIdx]})`}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    root[i][j] = index of root for optimal BST from i to j
                </p>
            </div>

            {/* Keys and Frequencies */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Sorted Keys and Frequencies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {keys.map((key, i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-yellow-500/20">
                            <div className="text-xs text-gray-400">Index {i}</div>
                            <div className="text-lg font-semibold text-yellow-300">{key}</div>
                            <div className="text-sm text-gray-300">freq: {frequencies[i]}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tree Structure - Text Version */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-pink-300 mb-3 sm:mb-4">Tree Structure (Text)</h3>
                <pre className="font-mono text-xs sm:text-sm text-gray-300 bg-gray-900/50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                    {treeText}
                </pre>
                <p className="text-xs text-gray-400 mt-2">
                    Format: key (frequency)
                </p>
            </div>

            {/* Tree Visualization - SVG */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-pink-300 mb-3 sm:mb-4">Tree Visualization</h3>
                <div className="bg-gray-900/50 rounded-lg p-2 sm:p-4 overflow-x-auto">
                    <svg viewBox="0 0 1000 500" className="w-full h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
                        {/* Draw edges first */}
                        {edges.map((edge, i) => (
                            <line
                                key={`edge-${i}`}
                                x1={edge.from.x}
                                y1={edge.from.y}
                                x2={edge.to.x}
                                y2={edge.to.y}
                                stroke="#6366f1"
                                strokeWidth="2"
                                opacity="0.6"
                            />
                        ))}

                        {/* Draw nodes */}
                        {nodes.map((node, i) => (
                            <g key={`node-${i}`}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="30"
                                    fill="#4f46e5"
                                    stroke="#818cf8"
                                    strokeWidth="2"
                                />
                                <text
                                    x={node.x}
                                    y={node.y - 5}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="14"
                                    fontWeight="bold"
                                >
                                    {node.key}
                                </text>
                                <text
                                    x={node.x}
                                    y={node.y + 10}
                                    textAnchor="middle"
                                    fill="#c7d2fe"
                                    fontSize="10"
                                >
                                    ({node.frequency})
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Nodes show key and frequency in parentheses
                </p>
            </div>
        </div>
    );
}
