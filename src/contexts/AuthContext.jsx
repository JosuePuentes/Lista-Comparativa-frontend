import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      const defaultAdmin = {
        email: 'admin@gmail.com',
        password: 'admin',
        name: 'Admin',
        company: 'Admin',
        businessType: 'Farmacia',
        phone: '123456789',
        address: 'Calle Falsa 123',
        role: 'admin' // Asignar rol de administrador
      };
      localStorage.setItem('user', JSON.stringify(defaultAdmin));
      return defaultAdmin;
    }
  });  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('token')
    if (token) {
      // Verificar si el token es válido
      fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Token inválido')
      })
      .then(data => {
        if (data.success) {
          setUser(data.data)
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return { success: true };
    } else {
      return { success: false, message: "Credenciales incorrectas" };
    }
  };

  const register = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getAuthHeaders
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
