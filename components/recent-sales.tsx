import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">María Rodríguez</p>
          <p className="text-sm text-muted-foreground">Compra en efectivo</p>
        </div>
        <div className="ml-auto font-medium">+S/. 42.50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">José López</p>
          <p className="text-sm text-muted-foreground">Compra a crédito</p>
        </div>
        <div className="ml-auto font-medium">+S/. 28.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Luisa Gómez</p>
          <p className="text-sm text-muted-foreground">Pago de crédito</p>
        </div>
        <div className="ml-auto font-medium">+S/. 35.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Mendoza</p>
          <p className="text-sm text-muted-foreground">Compra en efectivo</p>
        </div>
        <div className="ml-auto font-medium">+S/. 16.80</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Vargas</p>
          <p className="text-sm text-muted-foreground">Compra en efectivo</p>
        </div>
        <div className="ml-auto font-medium">+S/. 22.50</div>
      </div>
    </div>
  )
}
