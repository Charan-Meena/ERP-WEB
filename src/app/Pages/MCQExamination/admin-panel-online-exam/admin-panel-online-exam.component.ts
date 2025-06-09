import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../Base/base.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel-online-exam',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './admin-panel-online-exam.component.html',
  styleUrl: './admin-panel-online-exam.component.css'
})
export class AdminPanelOnlineExamComponent extends BaseService  implements OnInit{

    mcqAdminForm: FormGroup = new FormGroup({});
  ismcqAdminFormSubmitted: boolean = false;
  QuestionList:Array<any>=[];
    currentIndex:number= -1;
  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }//EOF constructor
  ngOnInit() {
 this.mcqAdminForm = this.fb.group({
      ProjectID: ['', Validators.required],
      FacultySectorID: ['', Validators.required],
      ProgrammeID: ['', Validators.required],
      ExamTimeTableDate: ['', Validators.required],
      SemesterID:['', Validators.required],
      CourseSchemeID:['',Validators.required],
      SubjectID:['',Validators.required],
      question:[''],
      OptionA:[''],
      OptionB:[''],
      OptionC:[''],
      OptionD:[''],
      Answere:[''],
    });
}
onSubmit(){
    let param={
      ProjectID: this.mcqAdminForm.controls['ProjectID'].value,
      FacultySectorID: this.mcqAdminForm.controls['FacultySectorID'].value,
      ProgrammeID: this.mcqAdminForm.controls['ProgrammeID'].value,
      ExamTimeTableDate: this.mcqAdminForm.controls['ExamTimeTableDate'].value,
      SemesterID:this.mcqAdminForm.controls['SemesterID'].value,
      CourseSchemeID:this.mcqAdminForm.controls['CourseSchemeID'].value,
      SubjectID:this.mcqAdminForm.controls['SubjectID'].value,
      QuestionList:JSON.stringify(this.QuestionList)
    }
    console.log('param',param);
    
  }
  get mcqAdminFormControl() {
    return this.mcqAdminForm.controls;
  }
    AddQuestion(){
       let questionList ={
        question:this.mcqAdminForm.controls['question'].value,
        OptionA:this.mcqAdminForm.controls['OptionA'].value,
        OptionB:this.mcqAdminForm.controls['OptionB'].value,
        OptionC:this.mcqAdminForm.controls['OptionC'].value,
        OptionD:this.mcqAdminForm.controls['OptionD'].value,
        Answere:this.mcqAdminForm.controls['Answere'].value,
       }
       if(questionList.question!='' && questionList.OptionA!='' && questionList.OptionB!='' && questionList.OptionC!='' && questionList.OptionD!='' && questionList.Answere!=''){
        this.QuestionList.push(questionList)
        this.mcqAdminForm.patchValue({question:'', OptionA:[''],
          OptionB:[''],
          OptionC:[''],
          OptionD:[''],
          Answere:[''], })
       }
       else{
        window.alert("Please fill All Questions Feilds..")
       }
    }
    edit(i:any){
      this.currentIndex=i;
      this.mcqAdminForm.patchValue({question:[this.QuestionList[i].question], 
        OptionA:[this.QuestionList[i].OptionA],
        OptionB:[this.QuestionList[i].OptionB],
        OptionC:[this.QuestionList[i].OptionC],
        OptionD:[this.QuestionList[i].OptionD],
        Answere:[this.QuestionList[i].Answere], })
    }
    updateQuestion(){
      if(this.mcqAdminForm.controls['question'].value !='' && this.mcqAdminForm.controls['OptionA'].value !='' && this.mcqAdminForm.controls['OptionB'].value !='' && 
          this.mcqAdminForm.controls['OptionC'].value !='' && this.mcqAdminForm.controls['OptionD'].value !='' && this.mcqAdminForm.controls['Answere'].value !='')
      {
        this.QuestionList[this.currentIndex].question=this.mcqAdminForm.controls['question'].value;
        this.QuestionList[this.currentIndex].OptionA=this.mcqAdminForm.controls['OptionA'].value;
        this.QuestionList[this.currentIndex].OptionB=this.mcqAdminForm.controls['OptionB'].value;
        this.QuestionList[this.currentIndex].OptionC=this.mcqAdminForm.controls['OptionC'].value;
        this.QuestionList[this.currentIndex].OptionD=this.mcqAdminForm.controls['OptionD'].value;
        this.QuestionList[this.currentIndex].Answere=this.mcqAdminForm.controls['Answere'].value;
        this.currentIndex= -1;
        this.mcqAdminForm.patchValue({question:'', OptionA:[''],
          OptionB:[''],
          OptionC:[''],
          OptionD:[''],
          Answere:[''], })
        }
      else{window.alert("Please fill All Questions Feilds..")}
    }
    remove(item:any){
      this.QuestionList.splice(item,1);
  }//remove

}



