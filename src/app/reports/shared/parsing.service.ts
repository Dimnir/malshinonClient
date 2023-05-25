import { Injectable } from '@angular/core';
import { Report } from '../report.model';

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  report: Report;

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
  ]);

  repTypeMap = new Map([
    ['1', 'הטרדה'],
    ['2', 'גניבה'],
    ['3', 'פלישה'],
    ['4', 'ונדליזם']
  ]);

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

  constructor() { }
}
