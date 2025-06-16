import { CommonModule } from '@angular/common';
import { Component,inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICourseSubject } from '../../Model/Class/programe';


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
  subjectList:Array<ICourseSubject>=[];
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

AddSubject(){
  debugger;
  // this.iscourseSubjectForm = true;
  // if(!this.courseSubjectForm.valid){return;}
  const subjectList:any= {
        IsCompulsory:this.courseSubjectForm.controls['IsCompulsory'].value,
        SubjSeq:this.courseSubjectForm.controls['SubjSeq'].value,
        SubjName:this.courseSubjectForm.controls['SubjName'].value,
        SubjectCode:this.courseSubjectForm.controls['SubjectCode'].value,
        TheoryMax:this.courseSubjectForm.controls['TheoryMax'].value,
        TheoryMin:this.courseSubjectForm.controls['TheoryMin'].value,
        PractMax:this.courseSubjectForm.controls['PractMax'].value,
        SesMax:this.courseSubjectForm.controls['SesMax'].value,
        SesMin:this.courseSubjectForm.controls['SesMin'].value,
        MaxTotal:this.courseSubjectForm.controls['MaxTotal'].value,
        MinTotal:this.courseSubjectForm.controls['MaxTotal'].value,
        ActiveStatus:this.courseSubjectForm.controls['MaxTotal'].value
     }
     this.subjectList.push(subjectList)
     console.log(this.subjectList)
}



Fromsubmit(){
     let JsonString= [
{"IsCompulsory":"1","SubjSeq":"4","SubjName":"ddd","SubjectCode":"dd-1","TheoryMax":"11","TheoryMin":"11","PractMax":"11","PractMin":"11","SesMax":"11","SesMin":"11","MaxTotal":"11","MinTotal":"11","ActiveStatus":"1"},
{"IsCompulsory":"1","SubjSeq":"5","SubjName":"eee","SubjectCode":"ee-101","TheoryMax":"22","TheoryMin":"22","PractMax":"22","PractMin":"22","SesMax":"22","SesMin":"22","MaxTotal":"22","MinTotal":"22","ActiveStatus":"1"},
{"IsCompulsory":"1","SubjSeq":"6","SubjName":"fff","SubjectCode":"ff-101","TheoryMax":"33","TheoryMin":"33","PractMax":"33","PractMin":"33","SesMax":"33","SesMin":"33","MaxTotal":"33","MinTotal":"33","ActiveStatus":"1"},
]
     const subjectParam={
      courseSchemeID:this.courseSubjectForm.controls['courseSchemeID'].value,
      SubjectDetails:JSON.stringify(JsonString)
      //SubjectDetails:JsonString
     }
    this.ApiServices.requestPost('/api/ProgrameManagment/examPaperAdd',subjectParam).subscribe({
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