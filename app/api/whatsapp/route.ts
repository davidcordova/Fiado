import { NextResponse } from "next/server"
import { WhatsAppService } from "@/app/whatsapp-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    let result = false

    switch (action) {
      case "sendPurchaseReceipt":
        result = await WhatsAppService.sendPurchaseReceipt(
          data.phoneNumber,
          data.customerName,
          data.items,
          data.total,
          data.date,
          data.paymentMethod,
        )
        break
      case "sendCreditPurchaseReceipt":
        result = await WhatsAppService.sendCreditPurchaseReceipt(
          data.phoneNumber,
          data.customerName,
          data.items,
          data.total,
          data.date,
        )
        break
      case "sendCreditPaymentReceipt":
        result = await WhatsAppService.sendCreditPaymentReceipt(
          data.phoneNumber,
          data.customerName,
          data.amount,
          data.remainingBalance,
          data.date,
        )
        break
      case "sendPaymentReminder":
        result = await WhatsAppService.sendPaymentReminder(
          data.phoneNumber,
          data.customerName,
          data.amount,
          data.dueDate,
        )
        break
      default:
        return NextResponse.json({ success: false, error: "Acción no válida" }, { status: 400 })
    }

    return NextResponse.json({ success: result })
  } catch (error) {
    console.error("Error en la API de WhatsApp:", error)
    return NextResponse.json({ success: false, error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
