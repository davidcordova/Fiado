"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Plus, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para clientes
const customers = [
  {
    id: "1",
    name: "María Rodríguez",
    phone: "+51 987 654 321",
    email: "maria@example.com",
    status: "Activo",
    creditBalance: 0,
    lastPurchase: "23/06/2023",
  },
  {
    id: "2",
    name: "José López",
    phone: "+51 987 123 456",
    email: "jose@example.com",
    status: "Activo",
    creditBalance: 28.0,
    lastPurchase: "22/06/2023",
  },
  {
    id: "3",
    name: "Luisa Gómez",
    phone: "+51 912 345 678",
    email: "luisa@example.com",
    status: "Activo",
    creditBalance: 0,
    lastPurchase: "21/06/2023",
  },
  {
    id: "4",
    name: "Carlos Mendoza",
    phone: "+51 945 678 901",
    email: "carlos@example.com",
    status: "Activo",
    creditBalance: 0,
    lastPurchase: "20/06/2023",
  },
  {
    id: "5",
    name: "Ana Vargas",
    phone: "+51 978 901 234",
    email: "ana@example.com",
    status: "Activo",
    creditBalance: 15.5,
    lastPurchase: "19/06/2023",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customerList, setCustomerList] = useState(customers)

  const filteredCustomers = customerList.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (customerId: string) => {
    // En una implementación real, esto redireccionaría a la página de detalles del cliente
    toast({
      title: "Ver detalles",
      description: `Viendo detalles del cliente ID: ${customerId}`,
    })
  }

  const handleEditCustomer = (customerId: string) => {
    // En una implementación real, esto redireccionaría a la página de edición del cliente
    toast({
      title: "Editar cliente",
      description: `Editando cliente ID: ${customerId}`,
    })
  }

  const handleViewPurchaseHistory = (customerId: string) => {
    // En una implementación real, esto redireccionaría a la página de historial de compras
    toast({
      title: "Historial de compras",
      description: `Viendo historial de compras del cliente ID: ${customerId}`,
    })
  }

  const handleViewCredits = (customerId: string) => {
    // En una implementación real, esto redireccionaría a la página de créditos del cliente
    toast({
      title: "Ver créditos",
      description: `Viendo créditos del cliente ID: ${customerId}`,
    })
  }

  const handleDeleteCustomer = (customerId: string) => {
    // Simulamos la eliminación del cliente
    setCustomerList(customerList.filter((customer) => customer.id !== customerId))

    toast({
      title: "Cliente eliminado",
      description: `El cliente ha sido eliminado correctamente`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <div className="flex items-center space-x-2">
            <Link href="/customers/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Clientes</CardTitle>
            <CardDescription>Administra la información de tus clientes y sus créditos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar cliente..."
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
                  <TableHead>Cliente</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Crédito Pendiente</TableHead>
                  <TableHead>Última Compra</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt={customer.name} />
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {customer.creditBalance > 0 ? (
                        <span className="text-red-600">S/. {customer.creditBalance.toFixed(2)}</span>
                      ) : (
                        <span className="text-green-600">S/. 0.00</span>
                      )}
                    </TableCell>
                    <TableCell>{customer.lastPurchase}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(customer.id)}>
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCustomer(customer.id)}>
                            Editar cliente
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewPurchaseHistory(customer.id)}>
                            Ver historial de compras
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewCredits(customer.id)}>
                            Ver créditos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCustomer(customer.id)}>
                            Eliminar cliente
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
