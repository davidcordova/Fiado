"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Search, Trash2, User, Printer, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"
import { WhatsAppService } from "@/app/whatsapp-service"

// Datos de ejemplo para productos
const products = [
  { id: "1", name: "Arroz", price: 15.0, stock: 20 },
  { id: "2", name: "Aceite", price: 13.0, stock: 15 },
  { id: "3", name: "Leche", price: 7.0, stock: 30 },
  { id: "4", name: "Pan", price: 1.5, stock: 50 },
  { id: "5", name: "Azúcar", price: 12.5, stock: 18 },
  { id: "6", name: "Harina", price: 10.0, stock: 25 },
  { id: "7", name: "Huevos", price: 8.0, stock: 40 },
  { id: "8", name: "Mantequilla", price: 12.0, stock: 12 },
  { id: "9", name: "Detergente", price: 22.0, stock: 10 },
  { id: "10", name: "Jabón", price: 6.5, stock: 22 },
]

// Datos de ejemplo para clientes
const customers = [
  {
    id: "1",
    name: "María Rodríguez",
    phone: "+51 987 654 321",
    email: "maria@example.com",
    creditBalance: 0,
  },
  {
    id: "2",
    name: "José López",
    phone: "+51 987 123 456",
    email: "jose@example.com",
    creditBalance: 28.0,
  },
  {
    id: "3",
    name: "Luisa Gómez",
    phone: "+51 912 345 678",
    email: "luisa@example.com",
    creditBalance: 0,
  },
  {
    id: "4",
    name: "Carlos Mendoza",
    phone: "+51 945 678 901",
    email: "carlos@example.com",
    creditBalance: 0,
  },
  {
    id: "5",
    name: "Ana Vargas",
    phone: "+51 978 901 234",
    email: "ana@example.com",
    creditBalance: 15.5,
  },
]

export default function NewSalePage() {
  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: any; quantity: number }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [showCustomerDialog, setShowCustomerDialog] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [completedSale, setCompletedSale] = useState<any>(null)
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.phone.includes(customerSearchTerm),
  )

  const addProduct = (product: any) => {
    const existingProductIndex = selectedProducts.findIndex((item) => item.product.id === product.id)

    if (existingProductIndex !== -1) {
      const updatedProducts = [...selectedProducts]
      updatedProducts[existingProductIndex].quantity += 1
      setSelectedProducts(updatedProducts)
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }])
    }
    setSearchTerm("")
  }

  const removeProduct = (index: number) => {
    const updatedProducts = [...selectedProducts]
    updatedProducts.splice(index, 1)
    setSelectedProducts(updatedProducts)
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity > 0) {
      const updatedProducts = [...selectedProducts]
      updatedProducts[index].quantity = quantity
      setSelectedProducts(updatedProducts)
    }
  }

  const selectCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setShowCustomerDialog(false)
  }

  const subtotal = selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleCompleteSale = async () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Error",
        description: "No hay productos seleccionados para la venta",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "credit" && !selectedCustomer) {
      toast({
        title: "Error",
        description: "Selecciona un cliente para realizar una venta a crédito",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)

    try {
      // Preparar los datos de la venta
      const saleData = {
        customer: selectedCustomer,
        items: selectedProducts.map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
          },
          quantity: item.quantity,
        })),
        paymentMethod,
        date: new Date().toISOString(),
      }

      // Simulamos el procesamiento de la venta (en un entorno real, esto sería una llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generamos un ID de venta simulado
      const saleId = Math.floor(Math.random() * 10000).toString()

      // Guardamos la información de la venta completada para mostrarla en el recibo
      setCompletedSale({
        id: saleId,
        customer: selectedCustomer,
        items: selectedProducts,
        paymentMethod,
        date: new Date(),
        total: subtotal,
      })

      // Mostramos un mensaje de éxito
      toast({
        title: "Venta completada",
        description: `La venta se ha procesado correctamente. ID: ${saleId}`,
      })

      // Mostramos el modal de recibo
      setShowReceiptModal(true)
    } catch (error) {
      console.error("Error al procesar la venta:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la venta. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handlePrintReceipt = () => {
    // Crear una ventana de impresión
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        title: "Error",
        description: "No se pudo abrir la ventana de impresión. Verifica que no esté bloqueada por el navegador.",
        variant: "destructive",
      })
      return
    }

    // Formatear la fecha
    const formattedDate = completedSale.date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Crear el contenido HTML del recibo
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Recibo de Venta #${completedSale.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .receipt { max-width: 300px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; }
          .info { margin: 10px 0; }
          .items { margin: 15px 0; }
          .item { display: flex; justify-content: space-between; margin: 5px 0; }
          .total { font-weight: bold; text-align: right; margin-top: 10px; border-top: 1px solid #000; padding-top: 10px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="title">BodegaApp</div>
            <div>Recibo de Venta</div>
          </div>
          
          <div class="info">
            <div><strong>Recibo #:</strong> ${completedSale.id}</div>
            <div><strong>Fecha:</strong> ${formattedDate}</div>
            ${completedSale.customer ? `<div><strong>Cliente:</strong> ${completedSale.customer.name}</div>` : ""}
            <div><strong>Método de pago:</strong> ${completedSale.paymentMethod === "cash" ? "Efectivo" : "Crédito"}</div>
          </div>
          
          <div class="items">
            <div><strong>Productos:</strong></div>
            ${completedSale.items
              .map(
                (item) => `
              <div class="item">
                <span>${item.product.name} x${item.quantity}</span>
                <span>S/. ${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            `,
              )
              .join("")}
            
            <div class="total">
              <div>Total: S/. ${completedSale.total.toFixed(2)}</div>
            </div>
          </div>
          
          <div class="footer">
            ¡Gracias por su compra!
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `

    // Escribir el contenido en la ventana de impresión
    printWindow.document.write(receiptContent)
    printWindow.document.close()
  }

  const handleSendWhatsAppReceipt = async () => {
    if (!completedSale.customer || !completedSale.customer.phone) {
      toast({
        title: "Error",
        description:
          "No se puede enviar el recibo por WhatsApp porque no hay un cliente seleccionado o no tiene número de teléfono.",
        variant: "destructive",
      })
      return
    }

    setSendingWhatsApp(true)

    try {
      // Formatear la fecha
      const formattedDate = completedSale.date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      // Preparar los items para el mensaje de WhatsApp
      const items = completedSale.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }))

      // Enviar el recibo por WhatsApp
      await WhatsAppService.sendCreditPurchaseReceipt(
        completedSale.customer.phone,
        completedSale.customer.name,
        items,
        completedSale.total,
        formattedDate,
      )

      toast({
        title: "Recibo enviado",
        description: `Se ha enviado el recibo por WhatsApp a ${completedSale.customer.name}`,
      })
    } catch (error) {
      console.error("Error al enviar el recibo por WhatsApp:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar el recibo por WhatsApp. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setSendingWhatsApp(false)
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
          <Link href="/sales" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Nueva Venta</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
                <CardDescription>Busca y agrega productos a la venta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" size="sm" className="px-4 py-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {searchTerm && (
                  <div className="mt-2 border rounded-md">
                    {filteredProducts.length > 0 ? (
                      <div className="divide-y">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="p-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                            onClick={() => addProduct(product)}
                          >
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">S/. {product.price.toFixed(2)}</p>
                              <Button size="sm" variant="ghost" className="h-8 px-2">
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Agregar</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="p-2 text-center text-muted-foreground">No se encontraron productos</p>
                    )}
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Productos seleccionados</h3>
                  {selectedProducts.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProducts.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-md p-2">
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              S/. {item.product.price.toFixed(2)} x {item.quantity} = S/.{" "}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeProduct(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No hay productos seleccionados</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Venta</CardTitle>
                <CardDescription>Información del cliente y método de pago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Cliente</Label>
                  <div className="flex items-center space-x-2">
                    {selectedCustomer ? (
                      <div className="flex-1 flex items-center space-x-2 border rounded-md p-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-user.jpg" alt={selectedCustomer.name} />
                          <AvatarFallback>{selectedCustomer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedCustomer.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                        </div>
                        {selectedCustomer.creditBalance > 0 && (
                          <Badge variant="outline" className="ml-auto bg-yellow-50 text-yellow-700 border-yellow-200">
                            Crédito: S/. {selectedCustomer.creditBalance.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <Button variant="outline" className="flex-1" onClick={() => setShowCustomerDialog(true)}>
                        <User className="mr-2 h-4 w-4" />
                        Seleccionar Cliente
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Método de Pago</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Efectivo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit" id="credit" disabled={!selectedCustomer} />
                      <Label htmlFor="credit" className={!selectedCustomer ? "text-muted-foreground" : ""}>
                        Crédito (Fiado)
                      </Label>
                    </div>
                  </RadioGroup>
                  {!selectedCustomer && paymentMethod === "credit" && (
                    <p className="text-sm text-red-500 mt-1">Selecciona un cliente para habilitar el pago a crédito</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>S/. {subtotal.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>S/. {subtotal.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    disabled={
                      selectedProducts.length === 0 || (paymentMethod === "credit" && !selectedCustomer) || processing
                    }
                    onClick={handleCompleteSale}
                  >
                    {processing ? "Procesando..." : "Completar Venta"}
                  </Button>
                  {paymentMethod === "credit" && selectedCustomer && (
                    <p className="text-sm text-center mt-2">
                      Se enviará una notificación por WhatsApp al cliente con los detalles de su crédito.
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seleccionar Cliente</DialogTitle>
            <DialogDescription>Busca y selecciona un cliente para la venta</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar cliente..."
              value={customerSearchTerm}
              onChange={(e) => setCustomerSearchTerm(e.target.value)}
            />
            <Button type="submit" size="sm" className="px-4 py-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 max-h-[300px] overflow-y-auto">
            {filteredCustomers.length > 0 ? (
              <div className="divide-y">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-2 hover:bg-muted cursor-pointer flex items-center space-x-3"
                    onClick={() => selectCustomer(customer)}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-user.jpg" alt={customer.name} />
                      <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                    {customer.creditBalance > 0 && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Crédito: S/. {customer.creditBalance.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-2 text-center text-muted-foreground">No se encontraron clientes</p>
            )}
          </div>
          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowCustomerDialog(false)}>
              Cancelar
            </Button>
            <Link href="/customers/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal de recibo */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recibo de Venta #{completedSale?.id}</DialogTitle>
            <DialogDescription>La venta se ha completado correctamente</DialogDescription>
          </DialogHeader>

          {completedSale && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fecha:</span>
                  <span className="text-sm">
                    {completedSale.date.toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {completedSale.customer && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cliente:</span>
                    <span className="text-sm">{completedSale.customer.name}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Método de pago:</span>
                  <span className="text-sm">{completedSale.paymentMethod === "cash" ? "Efectivo" : "Crédito"}</span>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-2">Productos:</h4>
                <div className="space-y-2">
                  {completedSale.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>S/. {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold mt-4 pt-2 border-t">
                  <span>Total:</span>
                  <span>S/. {completedSale.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:flex-1" onClick={handlePrintReceipt}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Recibo
            </Button>

            <Button
              className="sm:flex-1"
              onClick={handleSendWhatsAppReceipt}
              disabled={!completedSale?.customer || sendingWhatsApp}
            >
              <Send className="mr-2 h-4 w-4" />
              {sendingWhatsApp ? "Enviando..." : "Enviar por WhatsApp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
