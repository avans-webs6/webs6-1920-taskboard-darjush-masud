import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.sass']
})
export class BurndownComponent implements OnInit, OnChanges {

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
  dateArray: any[];

  @Input()
  public sprint: Sprint;

  @Input()
  public userstoriesDone: any;

  @Input()
  public done = [];

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

  ngOnChanges(changes: SimpleChanges) {
    if (this.sprint != undefined && this.userstoriesDone != 0) {
		console.log(this.sprint)
		console.log(this.userstoriesDone)
      console.log("total points: ", this.totalPoints);
      if (this.dateArray == undefined || this.dateArray[0] == "SPRINT DONE") {
        this.setBurnDownChartLabels();
      }
      console.log("done user stories: ", this.userstoriesDone)
      this.setIdealBurnDownLine();
      this.setBurndownDataSet();
    }

  }

  setBurnDownChartLabels() {
    this.dateArray = new Array();

    let currentDate = new Date(this.sprint.startdate['seconds'] * 1000);
    let endDate = new Date(this.sprint.enddate['seconds'] * 1000);
    while (currentDate <= endDate) {
      this.dateArray.push(this.datePipe.transform(new Date(currentDate), 'MM-dd-yyyy'));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.dateArray.push("SPRINT DONE");
    this.burndownChartLabels = this.dateArray;
  }

  setBurndownDataSet() {
    //Todo
    this.burndownChartDatasets = [
      { data: this.totalPoints, label: 'Ideal story points' },
      { data: this.userStoriesDoneLine, label: 'User storiespoints to go' }
    ];
  }



  setIdealBurnDownLine() {
    this.sprintIdealLine = [];


    this.sprintIdealLine.push(this.totalPoints);

    for (let i = this.dateArray.length - 2; i >= 0; i--) {
      this.sprintIdealLine.push(this.sprint.userstories.length * i / this.dateArray.length);
    }
    console.log("datearray ", this.dateArray);
    console.log("ideal line ", this.sprintIdealLine);
  }

  ngOnInit(): void {


  }

}
