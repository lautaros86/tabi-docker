import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Barrio} from "./barrio";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  data: Barrio[] = []

  constructor(private dataService: DataService) {
    dataService.getBarrios().subscribe( data => this.data = data.data)
  }

}
