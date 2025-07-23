import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const AnalisisPrecios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const comparativas = [
    {
      producto: 'Laptop Dell Inspiron 15',
      categoria: 'Electrónicos',
      proveedores: [
        { nombre: 'Distribuidora Central S.A.', precio: 2580000, descuento: '5%' },
        { nombre: 'Suministros del Norte Ltda.', precio: 2650000, descuento: '2%' },
        { nombre: 'Comercializadora del Valle', precio: 2520000, descuento: '8%' }
      ],
      mejorPrecio: 2520000,
      ahorroMaximo: 130000,
      tendencia: 'up'
    },
    {
      producto: 'Silla Ergonómica Oficina',
      categoria: 'Mobiliario',
      proveedores: [
        { nombre: 'Comercializadora del Valle', precio: 420000, descuento: '10%' },
        { nombre: 'Distribuidora Central S.A.', precio: 450000, descuento: '5%' },
        { nombre: 'Suministros del Norte Ltda.', precio: 480000, descuento: '0%' }
      ],
      mejorPrecio: 420000,
      ahorroMaximo: 60000,
      tendencia: 'down'
    },
    {
      producto: 'Monitor 24" Samsung',
      categoria: 'Electrónicos',
      proveedores: [
        { nombre: 'Distribuidora Central S.A.', precio: 720000, descuento: '3%' },
        { nombre: 'Importaciones Caribe S.A.S.', precio: 750000, descuento: '0%' },
        { nombre: 'Comercializadora del Valle', precio: 695000, descuento: '7%' }
      ],
      mejorPrecio: 695000,
      ahorroMaximo: 55000,
      tendencia: 'up'
    }
  ]

  const estadisticas = {
    ahorroTotal: 1250000,
    productosAnalizados: 156,
    proveedoresComparados: 4,
    ahorroPromedio: 8.5
  }

  const tendenciasMercado = [
    {
      categoria: 'Electrónicos',
      cambio: '+5.2%',
      tendencia: 'up',
      productos: 45,
      descripcion: 'Incremento por demanda alta'
    },
    {
      categoria: 'Mobiliario',
      cambio: '-2.1%',
      tendencia: 'down',
      productos: 32,
      descripcion: 'Reducción por nueva competencia'
    },
    {
      categoria: 'Oficina',
      cambio: '+1.8%',
      tendencia: 'up',
      productos: 28,
      descripcion: 'Estabilidad en el mercado'
    },
    {
      categoria: 'Hogar',
      cambio: '-0.5%',
      tendencia: 'down',
      productos: 51,
      descripcion: 'Ligera disminución estacional'
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredComparativas = comparativas.filter(comp =>
    comp.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análisis de Precios</h1>
          <p className="text-gray-600">Compara precios y encuentra las mejores ofertas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos para analizar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(estadisticas.ahorroTotal)}
                </div>
                <p className="text-sm text-gray-600">Ahorro Total</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {estadisticas.productosAnalizados}
                </div>
                <p className="text-sm text-gray-600">Productos Analizados</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {estadisticas.proveedoresComparados}
                </div>
                <p className="text-sm text-gray-600">Proveedores</p>
              </div>
              <PieChart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {estadisticas.ahorroPromedio}%
                </div>
                <p className="text-sm text-gray-600">Ahorro Promedio</p>
              </div>
              <Percent className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparativas de Productos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Comparativas de Productos</CardTitle>
              <CardDescription>
                Compara precios entre diferentes proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredComparativas.map((comp, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{comp.producto}</h3>
                        <p className="text-sm text-gray-600">{comp.categoria}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {comp.tendencia === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                          )}
                          <span className="text-sm font-semibold text-green-600">
                            Ahorro: {formatPrice(comp.ahorroMaximo)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {comp.proveedores.map((proveedor, idx) => {
                        const esMejor = proveedor.precio === comp.mejorPrecio
                        return (
                          <div key={idx} className={`flex justify-between items-center p-3 rounded-lg ${
                            esMejor ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                          }`}>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{proveedor.nombre}</p>
                              {proveedor.descuento !== '0%' && (
                                <Badge variant="secondary" className="text-xs">
                                  {proveedor.descuento} descuento
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${esMejor ? 'text-green-600' : 'text-gray-900'}`}>
                                {formatPrice(proveedor.precio)}
                              </p>
                              {esMejor && (
                                <p className="text-xs text-green-600 font-medium">Mejor precio</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Ver Historial
                      </Button>
                      <Button variant="outline" size="sm">
                        Agregar al Carrito
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tendencias del Mercado */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tendencias del Mercado</CardTitle>
              <CardDescription>
                Cambios de precios por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tendenciasMercado.map((tendencia, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{tendencia.categoria}</h4>
                        <p className="text-xs text-gray-600">{tendencia.productos} productos</p>
                      </div>
                      <div className="flex items-center">
                        {tendencia.tendencia === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className={`text-sm font-semibold ${
                          tendencia.tendencia === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {tendencia.cambio}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{tendencia.descripcion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Oportunidad de Ahorro</p>
                  <p className="text-xs text-blue-700">
                    Cambiando a mejores proveedores podrías ahorrar hasta {formatPrice(245000)} este mes
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Alerta de Precios</p>
                  <p className="text-xs text-yellow-700">
                    Los precios en electrónicos han subido 5.2% en la última semana
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">Mejor Momento</p>
                  <p className="text-xs text-green-700">
                    Es un buen momento para comprar mobiliario, los precios han bajado 2.1%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AnalisisPrecios

