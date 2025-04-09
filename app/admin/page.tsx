"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Globe, LogOut, Settings, ShoppingBag, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Datos de ejemplo para el dashboard de administración
  const stats = {
    totalStores: 48,
    activeStores: 42,
    newStores: 5,
    totalRevenue: 4850.0,
    monthlyGrowth: 12.5,
  }

  // Datos de ejemplo para tiendas recientes
  const recentStores = [
    {
      id: "1",
      name: "Bodega Don Carlos",
      owner: "Carlos Mendoza",
      plan: "Premium",
      status: "Activo",
      date: "23/06/2023",
    },
    {
      id: "2",
      name: "Minimarket La Esquina",
      owner: "María Rodríguez",
      plan: "Básico",
      status: "Activo",
      date: "20/06/2023",
    },
    {
      id: "3",
      name: "Abarrotes López",
      owner: "José López",
      plan: "Estándar",
      status: "Pendiente",
      date: "18/06/2023",
    },
    { id: "4", name: "Bodega Luisa", owner: "Luisa Gómez", plan: "Básico", status: "Activo", date: "15/06/2023" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-6 w-6" />
            <span>BodegaApp Admin</span>
          </div>
          <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/admin/stores"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
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
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@admin" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Daniel Córdova</p>
                    <p className="text-xs leading-none text-muted-foreground">dcordova@bodegaapp.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
          <div className="flex items-center space-x-2">
            <Link href="/admin/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tiendas</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStores}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.activeStores} activas, {stats.totalStores - stats.activeStores} inactivas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nuevas Tiendas</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newStores}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% del mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">S/. {stats.totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% del mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5%</div>
                  <p className="text-xs text-muted-foreground">+2.1% del mes pasado</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Tiendas Recientes</CardTitle>
                  <CardDescription>Se registraron {stats.newStores} nuevas tiendas este mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStores.map((store) => (
                      <div
                        key={store.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{store.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{store.name}</p>
                            <p className="text-xs text-muted-foreground">{store.owner}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm">{store.plan}</p>
                            <p className="text-xs text-muted-foreground">{store.date}</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Distribución de Planes</CardTitle>
                  <CardDescription>Distribución de tiendas por plan de suscripción</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="space-y-2 text-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Plan Básico</p>
                        <p className="text-2xl font-bold">45%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Plan Estándar</p>
                        <p className="text-2xl font-bold">35%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Plan Premium</p>
                        <p className="text-2xl font-bold">20%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Análisis de Crecimiento</CardTitle>
                <CardDescription>Tendencias de crecimiento de tiendas y usuarios</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Gráfico de análisis de crecimiento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Reportes</CardTitle>
                <CardDescription>Genera reportes personalizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2">
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Reporte de Ingresos</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span>Reporte de Usuarios</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span>Reporte de Tiendas</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2">
                    <Globe className="h-6 w-6" />
                    <span>Reporte de Tráfico Web</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
