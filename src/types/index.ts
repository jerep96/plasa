export interface DolarCasa {
  casa: string
  nombre: string
  compra: number
  venta: number
  fechaActualizacion?: string
}

export interface InflacionItem {
  fecha: string
  valor: number
}

export interface SmvmItem {
  fecha: string
  valor: number
}

export interface CanastaItem {
  fecha: string
  valor: number
}

export interface UvaItem {
  fecha: string
  valor: number
}

export interface InflacionInteranualItem {
  fecha: string
  valor: number
}

export interface Indicadores {
  inflacion: InflacionItem[]
  smvm: number
  smvmFecha: string
  canasta: number
  canastaFecha: string
  uva: UvaItem[]
  inflacionInteranual: InflacionInteranualItem[]
}

export interface Precio {
  nombre: string
  emoji: string
  precio: number
  updatedAt: string
}

export interface MinutosItem {
  key: string
  nombre: string
  emoji: string
  precio: number
  updatedAt: string
  minutos: number
}
