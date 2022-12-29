import {Component, Input} from '@angular/core';
import {Barrio} from "../barrio";

@Component({
  selector: 'app-datos-por-zona',
  templateUrl: './datos-por-zona.component.html',
  styleUrls: ['./datos-por-zona.component.scss']
})
export class DatosPorZonaComponent {

  @Input() data: Barrio[] = []
  title = 'Datos por zona';
}
