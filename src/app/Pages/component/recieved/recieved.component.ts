import { Component } from '@angular/core';
import { SendRecievedDataService } from '../../../Services/send-recieved-data.service';

@Component({
  selector: 'app-recieved',
  standalone: true,
  imports: [],
  templateUrl: './recieved.component.html',
  styleUrl: './recieved.component.css'
})
export class RecievedComponent {

  constructor(private recievedData: SendRecievedDataService ){

  }
  ngOnInit() { 
    this.print();
  }
print(){
  console.log("recieved:    " +this.recievedData.srData)
}
}
