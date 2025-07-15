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
    isActive:any,
	timeleft:number,
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
    closeDate:Date,
	isExamFormFill:boolean
}
export interface   EXAMSCHEDULE_API_RESPONSE extends ResponseData{
	data:Array<IExamSchedule>
}

export interface IExamStudentSlots_Marks{
	fullname:string,
	examStudentSlots_MarksID:number,
	subjectCourseID:number,
	examdate:Date,
	semYear:number,
	theoryMax:number,
	theoryMin:number,
	obtainTheory:number,
	practMax:number,
	practMin:number,
	obtainPractical:number,
	sesMax:number,
	sesMin:number,
	obtainSess:number,
	maxTotal:number,
	minTotal:number,
	obtainMAx:number,
	isExamgiven:boolean
}