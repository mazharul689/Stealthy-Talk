import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
};
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
})
export class Dashboard2Component implements OnInit {
  public lineChartOptions: Partial<ChartOptions>;
  getAll: any;
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.chart1();
    if (!window.localStorage.getItem('getAll')) {
      // console.log('new version data')
      this.apiService.getAPI(`getlookupsall`).subscribe((data) => {
        this.getAll = data['data']
        window.localStorage.setItem("getAll", JSON.stringify(this.getAll))
      })
    }
    else {
      this.getAll = JSON.parse(window.localStorage.getItem('getAll'))
      // console.log('old version data')
    }
  }
  private chart1() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Teacher 1',
          data: [15, 13, 30, 23, 13, 32, 27],
        },
        {
          name: 'Teacher 2',
          data: [12, 25, 14, 18, 27, 13, 21],
        },
      ],
      chart: {
        height: 270,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#9F78FF', '#858585'],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
}
