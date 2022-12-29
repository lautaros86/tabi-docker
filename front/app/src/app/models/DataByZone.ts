
export interface ProvinciaData {
  nombre: string,
  barriosProv: number,
  habitantesProv: number,
  puntosProv: number,
  departamentos: DepartamentoData[]
}
export interface DepartamentoData {
  nombre: string,
  barriosProv: number,
  habitantesProv: number,
  puntosProv: number,
  localidades: LocalidadData[]
}
export interface LocalidadData {
  nombre: string,
  barriosProv: number,
  habitantesProv: number,
  puntosProv: number,
}
