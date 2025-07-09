import { ResponseData } from "./Interface/master"

export interface ICourseSubject{
	subjectCourseID:number,
	courseSchemeID:number,
	examPattern:string,
	SemYear:number,
	isCompulsory:any,
	subjSeq:any,
	subjName:any,
    subjectCode:any
	theoryMax:any,
	theoryMin:any,
	practMax:any,
	practMin:any,
    sesMax:any,
	sesMin:any,
	maxTotal:any,
    minTotal:any,   
	passing_On_Rule:any,
    activeStatus:any,
	examdate:Date
}

export interface   COURSESCHEME_API_RESPONSE extends ICourseSubject{
    data:ResponseData
} 

export interface ICourseSubjectObj{
examStudentSlots_MarksID:number,
examdate:Date,
subjName:string,
subjectCode:string,
subjectCourseID:number
}
