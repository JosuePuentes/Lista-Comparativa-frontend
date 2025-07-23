import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  const productos = [
    {
      id: 1,
      nombre: 'Laptop Dell Inspiron 15',
      categoria: 'Electrónicos',
      sku: 'DELL-INS-15-001',
      stock: 25,
      stockMinimo: 10,
      precio: 2580000,
      proveedor: 'Distribuidora Central S.A.',
      ubicacion: 'A-01-15',
      estado: 'disponible',
      ultimaEntrada: '2024-01-15',
      ultimaSalida: '2024-01-20'
    },
    {
      id: 2,
      nombre: 'Silla Ergonómica Oficina',
      categoria: 'Mobiliario',
      sku: 'SILLA-ERG-001',
      stock: 5,
      stockMinimo: 8,
      precio: 420000,
      proveedor: 'Comercializadora del Valle',
      ubicacion: 'B-02-08',
      estado: 'stock_bajo',
      ultimaEntrada: '2024-01-10',
      ultimaSalida: '2024-01-19'
    },
    {
      id: 3,
      nombre: 'Monitor 24" Samsung',
      categoria: 'Electrónicos',
      sku: 'SAM-MON-24-001',
      stock: 0,
      stockMinimo: 5,
      precio: 720000,
      proveedor: 'Distribuidora Central S.A.',
      ubicacion: 'A-03-12',
      estado: 'agotado',
      ultimaEntrada: '2024-01-05',
      ultimaSalida: '2024-01-18'
    },
    {
      id: 4,
      nombre: 'Escritorio Ejecutivo',
      categoria: 'Mobiliario',
      sku: 'ESC-EJEC-001',
      stock: 15,
      stockMinimo: 5,
      precio: 850000,
      proveedor: 'Comercializadora del Valle',
      ubicacion: 'B-01-05',
      estado: 'disponible',
      ultimaEntrada: '2024-01-12',
      ultimaSalida: '2024-01-17'
    },
    {
      id: 5,
      nombre: 'Impresora HP LaserJet',
      categoria: 'Electrónicos',
      sku: 'HP-LJ-001',
      stock: 3,
      stockMinimo: 6,
      precio: 1200000,
      proveedor: 'Suministros del Norte Ltda.',
      ubicacion: 'A-02-20',
      estado: 'stock_bajo',
      ultimaEntrada: '2024-01-08',
      ultimaSalida: '2024-01-16'
    }
  ]

  const estadisticas = {
    totalProductos: productos.length,
    disponibles: productos.filter(p => p.estado === 'disponible').length,
    stockBajo: productos.filter(p => p.estado === 'stock_bajo').length,
    agotados: productos.filter(p => p.estado === 'agotado').length,
    valorTotal: productos.reduce((sum, p) => sum + (p.precio * p.stock), 0)
  }

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filtroEstado === 'todos' || producto.estado === filtroEstado
    
    return matchesSearch && matchesFilter
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getEstadoBadge = (estado, stock, stockMinimo) => {
    if (estado === 'agotado') {
      return <Badge variant="destructive">Agotado</Badge>
    } else if (estado === 'stock_bajo') {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Stock Bajo</Badge>
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Disponible</Badge>
    }
  }

  const alertasInventario = [
    {
      tipo: 'agotado',
      mensaje: '1 producto agotado requiere reposición inmediata',
      productos: productos.filter(p => p.estado === 'agotado').length
    },
    {
      tipo: 'stock_bajo',
      mensaje: '2 productos con stock bajo necesitan reposición',
      productos: productos.filter(p => p.estado === 'stock_bajo').length
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-600">Gestiona tu stock de productos</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        </div>
      </div>

      {/* Alertas */}
      {alertasInventario.some(alerta => alerta.productos > 0) && (
        <div className="space-y-2">
          {alertasInventario.map((alerta, index) => (
            alerta.productos > 0 && (
              <Card key={index} className={`border-l-4 ${
                alerta.tipo === 'agotado' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className={`h-5 w-5 mr-2 ${
                        alerta.tipo === 'agotado' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <span className={`font-medium ${
                        alerta.tipo === 'agotado' ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {alerta.mensaje}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Productos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{estadisticas.totalProductos}</div>
                <p className="text-sm text-gray-600">Total Productos</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{estadisticas.disponibles}</div>
                <p className="text-sm text-gray-600">Disponibles</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{estadisticas.stockBajo}</div>
                <p className="text-sm text-gray-600">Stock Bajo</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{estadisticas.agotados}</div>
                <p className="text-sm text-gray-600">Agotados</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {formatPrice(estadisticas.valorTotal)}
                </div>
                <p className="text-sm text-gray-600">Valor Total</p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="todos">Todos los estados</option>
              <option value="disponible">Disponible</option>
              <option value="stock_bajo">Stock Bajo</option>
              <option value="agotado">Agotado</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Más Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos en Inventario</CardTitle>
          <CardDescription>
            Lista completa de productos con información de stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProductos.map((producto) => (
              <div key={producto.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{producto.nombre}</h3>
                      {getEstadoBadge(producto.estado, producto.stock, producto.stockMinimo)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">SKU</p>
                        <p className="font-medium">{producto.sku}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Categoría</p>
                        <p className="font-medium">{producto.categoria}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ubicación</p>
                        <p className="font-medium">{producto.ubicacion}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Proveedor</p>
                        <p className="font-medium">{producto.proveedor}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Stock Actual</p>
                    <p className={`text-lg font-bold ${
                      producto.stock === 0 ? 'text-red-600' : 
                      producto.stock <= producto.stockMinimo ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {producto.stock}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stock Mínimo</p>
                    <p className="text-lg font-semibold text-gray-900">{producto.stockMinimo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio Unitario</p>
                    <p className="text-lg font-semibold text-gray-900">{formatPrice(producto.precio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(producto.precio * producto.stock)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Última Salida</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(producto.ultimaSalida).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ajustar Stock
                  </Button>
                  <Button variant="outline" size="sm">
                    Reabastecer
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProductos.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar tu búsqueda o filtros
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Inventario

