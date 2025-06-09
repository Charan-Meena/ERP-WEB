import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseService } from '../../Base/base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css'
})
export class HeaderLayoutComponent extends BaseService {
  activeDropdown: string | null = null;
  UserInfo:any;
  ngOnInit(): void {
this.UserInfo=this.sessionService.getSession();
console.log(this.UserInfo,'this.UserInfo')
}

 LogOut(){
    localStorage.removeItem('JWT_Token');
    this.sessionService.endSession();
     this.router.navigateByUrl('login');
  }
 
toggleDropdown(label: string): void {
    if (this.activeDropdown === label) {
      this.activeDropdown = null; // Close if already open
    } else {
      this.activeDropdown = label; // Open new one, close others
    }
  }
}
