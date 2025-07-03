import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../Base/base.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { IansOption, ImcqExam, IQuestionBank, QUESTIONBANK_API_RESPONSE } from '../../../Model/exam';
import { CommonModule } from '@angular/common';

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
    timeLeft: number = 60 * 60; // 1 hour in seconds
    interval: any;
    isExamActive: boolean = true;
    questionListforExam:Array<IQuestionBank>=[]
    mcqQuestion:Array<ImcqExam>=[
      {
          "q_Id": 1,
          "Pg_Id": 1,
          "question": "testQuestion-1",
          "ansOption": "A",
          "givenAnswer":"",
        "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {   "q_Id": 2,
          "Pg_Id": 1,
          "question": "testQuestion-2",
          "ansOption": "B",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 3,
          "Pg_Id": 1,
          "question": "testQuestion-3",
          "ansOption": "C",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 4,
          "Pg_Id": 1,
          "question": "testQuestion-4",
          "ansOption": "A",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 5,
          "Pg_Id": 1,
          "question": "testQuestion-5",
          "ansOption": "B",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 6,
          "Pg_Id": 1,
          "question": "testQuestion-6",
          "ansOption": "C",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 7,
          "Pg_Id": 1,
          "question": "testQuestion-7",
          "ansOption": "A",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 8,
          "Pg_Id": 1,
          "question": "testQuestion-8",
          "ansOption": "B",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 9,
          "Pg_Id": 1,
          "question": "testQuestion-9",
          "ansOption": "C",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
        },
      {   "q_Id": 10,
          "Pg_Id": 1,
          "question": "testQuestion-10",
          "ansOption": "D",
          "givenAnswer":"", 
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {   "q_Id": 11,
          "Pg_Id": 1,
          "question": "testQuestion-11",
          "ansOption": "B",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {   "q_Id": 12,
          "Pg_Id": 1,
          "question": "testQuestion-12",
          "ansOption": "C",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {   "q_Id": 13,
          "Pg_Id": 1,
          "question": "testQuestion-13",
          "ansOption": "D",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {
          "q_Id": 14,
          "Pg_Id": 1,
          "question": "testQuestion-14",
          "ansOption": "B",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      },
      {
          "q_Id": 15,
          "Pg_Id": 1,
          "question": "testQuestion-15",
          "ansOption": "C",
          "givenAnswer":"",
          "answerOption":[{"AnswerOption":"A","AnserDescription":" You Choose..A"},
                        {"AnswerOption":"B","AnserDescription":" You Choose..B"},
                        {"AnswerOption":"C","AnserDescription":" You Choose..C"},
                        {"AnswerOption":"D","AnserDescription":" You Choose..D"},]
      }
    ]

    constructor(
    ) { 
     // Chart.register(...registerables);
      super();   
    }
    ngOnInit(){
      this.startTimer();
       setTimeout(() => {
          this.getQuestionforExamination()
       }, 10);
       setTimeout(() => {
        this.getQuestion(this.questionListforExam[0].questionId,0);
       }, 100);
      
  }
///////*********Timer Logic Start*******************//////////
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
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

  getQuestionforExamination(){
    this.ApiServices.requestGet('/api/Examination/getQuestionforExam').subscribe({
      next:(res:QUESTIONBANK_API_RESPONSE|any)=>{
          this.questionListforExam=res.data || [];
          console.log('questionListforExam',this.questionListforExam);
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
      //this.sbmitPaper= this.questionListforExam.filter(s=>s.givenAnswer!="")
      this.questionListforExam
      console.log(this.questionListforExam)
      const param ={
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

    
}