import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const ListasPrecios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const listas = [
    {
      id: 1,
      nombre: 'Lista Electrónicos Q1 2024',
      proveedor: 'Distribuidora Central S.A.',
      productos: 156,
      fechaCreacion: '2024-01-15',
      fechaActualizacion: '2024-01-20',
      estado: 'Activa',
      cambios: '+5.2%',
      tipo: 'aumento'
    },
    {
      id: 2,
      nombre: 'Catálogo Hogar y Jardín',
      proveedor: 'Suministros del Norte Ltda.',
      productos: 89,
      fechaCreacion: '2024-01-10',
      fechaActualizacion: '2024-01-18',
      estado: 'Activa',
      cambios: '-2.1%',
      tipo: 'disminucion'
    },
    {
      id: 3,
      nombre: 'Lista Oficina 2024',
      proveedor: 'Comercializadora del Valle',
      productos: 234,
      fechaCreacion: '2024-01-05',
      fechaActualizacion: '2024-01-22',
      estado: 'Activa',
      cambios: '+8.7%',
      tipo: 'aumento'
    },
    {
      id: 4,
      nombre: 'Productos Importados',
      proveedor: 'Importaciones Caribe S.A.S.',
      productos: 67,
      fechaCreacion: '2023-12-20',
      fechaActualizacion: '2023-12-20',
      estado: 'Inactiva',
      cambios: '0%',
      tipo: 'sin_cambio'
    }
  ]

  const filteredListas = listas.filter(lista =>
    lista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lista.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const productosRecientes = [
    {
      nombre: 'Laptop Dell Inspiron 15',
      proveedor: 'Distribuidora Central S.A.',
      precioAnterior: 2450000,
      precioActual: 2580000,
      cambio: '+5.3%',
      fecha: '2024-01-20'
    },
    {
      nombre: 'Silla Ergonómica Oficina',
      proveedor: 'Comercializadora del Valle',
      precioAnterior: 450000,
      precioActual: 420000,
      cambio: '-6.7%',
      fecha: '2024-01-19'
    },
    {
      nombre: 'Monitor 24" Samsung',
      proveedor: 'Distribuidora Central S.A.',
      precioAnterior: 680000,
      precioActual: 720000,
      cambio: '+5.9%',
      fecha: '2024-01-18'
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listas de Precios</h1>
          <p className="text-gray-600">Administra y compara listas de precios de proveedores</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Lista
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar listas de precios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{listas.length}</div>
                <p className="text-sm text-gray-600">Total Listas</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {listas.filter(l => l.estado === 'Activa').length}
                </div>
                <p className="text-sm text-gray-600">Activas</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {listas.reduce((sum, l) => sum + l.productos, 0)}
                </div>
                <p className="text-sm text-gray-600">Total Productos</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">3</div>
                <p className="text-sm text-gray-600">Actualizadas Hoy</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listas de Precios */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listas de Precios</CardTitle>
              <CardDescription>
                Gestiona las listas de precios de tus proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredListas.map((lista) => (
                  <div key={lista.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{lista.nombre}</h3>
                        <p className="text-sm text-gray-600">{lista.proveedor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={lista.estado === 'Activa' ? 'default' : 'secondary'}>
                          {lista.estado}
                        </Badge>
                        <div className={`flex items-center text-sm ${
                          lista.tipo === 'aumento' ? 'text-red-600' : 
                          lista.tipo === 'disminucion' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {lista.tipo === 'aumento' && <TrendingUp className="h-4 w-4 mr-1" />}
                          {lista.tipo === 'disminucion' && <TrendingDown className="h-4 w-4 mr-1" />}
                          {lista.cambios}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Productos</p>
                        <p className="font-semibold">{lista.productos}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Creada</p>
                        <p className="font-semibold">
                          {new Date(lista.fechaCreacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actualizada</p>
                        <p className="font-semibold">
                          {new Date(lista.fechaActualizacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        Comparar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cambios Recientes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Cambios Recientes</CardTitle>
              <CardDescription>
                Productos con cambios de precio recientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productosRecientes.map((producto, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-1">{producto.nombre}</h4>
                    <p className="text-xs text-gray-600 mb-2">{producto.proveedor}</p>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Anterior:</span>
                        <span className="line-through text-gray-500">
                          {formatPrice(producto.precioAnterior)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Actual:</span>
                        <span className="font-semibold">
                          {formatPrice(producto.precioActual)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(producto.fecha).toLocaleDateString('es-ES')}
                        </span>
                        <span className={`text-sm font-semibold ${
                          producto.cambio.startsWith('+') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {producto.cambio}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ListasPrecios

