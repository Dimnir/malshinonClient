import { Component, Input, OnInit } from '@angular/core';
import { Report } from '../../report.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {
  @Input() report: Report;
  @Input() index: number;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  // help functions to show correct type in html template
  pType(n: number) {
    return this.reportService.parseType(n)
  }
  pPlace(n: number) {
    return this.reportService.parseStreet(n)
  }

}
