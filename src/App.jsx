import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Componentes
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Proveedores from './components/Proveedores'
import ListasPrecios from './components/ListasPrecios'
import AnalisisPrecios from './components/AnalisisPrecios'
import Inventario from './components/Inventario'
import Carrito from './components/Carrito'
import Sidebar from './components/Sidebar'

// Contexto de autenticación
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/listas-precios" element={<ListasPrecios />} />
            <Route path="/analisis" element={<AnalisisPrecios />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App

