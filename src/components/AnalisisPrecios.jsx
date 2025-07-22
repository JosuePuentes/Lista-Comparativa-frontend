import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { useAuth } from '../contexts/AuthContext'
import { 
  Search, 
  TrendingDown, 
  Eye, 
  ShoppingCart, 
  RefreshCw,
  DollarSign,
  Package,
  Users
} from 'lucide-react'

const AnalisisPrecios = () => {
  const { getAuthHeaders } = useAuth()
  const [analisis, setAnalisis] = useState([])
  const [loading, setLoading] = useState(true)
  const [generatingAnalysis, setGeneratingAnalysis] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetails, setProductDetails] = useState(null)

  useEffect(() => {
    loadAnalisis()
  }, [])

  const loadAnalisis = async () => {
    try {
      const response = await fetch('/api/analisis/precios', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      })

      const data = await response.json()
      if (data.success) {
        setAnalisis(data.data)
      }
    } catch (error) {
      console.error('Error cargando análisis:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAnalysis = async () => {
    setGeneratingAnalysis(true)
    try {
      const response = await fetch('/api/analisis/precios/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      })

      const data = await response.json()
      if (data.success) {
        await loadAnalisis()
      }
    } catch (error) {
      console.error('Error generando análisis:', error)
    } finally {
      setGeneratingAnalysis(false)
    }
  }

  const viewProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/analisis/precios/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      })

      const data = await response.json()
      if (data.success) {
        setProductDetails(data.data)
        setSelectedProduct(productId)
      }
    } catch (error) {
      console.error('Error cargando detalles del producto:', error)
    }
  }

  const addToCart = async (producto, proveedor, precio) => {
    try {
      const response = await fetch('/api/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          producto_id: producto.id,
          cantidad: 1,
          proveedor_id: proveedor.id
        })
      })

      const data = await response.json()
      if (data.success) {
        // Mostrar notificación de éxito
        alert(`${producto.descripcion} agregado al carrito`)
      }
    } catch (error) {
      console.error('Error agregando al carrito:', error)
    }
  }

  const filteredAnalisis = analisis.filter(item =>
    item.producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Análisis de Precios</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-muted rounded flex-1"></div>
                  <div className="h-4 bg-muted rounded flex-1"></div>
                </div>
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
          <h1 className="text-3xl font-bold">Análisis de Precios</h1>
          <p className="text-muted-foreground">
            Comparación automática de precios entre proveedores
          </p>
        </div>
        <Button onClick={generateAnalysis} disabled={generatingAnalysis}>
          <RefreshCw className={`h-4 w-4 mr-2 ${generatingAnalysis ? 'animate-spin' : ''}`} />
          {generatingAnalysis ? 'Generando...' : 'Generar Análisis'}
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, marca o código..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredAnalisis.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay análisis disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Genera un análisis de precios para ver las comparaciones
              </p>
              <Button onClick={generateAnalysis} disabled={generatingAnalysis}>
                <RefreshCw className={`h-4 w-4 mr-2 ${generatingAnalysis ? 'animate-spin' : ''}`} />
                Generar Análisis
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAnalisis.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.producto.descripcion}</h3>
                      <Badge variant="secondary">{item.producto.marca}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Código: {item.producto.codigo}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">Mejor Precio</p>
                          <p className="text-lg font-bold text-green-600">
                            ${item.mejor_precio_usd.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">Mejor Proveedor</p>
                          <p className="font-medium">{item.mejor_proveedor.nombre}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-orange-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">Ahorro Potencial</p>
                          <p className="font-bold text-orange-600">
                            ${item.ahorro_potencial.toFixed(2)} ({item.porcentaje_ahorro}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => viewProductDetails(item.producto.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Más
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.producto, item.mejor_proveedor, item.mejor_precio_usd)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && productDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Detalles del Producto</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  ✕
                </Button>
              </CardTitle>
              <CardDescription>
                {productDetails.producto.descripcion} - {productDetails.producto.marca}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Código:</span> {productDetails.producto.codigo}
                  </div>
                  <div>
                    <span className="font-medium">Código de Barra:</span> {productDetails.producto.codigo_barra}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Precios por Proveedor</h4>
                  <div className="space-y-2">
                    {productDetails.precios_detallados.map((precio, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{precio.proveedor.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            Existencia: {precio.existencia} unidades
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${precio.precio_final_usd.toFixed(2)}</p>
                          {precio.descuento_aplicado > 0 && (
                            <p className="text-sm text-green-600">
                              Descuento: {precio.porcentaje_descuento}%
                            </p>
                          )}
                        </div>
                        <div className="ml-4">
                          <Button
                            size="sm"
                            onClick={() => addToCart(productDetails.producto, precio.proveedor, precio.precio_final_usd)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default AnalisisPrecios

