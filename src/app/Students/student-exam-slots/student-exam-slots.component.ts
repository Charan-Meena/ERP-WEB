import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, UserRegistration, USERREGISTRATION_API_RESPONSE } from '../../Model/Class/Interface/master';
import { CourseSchemeSubjectComponent } from '../../modalPages/course-scheme-subject/course-scheme-subject.component';
import { VoidTableComponent } from '../../reusableComponent/void-table/void-table.component';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { IExamSchedule } from '../../Model/exam';
import { CommonModule } from '@angular/common';
import { ModalExamSlotsbookComponent } from '../modal-exam-slotsbook/modal-exam-slotsbook.component';

@Component({
  selector: 'app-student-exam-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-exam-slots.component.html',
  styleUrl: './student-exam-slots.component.css'
})

export class StudentExamSlotsComponent extends BaseService implements OnInit{
  courseSchemeObj:CourseScheme=<CourseScheme>{};
  private modalStatus = inject(NgbModal);
  modalRef: any;
  UserInfo:any=this.sessionService.getSession();
  examScheduleList:Array<IExamSchedule>=[];
  constructor(){
       super();
  }

ngOnInit():void{
  setTimeout(()=>{
   this.fetchExamScheduleList();
  },10)

}

onActionEvent(actionData:CourseScheme){
  if(actionData.Action=='Edit'){
 let courseSchemeMatsterobj ={...actionData}
  courseSchemeMatsterobj['isActive']= courseSchemeMatsterobj.isActive=="true"?0:1;
    console.log(actionData)
  }
  if(actionData.Action=='Add'){
  }
}

fetchExamScheduleList(){
  if(this.UserInfo.batch_ID){
      this.ApiServices.requestGet('/api/student/examScheduleforStudents?id='+this.UserInfo.batch_ID).subscribe({
      next:(res:any)=>{
        this.examScheduleList=res.data || [];
      },
      error(e){
        console.log(e);
      }
    })
  }
  else{
    this.examScheduleList= [];
  }
    
    }
 
  openModalPage(item:any){
    console.log(item,'item....data')
          if (this.modalRef) this.modalRef = null;
          this.modalRef = this.modalStatus.open(ModalExamSlotsbookComponent, { centered: true, size: 'xl' });
          this.modalRef.result.then((closeEvent: any) => {
           if(closeEvent=='REFRESH'){
            }
           }).catch((e: any) => {
                 console.log("Error:Modal Open ::", e);
            });
            this.modalRef.componentInstance.examscheduleData = item;
  }  
}