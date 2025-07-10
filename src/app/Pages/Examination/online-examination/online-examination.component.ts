import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../Base/base.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { IansOption, ImcqExam, IQuestionBank, QUESTIONBANK_API_RESPONSE } from '../../../Model/exam';
import { CommonModule } from '@angular/common';
import { ICourseSubject, ICourseSubjectObj } from '../../../Model/Class/programe';

@Component({
  selector: 'app-online-examination',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './online-examination.component.html',
  styleUrl: './online-examination.component.css'
})

export class OnlineExaminationComponent extends BaseService  implements OnInit{

    ExamTimeTableForm: FormGroup = new FormGroup({});
    questionRow:number=0;
    mcqLenghth:number=0;
    currentIndex:number=0;
    attemptQuestion:number=0;
    questionObj:ImcqExam=<ImcqExam>{};
    AnswerOption:Array<IansOption>=[];
    filtermcqQuestion:Array<IQuestionBank>=[];
    sbmitPaper:Array<IQuestionBank>=[];
    chart: any;
    defaulttimeLeft: number = 15*60 ; // 1 hour in seconds
    timeLeft: number = 0 // 1 hour in seconds
    interval: any;
    isExamActive: boolean = true;
    questionListforExam:Array<IQuestionBank>=[]
    objSubject:ICourseSubjectObj=<ICourseSubjectObj>{};
    UserInfo:any=this.sessionService.getSession();
    isLoad:boolean=false;

    constructor(
    ) { 
     // Chart.register(...registerables);
      super();   
    }
    ngOnInit(){
    const currentState = this.router.lastSuccessfulNavigation;
    this.objSubject = currentState?.extras?.state?.['objCourseSubject'];
    console.log('objSubject',this.objSubject);
  }
 ngAfterViewInit() {
    setTimeout(()=>{
      this.loadQuestionDetails();
    },100)
  }
///////*********Timer Logic Start*******************//////////
  startTimer() {
    if(!this.timeLeft){
       this.timeLeft=this.defaulttimeLeft;  
    }
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finalSubmitExam();
        this.isExamActive = false;
        clearInterval(this.interval);
      }
    }, 1000);
  }
    ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
   formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${this.pad(m)}:${this.pad(s)}`;
  }
  get hours(): string {
  return this.pad(Math.floor(this.timeLeft / 3600));
}

get minutes(): string {
  return this.pad(Math.floor((this.timeLeft % 3600) / 60));
}

get seconds(): string {
  return this.pad(this.timeLeft % 60);
}
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ///////*********Timer Logic End*******************//////////  api/Examination/getQuestionforExam

  getQuestionforExamination(callback?:Function){
    this.ApiServices.requestGet('/api/Examination/getQuestionforExam?examStudentSlots_MarksID='+this.objSubject.examStudentSlots_MarksID+'&studentID='+this.UserInfo.studentID+'&PaperID='+this.objSubject.subjectCourseID).subscribe({
      next:(res:QUESTIONBANK_API_RESPONSE|any)=>{
          this.questionListforExam=res.data || [];
          this.timeLeft=this.questionListforExam[0].timeleft;
          console.log('questionListforExam',this.questionListforExam);
          console.log('this.timeLeft',this.timeLeft);
          
          callback && callback(true);
      },
      error(e){
        console.log(e);
      }
    })

  }
    nextQueCall(){
      if(this.currentIndex<(this.questionListforExam.length-1))
      {
        this.currentIndex= this.currentIndex+1;
        let quid=this.questionListforExam[this.currentIndex].questionId;
        this.getQuestion(quid,this.currentIndex);
      }
    else
    {
      this.currentIndex= 0;
      let quid=this.questionListforExam[this.currentIndex].questionId;
      this.getQuestion(quid,this.currentIndex);
    }     
  }
  prevQueCall(){
    if(this.currentIndex>0)
    {
      this.currentIndex= this.currentIndex-1;
      let quid=this.questionListforExam[this.currentIndex].questionId;
      this.getQuestion(quid,this.currentIndex);
    }
  else
  {
    this.currentIndex= this.mcqLenghth-1;
    let quid=this.questionListforExam[this.currentIndex].questionId;
    this.getQuestion(quid,this.currentIndex);
  }     
}
    getQuestion(QID:any,index:any){
        this.currentIndex=index;
        this.filtermcqQuestion= this.questionListforExam.filter(s=>s.questionId==QID) 
        this.attemptQuestion= this.questionListforExam.filter(q => q.givenAnswer.trim() !== '').length;
        this.mcqLenghth= this.questionListforExam.length;
        let reameningQuestion=this.mcqLenghth-this.attemptQuestion 
    }

    submit() {
      this.questionListforExam
      console.log(this.questionListforExam)
      const param ={
        examStudentSlots_MarksID:this.objSubject.examStudentSlots_MarksID,
        studentID:this.UserInfo.studentID,
        PaperID:this.objSubject.subjectCourseID,
        timeleft:this.timeLeft,
        questionList:JSON.stringify(this.questionListforExam)
      }
      this.ApiServices.requestPost('/api/Examination/studentExamSubmit',param).subscribe({
         next:(res:any)=>{
          console.log(res);
         },
         error(e){
          console.log(e)
         }        
      })
    }
      submitsingle(ObjAnswer:any){
        console.log(ObjAnswer,"ObjAnswer....");
         const param ={
        examStudentSlots_MarksID:this.objSubject.examStudentSlots_MarksID,
        studentID:this.UserInfo.studentID,
        PaperID:this.objSubject.subjectCourseID,
        timeleft:this.timeLeft,
        questionList:JSON.stringify(ObjAnswer)
      }
      this.ApiServices.requestPost('/api/Examination/studentExamSubmitSingle',param).subscribe({
         next:(res:any)=>{
          console.log(res);
         },
         error(e){
          console.log(e)
         }        
      })
      }
      
      finalSubmitExam(){
        const param ={
        examStudentSlots_MarksID:this.objSubject.examStudentSlots_MarksID,
        studentID:this.UserInfo.studentID,
        PaperID:this.objSubject.subjectCourseID,
        timeleft:this.timeLeft,
      }
      this.ApiServices.requestPost('/api/Examination/studentExamSubmitFinal',param).subscribe({
         next:(res:any)=>{
          console.log(res);
         },
         error(e){
          console.log(e)
         }        
      })

      }
    loadQuestionDetails(){
      this.getQuestionforExamination(()=>{
      this.getQuestion(this.questionListforExam[0].questionId,0);
      this.startTimer();
      this.isLoad=true;
      })
    }
}