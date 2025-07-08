import { CommonModule } from '@angular/common';
import { Component,inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICourseSubject } from '../../Model/Class/programe';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { IExamSchedule } from '../../Model/exam';

@Component({
  selector: 'app-modal-exam-slotsbook',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './modal-exam-slotsbook.component.html',
  styleUrl: './modal-exam-slotsbook.component.css'
})
export class ModalExamSlotsbookComponent extends BaseService implements OnInit{
  activeModal = inject(NgbActiveModal);
  studentForm:FormGroup = new FormGroup({});
  isstudentForm:boolean=false;
  subjectList:Array<ICourseSubject>=[];
  subjectListObj:any;
  isslotsok:boolean=false;
  //userInfo:any=this.session.endSession();
 @Input() examscheduleData:IExamSchedule=<IExamSchedule>{};
 @Input() studentID:number=0;;
 @Input() userID:number=0;
 @Input() actionString:string='';


  


  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.studentForm =this.fb.group({
      studentID:[''],
      fullname:['',Validators.required],
  });
setTimeout(() => {
  console.log('studentID',this.studentID,this.userID)
  this.fetchPaperListforExam();
}, 30);
}

fetchPaperListforExam(){
  if(this.actionString=="StudentExamSlotCreate"){
   this.ApiServices.requestGet('/api/student/getPaperforExam?batch_Id='+this.examscheduleData.batch_Id +'&semester_year='+this.examscheduleData.semester_year).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.subjectList=res.data || [];
  },
  error(e){
    console.log(e);
  }
 })
  }
  else{
   this.ApiServices.requestGet('/api/student/getPaperforExam?studentID='+this.studentID+'&semester_year='+this.examscheduleData.semester_year).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.subjectList=res.data || [];
  },
  error(e){
    console.log(e);
  }
 })
  }
 
}

saveExamSchedule(){
  this.datecheck();
  if(this.isslotsok){
   const param = {
    examScheduleID:this.examscheduleData.examScheduleID,
    studentID:this.studentID,
    userID:this.userID,
    spAction:this.actionString,
    subject:JSON.stringify(this.subjectList)
  }
  this.ApiServices.requestPost('/api/student/studentExamSlotCreate',param).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.ApiServices.showToaster(res.statusCode,res.message)
    },
    error(e){
      console.log(e,'Error');
    }
  })
  }
  else{
    this.ApiServices.showToaster(3,"All Date Must be Filled...")
  }
}

closeModal(type:any){
    this.activeModal.close(type);
  }
 
datecheck(){
    for(let i=0;i<this.subjectList.length;i++){
      if(!this.subjectList[i].examdate)
      {
         this.isslotsok=false;
         return;
      }
      else{
        this.isslotsok=true;
      }
    }
  }



}