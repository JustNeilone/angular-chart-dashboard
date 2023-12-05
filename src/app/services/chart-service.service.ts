// Angular imports
import {Injectable} from '@angular/core';

// Third party imports
import {Observable, of} from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';

// Application imports
import MOCK_DATA from './../shared/mocks';
import CONSTS from './../shared/consts';
import { ChartDashboardData } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  public getChartDashboardData(): Observable<ChartDashboardData> {
    // emulate HTTP request
    return of({
      types: [CONSTS.barType, CONSTS.lineType],
      colours: [CONSTS.chartColours1, CONSTS.chartColours2, CONSTS.chartColours3],
      dataOptions: [MOCK_DATA.chartData1, MOCK_DATA.chartData2, MOCK_DATA.chartData3, MOCK_DATA.chartData4]
    } as ChartDashboardData).pipe(delay(100));
  }
}
