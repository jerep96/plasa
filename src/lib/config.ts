import { Precio } from '@/types'

export const PRECIOS: Record<string, Precio> = {
  asado:     { nombre: '1 kg de asado',        emoji: '🥩', precio: 1190,  updatedAt: '2026-04-18' },
  nafta:     { nombre: '1L nafta premium',      emoji: '⛽', precio: 1350,  updatedAt: '2026-04-18' },
  cafe:      { nombre: 'Café con leche en bar', emoji: '☕', precio: 2800,  updatedAt: '2026-04-18' },
  mcdonalds: { nombre: "Combo McDonald's",      emoji: '🍔', precio: 7490,  updatedAt: '2026-04-18' },
  netflix:   { nombre: 'Netflix (1 mes)',        emoji: '📺', precio: 5800,  updatedAt: '2026-04-18' },
}

export const JORNADA_HORAS = 8
export const DIAS_LABORALES_MES = 22

// Minutos de trabajo = precio / (smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60))
export function calcularMinutos(precio: number, smvm: number): number {
  const valorMinuto = smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60)
  return Math.round(precio / valorMinuto)
}
