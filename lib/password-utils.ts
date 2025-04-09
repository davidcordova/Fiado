/**
 * Genera una contraseña segura aleatoria
 * @param length Longitud de la contraseña (por defecto 10 caracteres)
 * @returns Una contraseña segura
 */
export function generateSecurePassword(length = 10): string {
  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ" // Sin I, O para evitar confusión
  const lowercaseChars = "abcdefghijkmnpqrstuvwxyz" // Sin l, o para evitar confusión
  const numberChars = "23456789" // Sin 0, 1 para evitar confusión
  const specialChars = "!@#$%^&*-_=+"

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars

  // Asegurarse de que la contraseña tenga al menos un carácter de cada tipo
  let password =
    uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)) +
    lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)) +
    numberChars.charAt(Math.floor(Math.random() * numberChars.length)) +
    specialChars.charAt(Math.floor(Math.random() * specialChars.length))

  // Completar el resto de la contraseña con caracteres aleatorios
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length))
  }

  // Mezclar los caracteres para que no siempre siga el mismo patrón
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}

/**
 * Verifica si una contraseña cumple con los requisitos de seguridad
 * @param password La contraseña a verificar
 * @returns true si la contraseña es segura, false en caso contrario
 */
export function isPasswordSecure(password: string): boolean {
  // Requisitos mínimos: 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
}
