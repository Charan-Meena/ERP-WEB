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
 @Input() examscheduleData:IExamSchedule=<IExamSchedule>{};

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.studentForm =this.fb.group({
      studentID:[''],
      fullname:['',Validators.required],
  });
setTimeout(() => {
  this.fetchPaperListforExam();
}, 30);
}

fetchPaperListforExam(){
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

saveExamSchedule(){
  console.log(this.subjectList,'subjectList');
}

closeModal(type:any){
    this.activeModal.close(type);
  }



}