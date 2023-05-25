import { Component, OnDestroy, OnInit } from '@angular/core';
import { Report } from '../report.model';
import { ReportService } from './report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit, OnDestroy {
  reports: Report[];
  subscription: Subscription;

  constructor(
    private reportService: ReportService,
    private router: Router, // to navigate
    private route: ActivatedRoute // current route
  ) { }

  onNewReport() { // need to add auth*
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.subscription = this.reportService.reportsChanged.subscribe(
      (reports: Report[]) => {
        this.reports = reports;
      }
    );
    this.reports = this.reportService.getReports();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
