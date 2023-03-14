export const formatToMoney = (value:number) => {
  if (!value) return 0
  const format = (
    (Math.round(((Math.round(value * 100) / 5) * 5) / 5) * 5) /
      100
  ).toFixed(2)

  return Number(format)
}
