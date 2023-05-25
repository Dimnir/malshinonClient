import { Component, OnInit } from '@angular/core';
import { ReportService } from './reports/report-list/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'malshinon';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.fetchReports();
  }
}
