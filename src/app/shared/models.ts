export type ChartSeriesOption = {
  name: string,
  seriesData: {
    x: string,
    y: number;
  }[] };

export type CommonChartSeriesData = Array<{
  name: string,
  seriesData: {
    x: string,
    y: number;
  }[]
}>;

export type ChartDashboardData = {
  types: string[],
  colours: string[][],
  dataOptions: Array<ChartSeriesOption>
}

export type DashboardChart = {
  name: string,
  type: string,
  colours: string[],
  data: CommonChartSeriesData
}
