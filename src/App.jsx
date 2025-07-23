import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Proveedores from './components/Proveedores'
import ListasPrecios from './components/ListasPrecios'
import AnalisisPrecios from './components/AnalisisPrecios'
import Inventario from './components/Inventario'
import Carrito from './components/Carrito'
import Login from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Para demo, siempre autenticado
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header estilo Amazon */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/listas-precios" element={<ListasPrecios />} />
                <Route path="/analisis" element={<AnalisisPrecios />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

