
export interface Zona {
  nombre: string,
  barrios: number,
  habitantes: number,
  puntos: number,
}
export interface ProvinciaData extends Zona {
  departamentos: DepartamentoData[]
}
export interface DepartamentoData extends Zona {
  localidades: LocalidadData[]
}
export interface LocalidadData extends Zona {
}
