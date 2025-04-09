"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { generateSecurePassword } from "@/lib/password-utils"
import { sendWelcomeEmail } from "@/lib/email-service"
import { Switch } from "@/components/ui/switch"

export default function NewStorePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    plan: "",
    description: "",
    sendCredentials: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.name || !formData.ownerName || !formData.email || !formData.phone || !formData.plan) {
      toast({
        title: "Error de validación",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Generar una contraseña temporal segura
      const temporaryPassword = generateSecurePassword()

      // Crear el nombre de usuario (email o primera parte del email)
      const username = formData.email.split("@")[0]

      // Simulamos el proceso de creación de tienda
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enviar credenciales por correo electrónico si está habilitado
      if (formData.sendCredentials) {
        await sendWelcomeEmail({
          to: formData.email,
          storeName: formData.name,
          ownerName: formData.ownerName,
          username: username,
          password: temporaryPassword,
          loginUrl: `${window.location.origin}/login`,
        })
      }

      toast({
        title: "Tienda creada",
        description: `La tienda ${formData.name} ha sido creada exitosamente${formData.sendCredentials ? " y se han enviado las credenciales por correo electrónico" : ""}`,
      })

      // Redirigir a la lista de tiendas
      setTimeout(() => {
        router.push("/admin/stores")
      }, 1500)
    } catch (error) {
      console.error("Error al crear la tienda:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la tienda. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
        <div className="flex items-center">
          <Link href="/admin/stores" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Nueva Tienda</h2>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Información de la Tienda</CardTitle>
            <CardDescription>Ingrese los datos para crear una nueva tienda en la plataforma</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Tienda *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre de la tienda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nombre del Propietario *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    placeholder="Nombre completo"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+51 999 999 999"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Dirección completa"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan de Suscripción *</Label>
                  <Select value={formData.plan} onValueChange={(value) => handleSelectChange("plan", value)} required>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Seleccionar plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Plan Básico</SelectItem>
                      <SelectItem value="standard">Plan Estándar</SelectItem>
                      <SelectItem value="premium">Plan Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado Inicial</Label>
                  <Select defaultValue="pending">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descripción de la tienda"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendCredentials"
                      checked={formData.sendCredentials}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sendCredentials: checked }))}
                    />
                    <Label htmlFor="sendCredentials">Enviar credenciales por correo electrónico</Label>
                  </div>
                  <p className="text-sm text-muted-foreground pl-7">
                    Se generará una contraseña temporal y se enviará junto con las instrucciones de acceso al correo
                    electrónico del propietario.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/admin/stores">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Creando tienda..." : "Crear Tienda"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
