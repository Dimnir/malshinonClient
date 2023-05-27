import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-start',
  templateUrl: './report-start.component.html',
  styleUrls: ['./report-start.component.css']
})
export class ReportStartComponent implements OnInit {

  placeName: string = 'שכונת גני אביב';

  constructor() { }

  ngOnInit(): void {
  }

}
