"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para créditos pendientes
const pendingCredits = [
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
    daysOverdue: 5,
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
    daysOverdue: 8,
  },
]

export default function SendRemindersPage() {
  const [selectedCredits, setSelectedCredits] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  const toggleCredit = (creditId: string) => {
    setSelectedCredits((prev) => (prev.includes(creditId) ? prev.filter((id) => id !== creditId) : [...prev, creditId]))
  }

  const selectAll = () => {
    if (selectedCredits.length === pendingCredits.length) {
      setSelectedCredits([])
    } else {
      setSelectedCredits(pendingCredits.map((credit) => credit.id))
    }
  }

  const sendReminders = async () => {
    setSending(true)

    try {
      // Simulamos el envío de recordatorios
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Recordatorios enviados",
        description: `Se enviaron ${selectedCredits.length} recordatorios por WhatsApp.`,
      })

      setSelectedCredits([])
    } catch (error) {
      toast({
        title: "Error al enviar recordatorios",
        description: "Ocurrió un error al enviar los recordatorios. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
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
        <div className="flex items-center">
          <Link href="/credits" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Enviar Recordatorios</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recordatorios de Pago</CardTitle>
            <CardDescription>Envía recordatorios por WhatsApp a clientes con créditos pendientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedCredits.length === pendingCredits.length && pendingCredits.length > 0}
                  onCheckedChange={selectAll}
                />
                <Label htmlFor="selectAll">Seleccionar todos</Label>
              </div>
              <Button onClick={sendReminders} disabled={selectedCredits.length === 0 || sending}>
                {sending ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Recordatorios ({selectedCredits.length})
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {pendingCredits.map((credit) => (
                <div
                  key={credit.id}
                  className={`flex items-center space-x-4 p-4 border rounded-lg ${
                    selectedCredits.includes(credit.id) ? "bg-muted/50 border-primary" : ""
                  }`}
                >
                  <Checkbox
                    id={`credit-${credit.id}`}
                    checked={selectedCredits.includes(credit.id)}
                    onCheckedChange={() => toggleCredit(credit.id)}
                  />
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt={credit.customer.name} />
                    <AvatarFallback>{credit.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{credit.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{credit.customer.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">S/. {credit.amount.toFixed(2)}</p>
                    <p className="text-sm text-red-600">Vencido hace {credit.daysOverdue} días</p>
                  </div>
                </div>
              ))}

              {pendingCredits.length === 0 && (
                <div className="text-center py-8">
                  <Check className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">¡No hay créditos pendientes!</h3>
                  <p className="text-muted-foreground">Todos los clientes están al día con sus pagos.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
