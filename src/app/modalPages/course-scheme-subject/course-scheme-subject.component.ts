import { CommonModule } from '@angular/common';
import { Component,inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-course-scheme-subject',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule, ],
  templateUrl: './course-scheme-subject.component.html',
  styleUrl: './course-scheme-subject.component.css'
})

export class CourseSchemeSubjectComponent extends BaseService implements OnInit{
  activeModal = inject(NgbActiveModal);
  courseSubjectForm:FormGroup = new FormGroup({});
  iscourseSubjectForm:boolean=false;
  @Input() courseSchemeObj:CourseScheme=<CourseScheme>{};
  patternType:string='';

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.courseSubjectForm =this.fb.group({
      courseSchemeID:[this.courseSchemeObj.courseSchemeID],
      SubjectCourseID:['',Validators.required],
      SemYear:['',Validators.required],
      IsCompulsory:['',Validators.required],
      SubjSeq:['',Validators.required],
      SubjName:['',Validators.required],
      SubjectCode:['',Validators.required],
      TheoryMax:['',Validators.required],
      TheoryMin:['',Validators.required],
      PractMax:['',Validators.required],
      PractMin:['',Validators.required],
      SesMax:['',Validators.required],
      SesMin:['',Validators.required],
      MaxTotal:['',Validators.required],
      MinTotal:['',Validators.required],   
	    Passing_On_Rule:[''],
      ActiveStatus:['',Validators.required],
  });
  setTimeout(() => {
    this.getPatternType();
  }, 10);
}

Fromsubmit(){
  this.iscourseSubjectForm = true;
  console.log(this.courseSubjectForm.value);
  return;

  if(!this.courseSubjectForm.valid){return;}
    this.ApiServices.requestPost('/api/ProgrameManagment/courseMStRegistration',this.courseSubjectForm.value).subscribe({
    next:(res: COURSESCHEME_API_RESPONSE | any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
    },
    error(e:any){
      console.log('error',e);
    }
      });
}
get subjectFormControls(){
    return this.courseSubjectForm.controls;
  }

closeModal(type:any){
    this.activeModal.close(type);
  }

getPatternType(){
 this.patternType=this.courseSchemeObj.examPattern;
 console.log('Patter type....',this.patternType)
}

}