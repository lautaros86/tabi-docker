import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

export interface BarrioPunto {
  personas_genero_fem: number
  id_renabap: number
  cantidad_familias_aproximada: number
  nombre_barrio: string
  cantidad_viviendas_aproximadas: number
  personas_genero_masc: number
  geometry: string
  personas_genero_otrx: number
  poligono: number[][][]
}

export interface Punto {
  es_PD: boolean;
  coordenadas: number[];
  nombre: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  center: number[] = [];
  markers: Punto[] = [];
  polygons: number[][][][] = [];
  zonas: BarrioPunto[] = []

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.center = [-34.92145, -57.95453]
    this.cargarPuntos()
    this.cargarBarrios()
  }

  cargarPuntos() {
    this.dataService.getPuntos().subscribe(
      (data: any) => this.markers = data.data.map( (m: any) => ({
        coordenadas: [m.latitud, m.longitud],
        nombre: m.nombre,
        es_PD: m.es_PD
      }))
    )
  }

  cargarBarrios() {
    this.dataService.getBarriosPuntos().subscribe(
      (data: any) => {
        this.zonas = data.data.map((barrio: any) => {
          let poligono = []
          try {
            poligono = JSON.parse(barrio.geometry
              .replace('MULTIPOLYGON ', '')
              .replaceAll('(', '[')
              .replaceAll(')', ']')
              .replaceAll(', ', '],[')
              .replaceAll(' ', ', ')
              .replaceAll(']]],[[[', ']],[[')
            )
          } catch (e) {
            console.log("fallo el mapeo de " + barrio)
          }
          return {...barrio, poligono}
        })
      }
    )

  }
}
