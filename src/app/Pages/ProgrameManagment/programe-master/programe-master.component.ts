import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../Base/base.service';
import { PROGRAME_API_RESPONSE, ProgrameMenanet } from '../../../Model/Class/Interface/master';
import { VoidTableComponent } from '../../../reusableComponent/void-table/void-table.component';


@Component({
  selector: 'app-programe-master',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,VoidTableComponent],
  templateUrl: './programe-master.component.html',
  styleUrl: './programe-master.component.css'
})
export class ProgrameMasterComponent extends BaseService implements OnInit{
  ProgrameResitrationForm:FormGroup = new FormGroup({});
  isProgrameFormSubmitted:boolean=false;
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  programeList:Array<ProgrameMenanet>=[];
  searchText:string="";
  columnArray:Array<string>=['programeName','programeDuration','programeLebel','Action']
  TableParam:any={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.ProgrameResitrationForm =this.fb.group({
      programeID:[''],
      programeName:['',Validators.required],
      programeDuration:['',Validators.required],
      programeLebel:['',Validators.required],
  });
  setTimeout(()=>{
    this.getUserList();
  },30)
}
Fromsubmit(){
  this.isProgrameFormSubmitted = true;
  if(!this.ProgrameResitrationForm.valid){return;}
    this.ApiServices.requestPost('/api/ProgrameManagment/programeMasterRegistration',this.ProgrameResitrationForm.value).subscribe({
    next:(res: PROGRAME_API_RESPONSE | any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
     this.clearForm();
     this.isProgrameFormSubmitted = false;
     this.getUserList();
    },
    error(e:any){
      console.log('error',e);
    }
      });
    }
onActionEvent(actionData:ProgrameMenanet){
  if(actionData.Action=='Edit'){
   this.ProgrameResitrationForm.patchValue(actionData);
    console.log(actionData.Action)
  }
  else{
    this.clearForm();
    console.log(actionData.Action)
  }
}
getUserList(){
  this.pageArray=[];
this.ApiServices.requestPost('/api/ProgrameManagment/programeList',this.TableParam).subscribe({
  next:(res:PROGRAME_API_RESPONSE | any)=>{
    this.programeList=res.data || [];
    this.pageCount=res.totalPages;
   for(let i=0;i<this.pageCount;i++){
      this.pageArray.push(i)
   }
  },
  error(e){
    console.log(e);
  }
})
}

onpagechange(pageNumber:number){
  this.TableParam=pageNumber;
   this.getUserList();
}

 get progFormControls(){
    return this.ProgrameResitrationForm.controls;
  }
clearForm(){
  this.ProgrameResitrationForm.reset();
}

}

