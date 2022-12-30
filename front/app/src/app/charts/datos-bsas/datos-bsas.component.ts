import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {ProvinciaData, Zona} from "../../models/DataByZone";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-datos-bsas',
  templateUrl: './datos-bsas.component.html',
  styleUrls: ['./datos-bsas.component.scss']
})
export class DatosBsasComponent implements OnInit, OnDestroy {

  data: ProvinciaData[] = []
  dtData: Zona[] = []
  title = 'Datos de Buenos Aires';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  zoneLevel = "Provincia"

  lastLevel = "Provincia";

  constructor(private dataService: DataService) {
  }
  someClickHandler(data: any): void {
    this.lastLevel = this.zoneLevel
    if(this.zoneLevel === "Provincia") {
      this.dtData = data.departamentos
      this.zoneLevel = "Departamento"
    }
    if(this.zoneLevel === "Departamento") {
      this.dtData = data.departamentos
      this.zoneLevel = "Localidad"
    }
  }
  ngOnInit(): void {
    this.dataService.getDataByZone().subscribe(
      response => {

        let bsas = response.data.find(prov => prov.nombre === "Buenos Aires")
        this.dtData = bsas && bsas.departamentos || response.data
        this.dtTrigger.next(this.dtData);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
