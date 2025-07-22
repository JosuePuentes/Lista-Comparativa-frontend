import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  LogOut,
  Building2
} from 'lucide-react'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const menuItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: 'Dashboard',
      description: 'Vista general del sistema'
    },
    {
      path: '/proveedores',
      icon: Users,
      label: 'Proveedores',
      description: 'Gestión de proveedores y condiciones'
    },
    {
      path: '/listas-precios',
      icon: FileSpreadsheet,
      label: 'Listas de Precios',
      description: 'Cargar y gestionar listas de precios'
    },
    {
      path: '/analisis',
      icon: BarChart3,
      label: 'Análisis de Precios',
      description: 'Comparación y análisis de precios'
    },
    {
      path: '/inventario',
      icon: Package,
      label: 'Inventario',
      description: 'Gestión de inventario y stock'
    },
    {
      path: '/carrito',
      icon: ShoppingCart,
      label: 'Carrito de Compras',
      description: 'Productos seleccionados para compra'
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Sistema de Gestión</h1>
            <p className="text-sm text-muted-foreground">Precios e Inventario</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">
              {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.nombre || 'Usuario'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.empresa || 'Sin empresa'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className={`text-xs truncate ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

