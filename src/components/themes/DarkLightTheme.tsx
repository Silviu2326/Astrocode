import React from 'react';

export default function DarkLightTheme() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Dark Mode Dashboard</h1>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
            Toggle Light
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Statistics</h3>
            <div className="text-slate-300">Dark theme optimized</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-slate-900 font-semibold mb-2">Light Section</h3>
            <div className="text-slate-600">Light theme preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}