export const formatPesos = (n: number) => `$${n.toLocaleString('es-AR')}`
export const formatPct = (n: number) => `${n.toFixed(1)}%`
export const formatUSD = (n: number) => `USD ${Math.round(n)}`

export function formatFecha(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${parseInt(day)} ${meses[parseInt(month) - 1]} ${year}`
}

export function mesAbreviado(dateStr: string): string {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const [, month] = dateStr.split('-')
  return meses[parseInt(month) - 1]
}
