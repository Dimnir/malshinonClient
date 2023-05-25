import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { ReportItemComponent } from './reports/report-list/report-item/report-item.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthComponent } from './auth/auth.component';
import { ReportStartComponent } from './reports/report-start/report-start.component';
import { ReportEditComponent } from './reports/report-edit/report-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportListComponent,
    ReportDetailComponent,
    ReportItemComponent,
    ReportsComponent,
    AuthComponent,
    ReportStartComponent,
    ReportEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
