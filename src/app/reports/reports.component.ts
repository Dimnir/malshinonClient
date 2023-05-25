import { Component, OnInit } from '@angular/core';
import { Report } from './report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedReport: Report;

  constructor() { }

  ngOnInit(): void {
  }

}
