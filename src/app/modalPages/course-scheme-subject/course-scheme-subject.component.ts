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
  // this.iscourseSubjectForm = true;
  // if(!this.courseSubjectForm.valid){return;}
 if (!this.validateMinMax('TH_MAX') || !this.validateMinMax('TH_MIN') ||
        !this.validateMinMax('PR_MAX') || !this.validateMinMax('PR_MIN') ||
        !this.validateMinMax('SESS_Max') || !this.validateMinMax('SESS_MIN')) {
        return;
    }
  this.subjectListObj= {
        IsCompulsory:this.courseSubjectForm.controls['IsCompulsory'].value,
        SubjSeq:this.courseSubjectForm.controls['SubjSeq'].value,
        SubjName:this.courseSubjectForm.controls['SubjName'].value,
        SubjectCode:this.courseSubjectForm.controls['SubjectCode'].value,
        TheoryMax:this.courseSubjectForm.controls['TheoryMax'].value,
        TheoryMin:this.courseSubjectForm.controls['TheoryMin'].value,
        PractMax:this.courseSubjectForm.controls['PractMax'].value,
        PractMin:this.courseSubjectForm.controls['PractMin'].value,
        SesMax:this.courseSubjectForm.controls['SesMax'].value,
        SesMin:this.courseSubjectForm.controls['SesMin'].value,
        //MaxTotal:this.courseSubjectForm.controls['MaxTotal'].value,
        MaxTotal:Number(this.courseSubjectForm.controls['TheoryMax'].value)+Number(this.courseSubjectForm.controls['PractMax'].value)+Number(this.courseSubjectForm.controls['SesMax'].value),
        //MinTotal:this.courseSubjectForm.controls['MaxTotal'].value,
        ActiveStatus:this.courseSubjectForm.controls['ActiveStatus'].value
     }
      if (this.subjectListObj.SubjName !== '' &&
      this.subjectListObj.SubjectCode !== '' &&
      this.subjectListObj.IsCompulsory !== '' &&
      this.subjectListObj.SubjSequence !== '' &&
      this.subjectListObj.TheoryMax !== '' && this.subjectListObj.TheoryMin !== '' &&
      this.subjectListObj.PractMax !== '' && this.subjectListObj.PractMin !== '' &&
      this.subjectListObj.SesMax !== '' && this.subjectListObj.SesMin !== '' &&
      this.subjectListObj.MaxTotal !== '' &&
      this.subjectListObj.ActiveStatus !== '') {
      this.subjectList.push(this.subjectListObj)
      //this.subjectCourseForm.patchValue({SubjectCode:'',IsCompulsory:'',SubjectCourseName:'',SubjSequence:'',TH_MAX:'',TH_MIN:'',PR_MAX:'',PR_MIN:'',SESS_Max:'',SESS_MIN:'',TOTAL_Max:'',TotalCredit:'',ActiveStatus:''});
      }
      else{
        alert("Please Fill All Grid Feild")
      }
}



Fromsubmit(){
     const subjectParam={
      courseSchemeID:this.courseSubjectForm.controls['courseSchemeID'].value,
      examPattern:this.courseSchemeObj.examPattern,
      SemYear:this.courseSubjectForm.controls['SemYear'].value,
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
    if (field === 'TheoryMax' || field === 'TheoryMin') {
        const TheoryMax = formControls['TheoryMax'].value;
        const TheoryMin = formControls['TheoryMin'].value;
        if ((TheoryMax !== '' && (TheoryMin === '' || Number(TheoryMin) > Number(TheoryMax))) || (TheoryMax === '' && (TheoryMin !== '' || Number(TheoryMin) > Number(TheoryMax)))) {
            alert('TheoryMin should not be empty and should not be greater than TheoryMax');
            this.courseSubjectForm.patchValue({TheoryMin:TheoryMax/2})
            return false;
        }
    }
    if (field === 'PractMax' || field === 'PractMin') {
        const PractMax = formControls['PractMax'].value;
        const PractMin = formControls['PractMin'].value;
        if ((PractMax !== '' && (PractMin === '' || Number(PractMin) > Number(PractMax))) || (PractMax === '' && (PractMin !== '' || Number(PractMin) > Number(PractMax))) ) {
            alert('PractMin should not be empty and should not be greater than PractMax');
            this.courseSubjectForm.patchValue({TheoryMin:PractMax/2})
            return false;
        }
    }
    if (field === 'SesMax' || field === 'SesMin') {
        const SesMax = formControls['SesMax'].value;
        const SesMin = formControls['SesMin'].value;
        if ((SesMax !== '' && (SesMin === '' || Number(SesMin) > Number(SesMax))) || (SesMax === '' && (SesMin !== '' || Number(SesMin) > Number(SesMax))) ) {
            alert('SesMin should not be empty and should not be greater than SesMax');
            this.courseSubjectForm.patchValue({TheoryMin:SesMax/2})
            return false;
        }
    }

    return true;
}//eof validateMinMax

}