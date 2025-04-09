// Este es un servicio simulado para enviar notificaciones por WhatsApp
// En una implementación real, se integraría con la API de WhatsApp Business

export interface WhatsAppMessage {
  to: string
  templateName: string
  templateData: Record<string, any>
}

export class WhatsAppService {
  // Envía un comprobante de compra (efectivo o crédito)
  static async sendPurchaseReceipt(
    phoneNumber: string,
    customerName: string,
    items: Array<{ name: string; quantity: number; price: number }>,
    total: number,
    date: string,
    paymentMethod = "crédito", // Por defecto es crédito, pero puede ser "efectivo"
  ): Promise<boolean> {
    console.log(`Enviando comprobante de compra a ${customerName} (${phoneNumber})`)

    // Formatear los items para el mensaje
    const itemsList = items.map((item) => `${item.name} x${item.quantity} - S/. ${item.price.toFixed(2)}`).join("\n")

    const message: WhatsAppMessage = {
      to: phoneNumber,
      templateName: "purchase_receipt",
      templateData: {
        customerName,
        itemsList,
        total: total.toFixed(2),
        date,
        paymentMethod,
      },
    }

    // Aquí iría la lógica para enviar el mensaje a través de la API de WhatsApp
    console.log("Mensaje a enviar:", message)

    // Simulamos una respuesta exitosa
    return Promise.resolve(true)
  }

  // Envía un comprobante de compra a crédito (mantener para compatibilidad)
  static async sendCreditPurchaseReceipt(
    phoneNumber: string,
    customerName: string,
    items: Array<{ name: string; quantity: number; price: number }>,
    total: number,
    date: string,
  ): Promise<boolean> {
    return this.sendPurchaseReceipt(phoneNumber, customerName, items, total, date, "crédito")
  }

  // Envía un comprobante de pago de crédito
  static async sendCreditPaymentReceipt(
    phoneNumber: string,
    customerName: string,
    amount: number,
    remainingBalance: number,
    date: string,
  ): Promise<boolean> {
    console.log(`Enviando comprobante de pago de crédito a ${customerName} (${phoneNumber})`)

    const message: WhatsAppMessage = {
      to: phoneNumber,
      templateName: "credit_payment_receipt",
      templateData: {
        customerName,
        amount: amount.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
        date,
      },
    }

    // Aquí iría la lógica para enviar el mensaje a través de la API de WhatsApp
    console.log("Mensaje a enviar:", message)

    // Simulamos una respuesta exitosa
    return Promise.resolve(true)
  }

  // Envía un recordatorio de pago
  static async sendPaymentReminder(
    phoneNumber: string,
    customerName: string,
    amount: number,
    dueDate: string,
  ): Promise<boolean> {
    console.log(`Enviando recordatorio de pago a ${customerName} (${phoneNumber})`)

    const message: WhatsAppMessage = {
      to: phoneNumber,
      templateName: "payment_reminder",
      templateData: {
        customerName,
        amount: amount.toFixed(2),
        dueDate,
      },
    }

    // Aquí iría la lógica para enviar el mensaje a través de la API de WhatsApp
    console.log("Mensaje a enviar:", message)

    // Simulamos una respuesta exitosa
    return Promise.resolve(true)
  }
}
