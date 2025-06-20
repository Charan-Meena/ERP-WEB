import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserRegistration, USERREGISTRATION_API_RESPONSE } from '../../Model/Class/Interface/master';
import { BaseService } from '../../Base/base.service';
import { Subject } from 'rxjs';
import { DatatableDirective } from '../../directives/datatable.directive';
import { VoidTableComponent } from '../../reusableComponent/void-table/void-table.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,VoidTableComponent],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent extends BaseService implements OnInit{
  userRegistraionFormGroup: FormGroup = new FormGroup({});
  isuserFormsubmitted:boolean=false;
  userList:Array<UserRegistration>=[];
  dtOptions: any = {};
  dttrigger:Subject<any>=new Subject<any>();
//////////////////////////
    pageArray:any=[];
    PageNumber:number=1;
    RowsOfPage:number=5;
    pageCount:number=0;
    columnArray:Array<string>=['courseSchemeName','examPattern','programeName','isActive','Action','Add']
    searchText:string="";
    TableParam:any={
      PageNumber:this.PageNumber,
      RowsOfPage:this.RowsOfPage,
      searchText:this.searchText
    };

  constructor(private fb: FormBuilder) {
    super();
  }
ngOnInit(): void {
    this.userRegistraionFormGroup = this.fb.group({
      Fullname: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required],
      gender: ['', Validators.required],
      loginID: ['', Validators.required],
    });
    setTimeout(() => {
      this.getUserList();
    }, 100);
}

pageChange(pageData:any){
  this.TableParam=pageData;
  this.getUserList();
}
onActionEvent(actionData:any){
  if(actionData.Action=='Edit'){
         let courseSchemeMatsterobj ={...actionData}
         courseSchemeMatsterobj['isActive']= courseSchemeMatsterobj.isActive=="true"?0:1;
         //this.courseSchemeMatsterForm.patchValue(courseSchemeMatsterobj)
         console.log(actionData)
    }
  if(actionData.Action=='Add'){
    //this.clearForm();
    //this.openPaperPage(actionData);
  }
}
getUserList(){
  this.pageArray=[];
this.ApiServices.requestPost('/api/User/UserList',this.TableParam).subscribe({
  next:(res:USERREGISTRATION_API_RESPONSE | any)=>{
    this.userList=res.data || [];
    this.pageCount=res.data[0].totalPage;
   for(let i=0;i<this.pageCount;i++){
      this.pageArray.push(i)
   }
    
  },
  error(e){
    console.log(e);
  }
})
}

Fromsubmit(){
  this.isuserFormsubmitted=true;
  if(!this.userRegistraionFormGroup.valid){
    return;
  }
  this.ApiServices.requestPost('/api/User/UserRegistration',this.userRegistraionFormGroup.value).subscribe({
//this.http.post('https://localhost:44319/api/User/UserRegistration',this.form.value).subscribe({
  next:(res: USERREGISTRATION_API_RESPONSE | any)=>{
   console.log(res)
   this.dttrigger.next(null);
   this.ApiServices.showToaster(res.statusCode,res.message);
   this.isuserFormsubmitted=false;
   this.clearForm();
   this.getUserList();
  },
  error(e:any){
    //this.ApiServices.showWarning(e.message)
    console.log('error',e);
  }
    });
}
 get ueseFormControl(){
    return this.userRegistraionFormGroup.controls;
  }
  clearForm(){
    this.userRegistraionFormGroup.reset();
  }

}


