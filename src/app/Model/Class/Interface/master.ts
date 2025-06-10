export interface IRole{
    roleId:number
    role:string 
}

export interface IResponseData
{
    ResponseCode:string
    statusCode:number
    Message:string
    UserID:string
    ID:number
    Data:object
    Body:string
    JWT:string
    RegistrationId:string
}

export interface IsendRecievedData{
    EmpName:string,
    Age:number,
    Email:string,
}

export interface ResponseData{
      ResponseCode:string
      statusCode: number 
      Message:string
      UserID:string 
      ID:number
      Data:object
      Body:string
      jwt:string
      RegistrationId:string
}
export interface USERINFO_API_RESPONSE{
	dataobject:ResponseData
}

export interface UserRegistration{
     fullname: string,
     userName: string,
     email: string,
     phoneNumber:number,
     password: string,
     gender:string,
     loginID:string,
     totalPage:number
}
export interface USERREGISTRATION_API_RESPONSE{
	data:ResponseData
}

export interface ProgrameMenanet{
    programeID:number,
    programeName:string,
    programeDuration:string,
    programeLebel:string,
    Action:string,
}
export interface PROGRAME_API_RESPONSE{
	data:ResponseData
}
export interface CourseScheme{
courseSchemeID: number,
courseSchemeName:string,
programeID: number,
programeName:string,
isActive:any,
Action:string,
}
 export interface   COURSESCHEME_API_RESPONSE{
	data:ResponseData
}   