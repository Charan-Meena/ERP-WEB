import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, UserRegistration, USERREGISTRATION_API_RESPONSE } from '../../Model/Class/Interface/master';
import { CourseSchemeSubjectComponent } from '../../modalPages/course-scheme-subject/course-scheme-subject.component';
import { VoidTableComponent } from '../../reusableComponent/void-table/void-table.component';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { IExamSchedule, IExamStudentSlots_Marks } from '../../Model/exam';
import { CommonModule } from '@angular/common';
import { ModalExamSlotsbookComponent } from '../modal-exam-slotsbook/modal-exam-slotsbook.component';
import { ICourseSubject } from '../../Model/Class/programe';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-exam-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-main-page.component.html',
  styleUrl: './exam-main-page.component.css'
})

export class ExamMainPageComponent extends BaseService implements OnInit{
  examPaperList:Array<ICourseSubject>=[];
  private modalStatus = inject(NgbModal);
  modalRef: any;
  UserInfo:any=this.sessionService.getSession();
  constructor(){
       super();
  }

ngOnInit():void{
  setTimeout(()=>{
   this.fetchExamPaperList();
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

fetchExamPaperList(){
  if(this.UserInfo.studentID){
      this.ApiServices.requestGet('/api/Examination/GetPaperListforStudent?studentID='+this.UserInfo.studentID).subscribe({
      next:(res:any)=>{
        this.examPaperList=res.data || [];
      },
      error(e){
        console.log(e);
      }
    })
  }
  else{
    this.examPaperList= [];
  }
    }
 
  openModalPage(item:any){
   console.log(item)
   //this.pageOpen('');
  }  

  openPaperPage(actionData:ICourseSubject){
          const navigationExtras: NavigationExtras = {
              state: {
                objCourseSubject: actionData,
              }
            };
            this.router.navigate(['/Online-Exam'], navigationExtras);
  }
};