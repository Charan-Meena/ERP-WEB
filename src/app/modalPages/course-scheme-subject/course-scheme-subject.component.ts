import { CommonModule } from '@angular/common';
import { Component,inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE} from '../../Model/Class/Interface/master';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICourseSubject } from '../../Model/Class/programe';
import { NumberOnlyDirective } from '../../directives/number-only.directive';


@Component({
  selector: 'app-course-scheme-subject',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule, NumberOnlyDirective],
  templateUrl: './course-scheme-subject.component.html',
  styleUrl: './course-scheme-subject.component.css'
})

export class CourseSchemeSubjectComponent extends BaseService implements OnInit{
  activeModal = inject(NgbActiveModal);
  courseSubjectForm:FormGroup = new FormGroup({});
  iscourseSubjectForm:boolean=false;
  subjectList:Array<ICourseSubject>=[];
  subjectListObj:any;
  @Input() courseSchemeObj:CourseScheme=<CourseScheme>{};
  patternType:string='';

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
  this.courseSubjectForm =this.fb.group({
      courseSchemeID:[this.courseSchemeObj.courseSchemeID],
      subjectCourseID:['',Validators.required],
      semYear:['',Validators.required],
      isCompulsory:['',Validators.required],
      subjSeq:['',Validators.required],
      subjName:['',Validators.required],
      subjectCode:['',Validators.required],
      theoryMax:['',Validators.required],
      theoryMin:['',Validators.required],
      practMax:['',Validators.required],
      practMin:['',Validators.required],
      sesMax:['',Validators.required],
      sesMin:['',Validators.required],
      maxTotal:['',Validators.required],
      MinTotal:['',Validators.required],   
	    Passing_On_Rule:[''],
      activeStatus:['',Validators.required],
  });
  setTimeout(() => {
    this.getPatternType();
  }, 10);
}

AddSubject(){
  // this.iscourseSubjectForm = true;
  // if(!this.courseSubjectForm.valid){return;}
 if (!this.validateMinMax('TH_MAX') || !this.validateMinMax('TH_MIN') ||
        !this.validateMinMax('PR_MAX') || !this.validateMinMax('PR_MIN') ||
        !this.validateMinMax('SESS_Max') || !this.validateMinMax('SESS_MIN')) {
        return;
    }
  this.subjectListObj= {
        isCompulsory:this.courseSubjectForm.controls['isCompulsory'].value,
        subjSeq:this.courseSubjectForm.controls['subjSeq'].value,
        subjName:this.courseSubjectForm.controls['subjName'].value,
        subjectCode:this.courseSubjectForm.controls['subjectCode'].value,
        theoryMax:this.courseSubjectForm.controls['theoryMax'].value,
        theoryMin:this.courseSubjectForm.controls['theoryMin'].value,
        practMax:this.courseSubjectForm.controls['practMax'].value,
        practMin:this.courseSubjectForm.controls['practMin'].value,
        sesMax:this.courseSubjectForm.controls['sesMax'].value,
        sesMin:this.courseSubjectForm.controls['sesMin'].value,
        //maxTotal:this.courseSubjectForm.controls['maxTotal'].value,
        maxTotal:Number(this.courseSubjectForm.controls['theoryMax'].value)+Number(this.courseSubjectForm.controls['practMax'].value)+Number(this.courseSubjectForm.controls['sesMax'].value),
        //MinTotal:this.courseSubjectForm.controls['maxTotal'].value,
        activeStatus:this.courseSubjectForm.controls['activeStatus'].value
     }
      if (this.subjectListObj.subjName !== '' &&
      this.subjectListObj.subjectCode !== '' &&
      this.subjectListObj.isCompulsory !== '' &&
      this.subjectListObj.subjSequence !== '' &&
      this.subjectListObj.theoryMax !== '' && this.subjectListObj.theoryMin !== '' &&
      this.subjectListObj.practMax !== '' && this.subjectListObj.practMin !== '' &&
      this.subjectListObj.sesMax !== '' && this.subjectListObj.sesMin !== '' &&
      this.subjectListObj.maxTotal !== '' &&
      this.subjectListObj.activeStatus !== '') {
      this.subjectList.push(this.subjectListObj)
      //this.subjectCourseForm.patchValue({subjectCode:'',isCompulsory:'',SubjectCourseName:'',subjSequence:'',TH_MAX:'',TH_MIN:'',PR_MAX:'',PR_MIN:'',SESS_Max:'',SESS_MIN:'',TOTAL_Max:'',TotalCredit:'',activeStatus:''});
      }
      else{
        alert("Please Fill All Grid Feild")
      }
}



Fromsubmit(){
     const subjectParam={
      courseSchemeID:this.courseSubjectForm.controls['courseSchemeID'].value,
      examPattern:this.courseSchemeObj.examPattern,
      semYear:this.courseSubjectForm.controls['semYear'].value,
      SubjectDetails:JSON.stringify(this.subjectList)
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

  validateMinMax(field: string) {
    const formControls = this.courseSubjectForm.controls;
    if (field === 'theoryMax' || field === 'theoryMin') {
        const theoryMax = formControls['theoryMax'].value;
        const theoryMin = formControls['theoryMin'].value;
        if ((theoryMax !== '' && (theoryMin === '' || Number(theoryMin) > Number(theoryMax))) || (theoryMax === '' && (theoryMin !== '' || Number(theoryMin) > Number(theoryMax)))) {
            alert('theoryMin should not be empty and should not be greater than theoryMax');
            this.courseSubjectForm.patchValue({theoryMin:theoryMax/2})
            return false;
        }
    }
    if (field === 'practMax' || field === 'practMin') {
        const practMax = formControls['practMax'].value;
        const practMin = formControls['practMin'].value;
        if ((practMax !== '' && (practMin === '' || Number(practMin) > Number(practMax))) || (practMax === '' && (practMin !== '' || Number(practMin) > Number(practMax))) ) {
            alert('practMin should not be empty and should not be greater than practMax');
            this.courseSubjectForm.patchValue({theoryMin:practMax/2})
            return false;
        }
    }
    if (field === 'sesMax' || field === 'sesMin') {
        const sesMax = formControls['sesMax'].value;
        const sesMin = formControls['sesMin'].value;
        if ((sesMax !== '' && (sesMin === '' || Number(sesMin) > Number(sesMax))) || (sesMax === '' && (sesMin !== '' || Number(sesMin) > Number(sesMax))) ) {
            alert('sesMin should not be empty and should not be greater than sesMax');
            this.courseSubjectForm.patchValue({theoryMin:sesMax/2})
            return false;
        }
    }

    return true;
}//eof validateMinMax

}