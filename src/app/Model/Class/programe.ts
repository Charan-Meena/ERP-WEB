import { ResponseData } from "./Interface/master"

export interface ICourseSubject{
	SubjectCourseID:number,
	SemesterID:number,
	IsCompulsory:any,
	SubjSeq:any,
	SubjName:any,
    SubjectCode:any
	TheoryMax:any,
	TheoryMin:any,
	PRMax:any,
	PRMin:any,
	LWMax:any,
	LWMin:any,
	LQMax:any,
	LQMin:any,
	PractMax:any,
	PractMin:any,
	Max:any,
	Min:any,
	SesMax:any,
	SesMin:any,
	Passing_On_Rule:any,
    ActiveStatus:any
}

export interface   COURSESCHEME_API_RESPONSE extends ICourseSubject{
    data:ResponseData
} 