import React from 'react';
import { Camera, Aperture, Focus, Image, Contrast, Palette } from 'lucide-react';

export default function MonochromeGrayscaleTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8 relative overflow-hidden">
      {/* Subtle texture background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #000 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 100 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-black rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Monochrome Header */}
        <div className="bg-gradient-to-r from-white to-gray-100 rounded-lg p-8 mb-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-300 relative">
          <div className="absolute top-4 right-4 w-4 h-4 bg-black rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-black"></div>
          <h1 className="text-6xl font-light text-black mb-4 tracking-wider">
            MONOCHROME
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-gray-700"></div>
              <div className="w-4 h-4 bg-gray-400"></div>
              <div className="w-4 h-4 bg-gray-200 border border-gray-300"></div>
            </div>
            <p className="text-gray-700 font-light text-lg tracking-wide">Timeless • Elegant • Pure</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Photography Studio */}
          <div className="bg-white rounded-lg p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mr-4 shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-black">Studio</h3>
                <p className="text-gray-600 font-light">Photography</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-light">Aperture</span>
                  <span className="text-black font-medium">f/2.8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-light">Shutter</span>
                  <span className="text-black font-medium">1/125s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-700 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Contrast Control */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-gray-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
                <Contrast className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Contrast</h3>
                <p className="text-gray-300 font-light">Light & Shadow</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className={`h-8 rounded ${
                      i === 0 ? 'bg-black' :
                      i === 1 ? 'bg-gray-800' :
                      i === 2 ? 'bg-gray-500' :
                      i === 3 ? 'bg-gray-300' :
                      'bg-white border border-gray-300'
                    }`}></div>
                  ))}
                </div>
                <p className="text-gray-400 font-light text-sm text-center">Tonal Range</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-light">Dynamic Range</span>
                  <span className="text-white font-medium">12 stops</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Gallery */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-4 shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                <Image className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-black">Gallery</h3>
                <p className="text-gray-600 font-light">Collection</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300">
                  <div className={`h-16 rounded mb-2 ${
                    i === 0 ? 'bg-gradient-to-br from-black to-gray-700' :
                    i === 1 ? 'bg-gradient-to-br from-gray-700 to-gray-400' :
                    i === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-200' :
                    'bg-gradient-to-br from-gray-200 to-white border border-gray-300'
                  }`}></div>
                  <p className="text-gray-600 font-light text-xs text-center">
                    {i === 0 ? 'Shadow' : i === 1 ? 'Midtone' : i === 2 ? 'Highlight' : 'Pure'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Darkroom */}
        <div className="mt-8 bg-gradient-to-r from-gray-200 to-white rounded-lg p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-300 relative">
          <div className="absolute top-4 right-8 w-8 h-8 bg-black rounded-full opacity-20"></div>
          <div className="absolute bottom-4 left-8 w-12 h-2 bg-gray-400"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-light text-black mb-6 tracking-wide flex items-center">
                <Aperture className="h-8 w-8 mr-3 text-gray-700" />
                Digital Darkroom
              </h3>
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-black hover:bg-gray-800 text-white font-light py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-all duration-300">
                    Develop
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-light py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-all duration-300">
                    Enhance
                  </button>
                  <button className="bg-gray-400 hover:bg-gray-300 text-white font-light py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300">
                    Adjust
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-black font-light py-4 px-6 rounded-lg border border-gray-300 shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300">
                    Export
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 font-light">Professional photo processing</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-light text-black mb-6 tracking-wide flex items-center">
                <Focus className="h-8 w-8 mr-3 text-gray-700" />
                Focus Points
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className={`h-16 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                      i === 4 ? 'bg-black border-black' :
                      [1, 3, 5, 7].includes(i) ? 'bg-gray-700 border-gray-700' :
                      'bg-gray-300 border-gray-300'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        i === 4 ? 'bg-white' :
                        [1, 3, 5, 7].includes(i) ? 'bg-gray-300' :
                        'bg-gray-600'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-gray-600 font-light text-sm">9-point autofocus system</p>
                  <div className="mt-3 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-200 rounded-full border border-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}