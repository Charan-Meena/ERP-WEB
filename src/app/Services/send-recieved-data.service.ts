import { Injectable } from '@angular/core';
import { IsendRecievedData } from '../Model/Class/Interface/master';

@Injectable({
  providedIn: 'root'
})
export class SendRecievedDataService {

  srData:any={};
  
  
  // IsendRecievedData ={
  //   EmpName: '',
  //   Age: 0,
  //   Email: ''
  // }
  name=''

  constructor() { }

}
