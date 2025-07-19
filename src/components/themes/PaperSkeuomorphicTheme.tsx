import React from 'react';
import { FileText, Paperclip, Bookmark, Scissors, Pen, Stamp } from 'lucide-react';

export default function PaperSkeuomorphicTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 relative overflow-hidden">
      {/* Paper texture background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(139,69,19,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(139,69,19,0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(139,69,19,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 25px 25px, 35px 35px'
        }}></div>
      </div>
      
      {/* Paper fibers and imperfections */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }, (_, i) => (
          <div 
            key={i}
            className="absolute bg-amber-800 rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Paper Header */}
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-lg p-8 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] border border-amber-200 relative transform rotate-1">
          {/* Paper clip */}
          <div className="absolute -top-4 right-8 w-8 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg shadow-[2px_2px_8px_rgba(0,0,0,0.2)] border border-gray-500 transform rotate-12">
            <div className="w-6 h-2 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mt-1 mx-auto"></div>
          </div>
          
          {/* Hole punch marks */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
            <div className="w-4 h-4 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-gray-300"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-gray-300"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-gray-300"></div>
          </div>
          
          <div className="ml-8">
            <h1 className="text-5xl font-serif text-amber-900 mb-4 drop-shadow-sm">
              Paper & Ink
            </h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></div>
              <p className="text-amber-800 font-serif text-lg">Tactile • Authentic • Handcrafted</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Document */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] border border-gray-200 transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative">
            {/* Bookmark */}
            <div className="absolute -top-2 right-6 w-6 h-16 bg-gradient-to-b from-red-500 to-red-600 shadow-[2px_2px_8px_rgba(0,0,0,0.2)] transform rotate-3">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-6 border-l-transparent border-r-transparent border-t-red-600"></div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border border-amber-300">
                <FileText className="h-8 w-8 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-gray-800">Document</h3>
                <p className="text-gray-600 font-serif">Official Papers</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-serif">Pages</span>
                  <span className="text-gray-800 font-serif font-medium">247</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)]" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-serif">Completion</span>
                  <span className="text-green-700 font-serif font-medium">Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)]" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Notebook */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] border border-yellow-200 transform rotate-2 hover:rotate-0 transition-transform duration-300 relative">
            {/* Spiral binding */}
            <div className="absolute -left-2 top-4 bottom-4 w-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-l-lg shadow-[2px_0_8px_rgba(0,0,0,0.2)]">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-500 rounded-full mx-auto mt-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"></div>
              ))}
            </div>
            
            <div className="ml-4">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border border-yellow-400">
                  <Pen className="h-8 w-8 text-yellow-700" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-800">Notebook</h3>
                  <p className="text-gray-600 font-serif">Daily Notes</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Ruled lines */}
                <div className="bg-white rounded-lg p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-yellow-300 relative">
                  <div className="absolute inset-x-4 top-6 bottom-6 space-y-3">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="w-full h-px bg-blue-200"></div>
                    ))}
                  </div>
                  <div className="relative z-10">
                    <p className="text-gray-700 font-serif text-sm leading-6">Meeting notes from today's discussion about the new project timeline...</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-yellow-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-serif text-sm">Last Entry</span>
                    <span className="text-gray-600 font-serif text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Envelope */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] border border-blue-200 transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative">
            {/* Postage stamp */}
            <div className="absolute top-4 right-4 w-12 h-16 bg-gradient-to-br from-red-400 to-red-500 shadow-[2px_2px_8px_rgba(0,0,0,0.2)] border-2 border-white transform rotate-12">
              <div className="w-full h-full border-2 border-red-600 border-dashed rounded-sm flex items-center justify-center">
                <Stamp className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center mr-4 border border-blue-400">
                <Paperclip className="h-8 w-8 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-gray-800">Mail</h3>
                <p className="text-gray-600 font-serif">Correspondence</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-blue-300 relative">
              {/* Address lines */}
              <div className="space-y-2 mb-4">
                <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                <div className="w-2/3 h-2 bg-gray-300 rounded"></div>
              </div>
              
              <div className="text-center">
                <div className="inline-block bg-red-100 border-2 border-red-400 rounded-lg px-3 py-1 transform -rotate-3">
                  <span className="text-red-700 font-serif font-bold text-sm">URGENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Desk Workspace */}
        <div className="mt-8 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] border border-amber-300 relative">
          {/* Desk accessories */}
          <div className="absolute top-4 right-8 w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.2)] border border-gray-600"></div>
          <div className="absolute bottom-4 left-8 w-12 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.2)] transform rotate-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-serif text-amber-900 mb-6 drop-shadow-sm flex items-center">
                <Scissors className="h-8 w-8 mr-3 text-amber-700" />
                Craft Station
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] border border-amber-200">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button className="bg-gradient-to-br from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-amber-800 font-serif font-medium py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border border-amber-400">
                    Cut
                  </button>
                  <button className="bg-gradient-to-br from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800 font-serif font-medium py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border border-blue-400">
                    Fold
                  </button>
                  <button className="bg-gradient-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 text-green-800 font-serif font-medium py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border border-green-400">
                    Glue
                  </button>
                  <button className="bg-gradient-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 text-red-800 font-serif font-medium py-4 px-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-all duration-300 border border-red-400">
                    Stamp
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-amber-800 font-serif">Traditional paper crafting tools</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-serif text-amber-900 mb-6 drop-shadow-sm flex items-center">
                <Bookmark className="h-8 w-8 mr-3 text-amber-700" />
                Collection
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] border border-amber-200 transform hover:scale-105 transition-all duration-300 relative">
                    {/* Paper texture */}
                    <div className={`h-24 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] mb-3 border relative ${
                      i === 0 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300' :
                      i === 1 ? 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300' :
                      i === 2 ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-300' :
                      'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300'
                    }`}>
                      {/* Paper lines */}
                      <div className="absolute inset-2 space-y-2">
                        {Array.from({ length: 3 }, (_, j) => (
                          <div key={j} className={`w-full h-px ${
                            i === 0 ? 'bg-yellow-300' :
                            i === 1 ? 'bg-blue-300' :
                            i === 2 ? 'bg-green-300' :
                            'bg-pink-300'
                          }`}></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-amber-800 font-serif text-sm text-center">
                      {i === 0 ? 'Notes' : i === 1 ? 'Letters' : i === 2 ? 'Sketches' : 'Drafts'}
                    </p>
                    
                    {/* Corner fold */}
                    {i === 1 && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white border-l border-b border-blue-300 transform rotate-45 origin-bottom-left shadow-[1px_1px_3px_rgba(0,0,0,0.2)]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}