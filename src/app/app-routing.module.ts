import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { ReportStartComponent } from './reports/report-start/report-start.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { ReportEditComponent } from './reports/report-edit/report-edit.component';
import { AboutComponent } from './about/about.component';
import { ReportThanksComponent } from './reports/report-thanks/report-thanks.component';

const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  {
    path: 'reports', component: ReportsComponent, children: [
      { path: '', component: ReportStartComponent },
      { path: 'about', component: AboutComponent },
      { path: 'thanks', component: ReportThanksComponent },
      { path: 'new', component: ReportEditComponent },
      { path: ':id', component: ReportDetailComponent },
      { path: ':id/edit', component: ReportEditComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
