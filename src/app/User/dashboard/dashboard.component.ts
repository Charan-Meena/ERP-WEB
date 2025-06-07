import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagementService } from '../../Services/session-management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  sessionService=inject(SessionManagementService)
  router = inject(Router);
  UserInfo:any;

ngOnInit(): void {
this.UserInfo=this.sessionService.getSession();
console.log(this.UserInfo,'this.UserInfo')
}
 

}
