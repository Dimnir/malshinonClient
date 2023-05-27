import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReportService } from '../report-list/report.service';
import { Report } from '../report.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  newReportForm: FormGroup;
  selected: string = '';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe( // getting the dynamic id from routing
      (params: Params) => { // params change = page reloaded 
        this.id = +params['id'];
        this.editMode = params['id'] != null; // if 'id' undefined(null) editMode = False
        this.initForm();
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    // using report service parse functions to set correct type values to submitted report  
    let reportDesc: string = this.newReportForm.value.description;
    let reportType: number = +this.reportService.getTypeKey(this.newReportForm.value.type);
    let reportPlace: number = +this.reportService.getStreetKey(this.newReportForm.value.place);
    let reportTime: Date = new Date(); // current time when submit

    let report = new Report(reportTime, reportPlace, reportDesc, reportType, -1, 0);

    // if (this.editMode) {
    // this.reportService.updateReport(report);
    // } else {
    if (!this.editMode) {
      this.reportService.addReport(report);
    }
    this.router.navigate(['../'], { relativeTo: this.route }) // back to reports page after submit
  }

onCancel() { // user presses cancel - goes back to reports page
  this.router.navigate(['../'], { relativeTo: this.route })
}

onDelete() {
  if (this.editMode) {
    this.reportService.deleteReport(this.id);
    this.router.navigate(['../../'], { relativeTo: this.route }) // goes back to reports page
  }
}

  private initForm() {
  let reportDesc = ''; // init values in case of new mode
  let reportType = null;
  let reportPlace = null;

  if (this.editMode) { // get old values if in edit mode
    const report = this.reportService.getReport(this.id);
    reportDesc = report.description;
    reportType = this.reportService.parseType(report.type);
    reportPlace = this.reportService.parseStreet(report.place);
  }
  this.newReportForm = new FormGroup({ // set values to new form
    'type': new FormControl(reportType, Validators.required),
    'description': new FormControl(reportDesc, Validators.required),
    'place': new FormControl(reportPlace, Validators.required)
  });
}

update(e) { // selector helper function
  this.selected = e.target.value
}

// *Lists* of streets & types. eg: ['street1','street2', etc]
types = Array.from(this.reportService.repTypeMap.values());
places = Array.from(this.reportService.streetMap.values());


}
