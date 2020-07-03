import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private subject = new Subject<number>();

  setCurrentAccountBalance(amount: number) {
    this.subject.next(amount);
  }

  getCurrentAccountBalance(): Observable<any> {
    return this.subject.asObservable();
  }
}
