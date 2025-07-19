import React from 'react';
import { BarChart3, Download, Star } from 'lucide-react';

export default function DataDrivenTheme() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Analytics Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-600 text-sm font-medium">Users</span>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-900">12,543</div>
            <div className="text-green-600 text-sm">+12% from last month</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 text-sm font-medium">Revenue</span>
              <Download className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-900">$45,210</div>
            <div className="text-green-600 text-sm">+8% from last month</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-600 text-sm font-medium">Conversion</span>
              <Star className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-900">3.2%</div>
            <div className="text-red-600 text-sm">-2% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}