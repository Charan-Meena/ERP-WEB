import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../Base/base.service';
import { PROGRAME_API_RESPONSE, ProgrameMenanet } from '../../../Model/Class/Interface/master';
import { VoidTableComponent } from '../../../reusableComponent/void-table/void-table.component';
import { IExamSchedule, IExamStudentSlots_Marks } from '../../../Model/exam';
import { ICourseSubject } from '../../../Model/Class/programe';

@Component({
  selector: 'app-student-result',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './student-result.component.html',
  styleUrl: './student-result.component.css'
})

export class StudentResultComponent extends BaseService implements OnInit{
  ProgrameResitrationForm:FormGroup = new FormGroup({});
  isProgrameFormSubmitted:boolean=false;
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  examScheduleList:Array<IExamSchedule>=[];
  programeDDL:Array<ProgrameMenanet>=[];
  SubjectDDL:Array<ICourseSubject>=[];
  searchText:string="";
  columnArray:Array<string>=['programeName','batch_name','sem_Year_Name','examSession','openDate','closeDate']
  marksListBySubject:Array<IExamStudentSlots_Marks>=[];
  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.ProgrameResitrationForm =this.fb.group({
      programeId:['',Validators.required],
      //batch_Id:['',Validators.required],
      semester_year:['',Validators.required],
      examSession:['',Validators.required],
      subject:['',Validators.required],
  });
  setTimeout(()=>{
    this.fetchProgrameDDL();
    //this.fetchExamScheduleList();
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

fetchSubject(e:any){
  console.log('e',e.target.value)
  const semYear=e.target.value
  this.ApiServices.requestGet('/api/Examination/GetPaperListforResult?programeId='+this.ProgrameResitrationForm.controls['programeId'].value+'&semester_year='+this.ProgrameResitrationForm.controls['semester_year'].value).subscribe({
    next:(res:any)=>{
      this.SubjectDDL=res.data || [];
    },
    error(e){
      console.log('Error',e)
    }
  })
}

onsubject(e:any){
     const subjectId = e.target.value;
     this.ApiServices.requestGet('/api/Examination/GetMarkListByPaper?SubjectCourseID='+subjectId).subscribe({
    next:(res:any)=>{
      this.marksListBySubject=res.data || [];
    },
    error(e){
      console.log('Error',e)
    }
  })

}
// fetchBatchDDL(id:number){
//   debugger;
//   this.ApiServices.requestGet('/api/ProgrameManagment/BatchDDL?id='+this.ProgrameResitrationForm.controls['programeId'].value).subscribe({
//     next:(res:any)=>{
//       this.batchDDL=res.data || [];
//     },
//     error(e){
//       console.log('Error',e)
//     }
//   })
// }
// fetchExamScheduleList(){
// this.ApiServices.requestGet('/api/Examination/examScheduleList').subscribe({
//   next:(res:PROGRAME_API_RESPONSE | any)=>{
//     this.examScheduleList=res.data || [];
//   },
//   error(e){
//     console.log(e);
//   }
// })
// }

 get progFormControls(){
    return this.ProgrameResitrationForm.controls;
  }
clearForm(){
  this.ProgrameResitrationForm.reset();
}

}