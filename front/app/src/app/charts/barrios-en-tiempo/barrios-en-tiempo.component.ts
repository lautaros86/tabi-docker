import {Component, Input, SimpleChanges} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {Barrio} from "../barrio";

@Component({
  selector: 'app-barrios-en-tiempo',
  templateUrl: './barrios-en-tiempo.component.html',
  styleUrls: ['./barrios-en-tiempo.component.scss']
})
export class BarriosEnTiempoComponent {

  @Input() data: Barrio[] = []
  title = 'Surgimiento de barrios por decadas';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      this.loadData()
    }
  }

  loadData(){
    let labels: number[] = []
    let countData: any = {}
    this.data.forEach( barrio => {
      let decada = +barrio.decada_de_creacion.split(" ")[1]
      if(!labels.includes(decada)) {
        labels.push(decada)
      }
      if(!countData[decada])
        countData[decada] = 1
      else
        countData[decada] = countData[decada] + 1
    })

    let sortedLabels = labels.sort((a: number, b: number) => a - b)
    let sortedData = Object.keys(countData).map(key => countData[key])
    let totalData: number[] = []
    for(let i = 0; i < sortedData.length; i++) {
      totalData[i] = 0
      for(let j = 0; j <= i; j++) {
        totalData[i] = totalData[i] + sortedData[j]
      }
    }
    this.lineChartData = {
      labels: sortedLabels,
      datasets: [
        {
          data: sortedData,
          label: 'Nuevos',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        },
        {
          data: totalData,
          label: 'Total',
          fill: true,
          tension: 0.5,
          borderColor: 'red',
          backgroundColor: 'rgba(0,255,0,0.3)'
        }
      ]
    };
  }
}
