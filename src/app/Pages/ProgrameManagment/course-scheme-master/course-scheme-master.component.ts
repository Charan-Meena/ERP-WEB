import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../Base/base.service';
import { CourseScheme, COURSESCHEME_API_RESPONSE, PROGRAME_API_RESPONSE, ProgrameMenanet } from '../../../Model/Class/Interface/master';
import { VoidTableComponent } from "../../../reusableComponent/void-table/void-table.component";

@Component({
  selector: 'app-course-scheme-master',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, VoidTableComponent],
  templateUrl: './course-scheme-master.component.html',
  styleUrl: './course-scheme-master.component.css'
})

export class CourseSchemeMasterComponent extends BaseService implements OnInit{
  courseSchemeMatsterForm:FormGroup = new FormGroup({});
  iscourseSchemeMatsterForm:boolean=false;
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  courseSchemeList:Array<CourseScheme>=[];
  programeListDDL:Array<ProgrameMenanet>=[];
  searchText:string="";
  TableParam:any={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };

  constructor(private fb:FormBuilder){
    
       super();
  }

ngOnInit():void{
  this.courseSchemeMatsterForm =this.fb.group({
      courseSchemeID:[''],
      courseSchemeName:['',Validators.required],
      programeID:['',Validators.required],
      isActive:['',Validators.required],
  });
  setTimeout(()=>{
    this.getCourseSchemeList();
    this.getProgrameDDL();
  },10)

}
Fromsubmit(){
  this.iscourseSchemeMatsterForm = true;
  if(!this.courseSchemeMatsterForm.valid){return;}
    this.ApiServices.requestPost('/api/ProgrameManagment/courseMStRegistration',this.courseSchemeMatsterForm.value).subscribe({
    next:(res: PROGRAME_API_RESPONSE | any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
     this.clearForm();
     this.iscourseSchemeMatsterForm = false;
     this.getCourseSchemeList();
    },
    error(e:any){
      console.log('error',e);
    }
      });
    }
onEdit(formvalue:CourseScheme){
  let courseSchemeMatsterobj ={...formvalue}
  courseSchemeMatsterobj['isActive']= courseSchemeMatsterobj.isActive=="true"?0:1;
    this.courseSchemeMatsterForm.patchValue(courseSchemeMatsterobj)

console.log(formvalue);
}
//getProgrameDDL
getProgrameDDL(){
  this.ApiServices.requestGet("/api/ProgrameManagment/getProgrameDDL").subscribe({
    next:(res:PROGRAME_API_RESPONSE |any)=>{
       this.programeListDDL=res.data;
       console.log('programeListDDL',this.programeListDDL)
    },
    error(e){
      console.log('error',e)
    }
  });
}
      getCourseSchemeList(){
      this.pageArray=[];
      this.ApiServices.requestPost('/api/ProgrameManagment/courseSchemeList',this.TableParam).subscribe({
      next:(res:COURSESCHEME_API_RESPONSE| any)=>{
        this.courseSchemeList=res.data || [];
        this.pageCount=res.totalPages;
        for(let i=0;i<this.pageCount;i++){
            this.pageArray.push(i);
          }
        },
          error(e){
          console.log(e);
          }
      })
    }
onpagechange(pageData:any){
  this.TableParam=pageData;
  this.getCourseSchemeList();
}
previous(){
  this.PageNumber--;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:""
  };
  this.getCourseSchemeList();
}
next(){
  this.PageNumber++;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.getCourseSchemeList();
}


 get progFormControls(){
    return this.courseSchemeMatsterForm.controls;
  }
clearForm(){
  this.courseSchemeMatsterForm.reset();
}


}