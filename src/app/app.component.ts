// Angular imports
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnDestroy} from '@angular/core';

// Third party imports
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// Application imports
import MOCK_DATA from './shared/mocks';
import CONSTS from './shared/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private destroyTrigger = new Subject<void>();

  public title = 'angular-chart-dashboard';
  public mockData = MOCK_DATA;
  public consts = CONSTS;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyTrigger))
      .subscribe(() => {});
  }

  ngOnDestroy() {
    this.destroyTrigger.next();
    this.destroyTrigger.complete();
  }
}
