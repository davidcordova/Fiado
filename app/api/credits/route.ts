import { NextResponse } from "next/server"
import { WhatsAppService } from "@/app/whatsapp-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case "registerPayment": {
        // En una implementación real, aquí se registraría el pago en la base de datos
        const { creditId, customerId, customerName, customerPhone, amount, remainingBalance } = data

        // Formatear la fecha actual
        const formattedDate = new Date().toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })

        // Enviar comprobante por WhatsApp
        await WhatsAppService.sendCreditPaymentReceipt(
          customerPhone,
          customerName,
          amount,
          remainingBalance,
          formattedDate,
        )

        return NextResponse.json({ success: true, creditId })
      }

      case "sendReminders": {
        const { reminders } = data
        const results = []

        // Procesar cada recordatorio
        for (const reminder of reminders) {
          const { customerId, customerName, customerPhone, amount, dueDate } = reminder

          // Enviar recordatorio por WhatsApp
          const success = await WhatsAppService.sendPaymentReminder(customerPhone, customerName, amount, dueDate)

          results.push({ customerId, success })
        }

        return NextResponse.json({ success: true, results })
      }

      default:
        return NextResponse.json({ success: false, error: "Acción no válida" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error en la API de créditos:", error)
    return NextResponse.json({ success: false, error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
