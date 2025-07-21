import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { useAuth } from '../contexts/AuthContext'
import { PlusCircle, Edit, Trash2, Search, Check, X, Building2, Phone, Mail, MapPin } from 'lucide-react'

const Proveedores = () => {
  const { getAuthHeaders } = useAuth()
  const [proveedores, setProveedores] = useState([])
  const [loading, setLoading] = useState(true)
  const [newProveedor, setNewProveedor] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: ''
  })
  const [editingProveedor, setEditingProveedor] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProveedores()
  }, [])

  const loadProveedores = async () => {
    try {
      const response = await fetch('/api/proveedores', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      if (data.success) {
        setProveedores(data.data)
      }
    } catch (error) {
      console.error('Error cargando proveedores:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProveedor = async () => {
    try {
      const response = await fetch('/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(newProveedor)
      })
      const data = await response.json()
      if (data.success) {
        setNewProveedor({
          nombre: '',
          contacto: '',
          telefono: '',
          email: '',
          direccion: ''
        })
        setIsDialogOpen(false)
        loadProveedores()
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error creando proveedor:', error)
      alert('Error al crear proveedor.')
    }
  }

  const handleUpdateProveedor = async () => {
    try {
      const response = await fetch(`/api/proveedores/${editingProveedor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(editingProveedor)
      })
      const data = await response.json()
      if (data.success) {
        setEditingProveedor(null)
        setIsDialogOpen(false)
        loadProveedores()
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error actualizando proveedor:', error)
      alert('Error al actualizar proveedor.')
    }
  }

  const handleDeleteProveedor = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres desactivar este proveedor?')) {
      try {
        const response = await fetch(`/api/proveedores/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        })
        const data = await response.json()
        if (data.success) {
          loadProveedores()
        } else {
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Error eliminando proveedor:', error)
        alert('Error al desactivar proveedor.')
      }
    }
  }

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Proveedores</h1>
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
          <h1 className="text-3xl font-bold">Proveedores</h1>
          <p className="text-muted-foreground">
            Gestiona tus proveedores y sus condiciones comerciales.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProveedor(null); setNewProveedor({ nombre: '', contacto: '', telefono: '', email: '', direccion: '' }) }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}</DialogTitle>
              <DialogDescription>
                {editingProveedor ? 'Modifica los datos del proveedor.' : 'Añade un nuevo proveedor a tu lista.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">Nombre</Label>
                <Input
                  id="nombre"
                  value={editingProveedor ? editingProveedor.nombre : newProveedor.nombre}
                  onChange={(e) => editingProveedor ? setEditingProveedor({ ...editingProveedor, nombre: e.target.value }) : setNewProveedor({ ...newProveedor, nombre: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contacto" className="text-right">Contacto</Label>
                <Input
                  id="contacto"
                  value={editingProveedor ? editingProveedor.contacto : newProveedor.contacto}
                  onChange={(e) => editingProveedor ? setEditingProveedor({ ...editingProveedor, contacto: e.target.value }) : setNewProveedor({ ...newProveedor, contacto: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">Teléfono</Label>
                <Input
                  id="telefono"
                  value={editingProveedor ? editingProveedor.telefono : newProveedor.telefono}
                  onChange={(e) => editingProveedor ? setEditingProveedor({ ...editingProveedor, telefono: e.target.value }) : setNewProveedor({ ...newProveedor, telefono: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingProveedor ? editingProveedor.email : newProveedor.email}
                  onChange={(e) => editingProveedor ? setEditingProveedor({ ...editingProveedor, email: e.target.value }) : setNewProveedor({ ...newProveedor, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="direccion" className="text-right">Dirección</Label>
                <Input
                  id="direccion"
                  value={editingProveedor ? editingProveedor.direccion : newProveedor.direccion}
                  onChange={(e) => editingProveedor ? setEditingProveedor({ ...editingProveedor, direccion: e.target.value }) : setNewProveedor({ ...newProveedor, direccion: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {editingProveedor && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="activo" className="text-right">Activo</Label>
                  <input
                    type="checkbox"
                    id="activo"
                    checked={editingProveedor.activo}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, activo: e.target.checked })}
                    className="col-span-3 w-4 h-4"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancelar</Button>
              <Button onClick={editingProveedor ? handleUpdateProveedor : handleCreateProveedor}>
                {editingProveedor ? 'Guardar Cambios' : 'Agregar Proveedor'}
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
            placeholder="Buscar proveedor por nombre, email o contacto..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Proveedores List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProveedores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron proveedores.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProveedores.map((proveedor) => (
                  <TableRow key={proveedor.id}>
                    <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                    <TableCell>{proveedor.contacto}</TableCell>
                    <TableCell>{proveedor.telefono}</TableCell>
                    <TableCell>{proveedor.email}</TableCell>
                    <TableCell>{proveedor.direccion}</TableCell>
                    <TableCell>
                      {proveedor.activo ? (
                        <Badge variant="success" className="bg-green-100 text-green-700">Activo</Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-700">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setEditingProveedor(proveedor); setIsDialogOpen(true) }}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProveedor(proveedor.id)}
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

export default Proveedores


