"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, MoreHorizontal, Search } from "lucide-react"

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

// Datos de ejemplo para créditos
const credits = [
  {
    id: "1",
    customer: {
      id: "2",
      name: "José López",
      phone: "+51 987 123 456",
      email: "jose@example.com",
    },
    amount: 28.0,
    date: "22/06/2023",
    status: "Pendiente",
    items: [
      { name: "Arroz", quantity: 1, price: 15.0 },
      { name: "Aceite", quantity: 1, price: 13.0 },
    ],
  },
  {
    id: "2",
    customer: {
      id: "5",
      name: "Ana Vargas",
      phone: "+51 978 901 234",
      email: "ana@example.com",
    },
    amount: 15.5,
    date: "19/06/2023",
    status: "Pendiente",
    items: [
      { name: "Leche", quantity: 2, price: 7.0 },
      { name: "Pan", quantity: 1, price: 1.5 },
    ],
  },
  {
    id: "3",
    customer: {
      id: "3",
      name: "Luisa Gómez",
      phone: "+51 912 345 678",
      email: "luisa@example.com",
    },
    amount: 35.0,
    date: "15/06/2023",
    status: "Pagado",
    items: [
      { name: "Detergente", quantity: 1, price: 22.0 },
      { name: "Jabón", quantity: 2, price: 6.5 },
    ],
  },
  {
    id: "4",
    customer: {
      id: "1",
      name: "María Rodríguez",
      phone: "+51 987 654 321",
      email: "maria@example.com",
    },
    amount: 42.5,
    date: "10/06/2023",
    status: "Pagado",
    items: [
      { name: "Azúcar", quantity: 1, price: 12.5 },
      { name: "Harina", quantity: 1, price: 10.0 },
      { name: "Huevos", quantity: 1, price: 8.0 },
      { name: "Mantequilla", quantity: 1, price: 12.0 },
    ],
  },
]

export default function CreditsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [creditsList, setCreditsList] = useState(credits)

  const filteredCredits = creditsList.filter(
    (credit) =>
      (statusFilter === "all" ||
        (statusFilter === "pending" && credit.status === "Pendiente") ||
        (statusFilter === "paid" && credit.status === "Pagado")) &&
      (credit.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.customer.phone.includes(searchTerm)),
  )

  const totalPendingCredits = creditsList
    .filter((credit) => credit.status === "Pendiente")
    .reduce((sum, credit) => sum + credit.amount, 0)

  const handleViewDetails = (creditId: string) => {
    router.push(`/credits/${creditId}`)
  }

  const handleMarkAsPaid = (creditId: string) => {
    // Actualizar el estado del crédito a "Pagado"
    const updatedCredits = creditsList.map((credit) =>
      credit.id === creditId ? { ...credit, status: "Pagado" } : credit,
    )

    setCreditsList(updatedCredits)

    toast({
      title: "Crédito pagado",
      description: "El crédito ha sido marcado como pagado correctamente",
    })
  }

  const handleSendReminder = (creditId: string, customerName: string) => {
    toast({
      title: "Recordatorio enviado",
      description: `Se ha enviado un recordatorio de pago a ${customerName}`,
    })
  }

  const handlePrintReceipt = (creditId: string) => {
    toast({
      title: "Imprimiendo comprobante",
      description: `Imprimiendo comprobante del crédito ID: ${creditId}`,
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
          <h2 className="text-3xl font-bold tracking-tight">Créditos</h2>
          <div className="flex items-center space-x-2">
            <Link href="/credits/send-reminders">
              <Button variant="outline">Enviar Recordatorios</Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Créditos Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">S/. {totalPendingCredits.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                De {creditsList.filter((c) => c.status === "Pendiente").length} clientes
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Créditos</CardTitle>
            <CardDescription>Administra los créditos pendientes y pagados de tus clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar por cliente..."
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
                  Todos
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pendientes
                </Button>
                <Button
                  variant={statusFilter === "paid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("paid")}
                >
                  Pagados
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCredits.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt={credit.customer.name} />
                          <AvatarFallback>{credit.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{credit.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{credit.customer.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>S/. {credit.amount.toFixed(2)}</TableCell>
                    <TableCell>{credit.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          credit.status === "Pendiente"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {credit.status}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(credit.id)}>Ver detalles</DropdownMenuItem>
                          {credit.status === "Pendiente" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(credit.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Marcar como pagado
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendReminder(credit.id, credit.customer.name)}>
                                Enviar recordatorio
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handlePrintReceipt(credit.id)}>
                            Imprimir comprobante
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
