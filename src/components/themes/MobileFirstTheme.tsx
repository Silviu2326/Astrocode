import React from 'react';
import { Home, Search } from 'lucide-react';

export default function MobileFirstTheme() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
          <h1 className="text-white font-bold text-lg">Mobile App</h1>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-100 rounded-xl p-4 text-center">
              <Home className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-purple-800 text-sm">Home</p>
            </div>
            <div className="bg-pink-100 rounded-xl p-4 text-center">
              <Search className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <p className="text-pink-800 text-sm">Search</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 text-sm">Modular components optimized for mobile</p>
          </div>
        </div>
      </div>
    </div>
  );
}