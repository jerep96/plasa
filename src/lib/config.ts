import { Precio } from "@/types";

export const PRECIOS: Record<string, Precio> = {
  asado: {
    nombre: "1 kg de asado",
    emoji: "🥩",
    precio: 18500, // Promedio carnicerías AMBA, abril 2026
    updatedAt: "2026-04-22",
  },
  nafta: {
    nombre: "1L nafta premium",
    emoji: "⛽",
    precio: 2207, // YPF Infinia, buffer desde 1/04 — congelado 45 días
    updatedAt: "2026-04-22",
  },
  cafe: {
    nombre: "Café con leche en bar",
    emoji: "☕",
    precio: 4200, // Promedio bar porteño, estimado abril 2026
    updatedAt: "2026-04-22",
  },
  mcdonalds: {
    nombre: "Combo McDonald's",
    emoji: "🍔",
    precio: 14990, // McAllister / combo mediano estándar, 17/04
    updatedAt: "2026-04-22",
  },
  netflix: {
    nombre: "Netflix (plan estándar, 1 mes)",
    emoji: "📺",
    precio: 21000, // Plan Estándar sin anuncios, desde abril 2026
    updatedAt: "2026-04-22",
  },
};

export const JORNADA_HORAS = 8;
export const DIAS_LABORALES_MES = 22;

// Minutos de trabajo = precio / (smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60))
export function calcularMinutos(precio: number, smvm: number): number {
  const valorMinuto = smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60);
  return Math.round(precio / valorMinuto);
}
