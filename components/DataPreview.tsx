'use client';

import { useMemo } from 'react';

interface DataPreviewProps {
  data: any[];
  isGenerating: boolean;
}

export function DataPreview({ data, isGenerating }: DataPreviewProps) {
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = columns.join(',');
    const rows = data.map(row => 
      columns.map(col => {
        const value = row[col];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic-data-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (data.length === 0) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthetic-data-${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = useMemo(() => {
    if (data.length === 0) return null;

    return {
      totalRecords: data.length,
      totalFields: columns.length,
      dataTypes: columns.reduce((acc, col) => {
        const sampleValue = data[0][col];
        const type = typeof sampleValue === 'number' ? 'numeric' : 
                     typeof sampleValue === 'boolean' ? 'boolean' : 'text';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [data, columns]);

  if (isGenerating) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-300/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🧬</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-2">Generating Synthetic Data...</p>
            <p className="text-purple-200 text-sm">Claude is analyzing your requirements and creating realistic data</p>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center justify-center h-96 space-y-4 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-white">No Data Yet</h3>
          <p className="text-purple-200 max-w-sm">
            Describe your data needs on the left and click "Generate Dataset" to see your synthetic data here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition flex items-center space-x-2"
          >
            <span>📥</span>
            <span>CSV</span>
          </button>
          <button
            onClick={downloadJSON}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition flex items-center space-x-2"
          >
            <span>📥</span>
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-300/20">
            <div className="text-2xl font-bold text-white">{stats.totalRecords}</div>
            <div className="text-xs text-purple-200">Records</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-300/20">
            <div className="text-2xl font-bold text-white">{stats.totalFields}</div>
            <div className="text-xs text-purple-200">Fields</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-300/20">
            <div className="text-2xl font-bold text-white">
              {Object.keys(stats.dataTypes).length}
            </div>
            <div className="text-xs text-purple-200">Data Types</div>
          </div>
        </div>
      )}

      {/* Table Preview */}
      <div className="overflow-auto max-h-96 rounded-lg border border-purple-300/20">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50 sticky top-0">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-300/10">
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-white whitespace-nowrap max-w-xs truncate">
                    {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 10 && (
        <p className="text-xs text-purple-300 mt-4 text-center">
          Showing first 10 of {data.length} records. Download to see all data.
        </p>
      )}
    </div>
  );
}
