import { CommonModule } from '@angular/common';
import { Component,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';


@Component({
  selector: 'app-course-scheme-subject',
  standalone: true,
  imports: [],
  templateUrl: './course-scheme-subject.component.html',
  styleUrl: './course-scheme-subject.component.css'
})

export class CourseSchemeSubjectComponent extends BaseService implements OnInit{
  courseSubjectForm:FormGroup = new FormGroup({});
  iscourseSubjectForm:boolean=false;
  @Input() courseSchemeObj:CourseScheme=<CourseScheme>{};
  patternType:string='';

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.courseSubjectForm =this.fb.group({
      courseSchemeID:[''],
      courseSchemeName:['',Validators.required],
      programeID:['',Validators.required],
      isActive:['',Validators.required],
  });
  setTimeout(() => {
    this.getPatternType();
  }, 10);

}
Fromsubmit(){
  this.iscourseSubjectForm = true;
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


closeModal(text:string){

}

getPatternType(){
 this.patternType=this.courseSchemeObj.examPattern;
 console.log('Patter type....',this.patternType)
}

}