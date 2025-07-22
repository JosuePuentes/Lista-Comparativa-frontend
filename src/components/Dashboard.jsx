import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useAuth } from '../contexts/AuthContext'
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

const Dashboard = () => {
  const { user, getAuthHeaders } = useAuth()
  const [stats, setStats] = useState({
    totalProveedores: 0,
    totalProductos: 0,
    ahorroTotal: 0,
    productosAnalisis: 0,
    listasPrecios: 0,
    productosStock: 0,
    sugerenciasCompra: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }

      // Cargar estadísticas en paralelo
      const [
        proveedoresRes,
        listasRes,
        analisisRes,
        inventarioRes,
        sugerenciasRes
      ] = await Promise.all([
        fetch('/api/proveedores', { headers }),
        fetch('/api/listas-precios', { headers }),
        fetch('/api/analisis/estadisticas', { headers }),
        fetch('/api/inventario', { headers }),
        fetch('/api/sugerencias/compra', { headers })
      ])

      const [
        proveedoresData,
        listasData,
        analisisData,
        inventarioData,
        sugerenciasData
      ] = await Promise.all([
        proveedoresRes.json(),
        listasRes.json(),
        analisisRes.json(),
        inventarioRes.json(),
        sugerenciasRes.json()
      ])

      setStats({
        totalProveedores: proveedoresData.success ? proveedoresData.data.length : 0,
        listasPrecios: listasData.success ? listasData.data.length : 0,
        totalProductos: analisisData.success ? analisisData.data.resumen.total_productos_analizados : 0,
        ahorroTotal: analisisData.success ? analisisData.data.resumen.ahorro_total_potencial : 0,
        productosStock: inventarioData.success ? inventarioData.data.length : 0,
        sugerenciasCompra: sugerenciasData.success ? sugerenciasData.data.length : 0
      })
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, description, icon: Icon, color = "text-primary" }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user?.nombre}. Aquí tienes un resumen de tu sistema.
          </p>
        </div>
        <Button onClick={loadDashboardData} variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Proveedores Activos"
          value={stats.totalProveedores}
          description="Proveedores registrados en el sistema"
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Listas de Precios"
          value={stats.listasPrecios}
          description="Listas cargadas y procesadas"
          icon={FileSpreadsheet}
          color="text-green-600"
        />
        <StatCard
          title="Productos Analizados"
          value={stats.totalProductos}
          description="Productos con análisis de precios"
          icon={Package}
          color="text-purple-600"
        />
        <StatCard
          title="Ahorro Potencial"
          value={`$${stats.ahorroTotal.toFixed(2)}`}
          description="Ahorro total identificado"
          icon={DollarSign}
          color="text-emerald-600"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Productos en Inventario"
          value={stats.productosStock}
          description="Productos con stock registrado"
          icon={Package}
          color="text-orange-600"
        />
        <StatCard
          title="Sugerencias de Compra"
          value={stats.sugerenciasCompra}
          description="Sugerencias pendientes de procesar"
          icon={AlertTriangle}
          color="text-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Cargar Nueva Lista de Precios
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Actualizar Inventario
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Agregar Proveedor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>
              Información sobre el estado actual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Análisis de Precios</span>
              <span className="text-sm text-green-600 font-medium">Actualizado</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Inventario</span>
              <span className="text-sm text-green-600 font-medium">Sincronizado</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sugerencias</span>
              <span className="text-sm text-yellow-600 font-medium">Pendientes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Respaldos</span>
              <span className="text-sm text-green-600 font-medium">Activos</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

