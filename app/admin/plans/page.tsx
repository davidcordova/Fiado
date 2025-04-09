"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Edit, MoreHorizontal, Plus, Save, ShoppingBag, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para planes
const initialPlans = [
  {
    id: "1",
    name: "Plan Básico",
    price: 49.9,
    description: "Ideal para bodegas pequeñas",
    features: [
      { id: "1", name: "Hasta 100 clientes", included: true },
      { id: "2", name: "Hasta 200 productos", included: true },
      { id: "3", name: "Soporte por email", included: true },
      { id: "4", name: "Reportes básicos", included: true },
      { id: "5", name: "Notificaciones WhatsApp", included: false },
      { id: "6", name: "Reportes avanzados", included: false },
      { id: "7", name: "Soporte prioritario", included: false },
      { id: "8", name: "Copias de seguridad diarias", included: false },
    ],
    active: true,
    storeCount: 24,
  },
  {
    id: "2",
    name: "Plan Estándar",
    price: 99.9,
    description: "Perfecto para minimarkets en crecimiento",
    features: [
      { id: "1", name: "Hasta 500 clientes", included: true },
      { id: "2", name: "Hasta 1000 productos", included: true },
      { id: "3", name: "Soporte por email", included: true },
      { id: "4", name: "Reportes básicos", included: true },
      { id: "5", name: "Notificaciones WhatsApp", included: true },
      { id: "6", name: "Reportes avanzados", included: true },
      { id: "7", name: "Soporte prioritario", included: true },
      { id: "8", name: "Copias de seguridad diarias", included: false },
    ],
    active: true,
    storeCount: 18,
  },
  {
    id: "3",
    name: "Plan Premium",
    price: 149.9,
    description: "Para negocios establecidos",
    features: [
      { id: "1", name: "Clientes ilimitados", included: true },
      { id: "2", name: "Productos ilimitados", included: true },
      { id: "3", name: "Soporte por email", included: true },
      { id: "4", name: "Reportes básicos", included: true },
      { id: "5", name: "Notificaciones WhatsApp", included: true },
      { id: "6", name: "Reportes avanzados", included: true },
      { id: "7", name: "Soporte prioritario", included: true },
      { id: "8", name: "Copias de seguridad diarias", included: true },
    ],
    active: true,
    storeCount: 6,
  },
]

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    description: "",
    features: [
      { id: "1", name: "Clientes", included: true },
      { id: "2", name: "Productos", included: true },
      { id: "3", name: "Soporte por email", included: true },
      { id: "4", name: "Reportes básicos", included: true },
      { id: "5", name: "Notificaciones WhatsApp", included: false },
      { id: "6", name: "Reportes avanzados", included: false },
      { id: "7", name: "Soporte prioritario", included: false },
      { id: "8", name: "Copias de seguridad diarias", included: false },
    ],
    active: true,
  })

  const handleEditPlan = (plan: any) => {
    setEditingPlan({ ...plan })
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    // Validación básica
    if (!editingPlan.name || !editingPlan.price) {
      toast({
        title: "Error de validación",
        description: "El nombre y el precio son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Actualizar el plan en la lista
    const updatedPlans = plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan))
    setPlans(updatedPlans)
    setShowEditDialog(false)

    toast({
      title: "Plan actualizado",
      description: `El plan ${editingPlan.name} ha sido actualizado correctamente`,
    })
  }

  const handleToggleFeature = (featureId: string) => {
    const updatedFeatures = editingPlan.features.map((feature: any) =>
      feature.id === featureId ? { ...feature, included: !feature.included } : feature,
    )
    setEditingPlan({ ...editingPlan, features: updatedFeatures })
  }

  const handleToggleNewFeature = (featureId: string) => {
    const updatedFeatures = newPlan.features.map((feature) =>
      feature.id === featureId ? { ...feature, included: !feature.included } : feature,
    )
    setNewPlan({ ...newPlan, features: updatedFeatures })
  }

  const handleCreatePlan = () => {
    // Validación básica
    if (!newPlan.name || !newPlan.price) {
      toast({
        title: "Error de validación",
        description: "El nombre y el precio son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Crear un nuevo plan con ID único
    const newId = (Math.max(...plans.map((plan) => Number.parseInt(plan.id))) + 1).toString()
    const planToAdd = {
      ...newPlan,
      id: newId,
      price: Number.parseFloat(newPlan.price),
      storeCount: 0,
    }

    // Añadir el nuevo plan a la lista
    setPlans([...plans, planToAdd])
    setShowNewDialog(false)

    // Resetear el formulario
    setNewPlan({
      name: "",
      price: "",
      description: "",
      features: [
        { id: "1", name: "Clientes", included: true },
        { id: "2", name: "Productos", included: true },
        { id: "3", name: "Soporte por email", included: true },
        { id: "4", name: "Reportes básicos", included: true },
        { id: "5", name: "Notificaciones WhatsApp", included: false },
        { id: "6", name: "Reportes avanzados", included: false },
        { id: "7", name: "Soporte prioritario", included: false },
        { id: "8", name: "Copias de seguridad diarias", included: false },
      ],
      active: true,
    })

    toast({
      title: "Plan creado",
      description: `El plan ${planToAdd.name} ha sido creado correctamente`,
    })
  }

  const handleTogglePlanStatus = (planId: string) => {
    const updatedPlans = plans.map((plan) => (plan.id === planId ? { ...plan, active: !plan.active } : plan))
    setPlans(updatedPlans)

    const plan = plans.find((p) => p.id === planId)
    toast({
      title: plan?.active ? "Plan desactivado" : "Plan activado",
      description: `El plan ${plan?.name} ha sido ${plan?.active ? "desactivado" : "activado"} correctamente`,
    })
  }

  const handleDeletePlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)

    if (plan?.storeCount && plan.storeCount > 0) {
      toast({
        title: "No se puede eliminar",
        description: `El plan ${plan.name} tiene ${plan.storeCount} tiendas asociadas y no puede ser eliminado`,
        variant: "destructive",
      })
      return
    }

    setPlans(plans.filter((plan) => plan.id !== planId))

    toast({
      title: "Plan eliminado",
      description: `El plan ha sido eliminado correctamente`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <ShoppingBag className="h-6 w-6" />
            <span>BodegaApp Admin</span>
          </div>
          <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/stores"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tiendas
            </Link>
            <Link
              href="/admin/users"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Usuarios
            </Link>
            <Link href="/admin/plans" className="text-sm font-medium transition-colors hover:text-primary">
              Planes
            </Link>
            <Link
              href="/admin/website"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sitio Web
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Planes</h2>
          <div className="flex items-center space-x-2">
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Plan</DialogTitle>
                  <DialogDescription>Complete la información para crear un nuevo plan de suscripción</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-name">Nombre del Plan *</Label>
                      <Input
                        id="new-name"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                        placeholder="Ej: Plan Básico"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-price">Precio Mensual (S/.) *</Label>
                      <Input
                        id="new-price"
                        type="number"
                        step="0.01"
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                        placeholder="Ej: 49.90"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-description">Descripción</Label>
                    <Textarea
                      id="new-description"
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                      placeholder="Descripción breve del plan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Características Incluidas</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
                      {newPlan.features.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Switch
                            checked={feature.included}
                            onCheckedChange={() => handleToggleNewFeature(feature.id)}
                          />
                          <Label htmlFor={`feature-${feature.id}`}>{feature.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newPlan.active}
                      onCheckedChange={(checked) => setNewPlan({ ...newPlan, active: checked })}
                    />
                    <Label>Plan Activo</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreatePlan}>Crear Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Planes de Suscripción</CardTitle>
            <CardDescription>Administre los planes disponibles para las tiendas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tiendas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>S/. {plan.price.toFixed(2)}</TableCell>
                    <TableCell>{plan.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          plan.active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {plan.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.storeCount}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar plan
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTogglePlanStatus(plan.id)}>
                            {plan.active ? (
                              <>
                                <Trash className="mr-2 h-4 w-4" />
                                Desactivar plan
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Activar plan
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeletePlan(plan.id)}
                            disabled={plan.storeCount > 0}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar plan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de edición de plan */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Plan</DialogTitle>
            <DialogDescription>Modifique la información del plan de suscripción</DialogDescription>
          </DialogHeader>
          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre del Plan</Label>
                  <Input
                    id="edit-name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Precio Mensual (S/.)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Características Incluidas</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
                  {editingPlan.features.map((feature: any) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Switch checked={feature.included} onCheckedChange={() => handleToggleFeature(feature.id)} />
                      <Label htmlFor={`feature-${feature.id}`}>{feature.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingPlan.active}
                  onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, active: checked })}
                />
                <Label>Plan Activo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
