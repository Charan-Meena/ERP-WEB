


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