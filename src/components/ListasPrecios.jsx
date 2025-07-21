import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { useAuth } from '../contexts/AuthContext'
import { PlusCircle, Upload, FileText, Trash2, Search, Calendar } from 'lucide-react'

const ListasPrecios = () => {
  const { getAuthHeaders } = useAuth()
  const [listas, setListas] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadListas()
  }, [])

  const loadListas = async () => {
    try {
      const response = await fetch('/api/listas-precios', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      if (data.success) {
        setListas(data.data)
      }
    } catch (error) {
      console.error('Error cargando listas de precios:', error)
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
      const response = await fetch('/api/listas-precios/upload', {
        method: 'POST',
        headers: {
          ...getAuthHeaders()
        },
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        alert('Lista de precios cargada y procesada exitosamente.')
        setFile(null)
        setIsDialogOpen(false)
        loadListas()
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error al subir archivo:', error)
      alert('Error al subir archivo.')
    }
  }

  const handleDeleteLista = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta lista de precios?')) {
      try {
        const response = await fetch(`/api/listas-precios/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        })
        const data = await response.json()
        if (data.success) {
          loadListas()
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error eliminando lista:', error)
        alert('Error al eliminar lista de precios.')
      }
    }
  }

  const filteredListas = listas.filter(lista =>
    lista.nombre_archivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lista.fecha_carga.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Listas de Precios</h1>
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
          <h1 className="text-3xl font-bold">Listas de Precios</h1>
          <p className="text-muted-foreground">
            Carga y gestiona tus listas de precios para análisis.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Cargar Nueva Lista
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cargar Lista de Precios</DialogTitle>
              <DialogDescription>
                Sube un archivo Excel con tu lista de precios.
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
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancelar</Button>
              <Button onClick={handleFileUpload} disabled={!file}>
                <Upload className="h-4 w-4 mr-2" />
                Subir Archivo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre de archivo o fecha..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Listas de Precios List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de Archivo</TableHead>
                <TableHead>Fecha de Carga</TableHead>
                <TableHead>Total Productos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No se encontraron listas de precios.
                  </TableCell>
                </TableRow>
              ) : (
                filteredListas.map((lista) => (
                  <TableRow key={lista.id}>
                    <TableCell className="font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      {lista.nombre_archivo}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {new Date(lista.fecha_carga).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{lista.total_productos}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLista(lista.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
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

export default ListasPrecios

