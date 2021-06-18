import { DatePipe } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.sass']
})
export class BurndownComponent implements OnInit {

  @Input()
  public totalPoints;

  burndownChartType: string;
  burndownChartDatasets: Array<any>;
  burndownChartLabels: Array<any>;
  burndownChartColors: Array<any>;
  burndownChartOptions: any;
  datePipe: DatePipe;
  sprintIdealLine: number[];
  userStoriesDoneLine: number[];


  constructor() { 
    this.datePipe = new DatePipe('en-US');
    this.burndownChartType = 'line';
    this.burndownChartOptions = { responsive: true };
    this.burndownChartColors = [
      {
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      },
      {
        backgroundColor: 'rgba(0, 137, 132, .2)',
        borderColor: 'rgba(0, 10, 130, .7)',
        borderWidth: 2,
      }
    ];
  }

  setBurndownData() {
    this.burndownChartDatasets = [
      { data: this.totalPoints, label: 'Ideal line story points' },
      { data: this.userStoriesDoneLine, label: 'User stories points to go' }
    ];
  }

  ngOnInit(): void {
  }

}
