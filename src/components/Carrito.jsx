import React, { useState } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Truck,
  Shield,
  Tag,
  ArrowRight,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Carrito = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      nombre: 'Laptop Dell Inspiron 15',
      proveedor: 'Distribuidora Central S.A.',
      precio: 2580000,
      cantidad: 2,
      descuento: 5,
      imagen: '/api/placeholder/80/80',
      disponible: true,
      tiempoEntrega: '2-3 días hábiles'
    },
    {
      id: 2,
      nombre: 'Silla Ergonómica Oficina',
      proveedor: 'Comercializadora del Valle',
      precio: 420000,
      cantidad: 4,
      descuento: 10,
      imagen: '/api/placeholder/80/80',
      disponible: true,
      tiempoEntrega: '1-2 días hábiles'
    },
    {
      id: 3,
      nombre: 'Monitor 24" Samsung',
      proveedor: 'Distribuidora Central S.A.',
      precio: 720000,
      cantidad: 1,
      descuento: 0,
      imagen: '/api/placeholder/80/80',
      disponible: false,
      tiempoEntrega: 'No disponible'
    }
  ])

  const [codigoDescuento, setCodigoDescuento] = useState('')

  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ))
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const calcularSubtotal = (item) => {
    const precioConDescuento = item.precio * (1 - item.descuento / 100)
    return precioConDescuento * item.cantidad
  }

  const subtotal = items.reduce((sum, item) => sum + calcularSubtotal(item), 0)
  const descuentoTotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad * item.descuento / 100), 0)
  const envio = subtotal > 5000000 ? 0 : 50000 // Envío gratis por compras mayores a 5M
  const impuestos = subtotal * 0.19 // IVA 19%
  const total = subtotal + envio + impuestos

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const productosRecomendados = [
    {
      nombre: 'Teclado Mecánico RGB',
      precio: 180000,
      descuento: 15,
      imagen: '/api/placeholder/60/60'
    },
    {
      nombre: 'Mouse Inalámbrico',
      precio: 85000,
      descuento: 20,
      imagen: '/api/placeholder/60/60'
    },
    {
      nombre: 'Webcam HD 1080p',
      precio: 120000,
      descuento: 10,
      imagen: '/api/placeholder/60/60'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-orange-500" />
          <span className="text-lg font-semibold text-gray-900">
            Total: {formatPrice(total)}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        /* Carrito Vacío */
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestros productos y agrega algunos a tu carrito
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Continuar Comprando
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items del Carrito */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Productos en tu carrito</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className={`border rounded-lg p-4 ${
                      !item.disponible ? 'bg-gray-50 opacity-75' : ''
                    }`}>
                      <div className="flex items-start space-x-4">
                        {/* Imagen del producto */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.nombre}</h3>
                              <p className="text-sm text-gray-600">{item.proveedor}</p>
                              {!item.disponible && (
                                <Badge variant="destructive" className="mt-1">
                                  No disponible
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {/* Controles de cantidad */}
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                                  disabled={!item.disponible}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium">
                                  {item.cantidad}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                                  disabled={!item.disponible}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Tiempo de entrega */}
                              <div className="flex items-center text-sm text-gray-600">
                                <Truck className="h-4 w-4 mr-1" />
                                {item.tiempoEntrega}
                              </div>
                            </div>

                            {/* Precio */}
                            <div className="text-right">
                              {item.descuento > 0 && (
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(item.precio * item.cantidad)}
                                  </span>
                                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                                    -{item.descuento}%
                                  </Badge>
                                </div>
                              )}
                              <div className="text-lg font-bold text-gray-900">
                                {formatPrice(calcularSubtotal(item))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productos Recomendados */}
            <Card>
              <CardHeader>
                <CardTitle>Productos recomendados</CardTitle>
                <CardDescription>
                  Otros clientes también compraron
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {productosRecomendados.map((producto, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-full h-16 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {producto.nombre}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-gray-900">
                            {formatPrice(producto.precio * (1 - producto.descuento / 100))}
                          </span>
                          {producto.descuento > 0 && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(producto.precio)}
                            </div>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Código de descuento */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Código de descuento
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ingresa tu código"
                      value={codigoDescuento}
                      onChange={(e) => setCodigoDescuento(e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </div>

                {/* Desglose de precios */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {descuentoTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Descuentos</span>
                      <span className="font-medium text-green-600">
                        -{formatPrice(descuentoTotal)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">
                      {envio === 0 ? 'Gratis' : formatPrice(envio)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (19%)</span>
                    <span className="font-medium">{formatPrice(impuestos)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center text-sm text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Compra protegida
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Truck className="h-4 w-4 mr-2" />
                    Envío gratis en compras +{formatPrice(5000000)}
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <Tag className="h-4 w-4 mr-2" />
                    Descuentos por volumen disponibles
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2 pt-4">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceder al pago
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continuar comprando
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Información de entrega</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Entregas de lunes a viernes</p>
                <p>• Horario: 8:00 AM - 6:00 PM</p>
                <p>• Seguimiento en tiempo real</p>
                <p>• Garantía de satisfacción</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito

