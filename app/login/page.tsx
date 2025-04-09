"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Verificar si hay un parámetro de redirección o mensaje
  useEffect(() => {
    const requirePasswordChange = searchParams.get("requirePasswordChange")
    const message = searchParams.get("message")

    if (requirePasswordChange === "true") {
      toast({
        title: "Cambio de contraseña requerido",
        description: "Por favor inicia sesión con tu contraseña temporal para cambiarla.",
      })
    }

    if (message) {
      toast({
        title: "Información",
        description: decodeURIComponent(message),
      })
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulamos la autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si es un usuario con contraseña temporal (simulado)
      const isTemporaryPassword = formData.email.includes("nuevo") || formData.password === "Temporal123!"

      if (isTemporaryPassword) {
        // Redirigir a la página de cambio de contraseña
        router.push(`/change-password?email=${encodeURIComponent(formData.email)}`)
      } else {
        // Redireccionar al dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error de autenticación:", error)
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-2xl font-bold">BodegaApp</span>
          </div>
          <p className="mt-2 text-muted-foreground">Gestiona tu bodega de manera eficiente</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                  Regístrate
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
