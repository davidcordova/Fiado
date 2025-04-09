import { NextResponse } from "next/server"
import { SaleService } from "@/app/sales/process-sale"

export async function POST(request: Request) {
  try {
    const saleData = await request.json()

    const result = await SaleService.processSale(saleData)

    if (result.success) {
      return NextResponse.json({ success: true, saleId: result.saleId })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error en la API de ventas:", error)
    return NextResponse.json({ success: false, error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
