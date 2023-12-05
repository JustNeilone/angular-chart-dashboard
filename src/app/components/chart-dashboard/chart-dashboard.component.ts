// Angular imports
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

// Third party imports
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// Application imports
import { ChartService } from '../../services/chart-service.service';
import { ChartDashboardData, ChartSeriesOption, DashboardChart } from '../../shared/models'
import CONSTS from '../../shared/consts';


@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html'
})
export class ChartDashboardComponent implements OnInit, OnDestroy {
  private destroyTrigger = new Subject<void>();
  public readonly maxCharts = CONSTS.dashboardChartLimit;
  public chartTypes: string[] = [];
  public chartColourSchemes: string[][] = [];
  public chartDataOptions: Array<ChartSeriesOption> = [];

  public title = new FormControl('');
  public type = new FormControl('');
  public colour = new FormControl([]);
  public dataOptions = new FormControl([]);
  public addingDisabled: boolean = false;

  public dashboardCharts: DashboardChart[] = [];
  public startDate: string = '';
  public endDate: string = '';

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getChartDashboardData()
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe((data: ChartDashboardData) => {
        this.chartTypes = data.types;
        this.chartColourSchemes = data.colours;
        this.chartDataOptions = data.dataOptions;
      })
  }

  public addChart(): void {
    const newChart = {
      name: this.title.value?.toString(),
      type: this.type.value?.toString(),
      colours: this.colour.value,
      data: this.dataOptions.value
    } as DashboardChart;

    this.dashboardCharts.push(newChart);

    if (this.dashboardCharts.length === this.maxCharts)
      this.addingDisabled = true;

    this.resetControls();
  }

  public applyDateFilter(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public clearCharts(): void {
    this.addingDisabled = false;
    this.dashboardCharts = [];
  }

  private resetControls(): void {
    this.title.patchValue('');
    this.type.patchValue('');
    this.colour.patchValue([]);
    this.dataOptions.patchValue([]);
  }

  ngOnDestroy() {
    this.destroyTrigger.next();
    this.destroyTrigger.complete();
  }
}
