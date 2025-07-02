import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../Base/base.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ICoursePaper } from '../../../Model/Class/Interface/master';

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
    coursePaperObj:ICoursePaper=<ICoursePaper>{}
    
  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }//EOF constructor
ngOnInit() {
const currentState = this.router.lastSuccessfulNavigation;
this.coursePaperObj = currentState?.extras?.state?.['CoursePaperObj'];
 this.mcqAdminForm = this.fb.group({
      //paperID:['',Validators.required],
      question:[''],
      optionA:[''],
      optionB:[''],
      optionC:[''],
      optionD:[''],
      answer:[''],
    });
}
onSubmit(){
  this.ApiServices.requestPost('/api/ProgrameManagment/examQuestionRegistration',this.mcqAdminForm.value).subscribe({
     next:(res:any)=>{
         this.ApiServices.showToaster(res.statusCode,res.message)
     },
     error(e){
      console.log('Error',e)
     }
  })
    
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
        this.ApiServices.showToaster(3,'Please fill all Field')
       //this.apiServiceInstance.showSnack('Please fill all Field', 'danger', 4000);
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

