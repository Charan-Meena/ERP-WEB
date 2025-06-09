import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { USERINFO_API_RESPONSE } from '../../Model/Class/Interface/master';
import { BaseService } from '../../Base/base.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent extends BaseService implements OnInit{
   LoginForm:FormGroup=new FormGroup({});
 isLoginFormSubmited:boolean=false;
 constructor(private fb:FormBuilder){
      super();
 }
 ngOnInit(){
  this.LoginForm = this.fb.group({
    loginID:['',Validators.required],
    password:['',Validators.required]
  })
 }
get getloginForm(){
return this.LoginForm.controls;
}
FormSubmit(){
  this.ApiServices.requestPost("/api/User/userLogin",this.LoginForm.value,true).subscribe({
    next: (res: USERINFO_API_RESPONSE | any) => {
      console.log(res)
      console.log(res.jwt);
      if (res.statusCode == 1) {
        this.session.setSession(res.data[0]);
        localStorage.setItem('JWT_Token', res.jwt)
        this.pageOpen('dashboard')
      }
      else {
        this.ApiServices.showToaster(4, "No User Found..")
      }
    },
    error: (e: any) => {
      this.ApiServices.showToaster(4, e.name)
      console.log('Error', e)
    }
  });
}

}
