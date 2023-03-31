export const formatToMoney = (value:number) => {
  if (!value) return 0
  const format = (
    (Math.round(((Math.round(value * 100) / 5) * 5) / 5) * 5) /
      100
  ).toFixed(2)

  return Number(format)
}

export const formatToMoney2 = (monto: number, positivo: boolean = false) => {
  const signo = positivo ? '-' : ''
  const num = Math.abs(monto)
  const formattedNum = num.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
  return `${signo}${formattedNum}`
}
