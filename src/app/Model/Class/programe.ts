import { ResponseData } from "./Interface/master"

export interface ICourseSubject{
	SubjectCourseID:number,
	examPattern:string,
	SemYear:number,
	IsCompulsory:any,
	SubjSeq:any,
	SubjName:any,
    SubjectCode:any
	TheoryMax:any,
	TheoryMin:any,
	PractMax:any,
	PractMin:any,
    SesMax:any,
	SesMin:any,
	MaxTotal:any,
    MinTotal:any,   
	Passing_On_Rule:any,
    ActiveStatus:any
}

export interface   COURSESCHEME_API_RESPONSE extends ICourseSubject{
    data:ResponseData
} 