import React from 'react'
import { Search, ShoppingCart, Menu, User, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Header = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center h-16 px-4">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="mr-4 text-white hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center mr-6">
          <h1 className="text-xl font-bold text-orange-400">Lista Comparativa</h1>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center mr-4 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <div>
            <div className="text-xs text-gray-300">Entregar en</div>
            <div className="font-semibold">Colombia</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex">
            <select className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm">
              <option>Todos</option>
              <option>Proveedores</option>
              <option>Productos</option>
              <option>Inventario</option>
            </select>
            <Input
              type="text"
              placeholder="Buscar productos, proveedores..."
              className="flex-1 rounded-none border-0 focus:ring-2 focus:ring-orange-400"
            />
            <Button className="bg-orange-400 hover:bg-orange-500 text-gray-900 rounded-r-md rounded-l-none px-4">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language */}
          <div className="hidden md:flex items-center text-sm">
            <span className="mr-1">🇨🇴</span>
            <span>ES</span>
          </div>

          {/* Account */}
          <div className="hidden md:flex flex-col text-sm">
            <span className="text-xs text-gray-300">Hola, Usuario</span>
            <span className="font-semibold">Cuenta y Listas</span>
          </div>

          {/* Orders */}
          <div className="hidden md:flex flex-col text-sm">
            <span className="text-xs text-gray-300">Devoluciones</span>
            <span className="font-semibold">y Pedidos</span>
          </div>

          {/* Cart */}
          <Button variant="ghost" className="relative text-white hover:bg-gray-800">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-orange-400 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              0
            </span>
            <span className="ml-2 hidden md:inline">Carrito</span>
          </Button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="flex items-center space-x-6 text-sm">
          <span className="font-semibold">Todas las categorías</span>
          <span className="hover:text-orange-400 cursor-pointer">Ofertas del día</span>
          <span className="hover:text-orange-400 cursor-pointer">Servicio al cliente</span>
          <span className="hover:text-orange-400 cursor-pointer">Registro</span>
          <span className="hover:text-orange-400 cursor-pointer">Lista de deseos</span>
          <span className="hover:text-orange-400 cursor-pointer">Vender</span>
        </div>
      </div>
    </header>
  )
}

export default Header

