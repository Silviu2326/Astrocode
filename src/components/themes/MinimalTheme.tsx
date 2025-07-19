import React from 'react';

export default function MinimalTheme() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-wide">Minimal Design</h1>
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-light text-gray-700">Clean Typography</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Simple</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Clean</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-4"></div>
              <p className="text-gray-600 text-sm">Minimal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}