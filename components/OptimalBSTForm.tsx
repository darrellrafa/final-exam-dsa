'use client';

import React, { useState } from 'react';
import { BSTData } from '@/lib/optimal-bst';

interface OptimalBSTFormProps {
    onSubmit: (data: BSTData[]) => void;
}

const defaultData: BSTData[] = [
    { key: 'lot', frequency: 5 },
    { key: 'of', frequency: 7 },
    { key: 'I', frequency: 10 },
    { key: 'ball', frequency: 11 },
    { key: 'eat', frequency: 15 },
    { key: 'a', frequency: 17 },
    { key: 'and', frequency: 12 },
    { key: 'friends', frequency: 12 },
    { key: 'meat', frequency: 10 },
];

export default function OptimalBSTForm({ onSubmit }: OptimalBSTFormProps) {
    const [data, setData] = useState<BSTData[]>(defaultData);

    const handleAddEntry = () => {
        setData([...data, { key: '', frequency: 0 }]);
    };

    const handleRemoveEntry = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: 'key' | 'frequency', value: string | number) => {
        const newData = [...data];
        if (field === 'key') {
            newData[index].key = value as string;
        } else {
            newData[index].frequency = Number(value);
        }
        setData(newData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validData = data.filter(d => d.key.trim() !== '' && d.frequency > 0);
        onSubmit(validData);
    };

    return (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4">Optimal BST Input Data</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-800/30 p-3 sm:p-4 rounded-lg max-h-96 overflow-y-auto">
                    <div className="hidden sm:grid grid-cols-12 gap-2 mb-2 text-sm font-semibold text-gray-400">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Key</div>
                        <div className="col-span-5">Frequency</div>
                        <div className="col-span-1"></div>
                    </div>

                    {data.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-1 sm:gap-2 mb-2 items-center">
                            <div className="col-span-1 text-gray-500 text-xs sm:text-sm">{index + 1}</div>
                            <input
                                type="text"
                                value={item.key}
                                onChange={(e) => handleChange(index, 'key', e.target.value)}
                                className="col-span-5 bg-gray-900/50 border border-gray-700 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Key"
                            />
                            <input
                                type="number"
                                value={item.frequency}
                                onChange={(e) => handleChange(index, 'frequency', e.target.value)}
                                className="col-span-5 bg-gray-900/50 border border-gray-700 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Freq"
                                min="0"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveEntry(index)}
                                className="col-span-1 text-red-400 hover:text-red-300 transition-colors text-lg sm:text-xl"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={handleAddEntry}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                    >
                        + Add Entry
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
                    >
                        Construct Optimal BST
                    </button>
                </div>
            </form>
        </div>
    );
}
