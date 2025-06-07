import { Component } from '@angular/core';
import { SendRecievedDataService } from '../../../Services/send-recieved-data.service';
import { IsendRecievedData } from '../../../Model/Class/Interface/master';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent {
    sendDataObj:IsendRecievedData=
    {EmpName:"Ram",
      Age:24,
      Email:"ram@rem.com"}
  constructor(private SVC: SendRecievedDataService ){

  }

  ngOnInit() { 
    this.sender();
  }
  sender(){
debugger;
    this.SVC.srData=this.sendDataObj;
    //this.SVC.name="RamNarayan"
    console.log("sending this string:    "+this.SVC.srData)
  }
}
