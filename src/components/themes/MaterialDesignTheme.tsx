import React from 'react';
import { Plus, Heart } from 'lucide-react';

export default function MaterialDesignTheme() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Material Design</h1>
        <div className="space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-md transition-all hover:shadow-lg">
            Primary Button
          </button>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-700">Material Design Card with elevation</p>
          </div>
          <div className="flex space-x-2">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}