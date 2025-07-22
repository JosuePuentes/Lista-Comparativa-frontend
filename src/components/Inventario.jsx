import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { useAuth } from '../contexts/AuthContext'
import { PlusCircle, Upload, Package, Search, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'

const Inventario = () => {
  const { getAuthHeaders } = useAuth()
  const [inventario, setInventario] = useState([])
  const [movimientos, setMovimientos] = useState([])
  const [sugerencias, setSugerencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadInventarioData()
  }, [])

  const loadInventarioData = async () => {
    try {
      const headers = getAuthHeaders()

      const [inventarioRes, movimientosRes, sugerenciasRes] = await Promise.all([
        fetch('/api/inventario', { headers }),
        fetch('/api/inventario/movimientos', { headers }),
        fetch('/api/sugerencias/compra', { headers })
      ])

      const [inventarioData, movimientosData, sugerenciasData] = await Promise.all([
        inventarioRes.json(),
        movimientosRes.json(),
        sugerenciasRes.json()
      ])

      if (inventarioData.success) setInventario(inventarioData.data)
      if (movimientosData.success) setMovimientos(movimientosData.data)
      if (sugerenciasData.success) setSugerencias(sugerenciasData.data)

    } catch (error) {
      console.error('Error cargando datos de inventario:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/inventario/upload', {
        method: 'POST',
        headers: {
          ...getAuthHeaders()
        },
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        alert('Inventario cargado y procesado exitosamente.')
        setFile(null)
        setIsUploadDialogOpen(false)
        loadInventarioData()
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error al subir archivo de inventario:', error)
      alert('Error al subir archivo de inventario.')
    }
  }

  const handleGenerateSuggestions = async () => {
    try {
      const response = await fetch('/api/sugerencias/compra/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      })
      const data = await response.json()
      if (data.success) {
        alert('Sugerencias de compra generadas exitosamente.')
        loadInventarioData()
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error al generar sugerencias:', error)
      alert('Error al generar sugerencias de compra.')
    }
  }

  const handleProcessSuggestion = async (sugerenciaId) => {
    if (window.confirm('¿Marcar esta sugerencia como procesada?')) {
      try {
        const response = await fetch(`/api/sugerencias/compra/${sugerenciaId}/procesar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        })
        const data = await response.json()
        if (data.success) {
          alert('Sugerencia marcada como procesada.')
          loadInventarioData()
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error al procesar sugerencia:', error)
        alert('Error al procesar sugerencia.')
      }
    }
  }

  const filteredInventario = inventario.filter(item =>
    item.producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Inventario</h1>
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
          <h1 className="text-3xl font-bold">Inventario</h1>
          <p className="text-muted-foreground">
            Gestiona tu inventario y recibe sugerencias de compra.
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Cargar Inventario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cargar Inventario</DialogTitle>
                <DialogDescription>
                  Sube un archivo Excel con tu inventario actual.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Archivo Excel</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsUploadDialogOpen(false)} variant="outline">Cancelar</Button>
                <Button onClick={handleFileUpload} disabled={!file}>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleGenerateSuggestions}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Generar Sugerencias
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto por descripción o código..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Inventario List */}
      <Card>
        <CardHeader>
          <CardTitle>Productos en Stock</CardTitle>
          <CardDescription>Lista de todos los productos en tu inventario.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Cantidad Actual</TableHead>
                <TableHead>Cantidad Mínima</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventario.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No se encontraron productos en el inventario.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventario.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.producto.descripcion}</TableCell>
                    <TableCell>{item.producto.codigo}</TableCell>
                    <TableCell>{item.producto.marca}</TableCell>
                    <TableCell>{item.cantidad_actual}</TableCell>
                    <TableCell>{item.cantidad_minima}</TableCell>
                    <TableCell>
                      {item.necesita_reposicion ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Bajo Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" /> Suficiente
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sugerencias de Compra */}
      <Card>
        <CardHeader>
          <CardTitle>Sugerencias de Compra</CardTitle>
          <CardDescription>Productos recomendados para reponer stock.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad Sugerida</TableHead>
                <TableHead>Proveedor Recomendado</TableHead>
                <TableHead>Precio Unitario</TableHead>
                <TableHead>Costo Total</TableHead>
                <TableHead>Días de Stock Estimado</TableHead>
                <TableHead>Rotación Mensual</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sugerencias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No hay sugerencias de compra pendientes.
                  </TableCell>
                </TableRow>
              ) : (
                sugerencias.map((sugerencia) => (
                  <TableRow key={sugerencia.id}>
                    <TableCell className="font-medium">{sugerencia.producto.descripcion}</TableCell>
                    <TableCell>{sugerencia.cantidad_sugerida}</TableCell>
                    <TableCell>{sugerencia.proveedor_recomendado.nombre}</TableCell>
                    <TableCell>${sugerencia.precio_unitario.toFixed(2)}</TableCell>
                    <TableCell>${sugerencia.costo_total.toFixed(2)}</TableCell>
                    <TableCell>{sugerencia.dias_stock_estimado}</TableCell>
                    <TableCell>{sugerencia.rotacion_mensual}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{sugerencia.motivo_sugerencia}</TableCell>
                    <TableCell className="text-right">
                      {!sugerencia.procesada && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProcessSuggestion(sugerencia.id)}
                        >
                          Marcar como Procesada
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Movimientos de Inventario */}
      <Card>
        <CardHeader>
          <CardTitle>Movimientos de Inventario</CardTitle>
          <CardDescription>Historial de entradas y salidas de productos.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Cantidad Anterior</TableHead>
                <TableHead>Cantidad Nueva</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimientos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay movimientos de inventario registrados.
                  </TableCell>
                </TableRow>
              ) : (
                movimientos.map((movimiento) => (
                  <TableRow key={movimiento.id}>
                    <TableCell className="font-medium">{movimiento.producto.descripcion}</TableCell>
                    <TableCell>
                      {movimiento.tipo_movimiento === 'entrada' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <TrendingUp className="h-3 w-3 mr-1" /> Entrada
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <TrendingDown className="h-3 w-3 mr-1" /> Salida
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{movimiento.cantidad}</TableCell>
                    <TableCell>{movimiento.cantidad_anterior}</TableCell>
                    <TableCell>{movimiento.cantidad_nueva}</TableCell>
                    <TableCell>{new Date(movimiento.fecha_movimiento).toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{movimiento.motivo}</TableCell>
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

export default Inventario

