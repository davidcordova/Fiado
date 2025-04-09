"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Search, ShoppingBag, Trash2, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para usuarios
const users = [
  {
    id: "1",
    name: "Daniel Córdova",
    email: "dcordova@bodegaapp.com",
    role: "Administrador",
    status: "Activo",
    lastLogin: "24/06/2023 10:30",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos@bodegaapp.com",
    role: "Soporte",
    status: "Activo",
    lastLogin: "23/06/2023 15:45",
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria@bodegaapp.com",
    role: "Ventas",
    status: "Activo",
    lastLogin: "22/06/2023 09:15",
  },
  {
    id: "4",
    name: "José López",
    email: "jose@bodegaapp.com",
    role: "Soporte",
    status: "Inactivo",
    lastLogin: "15/06/2023 14:20",
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNewUserChange = (field: string, value: string) => {
    setNewUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateUser = () => {
    // Aquí iría la lógica para crear un nuevo usuario
    console.log("Nuevo usuario:", newUserData)
    // Resetear el formulario
    setNewUserData({
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    })
  }

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
            <Link
              href="/admin/stores"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tiendas
            </Link>
            <Link href="/admin/users" className="text-sm font-medium transition-colors hover:text-primary">
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
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo usuario administrador. Haz clic en guardar cuando hayas terminado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={newUserData.name}
                    onChange={(e) => handleNewUserChange("name", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => handleNewUserChange("email", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rol
                  </Label>
                  <Select value={newUserData.role} onValueChange={(value) => handleNewUserChange("role", value)}>
                    <SelectTrigger id="role" className="col-span-3">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="support">Soporte</SelectItem>
                      <SelectItem value="sales">Ventas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUserData.password}
                    onChange={(e) => handleNewUserChange("password", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmPassword" className="text-right">
                    Confirmar
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newUserData.confirmPassword}
                    onChange={(e) => handleNewUserChange("confirmPassword", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateUser}>
                  Guardar Usuario
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Usuarios del Sistema</CardTitle>
            <CardDescription>Administra los usuarios que tienen acceso al panel de administración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
                <Button type="submit" size="sm" className="h-9 px-4 py-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Activo"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
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
                          <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                          <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "Activo" ? (
                            <DropdownMenuItem>Desactivar usuario</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activar usuario</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar usuario
                          </DropdownMenuItem>
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
