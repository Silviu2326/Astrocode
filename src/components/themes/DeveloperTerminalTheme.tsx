import React from 'react';
import { Terminal, Code, GitBranch, Bug, Zap, Server, Database, Monitor, Activity, FileCode, Cpu, HardDrive } from 'lucide-react';

export default function DeveloperTerminalTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 font-mono relative overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-green-400 text-xs leading-none overflow-hidden">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="whitespace-nowrap animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
              {Array.from({ length: 200 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 mb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
              <Terminal className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-400 mb-1">Dev Terminal Dashboard</h1>
              <p className="text-gray-400">Centro de Control para Desarrolladores</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Metrics */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="group bg-gray-900/80 backdrop-blur-xl rounded-xl border border-green-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Code className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">2,847</p>
              <p className="text-gray-400 text-sm">Líneas de Código</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-sm">+127 hoy</span>
          </div>
        </div>

        <div className="group bg-gray-900/80 backdrop-blur-xl rounded-xl border border-blue-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <GitBranch className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">23</p>
              <p className="text-gray-400 text-sm">Commits Hoy</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 text-sm">main branch</span>
          </div>
        </div>

        <div className="group bg-gray-900/80 backdrop-blur-xl rounded-xl border border-red-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Bug className="h-6 w-6 text-red-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-400">3</p>
              <p className="text-gray-400 text-sm">Bugs Activos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400 text-sm">-2 resueltos</span>
          </div>
        </div>

        <div className="group bg-gray-900/80 backdrop-blur-xl rounded-xl border border-yellow-500/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-400">98.7%</p>
              <p className="text-gray-400 text-sm">Uptime</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-sm">Último deploy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal Interface */}
        <div className="lg:col-span-2 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-green-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 text-sm">terminal@developer:~$</span>
            </div>
            <Terminal className="h-5 w-5 text-green-400" />
          </div>
          
          <div className="bg-black/50 rounded-lg p-4 h-80 overflow-y-auto border border-green-500/20">
            <div className="space-y-2 text-sm">
              <div className="text-green-400">
                <span className="text-blue-400">developer@system</span>:<span className="text-yellow-400">~/project</span>$ git status
              </div>
              <div className="text-gray-300 ml-4">
                On branch main<br/>
                Your branch is up to date with 'origin/main'.
              </div>
              <div className="text-green-400 ml-4">
                Changes to be committed:<br/>
                <span className="text-green-300 ml-2">modified: src/components/Dashboard.tsx</span><br/>
                <span className="text-green-300 ml-2">new file: src/utils/analytics.ts</span>
              </div>
              
              <div className="text-green-400 mt-4">
                <span className="text-blue-400">developer@system</span>:<span className="text-yellow-400">~/project</span>$ npm run build
              </div>
              <div className="text-gray-300 ml-4">
                &gt; vite build<br/>
                ✓ building for production...<br/>
                ✓ 127 modules transformed.<br/>
                dist/index.html                   0.45 kB<br/>
                dist/assets/index-a1b2c3d4.css    2.34 kB │ gzip: 1.12 kB<br/>
                dist/assets/index-e5f6g7h8.js    142.67 kB │ gzip: 45.23 kB<br/>
               </div>
              <div className="text-green-400 ml-4">
                ✓ built in 3.42s
              </div>
              
              <div className="text-green-400 mt-4">
                <span className="text-blue-400">developer@system</span>:<span className="text-yellow-400">~/project</span>$ npm test
              </div>
              <div className="text-gray-300 ml-4">
                &gt; jest<br/>
                PASS src/components/Dashboard.test.tsx<br/>
                PASS src/utils/analytics.test.ts<br/>
                <span className="text-green-400">Test Suites: 2 passed, 2 total</span><br/>
                <span className="text-green-400">Tests: 15 passed, 15 total</span><br/>
                <span className="text-green-400">Snapshots: 0 total</span><br/>
                Time: 2.847 s
               </div>
              
              <div className="text-green-400 mt-4">
                <span className="text-blue-400">developer@system</span>:<span className="text-yellow-400">~/project</span>$ docker ps
              </div>
              <div className="text-gray-300 ml-4">
                CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES<br/>
                a1b2c3d4e5f6   nginx:alpine   &quot;/docker-entrypoint.…&quot;   2 hours ago     Up 2 hours     0.0.0.0:80-&gt;80/tcp      web-server<br/>
                f6e5d4c3b2a1   postgres:14    &quot;docker-entrypoint.s…&quot;   2 hours ago     Up 2 hours     0.0.0.0:5432-&gt;5432/tcp  database
               </div>
              
              <div className="text-green-400 mt-4 animate-pulse">
                <span className="text-blue-400">developer@system</span>:<span className="text-yellow-400">~/project</span>$ █
              </div>
            </div>
          </div>
        </div>

        {/* System Status Panel */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-green-500/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-green-400">Estado del Sistema</h2>
            <Monitor className="h-6 w-6 text-green-400" />
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium">Servidor Web</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-400 text-sm">nginx:alpine</div>
              <div className="text-green-300 text-xs">Puerto 80 → Activo</div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-medium">Base de Datos</span>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-400 text-sm">PostgreSQL 14</div>
              <div className="text-blue-300 text-xs">Puerto 5432 → Activo</div>
            </div>

            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 font-medium">Dev Server</span>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-400 text-sm">Vite + React</div>
              <div className="text-yellow-300 text-xs">Puerto 5173 → Activo</div>
            </div>

            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400 font-medium">Recursos</span>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center"><Cpu className="h-3 w-3 mr-1" />CPU</span>
                  <span className="text-green-400">23%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center"><HardDrive className="h-3 w-3 mr-1" />RAM</span>
                  <span className="text-green-400">67%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center"><Database className="h-3 w-3 mr-1" />Disk</span>
                  <span className="text-yellow-400">84%</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 font-medium">Logs Recientes</span>
                <FileCode className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-xs space-y-1">
                <div className="text-gray-400">14:23:45 - Build completed</div>
                <div className="text-yellow-400">14:22:12 - Warning: Unused import</div>
                <div className="text-red-400">14:21:03 - Error: Type mismatch</div>
                <div className="text-green-400">14:20:45 - Tests passed</div>
              </div>
            </div>

            <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 font-medium">Git Status</span>
                <GitBranch className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-xs space-y-1">
                <div className="text-gray-400">Branch: main</div>
                <div className="text-green-400">+2 commits ahead</div>
                <div className="text-cyan-400">Last push: 2h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}