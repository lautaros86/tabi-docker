import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LatLng, marker, polygon, popup} from "leaflet";

import * as L from 'leaflet';
import 'leaflet.markercluster';
import {Control} from 'leaflet';
import LayersOptions = Control.LayersOptions;
import {BarrioPunto, Punto} from "../map.component";


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit, OnChanges {
  @Input() center: number[] = [-34.92145, -57.95453];
  @Input() markers: Punto[] = []
  @Input() polygons: number[][][][] = []
  @Input() zonas: BarrioPunto[] = []
  areas: any = []

  // Open Street Map Definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions: LayersOptions = {position: 'bottomright'};
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };
  options = {
    zoom: 12,
    center: L.latLng(-34.92145, -57.95453)
  };

  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup | undefined;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions = {};

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue != changes['markers'].previousValue)
      this.renderPuntos();
    if (changes['zonas'] && changes['zonas'].currentValue != changes['zonas'].previousValue)
      this.renderAreas();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  refreshData(): void {
    this.renderPuntos();
    this.renderAreas()
  }

  renderPuntos(): void {
    const data: L.Marker[] = []
    this.markers.forEach((m) => {
      let repetido = data.find(e => e.getLatLng().lat == m.coordenadas[0] && e.getLatLng().lng == m.coordenadas[1])
      if (!repetido && m.coordenadas[0] != 0 && m.coordenadas[1] != 0) {
        var greenIcon = new L.Icon({
          iconUrl: 'assets/img/marker-icon-2x-green.png',
          shadowUrl: 'assets/img/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        var blueIcon = new L.Icon({
          iconUrl: 'assets/img/marker-icon-2x-blue.png',
          shadowUrl: 'assets/img/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        let popup = L.popup()
          .setContent(`
        <p><b><u>${m.nombre}</u></b></p>
        <p>${m.es_PD ? "PUNTO DIGITAL" : " PUNTO WIFI"}</p>
        `)
        data.push(marker(new LatLng(m.coordenadas[0], m.coordenadas[1]), {icon: m.es_PD ? greenIcon : blueIcon}).bindPopup(popup))
      }
    });
    this.markerClusterData = data;
  }

  renderAreas() {
    this.zonas.forEach((barrio) => {
      let {cantPersonas, color} = this.getAreaColor(barrio);
      let popup = L.popup()
        .setContent(`
        <p><b><u>${barrio.nombre_barrio}</u></b></p>
        <p><b>Población: </b>${cantPersonas}</p>
        <p><b>Viviendas: </b>${barrio.cantidad_viviendas_aproximadas}</p>
        <p><b>Familias: </b>${barrio.cantidad_familias_aproximada}</p>
        `)
      barrio.poligono.forEach(polygonData => {
        let latlngs = polygonData.map(p => new LatLng(p[1], p[0]))
        this.areas.push(polygon(latlngs, {color: color, fillOpacity: 0.6}).bindPopup(popup))
      })
    })

  }

  private getAreaColor(barrio: BarrioPunto) {
    let cantPersonas = barrio.personas_genero_fem + barrio.personas_genero_masc + barrio.personas_genero_otrx
    let color = ''
    switch (true) {
      case (cantPersonas <= 3300):
        color = '#fb6a4a'
        break;
      case (3301 <= cantPersonas && cantPersonas <= 6600):
        color = '#ef3b2c'
        break;
      case (6601 <= cantPersonas && cantPersonas <= 9900):
        color = '#cb181d'
        break;
      case (9901 <= cantPersonas && cantPersonas <= 13200):
        color = '#a50f15'
        break;
      default:
        color = '#67000d'
        break;
    }
    return {cantPersonas, color};
  }
}
