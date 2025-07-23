import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Users, 
  FileText, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  X,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Panel Principal',
      icon: Home,
      path: '/',
      description: 'Vista general del sistema'
    },
    {
      title: 'Proveedores',
      icon: Users,
      path: '/proveedores',
      description: 'Gestión de proveedores'
    },
    {
      title: 'Listas de Precios',
      icon: FileText,
      path: '/listas-precios',
      description: 'Administrar listas de precios'
    },
    {
      title: 'Análisis de Precios',
      icon: TrendingUp,
      path: '/analisis',
      description: 'Comparativas y análisis'
    },
    {
      title: 'Inventario',
      icon: Package,
      path: '/inventario',
      description: 'Control de inventario'
    },
    {
      title: 'Carrito',
      icon: ShoppingCart,
      path: '/carrito',
      description: 'Carrito de compras'
    }
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-900 text-white">
          <h2 className="text-lg font-semibold">Menú Principal</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div>
              <div className="font-semibold text-gray-900">Usuario</div>
              <div className="text-sm text-gray-600">Administrador</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center w-full p-3 mb-1 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-400' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-xs text-gray-500 text-center">
            Lista Comparativa v1.0
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

