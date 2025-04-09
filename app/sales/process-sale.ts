// Este servicio se encarga de procesar las ventas y gestionar los créditos

import { WhatsAppService } from "@/app/whatsapp-service"

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  creditBalance: number
}

interface SaleItem {
  product: Product
  quantity: number
}

interface SaleData {
  customer: Customer | null
  items: SaleItem[]
  paymentMethod: "cash" | "credit"
  date: Date
}

export class SaleService {
  static async processSale(saleData: SaleData): Promise<{ success: boolean; saleId?: string; error?: string }> {
    try {
      // Validar que haya productos
      if (saleData.items.length === 0) {
        return { success: false, error: "No hay productos en la venta" }
      }

      // Validar que haya un cliente si es venta a crédito
      if (saleData.paymentMethod === "credit" && !saleData.customer) {
        return { success: false, error: "Se requiere un cliente para ventas a crédito" }
      }

      // Calcular el total de la venta
      const total = saleData.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      // Generar un ID de venta (en una implementación real, esto vendría de la base de datos)
      const saleId = Math.floor(Math.random() * 10000).toString()

      // Si es venta a crédito, enviar notificación por WhatsApp
      if (saleData.paymentMethod === "credit" && saleData.customer) {
        const items = saleData.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        }))

        // Formatear la fecha
        const formattedDate = saleData.date.toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })

        // Enviar notificación por WhatsApp
        await WhatsAppService.sendCreditPurchaseReceipt(
          saleData.customer.phone,
          saleData.customer.name,
          items,
          total,
          formattedDate,
        )
      }

      // En una implementación real, aquí se guardaría la venta en la base de datos
      // y se actualizaría el inventario y el saldo del cliente si es venta a crédito

      return { success: true, saleId }
    } catch (error) {
      console.error("Error al procesar la venta:", error)
      return { success: false, error: "Error al procesar la venta" }
    }
  }
}
