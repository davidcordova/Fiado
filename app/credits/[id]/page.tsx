"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Printer, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para un crédito específico
const creditData = {
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
  history: [{ date: "22/06/2023", action: "Crédito creado", amount: 28.0 }],
}

export default function CreditDetailPage({ params }: { params: { id: string } }) {
  const [paymentAmount, setPaymentAmount] = useState("")
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    if (!paymentAmount || Number.parseFloat(paymentAmount) <= 0) {
      toast({
        title: "Error",
        description: "Ingresa un monto válido para el pago",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(paymentAmount) > creditData.amount) {
      toast({
        title: "Error",
        description: "El monto del pago no puede ser mayor que la deuda",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)

    try {
      // Simulamos el procesamiento del pago
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Pago registrado",
        description: `Se ha registrado un pago de S/. ${Number.parseFloat(paymentAmount).toFixed(2)}`,
      })

      // Aquí iría la lógica para actualizar el estado del crédito
      setPaymentAmount("")
    } catch (error) {
      toast({
        title: "Error al procesar el pago",
        description: "Ocurrió un error al registrar el pago. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const sendWhatsAppReceipt = async () => {
    setProcessing(true)

    try {
      // Simulamos el envío del comprobante
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Comprobante enviado",
        description: `Se ha enviado el comprobante por WhatsApp a ${creditData.customer.name}`,
      })
    } catch (error) {
      toast({
        title: "Error al enviar comprobante",
        description: "Ocurrió un error al enviar el comprobante. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
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
          <h2 className="text-3xl font-bold tracking-tight">Detalle de Crédito #{params.id}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>Datos del cliente con crédito pendiente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" alt={creditData.customer.name} />
                    <AvatarFallback>{creditData.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{creditData.customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{creditData.customer.phone}</p>
                    <p className="text-sm text-muted-foreground">{creditData.customer.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productos Comprados</CardTitle>
                <CardDescription>Detalle de los productos adquiridos a crédito</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creditData.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>S/. {item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">S/. {(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">S/. {creditData.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fecha:</span>
                    <span>{creditData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado:</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {creditData.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={sendWhatsAppReceipt} disabled={processing}>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar por WhatsApp
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Pago</CardTitle>
                <CardDescription>Ingresa el monto del pago a registrar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Monto a Pagar (S/.)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monto pendiente:</span>
                    <span className="font-medium text-red-600">S/. {creditData.amount.toFixed(2)}</span>
                  </div>
                  {paymentAmount && (
                    <div className="flex justify-between text-sm">
                      <span>Nuevo saldo:</span>
                      <span className="font-medium">
                        S/. {Math.max(0, creditData.amount - Number.parseFloat(paymentAmount || "0")).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" disabled={processing}>
                  Cancelar
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!paymentAmount || Number.parseFloat(paymentAmount) <= 0 || processing}
                >
                  {processing ? (
                    <>Procesando...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Registrar Pago
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Registro de pagos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                {creditData.history.length > 0 ? (
                  <div className="space-y-4">
                    {creditData.history.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div>
                          <p className="font-medium">{entry.action}</p>
                          <p className="text-sm text-muted-foreground">{entry.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">S/. {entry.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No hay pagos registrados</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
