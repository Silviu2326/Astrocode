import React from 'react';
import { Heart, Star, Settings, User, Bell, Search } from 'lucide-react';

export default function NeumorphismTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-8 relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-200 rounded-3xl p-8 mb-8 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-gray-300/20">
          <h1 className="text-4xl font-light text-gray-700 mb-4">Neumorphism Design</h1>
          <p className="text-gray-600">Soft UI with extruded elements and subtle shadows</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Profile */}
          <div className="bg-gray-200 rounded-3xl p-6 shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] border border-gray-300/20">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">John Doe</h3>
                <p className="text-gray-500">UI Designer</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-2xl p-4 shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff]">
              <p className="text-gray-600 text-sm">Creating beautiful interfaces with soft shadows and depth</p>
            </div>
          </div>

          {/* Card 2 - Stats */}
          <div className="bg-gray-200 rounded-3xl p-6 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-gray-300/20">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-2xl p-4 shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects</span>
                  <span className="text-2xl font-light text-gray-700">24</span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-2xl p-4 shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clients</span>
                  <span className="text-2xl font-light text-gray-700">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Actions */}
          <div className="bg-gray-200 rounded-3xl p-6 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-gray-300/20">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gray-200 rounded-2xl p-4 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] transition-all duration-300 flex items-center justify-center">
                <Heart className="h-6 w-6 text-gray-600" />
              </button>
              <button className="bg-gray-200 rounded-2xl p-4 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] transition-all duration-300 flex items-center justify-center">
                <Star className="h-6 w-6 text-gray-600" />
              </button>
              <button className="bg-gray-200 rounded-2xl p-4 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] transition-all duration-300 flex items-center justify-center">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
              <button className="bg-gray-200 rounded-2xl p-4 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] transition-all duration-300 flex items-center justify-center">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 bg-gray-200 rounded-3xl p-8 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-gray-300/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-light text-gray-700 mb-2">Search</h3>
              <div className="bg-gray-200 rounded-2xl p-4 shadow-[inset_15px_15px_30px_#bebebe,inset_-15px_-15px_30px_#ffffff] flex items-center">
                <Search className="h-5 w-5 text-gray-500 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search for anything..."
                  className="bg-transparent text-gray-600 placeholder-gray-500 outline-none flex-1"
                />
              </div>
            </div>
            <div className="ml-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff] flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}