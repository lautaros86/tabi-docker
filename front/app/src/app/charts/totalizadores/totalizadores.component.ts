import {Component, Input, SimpleChanges} from '@angular/core';
import {Barrio} from "../barrio";

@Component({
  selector: 'app-totalizadores',
  templateUrl: './totalizadores.component.html',
  styleUrls: ['./totalizadores.component.scss']
})
export class TotalizadoresComponent {
  @Input() data: Barrio[] = []

  barrios = 0
  viviendas = 0
  familias = 0
  personas = 0

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      this.loadData()
    }
  }

  loadData() {
    this.data.forEach( barrio => {
      this.barrios++
      this.viviendas = this.viviendas + barrio.cantidad_viviendas_aproximadas
      this.familias = this.familias + barrio.cantidad_familias_aproximada
      this.personas = this.personas + barrio.personas_genero_fem + barrio.personas_genero_masc + barrio.personas_genero_otrx
    })
  }
}
