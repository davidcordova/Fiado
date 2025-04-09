"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MoreHorizontal, Package, Plus, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para productos
const initialProducts = [
  { id: "1", name: "Arroz", price: 15.0, stock: 20, category: "Abarrotes", barcode: "7750000001" },
  { id: "2", name: "Aceite", price: 13.0, stock: 15, category: "Abarrotes", barcode: "7750000002" },
  { id: "3", name: "Leche", price: 7.0, stock: 30, category: "Lácteos", barcode: "7750000003" },
  { id: "4", name: "Pan", price: 1.5, stock: 50, category: "Panadería", barcode: "7750000004" },
  { id: "5", name: "Azúcar", price: 12.5, stock: 18, category: "Abarrotes", barcode: "7750000005" },
  { id: "6", name: "Harina", price: 10.0, stock: 25, category: "Abarrotes", barcode: "7750000006" },
  { id: "7", name: "Huevos", price: 8.0, stock: 40, category: "Lácteos", barcode: "7750000007" },
  { id: "8", name: "Mantequilla", price: 12.0, stock: 12, category: "Lácteos", barcode: "7750000008" },
  { id: "9", name: "Detergente", price: 22.0, stock: 10, category: "Limpieza", barcode: "7750000009" },
  { id: "10", name: "Jabón", price: 6.5, stock: 22, category: "Limpieza", barcode: "7750000010" },
]

export default function ProductsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [products, setProducts] = useState(initialProducts)

  const categories = [...new Set(products.map((product) => product.category))]

  const filteredProducts = products.filter((product) => {
    // Filtro por categoría
    const categoryMatch = categoryFilter === "all" || product.category === categoryFilter

    // Filtro por búsqueda
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.includes(searchTerm) ||
      product.barcode.includes(searchTerm)

    // Filtro por stock
    const stockMatch =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock <= 15) ||
      (stockFilter === "out" && product.stock === 0)

    return categoryMatch && searchMatch && stockMatch
  })

  const totalProducts = filteredProducts.length
  const lowStockProducts = filteredProducts.filter((product) => product.stock <= 15).length
  const totalValue = filteredProducts.reduce((sum, product) => sum + product.price * product.stock, 0)

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Editar producto",
      description: `Editando producto ID: ${productId}`,
    })
  }

  const handleAdjustStock = (productId: string) => {
    // Simulamos un ajuste de stock (aumentamos en 5 unidades)
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, stock: product.stock + 5 }
      }
      return product
    })

    setProducts(updatedProducts)

    toast({
      title: "Stock ajustado",
      description: "El stock del producto ha sido actualizado",
    })
  }

  const handleViewHistory = (productId: string) => {
    toast({
      title: "Historial del producto",
      description: `Viendo historial del producto ID: ${productId}`,
    })
  }

  const handleDeleteProduct = (productId: string) => {
    // Eliminamos el producto de la lista
    setProducts(products.filter((product) => product.id !== productId))

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente",
    })
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
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
          <div className="flex items-center space-x-2">
            <Link href="/products/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">{products.length} productos en total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <Package className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">Productos con stock menor a 15</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor de Inventario</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S/. {totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Valor total del inventario</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventario</CardTitle>
            <CardDescription>Gestiona tu inventario de productos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
                <Button type="submit" size="sm" className="h-9 px-4 py-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={categoryFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("all")}
                >
                  Todas
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
                <Button
                  variant={stockFilter === "low" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStockFilter(stockFilter === "low" ? "all" : "low")}
                  className="ml-2"
                >
                  Stock Bajo
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.barcode}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>S/. {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {product.stock}
                        {product.stock <= 15 && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Bajo
                          </Badge>
                        )}
                        {product.stock === 0 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Agotado
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                            Editar producto
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAdjustStock(product.id)}>
                            Ajustar stock
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewHistory(product.id)}>
                            Ver historial
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                            Eliminar producto
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
