import { Precio } from "@/types";

export const PRECIOS: Record<string, Precio> = {
  asado: {
    nombre: "1 kg de asado",
    emoji: "🥩",
    precio: 16836, // Precio promedio INDEC GBA, septiembre 2026
    updatedAt: "2026-11-05",
  },
  nafta: {
    nombre: "1L nafta premium",
    emoji: "⛽",
    precio: 2324, // YPF Infinia (premium), CABA nov 2026
    updatedAt: "2026-11-05",
  },
  cafe: {
    nombre: "Café con leche en bar",
    emoji: "☕",
    precio: 5400, // Promedio bar porteño, estimado octubre 2026
    updatedAt: "2026-11-05",
  },
  mcdonalds: {
    nombre: "Combo McDonald's",
    emoji: "🍔",
    precio: 17900, // Combo mediano Big Mac, agosto 2026
    updatedAt: "2026-11-05",
  },
  netflix: {
    nombre: "Netflix (plan estándar, 1 mes)",
    emoji: "📺",
    precio: 25800, // Plan Estándar sin anuncios, precio final con impuestos, nov 2026
    updatedAt: "2026-11-05",
  },
};

export const SMVM = {
  valor: 398800, // Res. 4/2026, vigente desde 1/11/2026
  updatedAt: '2026-11-01',
}

export const CANASTA = {
  valor: 1632505, // INDEC septiembre 2026, familia tipo 4 integrantes
  updatedAt: '2026-10-13',
}

export const INFLACION_INTERANUAL = {
  valor: 33.4, // INDEC septiembre 2026
  updatedAt: '2026-10-13',
}

export const JORNADA_HORAS = 8;
export const DIAS_LABORALES_MES = 22;

// Minutos de trabajo = precio / (smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60))
export function calcularMinutos(precio: number, smvm: number): number {
  const valorMinuto = smvm / (DIAS_LABORALES_MES * JORNADA_HORAS * 60);
  return Math.round(precio / valorMinuto);
}
