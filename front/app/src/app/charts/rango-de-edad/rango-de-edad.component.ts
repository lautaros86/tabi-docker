import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Barrio} from "../barrio";
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-rango-de-edad',
  templateUrl: './rango-de-edad.component.html',
  styleUrls: ['./rango-de-edad.component.scss']
})
export class RangoDeEdadComponent implements OnChanges {
  @Input() data: Barrio[] = []
  title = 'Tangos de edad';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      this.loadData()
    }
  }

  loadData() {
    let total: number[] = new Array(17).fill(0)
    this.data.forEach( barrio => {
      total[0] = total[0] + barrio.rango_edad_0_a_4_anios
      total[1] = total[1] + barrio.rango_edad_5_a_9_anios
      total[2] = total[2] + barrio.rango_edad_10_a_14_anios
      total[3] = total[3] + barrio.rango_edad_15_a_19_anios
      total[4] = total[4] + barrio.rango_edad_20_a_24_anios
      total[5] = total[5] + barrio.rango_edad_25_a_29_anios
      total[6] = total[6] + barrio.rango_edad_30_a_34_anios
      total[7] = total[7] + barrio.rango_edad_35_a_39_anios
      total[8] = total[8] + barrio.rango_edad_40_a_44_anios
      total[9] = total[9] + barrio.rango_edad_45_a_49_anios
      total[10] = total[10] + barrio.rango_edad_50_a_54_anios
      total[11] = total[11] + barrio.rango_edad_55_a_59_anios
      total[12] = total[12] + barrio.rango_edad_60_a_64_anios
      total[13] = total[13] + barrio.rango_edad_65_a_69_anios
      total[14] = total[14] + barrio.rango_edad_70_a_74_anios
      total[15] = total[15] + barrio.rango_edad_75_a_79_anios
      total[16] = total[16] + barrio.rango_edad_80_o_mas_anios
    })
    this.barChartData = {
      labels: [
        '0 a 4',
        '5 a 9',
        '10 a 14',
        '15 a 19',
        '20 a 24',
        '25 a 29',
        '30 a 34',
        '35 a 39',
        '40 a 44',
        '45 a 49',
        '50 a 54',
        '55 a 59',
        '60 a 64',
        '65 a 69',
        '70 a 74',
        '75 a 79',
        '80+',
      ],
      datasets: [
        { data: total, label: 'Total' },
      ]
    };
  }
}
