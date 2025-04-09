"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Globe, ImageIcon, Save, ShoppingBag, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export default function AdminWebsitePage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saving, setSaving] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const heroImageInputRef = useRef<HTMLInputElement>(null)
  const featureImageInputRef = useRef<HTMLInputElement>(null)

  // Datos de ejemplo para la configuración del sitio web
  const [websiteData, setWebsiteData] = useState({
    general: {
      title: "BodegaApp - Gestión de Bodegas y Minimarkets",
      description:
        "Sistema de gestión para bodegas y minimarkets. Controla ventas, créditos y envía notificaciones por WhatsApp.",
      keywords: "bodega, minimarket, gestión, ventas, créditos, whatsapp, notificaciones",
      contactEmail: "info@bodegaapp.com",
      contactPhone: "+51 999 888 777",
      logo: "/placeholder.svg?height=80&width=200",
      favicon: "/favicon.ico",
    },
    images: {
      heroImage: "/placeholder.svg?height=400&width=500",
      feature1Image: "/placeholder.svg?height=200&width=200",
      feature2Image: "/placeholder.svg?height=200&width=200",
      feature3Image: "/placeholder.svg?height=200&width=200",
      feature4Image: "/placeholder.svg?height=200&width=200",
      feature5Image: "/placeholder.svg?height=200&width=200",
      feature6Image: "/placeholder.svg?height=200&width=200",
    },
    features: {
      feature1Title: "Gestión de Ventas",
      feature1Description:
        "Registra ventas fácilmente con una interfaz intuitiva. Acepta pagos en efectivo o a crédito.",
      feature2Title: "Control de Créditos",
      feature2Description: "Administra los créditos de tus clientes. Registra pagos y mantén un historial completo.",
      feature3Title: "Gestión de Clientes",
      feature3Description:
        "Mantén una base de datos de tus clientes con información de contacto y historial de compras.",
      feature4Title: "Notificaciones WhatsApp",
      feature4Description: "Envía comprobantes y recordatorios automáticos a tus clientes vía WhatsApp.",
      feature5Title: "Reportes y Análisis",
      feature5Description: "Visualiza el rendimiento de tu negocio con reportes detallados y gráficos informativos.",
      feature6Title: "Fácil de Usar",
      feature6Description: "Interfaz intuitiva diseñada para bodegueros, sin necesidad de conocimientos técnicos.",
    },
    pricing: {
      basicPlanTitle: "Plan Básico",
      basicPlanPrice: "49.90",
      basicPlanDescription: "Ideal para bodegas pequeñas",
      basicPlanFeatures: "Hasta 100 clientes\nHasta 200 productos\nSoporte por email",

      standardPlanTitle: "Plan Estándar",
      standardPlanPrice: "99.90",
      standardPlanDescription: "Perfecto para minimarkets en crecimiento",
      standardPlanFeatures: "Hasta 500 clientes\nHasta 1000 productos\nSoporte prioritario\nReportes avanzados",

      premiumPlanTitle: "Plan Premium",
      premiumPlanPrice: "149.90",
      premiumPlanDescription: "Para negocios establecidos",
      premiumPlanFeatures:
        "Clientes ilimitados\nProductos ilimitados\nSoporte 24/7\nReportes personalizados\nCopia de seguridad diaria",
    },
  })

  const handleInputChange = (section: string, field: string, value: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleImageChange = (section: string, field: string, file: File) => {
    // En una implementación real, aquí se subiría la imagen a un servidor
    // y se obtendría la URL de la imagen subida
    const imageUrl = URL.createObjectURL(file)

    setWebsiteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: imageUrl,
      },
    }))

    toast({
      title: "Imagen cargada",
      description: `La imagen ${file.name} ha sido cargada correctamente.`,
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageChange("general", "logo", file)
    }
  }

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageChange("images", "heroImage", file)
    }
  }

  const handleFeatureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && e.target.dataset.feature) {
      const featureField = `feature${e.target.dataset.feature}Image`
      handleImageChange("images", featureField, file)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Simulamos el guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Cambios guardados",
        description: "Los cambios en el sitio web han sido guardados correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "Ocurrió un error al guardar los cambios. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
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
            <Link
              href="/admin/plans"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Planes
            </Link>
            <Link href="/admin/website" className="text-sm font-medium transition-colors hover:text-primary">
              Sitio Web
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión del Sitio Web</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.open("/", "_blank")}>
              <Globe className="mr-2 h-4 w-4" />
              Ver Sitio
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="pricing">Precios</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>Configura la información básica del sitio web</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Sitio</Label>
                  <Input
                    id="title"
                    value={websiteData.general.title}
                    onChange={(e) => handleInputChange("general", "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={websiteData.general.description}
                    onChange={(e) => handleInputChange("general", "description", e.target.value)}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Esta descripción aparecerá en los resultados de búsqueda y en las redes sociales.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Palabras Clave</Label>
                  <Input
                    id="keywords"
                    value={websiteData.general.keywords}
                    onChange={(e) => handleInputChange("general", "keywords", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Separa las palabras clave con comas.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de Contacto</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={websiteData.general.contactEmail}
                      onChange={(e) => handleInputChange("general", "contactEmail", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                    <Input
                      id="contactPhone"
                      value={websiteData.general.contactPhone}
                      onChange={(e) => handleInputChange("general", "contactPhone", e.target.value)}
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <Label>Logo del Sitio</Label>
                  <div className="flex items-center gap-4">
                    <div className="border rounded-md p-2 bg-white w-64 h-24 flex items-center justify-center">
                      <img
                        src={websiteData.general.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => logoInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Cambiar Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Tamaño recomendado: 200x80px. Formatos: PNG, JPG, SVG.
                      </p>
                      <input
                        type="file"
                        ref={logoInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Imágenes del Sitio</CardTitle>
                <CardDescription>Gestiona las imágenes que se muestran en la página principal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Imagen Principal (Hero)</Label>
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="border rounded-md p-2 bg-white w-full md:w-2/3 h-64 flex items-center justify-center">
                      <img
                        src={websiteData.images.heroImage || "/placeholder.svg"}
                        alt="Imagen principal"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <Button
                        variant="outline"
                        onClick={() => heroImageInputRef.current?.click()}
                        className="flex items-center gap-2 w-full"
                      >
                        <Upload className="h-4 w-4" />
                        Cambiar Imagen Principal
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Tamaño recomendado: 1200x600px. Esta imagen aparecerá en la parte superior de la página
                        principal.
                      </p>
                      <input
                        type="file"
                        ref={heroImageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <Label>Imágenes de Características</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((featureNum) => (
                      <div key={featureNum} className="space-y-2">
                        <div className="border rounded-md p-2 bg-white h-40 flex items-center justify-center">
                          <img
                            src={
                              websiteData.images[
                                `feature${featureNum || "/placeholder.svg"}Image` as keyof typeof websiteData.images
                              ]
                            }
                            alt={`Característica ${featureNum}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {websiteData.features[`feature${featureNum}Title` as keyof typeof websiteData.features]}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (featureImageInputRef.current) {
                                featureImageInputRef.current.dataset.feature = featureNum.toString()
                                featureImageInputRef.current.click()
                              }
                            }}
                            className="flex items-center gap-1"
                          >
                            <ImageIcon className="h-3 w-3" />
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    ))}
                    <input
                      type="file"
                      ref={featureImageInputRef}
                      className="hidden"
                      accept="image/*"
                      data-feature=""
                      onChange={handleFeatureImageUpload}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tamaño recomendado para imágenes de características: 400x400px.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
                <CardDescription>Configura las características que se mostrarán en la página principal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((featureNum) => (
                  <div key={featureNum} className="space-y-4 pb-4 border-b last:border-0">
                    <div className="space-y-2">
                      <Label htmlFor={`feature${featureNum}Title`}>Título de Característica {featureNum}</Label>
                      <Input
                        id={`feature${featureNum}Title`}
                        value={websiteData.features[`feature${featureNum}Title` as keyof typeof websiteData.features]}
                        onChange={(e) => handleInputChange("features", `feature${featureNum}Title`, e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`feature${featureNum}Description`}>Descripción</Label>
                      <Textarea
                        id={`feature${featureNum}Description`}
                        value={
                          websiteData.features[`feature${featureNum}Description` as keyof typeof websiteData.features]
                        }
                        onChange={(e) =>
                          handleInputChange("features", `feature${featureNum}Description`, e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planes y Precios</CardTitle>
                <CardDescription>
                  Configura los planes y precios que se mostrarán en la página principal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 pb-4 border-b">
                  <h3 className="text-lg font-medium">Plan Básico</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basicPlanTitle">Título</Label>
                      <Input
                        id="basicPlanTitle"
                        value={websiteData.pricing.basicPlanTitle}
                        onChange={(e) => handleInputChange("pricing", "basicPlanTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basicPlanPrice">Precio (S/.)</Label>
                      <Input
                        id="basicPlanPrice"
                        value={websiteData.pricing.basicPlanPrice}
                        onChange={(e) => handleInputChange("pricing", "basicPlanPrice", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basicPlanDescription">Descripción</Label>
                    <Input
                      id="basicPlanDescription"
                      value={websiteData.pricing.basicPlanDescription}
                      onChange={(e) => handleInputChange("pricing", "basicPlanDescription", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basicPlanFeatures">Características (una por línea)</Label>
                    <Textarea
                      id="basicPlanFeatures"
                      value={websiteData.pricing.basicPlanFeatures}
                      onChange={(e) => handleInputChange("pricing", "basicPlanFeatures", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4 pb-4 border-b">
                  <h3 className="text-lg font-medium">Plan Estándar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="standardPlanTitle">Título</Label>
                      <Input
                        id="standardPlanTitle"
                        value={websiteData.pricing.standardPlanTitle}
                        onChange={(e) => handleInputChange("pricing", "standardPlanTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="standardPlanPrice">Precio (S/.)</Label>
                      <Input
                        id="standardPlanPrice"
                        value={websiteData.pricing.standardPlanPrice}
                        onChange={(e) => handleInputChange("pricing", "standardPlanPrice", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardPlanDescription">Descripción</Label>
                    <Input
                      id="standardPlanDescription"
                      value={websiteData.pricing.standardPlanDescription}
                      onChange={(e) => handleInputChange("pricing", "standardPlanDescription", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardPlanFeatures">Características (una por línea)</Label>
                    <Textarea
                      id="standardPlanFeatures"
                      value={websiteData.pricing.standardPlanFeatures}
                      onChange={(e) => handleInputChange("pricing", "standardPlanFeatures", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Plan Premium</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="premiumPlanTitle">Título</Label>
                      <Input
                        id="premiumPlanTitle"
                        value={websiteData.pricing.premiumPlanTitle}
                        onChange={(e) => handleInputChange("pricing", "premiumPlanTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="premiumPlanPrice">Precio (S/.)</Label>
                      <Input
                        id="premiumPlanPrice"
                        value={websiteData.pricing.premiumPlanPrice}
                        onChange={(e) => handleInputChange("pricing", "premiumPlanPrice", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premiumPlanDescription">Descripción</Label>
                    <Input
                      id="premiumPlanDescription"
                      value={websiteData.pricing.premiumPlanDescription}
                      onChange={(e) => handleInputChange("pricing", "premiumPlanDescription", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premiumPlanFeatures">Características (una por línea)</Label>
                    <Textarea
                      id="premiumPlanFeatures"
                      value={websiteData.pricing.premiumPlanFeatures}
                      onChange={(e) => handleInputChange("pricing", "premiumPlanFeatures", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
