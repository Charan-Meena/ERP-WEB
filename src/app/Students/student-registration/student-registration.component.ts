import { CommonModule } from '@angular/common';
import { Component,inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICourseSubject } from '../../Model/Class/programe';
import { NumberOnlyDirective } from '../../directives/number-only.directive';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule, NumberOnlyDirective],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})

export class StudentRegistrationComponent extends BaseService implements OnInit{
  activeModal = inject(NgbActiveModal);
  studentForm:FormGroup = new FormGroup({});
  isstudentForm:boolean=false;
  subjectList:Array<ICourseSubject>=[];
  subjectListObj:any;
 // @Input() courseSchemeObj:CourseScheme=<CourseScheme>{};
  patternType:string='';

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.studentForm =this.fb.group({
      studentID:[''],
      fullname:['',Validators.required],
      email:['',Validators.required],
      phoneNumber:['',Validators.required],
      dob:['',Validators.required],
      gender:['',Validators.required],
      activeStatus:['',Validators.required],
      passwordhash:['',Validators.required],
      //entityType:number,
      //parentId:number,
      //userName:string,
      //userrole:any,
      //lastLogin:any
  });

}




Fromsubmit(){
  console.log(this.studentForm.value)
    this.ApiServices.requestPost('/api/student/studentRegistration',this.studentForm.value).subscribe({
    next:(res: COURSESCHEME_API_RESPONSE | any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
    },
    error(e:any){
      console.log('error',e);
    }
      });
}
get studentFormControls(){
    return this.studentForm.controls;
  }

closeModal(type:any){
    this.activeModal.close(type);
  }



}