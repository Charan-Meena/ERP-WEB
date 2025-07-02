import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../Base/base.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { IansOption, ImcqExam } from '../../../Model/exam';
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
    filtermcqQuestion:Array<ImcqExam>=[];
    sbmitPaper:Array<ImcqExam>=[];
    chart: any;
    timeLeft: number = 60 * 60; // 1 hour in seconds
    interval: any;
    isExamActive: boolean = true;
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
        this.getQuestion(this.mcqQuestion[0].q_Id,0);
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

  ///////*********Timer Logic End*******************//////////

    nextQueCall(){
      if(this.currentIndex<(this.mcqLenghth-1))
      {
        this.currentIndex= this.currentIndex+1;
        let quid=this.mcqQuestion[this.currentIndex].q_Id;
        this.getQuestion(quid,this.currentIndex);
      }
    else
    {
      this.currentIndex= 0;
      let quid=this.mcqQuestion[this.currentIndex].q_Id;
      this.getQuestion(quid,this.currentIndex);
    }     
  }
  prevQueCall(){
    if(this.currentIndex>0)
    {
      this.currentIndex= this.currentIndex-1;
      let quid=this.mcqQuestion[this.currentIndex].q_Id;
      this.getQuestion(quid,this.currentIndex);
    }
  else
  {
    this.currentIndex= this.mcqLenghth-1;
    let quid=this.mcqQuestion[this.currentIndex].q_Id;
    this.getQuestion(quid,this.currentIndex);
  }     
}
    getQuestion(QID:any,index:any){
        this.currentIndex=index;
        this.filtermcqQuestion= this.mcqQuestion.filter(s=>s.q_Id==QID) 
        this.attemptQuestion= this.mcqQuestion.filter(q => q.givenAnswer.trim() !== '').length;
        this.mcqLenghth= this.mcqQuestion.length;
        let reameningQuestion=this.mcqLenghth-this.attemptQuestion
        setTimeout(() => {
       // this.renderChart(this.mcqLenghth,this.attemptQuestion,reameningQuestion);
        this.chart.update();
        }, 100);         
    }

    submit() {
      this.sbmitPaper= this.mcqQuestion.filter(s=>s.givenAnswer!="")
      console.log(this.sbmitPaper)
      //window.alert("Ok..")
    }

    // renderChart(total: any, attempt: any, remeaning: any): void {
    //   const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    //   const ctx = canvas.getContext('2d'); // Get 2D rendering context
    //   if (ctx) {
    //     if (this.chart) {
    //       // Update the data and re-render the chart if chart already exists
    //       this.chart.data.datasets[0].data = [total, attempt, remeaning];
    //       this.chart.update();  // Re-render the chart with new data
    //     } else {
    //       // Create the chart if it does not exist yet
    //       this.chart = new Chart(ctx, {
    //         type: 'pie', // Pie chart type
    //         data: {
    //           labels: ['Total', 'Attempt', 'Remaining'], // Labels for the chart
    //           datasets: [
    //             {
    //               label: 'Question',
    //               data: [total, attempt, remeaning], // Data points
    //               backgroundColor: [
    //                 'yellow',
    //                 '#8bdd0c',
    //                 'rgb(241, 27, 99)'
    //               ],
    //               hoverBackgroundColor: [
    //                 'rgb(100% 75.69% 2.75%)',
    //                 'rgb(9.8% 54.51% 2.35%)',
    //                 'rgb(5.1% 43.14% 99.22%)'
    //               ],
    //               borderWidth: 1
    //             }
    //           ]
    //         },
    //         options: {
    //           responsive: true,
    //           cutout: '50%',
    //           plugins: {
    //             legend: {
    //               position: 'center',
    //             },
    //             tooltip: {
    //               enabled: true
    //             }
    //           }
    //         }
    //       });
    //     }
    //   } else {
    //     console.error('Unable to get 2D context for canvas.');
    //   }
    // }
}