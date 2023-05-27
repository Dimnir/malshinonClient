import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-thanks',
  templateUrl: './report-thanks.component.html',
  styleUrls: ['./report-thanks.component.css']
})
export class ReportThanksComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }


}
