// Angular imports
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

// Third party imports
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

// Application imports
import { CommonChartSeriesData } from '../../shared/models'


@Component({
  selector: 'common-chart',
  templateUrl: './common-chart.component.html'
})
export class CommonChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  @Input() chartTitle?: string;
  @Input() chartType: string = 'line';
  @Input() colorScheme?: string[] = [];
  @Input() data: CommonChartSeriesData = [];
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  protected chartOptions: Highcharts.Options = {};
  protected updateFlag: boolean = false;

  ngOnInit(): void {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    this.getChartOptions();
  }

  ngOnChanges(change: SimpleChanges) {
    this.chartOptions.xAxis = {
      type: 'datetime',
      min: this.startDate !== '' ? new Date(this.startDate).getTime() : null,
      max: this.endDate !== '' ? new Date(this.endDate).getTime() : null
    };
    this.updateFlag = true;
  }

  private getChartOptions(): void {
    this.chartOptions = {
      chart: {
        height: 350,
        width: 350,
        zooming: { type: 'xy' },
      },
      xAxis: {
        type: 'datetime'
      },
      tooltip:{
				xDateFormat: '%Y-%m-%d, %A',
      },
      colors: this.colorScheme,
      series: this.getSeriesData(),
      title: {
        text : this.chartTitle
      }
    };
  }

  private getSeriesData(): Highcharts.SeriesOptionsType[] {
    return this.data.map((list: { name: any; seriesData: { x: string, y: number; }[]; }) => {
      return {
        type: this.chartType,
        name: list.name,
        data: list.seriesData.map((item: { x: string, y: number; }) => [new Date(item.x).getTime(), item.y])
      }
    }) as Highcharts.SeriesOptionsType[]
  }
}
