/**
 * Interfaz para los datos del correo de bienvenida
 */
interface WelcomeEmailData {
  to: string
  storeName: string
  ownerName: string
  username: string
  password: string
  loginUrl: string
}

/**
 * Servicio simulado para enviar correos electrónicos
 * En una implementación real, esto se conectaría a un servicio de correo como SendGrid, Mailgun, etc.
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
  console.log("Enviando correo de bienvenida a:", data.to)

  // Simulamos el envío del correo
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Aquí iría la lógica real para enviar el correo
  const emailContent = `
    Hola ${data.ownerName},
    
    ¡Bienvenido a BodegaApp! Tu tienda "${data.storeName}" ha sido creada exitosamente.
    
    Puedes acceder a tu panel de administración con las siguientes credenciales:
    
    URL: ${data.loginUrl}
    Usuario: ${data.username}
    Contraseña temporal: ${data.password}
    
    Por seguridad, deberás cambiar tu contraseña en el primer inicio de sesión.
    
    Si tienes alguna pregunta, no dudes en contactarnos.
    
    Saludos,
    El equipo de BodegaApp
  `

  console.log("Contenido del correo:", emailContent)

  // Simulamos una respuesta exitosa
  return true
}

/**
 * Envía un correo de restablecimiento de contraseña
 */
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  console.log("Enviando correo de restablecimiento de contraseña a:", email)

  // Simulamos el envío del correo
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Aquí iría la lógica real para enviar el correo
  const emailContent = `
    Hola,
    
    Has solicitado restablecer tu contraseña en BodegaApp.
    
    Haz clic en el siguiente enlace para crear una nueva contraseña:
    ${resetLink}
    
    Este enlace expirará en 24 horas.
    
    Si no solicitaste este cambio, puedes ignorar este correo.
    
    Saludos,
    El equipo de BodegaApp
  `

  console.log("Contenido del correo:", emailContent)

  // Simulamos una respuesta exitosa
  return true
}
