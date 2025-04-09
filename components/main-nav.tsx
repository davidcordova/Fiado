import type React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6" />
        <span className="font-bold">BodegaApp</span>
      </Link>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Clientes
      </Link>
      <Link href="/sales" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Ventas
      </Link>
      <Link href="/credits" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Créditos
      </Link>
      <Link href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Productos
      </Link>
    </nav>
  )
}
