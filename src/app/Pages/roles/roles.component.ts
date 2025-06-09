import { HttpClient } from '@angular/common/http';
import { Component,inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../Model/Class/Interface/master';
import { CommonModule } from '@angular/common';
import { MasterServicesService } from '../../Services/master-services.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  
 role:Array<IRole> =[]
  http=inject(HttpClient)
  //constructor(private http:HttpClient){  }
  masterServices =inject(MasterServicesService)

ngOnInit(): void {
this.getAllRoles();
}

getAllRoles(){
this.masterServices.getAllRoles().subscribe((result:any)=>{
  this.role=result.data;
  console.log(this.role)
})

// this.http.get("https://localhost:44319/Roll/GetAllRolls").subscribe((responce:any)=>{
//   this.role=responce.data
//   console.log(responce.data)
// })
}















  // firstName:string="Ram";
  // age:number=25;
  // Address:string="Bhopal";
  // Email:string="Ram123@gmail.com"
  // currentDate:Date= new Date();
  // inputType:string="checkbox";
  // selectedState:string='';
}
