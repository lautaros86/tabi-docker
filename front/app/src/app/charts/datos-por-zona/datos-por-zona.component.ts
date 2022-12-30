import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {ProvinciaData, Zona} from "../../models/DataByZone";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-datos-por-zona',
  templateUrl: './datos-por-zona.component.html',
  styleUrls: ['./datos-por-zona.component.scss']
})
export class DatosPorZonaComponent implements OnInit, OnDestroy {

  data: ProvinciaData[] = []
  dtData: Zona[] = []
  title = 'Datos por Provincia';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  zoneLevel = "Provincia"

  lastLevel = "Provincia";

  constructor(private dataService: DataService) {
  }
  ngOnInit(): void {
    this.dataService.getDataByZone().subscribe(
      response => {
        this.dtData = response.data
        this.dtTrigger.next(this.dtData);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
