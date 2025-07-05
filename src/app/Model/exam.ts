import { ResponseData } from "./Class/Interface/master"



export interface ImcqExam{
	q_Id: number,
	Pg_Id:number,
	question:string,
	ansOption:string,
	givenAnswer:string,
	QuestionOption?:string,
	answerOption:Array<IansOption>
  }
  export interface IansOption{
	AnswerOption:string,
	AnserDescription:string
  }

  export interface IQuestionBank{
    paperID:number,
    questionId:number,
    question:string,
    optionA:string,
    optionB:string,
    optionC:string,
    optionD:string,
    answer:string,
	givenAnswer:string,
    isActive:any
}
export interface   QUESTIONBANK_API_RESPONSE extends ResponseData{
	data:Array<IQuestionBank>
}  


export interface IstudentExamSubmit{
    paperID:number,  
    questionId:number,
    answer:string,
    studentID:number,
    givenAnswer:string,
    examSession:string
}

export interface IExamSchedule{
    examScheduleID:number,
    programeName:string,
    batch_name:string,
    sem_Year_Name:string,
    programeId:number,
    batch_Id:number,
    semester_year:number,
    examSession:string,
    openDate:string,
    closeDate:Date
}
export interface   EXAMSCHEDULE_API_RESPONSE extends ResponseData{
	data:Array<IExamSchedule>
}