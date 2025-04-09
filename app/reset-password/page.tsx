"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { isPasswordSecure } from "@/lib/password-utils"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [tokenValid, setTokenValid] = useState(true)

  // Obtener el token y email de los parámetros de búsqueda
  useEffect(() => {
    const tokenParam = searchParams.get("token")
    const emailParam = searchParams.get("email")

    if (tokenParam) {
      setToken(tokenParam)
      // En una implementación real, aquí verificaríamos si el token es válido
      setTokenValid(true)
    } else {
      setTokenValid(false)
    }

    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Validar que la nueva contraseña sea segura
    if (!isPasswordSecure(formData.newPassword)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
      )
      return
    }

    setLoading(true)

    try {
      // Simulamos el restablecimiento de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Contraseña restablecida",
        description:
          "Tu contraseña ha sido restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.",
      })

      // Redirigir al login con un mensaje
      router.push("/login?message=" + encodeURIComponent("Contraseña restablecida correctamente"))
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error)
      setError("Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8" />
              <span className="text-2xl font-bold">BodegaApp</span>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Enlace inválido</CardTitle>
              <CardDescription>El enlace de restablecimiento de contraseña es inválido o ha expirado.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Por favor, solicita un nuevo enlace de restablecimiento de contraseña.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push("/forgot-password")}>
                Solicitar nuevo enlace
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-2xl font-bold">BodegaApp</span>
          </div>
          <p className="mt-2 text-muted-foreground">Establece una nueva contraseña</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Restablecer Contraseña</CardTitle>
            <CardDescription>
              {email ? `Para ${email}: ` : ""}
              Crea una nueva contraseña para tu cuenta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Nueva contraseña"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter
                  especial.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Restableciendo contraseña..." : "Restablecer Contraseña"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
