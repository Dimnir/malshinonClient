import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Report } from '../report.model';
import { ReportService } from '../report-list/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  report: Report;
  id: number;
  subscription: Subscription;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { // getting report by id
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.report = this.reportService.getReport(this.id);
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditReport() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onBack(){
    this.router.navigate(['../'], { relativeTo: this.route })
  }


  // help functions to show correct type in html template
  pType(n: number) {
    return this.reportService.parseType(n)
  }
  pPlace(n: number) {
    return this.reportService.parseStreet(n)
  }


}
