export const genRandomChar = (): string => {
  const chars = '¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘åß∂ƒ©˙∆˚¬æ≈ç√∫˜µ≤≥÷'
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

export const getRandomColor = (): string => {
  const colors = ['indigo', 'red', 'amber', 'lime', 'emerald']
  return colors[Math.floor(Math.random() * colors.length)]
}