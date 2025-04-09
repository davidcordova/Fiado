"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CalendarIcon, Check, MoreHorizontal, Plus, Printer, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Datos de ejemplo para ventas
const initialSales = [
  {
    id: "1",
    customer: {
      id: "1",
      name: "María Rodríguez",
      phone: "+51 987 654 321",
    },
    total: 42.5,
    date: new Date(2023, 5, 23, 14, 30),
    paymentMethod: "Efectivo",
    status: "Completada",
    items: [
      { name: "Azúcar", quantity: 1, price: 12.5 },
      { name: "Harina", quantity: 1, price: 10.0 },
      { name: "Huevos", quantity: 1, price: 8.0 },
      { name: "Mantequilla", quantity: 1, price: 12.0 },
    ],
  },
  {
    id: "2",
    customer: {
      id: "2",
      name: "José López",
      phone: "+51 987 123 456",
    },
    total: 28.0,
    date: new Date(2023, 5, 22, 10, 15),
    paymentMethod: "Crédito",
    status: "Pendiente de pago",
    items: [
      { name: "Arroz", quantity: 1, price: 15.0 },
      { name: "Aceite", quantity: 1, price: 13.0 },
    ],
  },
  {
    id: "3",
    customer: {
      id: "3",
      name: "Luisa Gómez",
      phone: "+51 912 345 678",
    },
    total: 35.0,
    date: new Date(2023, 5, 21, 16, 45),
    paymentMethod: "Efectivo",
    status: "Completada",
    items: [
      { name: "Detergente", quantity: 1, price: 22.0 },
      { name: "Jabón", quantity: 2, price: 6.5 },
    ],
  },
  {
    id: "4",
    customer: {
      id: "4",
      name: "Carlos Mendoza",
      phone: "+51 945 678 901",
    },
    total: 16.8,
    date: new Date(2023, 5, 20, 9, 30),
    paymentMethod: "Efectivo",
    status: "Completada",
    items: [
      { name: "Pan", quantity: 4, price: 1.5 },
      { name: "Leche", quantity: 1, price: 7.0 },
      { name: "Huevos", quantity: 1, price: 3.8 },
    ],
  },
  {
    id: "5",
    customer: {
      id: "5",
      name: "Ana Vargas",
      phone: "+51 978 901 234",
    },
    total: 22.5,
    date: new Date(2023, 5, 19, 18, 20),
    paymentMethod: "Efectivo",
    status: "Completada",
    items: [
      { name: "Arroz", quantity: 1, price: 15.0 },
      { name: "Pan", quantity: 5, price: 1.5 },
    ],
  },
]

export default function SalesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [sales, setSales] = useState(initialSales)

  const filteredSales = sales.filter((sale) => {
    // Filtro por estado
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "completed" && sale.status === "Completada") ||
      (statusFilter === "pending" && sale.status === "Pendiente de pago")

    // Filtro por búsqueda
    const searchMatch =
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.includes(searchTerm) ||
      sale.customer.phone.includes(searchTerm)

    // Filtro por fecha
    const dateMatch =
      !dateFilter ||
      (sale.date.getDate() === dateFilter.getDate() &&
        sale.date.getMonth() === dateFilter.getMonth() &&
        sale.date.getFullYear() === dateFilter.getFullYear())

    return statusMatch && searchMatch && dateMatch
  })

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0)
  const cashSales = filteredSales
    .filter((sale) => sale.paymentMethod === "Efectivo")
    .reduce((sum, sale) => sum + sale.total, 0)
  const creditSales = filteredSales
    .filter((sale) => sale.paymentMethod === "Crédito")
    .reduce((sum, sale) => sum + sale.total, 0)

  const handleViewDetails = (saleId: string) => {
    toast({
      title: "Ver detalles",
      description: `Viendo detalles de la venta ID: ${saleId}`,
    })
  }

  const handlePrintReceipt = (saleId: string) => {
    toast({
      title: "Imprimiendo comprobante",
      description: `Imprimiendo comprobante de la venta ID: ${saleId}`,
    })
  }

  const handleMarkAsPaid = (saleId: string) => {
    // Actualizar el estado de la venta a "Completada"
    const updatedSales = sales.map((sale) => (sale.id === saleId ? { ...sale, status: "Completada" } : sale))

    setSales(updatedSales)

    toast({
      title: "Venta pagada",
      description: "La venta ha sido marcada como pagada correctamente",
    })
  }

  const handleSendReminder = (saleId: string, customerName: string) => {
    toast({
      title: "Recordatorio enviado",
      description: `Se ha enviado un recordatorio de pago a ${customerName}`,
    })
  }

  const handleCancelSale = (saleId: string) => {
    // Eliminamos la venta de la lista
    setSales(sales.filter((sale) => sale.id !== saleId))

    toast({
      title: "Venta anulada",
      description: "La venta ha sido anulada correctamente",
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
          <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
          <div className="flex items-center space-x-2">
            <Link href="/sales/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Venta
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S/. {totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{filteredSales.length} ventas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas en Efectivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S/. {cashSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredSales.filter((sale) => sale.paymentMethod === "Efectivo").length} ventas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas a Crédito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S/. {creditSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredSales.filter((sale) => sale.paymentMethod === "Crédito").length} ventas
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Ventas</CardTitle>
            <CardDescription>Gestiona y visualiza todas las ventas realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar venta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
                <Button type="submit" size="sm" className="h-9 px-4 py-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${!dateFilter ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter ? format(dateFilter, "PPP", { locale: es }) : "Filtrar por fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                    {dateFilter && (
                      <div className="p-3 border-t">
                        <Button
                          variant="ghost"
                          className="w-full justify-center"
                          onClick={() => setDateFilter(undefined)}
                        >
                          Limpiar filtro
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Todas
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                >
                  Completadas
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pendientes
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Método de Pago</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">#{sale.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt={sale.customer.name} />
                          <AvatarFallback>{sale.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{sale.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{sale.customer.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{format(sale.date, "dd/MM/yyyy HH:mm")}</TableCell>
                    <TableCell>S/. {sale.total.toFixed(2)}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          sale.status === "Completada"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {sale.status}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(sale.id)}>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrintReceipt(sale.id)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir comprobante
                          </DropdownMenuItem>
                          {sale.status === "Pendiente de pago" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(sale.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Marcar como pagada
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendReminder(sale.id, sale.customer.name)}>
                                Enviar recordatorio
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleCancelSale(sale.id)}>
                            Anular venta
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSales.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
