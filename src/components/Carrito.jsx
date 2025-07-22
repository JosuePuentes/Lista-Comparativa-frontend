import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useAuth } from '../contexts/AuthContext'
import { ShoppingCart, Trash2, Send, Package, Users } from 'lucide-react'

const Carrito = () => {
  const { getAuthHeaders } = useAuth()
  const [carritoItems, setCarritoItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCarrito()
  }, [])

  const loadCarrito = async () => {
    try {
      const response = await fetch('/api/carrito', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      if (data.success) {
        setCarritoItems(data.carrito)
      }
    } catch (error) {
      console.error('Error cargando carrito:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      try {
        const response = await fetch('/api/carrito/limpiar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        })
        const data = await response.json()
        if (data.success) {
          alert('Carrito vaciado exitosamente.')
          loadCarrito()
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error al vaciar carrito:', error)
        alert('Error al vaciar carrito.')
      }
    }
  }

  const handleSolicitarCarrito = async () => {
    if (window.confirm('¿Estás seguro de que quieres generar las solicitudes de compra?')) {
      try {
        const response = await fetch('/api/carrito/solicitar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        })
        const data = await response.json()
        if (data.success) {
          alert('Solicitudes de compra generadas exitosamente.')
          loadCarrito()
          // Aquí podrías mostrar un resumen de las solicitudes generadas
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error al generar solicitudes:', error)
        alert('Error al generar solicitudes de compra.')
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
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
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          <p className="text-muted-foreground">
            Revisa los productos seleccionados para tus solicitudes de compra.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearCart} disabled={carritoItems.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Vaciar Carrito
          </Button>
          <Button onClick={handleSolicitarCarrito} disabled={carritoItems.length === 0}>
            <Send className="h-4 w-4 mr-2" />
            Generar Solicitudes
          </Button>
        </div>
      </div>

      {/* Carrito List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carritoItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    El carrito está vacío. Agrega productos desde el análisis de precios.
                  </TableCell>
                </TableRow>
              ) : (
                carritoItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium flex items-center">
                      <Package className="h-4 w-4 mr-2 text-blue-500" />
                      {item.producto.descripcion}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      {item.proveedor.nombre}
                    </TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Carrito


