"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { sendPasswordResetEmail } from "@/lib/email-service"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generar un enlace de restablecimiento (en una implementación real, esto generaría un token único)
      const resetLink = `${window.location.origin}/reset-password?token=sample-token-123&email=${encodeURIComponent(email)}`

      // Enviar el correo de restablecimiento
      await sendPasswordResetEmail(email, resetLink)

      setSubmitted(true)
      toast({
        title: "Correo enviado",
        description: "Se ha enviado un enlace de restablecimiento a tu correo electrónico.",
      })
    } catch (error) {
      console.error("Error al enviar el correo:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
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
          <p className="mt-2 text-muted-foreground">Recupera el acceso a tu cuenta</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recuperar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {!submitted ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm">
                  <p>
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                  </p>
                  <p className="mt-2">
                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              {!submitted ? (
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
                </Button>
              ) : (
                <Button type="button" variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                  Enviar a otro correo
                </Button>
              )}
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
