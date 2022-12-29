import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {ProvinciaData} from "../../models/DataByZone";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-datos-por-zona',
  templateUrl: './datos-por-zona.component.html',
  styleUrls: ['./datos-por-zona.component.scss']
})
export class DatosPorZonaComponent implements OnInit, OnDestroy {

  data: ProvinciaData[] = []
  title = 'Datos por zona';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDataByZone().subscribe(
      response => {
        this.data = response.data
        this.dtTrigger.next(this.data);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
