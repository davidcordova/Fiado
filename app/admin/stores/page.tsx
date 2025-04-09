"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Search, ShoppingBag } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para tiendas
const stores = [
  {
    id: "1",
    name: "Bodega Don Carlos",
    owner: "Carlos Mendoza",
    email: "carlos@example.com",
    phone: "+51 945 678 901",
    plan: "Premium",
    status: "Activo",
    customers: 120,
    products: 350,
    registrationDate: "15/01/2023",
  },
  {
    id: "2",
    name: "Minimarket La Esquina",
    owner: "María Rodríguez",
    email: "maria@example.com",
    phone: "+51 987 654 321",
    plan: "Básico",
    status: "Activo",
    customers: 45,
    products: 120,
    registrationDate: "20/03/2023",
  },
  {
    id: "3",
    name: "Abarrotes López",
    owner: "José López",
    email: "jose@example.com",
    phone: "+51 987 123 456",
    plan: "Estándar",
    status: "Pendiente",
    customers: 0,
    products: 0,
    registrationDate: "18/06/2023",
  },
  {
    id: "4",
    name: "Bodega Luisa",
    owner: "Luisa Gómez",
    email: "luisa@example.com",
    phone: "+51 912 345 678",
    plan: "Básico",
    status: "Activo",
    customers: 30,
    products: 85,
    registrationDate: "05/04/2023",
  },
  {
    id: "5",
    name: "Minimarket Central",
    owner: "Ana Vargas",
    email: "ana@example.com",
    phone: "+51 978 901 234",
    plan: "Estándar",
    status: "Inactivo",
    customers: 65,
    products: 210,
    registrationDate: "10/02/2023",
  },
]

export default function AdminStoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const filteredStores = stores.filter((store) => {
    // Filtro por estado
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && store.status === "Activo") ||
      (statusFilter === "pending" && store.status === "Pendiente") ||
      (statusFilter === "inactive" && store.status === "Inactivo")

    // Filtro por plan
    const planMatch =
      planFilter === "all" ||
      (planFilter === "basic" && store.plan === "Básico") ||
      (planFilter === "standard" && store.plan === "Estándar") ||
      (planFilter === "premium" && store.plan === "Premium")

    // Filtro por búsqueda
    const searchMatch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && planMatch && searchMatch
  })

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-6 w-6" />
            <span>BodegaApp Admin</span>
          </div>
          <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link href="/admin/stores" className="text-sm font-medium transition-colors hover:text-primary">
              Tiendas
            </Link>
            <Link
              href="/admin/users"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Usuarios
            </Link>
            <Link
              href="/admin/plans"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Planes
            </Link>
            <Link
              href="/admin/website"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sitio Web
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Tiendas</h2>
          <div className="flex items-center space-x-2">
            <Link href="/admin/stores/new">
              <Button>Nueva Tienda</Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Tiendas Registradas</CardTitle>
            <CardDescription>Administra las tiendas registradas en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar tienda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
                <Button type="submit" size="sm" className="h-9 px-4 py-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Todas
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("active")}
                >
                  Activas
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pendientes
                </Button>
                <Button
                  variant={statusFilter === "inactive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inactivas
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tienda</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Clientes</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{store.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-muted-foreground">{store.owner}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{store.plan}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          store.status === "Activo"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : store.status === "Pendiente"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {store.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{store.customers}</TableCell>
                    <TableCell>{store.products}</TableCell>
                    <TableCell>{store.registrationDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar tienda</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Gestionar usuarios</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar plan</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {store.status === "Activo" ? (
                            <DropdownMenuItem className="text-red-600">Desactivar tienda</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activar tienda</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
