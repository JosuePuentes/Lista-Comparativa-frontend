import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Star
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Proveedores = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const proveedores = [
    {
      id: 1,
      nombre: 'Distribuidora Central S.A.',
      contacto: 'María González',
      telefono: '+57 1 234-5678',
      email: 'maria@distribuidora.com',
      ciudad: 'Bogotá',
      productos: 156,
      rating: 4.8,
      estado: 'Activo',
      ultimaCompra: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Suministros del Norte Ltda.',
      contacto: 'Carlos Rodríguez',
      telefono: '+57 4 567-8901',
      email: 'carlos@suministros.com',
      ciudad: 'Medellín',
      productos: 89,
      rating: 4.5,
      estado: 'Activo',
      ultimaCompra: '2024-01-12'
    },
    {
      id: 3,
      nombre: 'Comercializadora del Valle',
      contacto: 'Ana Martínez',
      telefono: '+57 2 890-1234',
      email: 'ana@comercializadora.com',
      ciudad: 'Cali',
      productos: 234,
      rating: 4.9,
      estado: 'Activo',
      ultimaCompra: '2024-01-10'
    },
    {
      id: 4,
      nombre: 'Importaciones Caribe S.A.S.',
      contacto: 'Luis Herrera',
      telefono: '+57 5 345-6789',
      email: 'luis@importaciones.com',
      ciudad: 'Barranquilla',
      productos: 67,
      rating: 4.2,
      estado: 'Inactivo',
      ultimaCompra: '2023-12-20'
    }
  ]

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-gray-600">Gestiona tu red de proveedores</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Proveedor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar proveedores..."
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">{proveedores.length}</div>
            <p className="text-sm text-gray-600">Total Proveedores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {proveedores.filter(p => p.estado === 'Activo').length}
            </div>
            <p className="text-sm text-gray-600">Activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {proveedores.reduce((sum, p) => sum + p.productos, 0)}
            </div>
            <p className="text-sm text-gray-600">Total Productos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {(proveedores.reduce((sum, p) => sum + p.rating, 0) / proveedores.length).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Rating Promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Proveedores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProveedores.map((proveedor) => (
          <Card key={proveedor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{proveedor.nombre}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {proveedor.ciudad}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={proveedor.estado === 'Activo' ? 'default' : 'secondary'}>
                    {proveedor.estado}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Contact Info */}
                <div>
                  <p className="font-medium text-gray-900">{proveedor.contacto}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {proveedor.telefono}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-3 w-3 mr-1" />
                    {proveedor.email}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Productos</p>
                    <p className="font-semibold text-gray-900">{proveedor.productos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {renderStars(proveedor.rating)}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{proveedor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Last Purchase */}
                <div className="text-xs text-gray-500">
                  Última compra: {new Date(proveedor.ultimaCompra).toLocaleDateString('es-ES')}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Productos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProveedores.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron proveedores
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tu búsqueda o agregar un nuevo proveedor
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Proveedor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Proveedores

