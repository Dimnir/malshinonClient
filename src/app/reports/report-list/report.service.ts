import { Injectable } from "@angular/core";
import { Report } from "../report.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

/*************************************************************** 
- added func to send report to api

- added func to pull report from api

- added func to update report in api

- added unique id to each report

____TODO____

 DO "DELETE REPORT"

***************************************************************/

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportsChanged = new Subject<Report[]>();
  private baseApiUrl = environment;

  constructor(private http: HttpClient) { }
  ApiUrl = this.baseApiUrl.apiBaseUrl; // https://localhost:5001


  convertFromDBtoClient(obj: any) { // api returns objects - convert them into reports
    obj.forEach((element => { // each object from db:
      this.addReportStart(new Report( // add report type to reports list in client
        element.date,
        element.place,
        element.description,
        element.type,
        element.id));
    }))
  }

  storeReport(report: Report) {
    let rep = { // id in api is auto-incr so pass only [type,desc,place]
      type: report.type,
      description: report.description,
      place: report.place
    };
    this.http.post(this.ApiUrl + '/api/reports/postreport', rep).subscribe({
      next: () => { },
      error: error => console.log(error)
    })
  }

  fetchReports() { // fetch reports list from api -- main component onInit calls this
    this.http.get(this.ApiUrl + '/api/reports').subscribe({
      next: data => this.convertFromDBtoClient(data),
      error: error => console.log(error),
    })
  }

  addReport(report: Report) {
    this.storeReport(report) // stores report in db
    this.reports = [report].concat(this.reports); // concat arrays into 1 array
    this.reportsChanged.next(this.reports.slice()); // updates client report list
  }

  updateReport(num: number, newReport: Report) {
    let DBid = this.reports[num].id; // id to update
    let oldTime = this.reports[num].time; // original submission time  
    this.reports[num] = newReport; // client: report update
    newReport.id = DBid; // set id to update
    newReport.time = oldTime; // set old time to updated report to show original time in client reports list
    this.updateReportInDb(DBid, newReport); // api: report update
    this.reportsChanged.next(this.reports.slice()); // save changes to client reports list
  }

  updateReportInDb(id: number, report: Report) {
    this.http.put(this.ApiUrl + '/api/reports/' + id, report).subscribe({
      next: () => { },
      error: error => console.log(error),
    })
  }


  // ********************** NON DB ***********************************

  addReportStart(report: Report) { // LOADS LIST WHEN PAGE STARTS
    this.reports = [report].concat(this.reports); // like unshift (but by concat 2 arrays)
    this.reportsChanged.next(this.reports.slice()); // updates client report list
  }

  getReports() {
    return this.reports.slice();
  }

  getReport(id: number) {
    return this.reports[id];
  }

  deleteReport(num: number) {
    this.reports.splice(num, 1);
    this.reportsChanged.next(this.reports.slice());
  }

  private reports: Report[] = [];
  //   new Report(new Date('2023-03-25'), 1, 'חשודים גונבים סמלים ממכוניות', 4),
  //   new Report(new Date('2023-07-3'), 4, 'צעקות רצח בסקייט פארק', 1),
  //   new Report(new Date(), 2, 'אנסים ברכבת', 3),

  parseStreet(num: number) {
    if (num > this.streetMap.size) {
      return null;
    }
    return this.streetMap.get(num.toString());
  }

  parseType(num: number) {
    if (num > this.repTypeMap.size) {
      return null;
    }
    return this.repTypeMap.get(num.toString());
  }

  streetMap = new Map([
    ['1', 'ארבע העונות'],
    ['2', 'אדמונית'],
    ['3', 'לובלין אהרון'],
    ['4', 'חללי אגוז'],
    ['5', 'פיקוס'],
    ['6', 'תלמים'],
    ['7', 'חידקל'],
    ['8', 'סחלב'],
    ['9', 'חללי דקר'],
    ['10', 'ירמוך'],
    ['11', 'דן'],
    ['12', 'עלי כותרת'],
    ['13', 'צמרות'],
    ['14', 'דעי יואב'],
    ['15', 'זויתן'],
    ['16', 'ניצנים'],
    ['17', 'הבשור'],
    ['18', 'ערוגות'],
    ['19', 'אלכסנדר'],
    ['20', 'שד ריסר מיכה'],
    ['21', 'נירים'],
    ['22', 'ליטאני'],
    ['23', 'רגבים'],
    ['24', 'סלניקין'],
    ['25', 'מיכה רייסר'],
    ['26', 'יואב דעי'],
    ['27', 'אברמוביץ'],
    ['28', 'סלוניקי שמואל'],
    ['29', 'תילתן'],
    ['30', 'שושן'],
    ['31', 'אגוז'],
    ['32', 'אחיסמך'],
    ['33', 'אגס'],
    ['34', 'תלתן'],
    ['35', 'פורצי מסך הברזל']
  ]);

  repTypeMap = new Map([
    ['1', 'הטרדה'],
    ['2', 'גניבה'],
    ['3', 'פלישה'],
    ['4', 'ונדליזם'],
  ]);


  getStreetKey(val: string) {
    return [...this.streetMap].find(([key, value]) => val === value)?.[0]
  }

  getTypeKey(val: string) {
    return [...this.repTypeMap].find(([key, value]) => val === value)?.[0]
  }


}