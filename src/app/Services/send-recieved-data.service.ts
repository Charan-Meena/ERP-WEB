import { Injectable } from '@angular/core';
import { IsendRecievedData } from '../Model/Class/Interface/master';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendRecievedDataService {

  private dataSubject = new BehaviorSubject<any>(null); // Initial value
  currentData = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  constructor() { }

}
