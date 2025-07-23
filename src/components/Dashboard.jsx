import React from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Star,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Dashboard = () => {
  const stats = [
    {
      title: 'Proveedores Activos',
      value: '24',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Productos en Inventario',
      value: '1,247',
      change: '+8%',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Ventas del Mes',
      value: '$45,230',
      change: '+23%',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Pedidos Pendientes',
      value: '18',
      change: '-5%',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const recentActivity = [
    {
      action: 'Nuevo proveedor registrado',
      details: 'Distribuidora Central S.A.',
      time: 'Hace 2 horas',
      type: 'success'
    },
    {
      action: 'Actualización de precios',
      details: 'Lista de productos electrónicos',
      time: 'Hace 4 horas',
      type: 'info'
    },
    {
      action: 'Stock bajo detectado',
      details: '5 productos requieren reposición',
      time: 'Hace 6 horas',
      type: 'warning'
    },
    {
      action: 'Pedido completado',
      details: 'Orden #12345 - $2,450',
      time: 'Hace 8 horas',
      type: 'success'
    }
  ]

  const quickActions = [
    {
      title: 'Agregar Proveedor',
      description: 'Registrar un nuevo proveedor',
      icon: Users,
      path: '/proveedores',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Actualizar Precios',
      description: 'Modificar listas de precios',
      icon: TrendingUp,
      path: '/listas-precios',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Revisar Inventario',
      description: 'Gestionar stock de productos',
      icon: Package,
      path: '/inventario',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Ver Análisis',
      description: 'Comparar precios y tendencias',
      icon: TrendingUp,
      path: '/analisis',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
        <p className="text-orange-100">
          Aquí tienes un resumen de tu sistema de gestión de inventarios
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs mes anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-orange-500" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50"
                    onClick={() => window.location.href = action.path}
                  >
                    <div className={`p-2 rounded-md ${action.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                Actividad Reciente
              </span>
              <Button variant="ghost" size="sm">
                Ver todo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`
                    w-2 h-2 rounded-full mt-2
                    ${activity.type === 'success' ? 'bg-green-500' : 
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}
                  `} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Alertas del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Stock bajo en 5 productos</p>
                <p className="text-sm text-yellow-700">Revisa el inventario para evitar desabastecimiento</p>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                Revisar
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Actualización de precios pendiente</p>
                <p className="text-sm text-yellow-700">3 proveedores han enviado nuevas listas de precios</p>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                Actualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

