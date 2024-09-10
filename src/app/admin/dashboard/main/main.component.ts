import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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
// import { AuthService } from 'src/app/core/service/auth.service';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { fromEvent } from 'rxjs'
import { MatMenuTrigger } from '@angular/material/menu'
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from '../../../api/api.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
// import { StudentDialogComponent } from './dialogs/student-dialog/student-dialog.component'
import { Router } from '@angular/router'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
interface User {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  role_name: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-gb' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    DatePipe
  ],
})
export class MainComponent implements OnInit {
  totalUser = 0
  totalEncryption = 0
  totalDecryption = 0
  panelExpanded = true;
  userInfo: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router,
    private apiService: ApiService,
  ) {
  }
  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'))
    this.apiService.getAPI('getusers.php').subscribe((data: User[]) =>{
      this.totalUser = data.length
    })
  }

}
