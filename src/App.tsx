import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import ProjectList from './pages/ProjectList';
import ProjectEdit from './pages/ProjectEdit';
import ConfiguracionPage from './pages/ConfiguracionPage';
import PerfilPage from './pages/PerfilPage';
import AutomatizacionesPage from './pages/AutomatizacionesPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/listadodeproyectos" replace /> : <LoginForm />
            } 
          />
          <Route 
            path="/listadodeproyectos" 
            element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Header />
                  <ProjectList />
                </ProjectProvider>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/automatizaciones" 
            element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Header />
                  <AutomatizacionesPage />
                </ProjectProvider>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Header />
                  <ProjectEdit />
                </ProjectProvider>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/configuracion" 
            element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Header />
                  <ConfiguracionPage />
                </ProjectProvider>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Header />
                  <PerfilPage />
                </ProjectProvider>
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/listadodeproyectos" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;