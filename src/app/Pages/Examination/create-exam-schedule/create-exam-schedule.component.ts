import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../Base/base.service';
import { PROGRAME_API_RESPONSE, ProgrameMenanet } from '../../../Model/Class/Interface/master';
import { VoidTableComponent } from '../../../reusableComponent/void-table/void-table.component';

@Component({
  selector: 'app-create-exam-schedule',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,VoidTableComponent],
  templateUrl: './create-exam-schedule.component.html',
  styleUrl: './create-exam-schedule.component.css'
})

export class CreateExamScheduleComponent extends BaseService implements OnInit{
  ProgrameResitrationForm:FormGroup = new FormGroup({});
  isProgrameFormSubmitted:boolean=false;
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  programeList:Array<ProgrameMenanet>=[];
  programeDDL:Array<ProgrameMenanet>=[];
  batchDDL:Array<any>=[];
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
      //examScheduleID:[''],
      programeId:['',Validators.required],
      batch_Id:['',Validators.required],
      semester_year:['',Validators.required],
      openDate:['',Validators.required],
      closeDate:['',Validators.required],
      examSession:['',Validators.required],
  });
  setTimeout(()=>{
    this.fetchProgrameDDL();
    this.examScheduleList();
  },30)
}
Fromsubmit(){
  this.isProgrameFormSubmitted = true;
  if(!this.ProgrameResitrationForm.valid){return;}
    this.ApiServices.requestPost('/api/Examination/examScheduleCreate',this.ProgrameResitrationForm.value).subscribe({
    next:(res: any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
     this.clearForm();
     this.isProgrameFormSubmitted = false;
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
fetchProgrameDDL(){
  this.pageArray=[];
this.ApiServices.requestPost('/api/ProgrameManagment/programeDDL').subscribe({
  next:(res:PROGRAME_API_RESPONSE | any)=>{
    this.programeDDL=res.data || [];
  },
  error(e){
    console.log(e);
  }
})
}//EOF fetchProgrameDDL

fetchBatchDDL(id:number){
  debugger;
  this.ApiServices.requestGet('/api/ProgrameManagment/BatchDDL?id=1').subscribe({
    next:(res:any)=>{
      this.batchDDL=res.data || [];
    },
    error(e){
      console.log('Error',e)
    }
  })
}
examScheduleList(){
  this.pageArray=[];
this.ApiServices.requestGet('/api/Examination/examScheduleList').subscribe({
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
   this.examScheduleList();
}

 get progFormControls(){
    return this.ProgrameResitrationForm.controls;
  }
clearForm(){
  this.ProgrameResitrationForm.reset();
}

}