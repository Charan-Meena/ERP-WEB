import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../../Base/base.service';
import { COURSEPAPER_API_RESPONSE, CourseScheme, ICoursePaper, ProgrameMenanet, USERREGISTRATION_API_RESPONSE } from '../../Model/Class/Interface/master';
import { CourseSchemeSubjectComponent } from '../../modalPages/course-scheme-subject/course-scheme-subject.component';
import { VoidTableComponent } from '../../reusableComponent/void-table/void-table.component';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [VoidTableComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})

export class StudentListComponent extends BaseService implements OnInit{
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  coursePaperList:Array<ICoursePaper>=[];
  programeListDDL:Array<ProgrameMenanet>=[];
  columnArray:Array<string>=['loginID','userName','fullname','phoneNumber','gender','Action']
  searchText:string="";
  courseSchemeObj:CourseScheme=<CourseScheme>{};
  TableParam:any={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  private modalStatus = inject(NgbModal);
  modalRef: any;

  constructor(private fb:FormBuilder){
       super();
  }

ngOnInit():void{
const currentState = this.router.lastSuccessfulNavigation;
this.courseSchemeObj = currentState?.extras?.state?.['CourseObj'];
  setTimeout(()=>{
   console.log('this.courseSchemeObj',this.courseSchemeObj)
   this.getCoursePaperList()
  },10)

}

onActionEvent(actionData:CourseScheme){
  if(actionData.Action=='Edit'){
 let courseSchemeMatsterobj ={...actionData}
  courseSchemeMatsterobj['isActive']= courseSchemeMatsterobj.isActive=="true"?0:1;
    console.log(actionData)
  }
  if(actionData.Action=='Add'){
  }
}
  onpagechange(pageData:any){
       this.TableParam=pageData;
       this.getCoursePaperList();
  }

  getCoursePaperList(){
      this.pageArray=[];
      this.ApiServices.requestPost('/api/ProgrameManagment/coursePaperList',this.TableParam).subscribe({
      next:(res:COURSEPAPER_API_RESPONSE| any)=>{
        this.coursePaperList=res.data || [];
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
    getUserList(){
      this.pageArray=[];
    this.ApiServices.requestPost('/api/User/UserList',this.TableParam).subscribe({
      next:(res:USERREGISTRATION_API_RESPONSE | any)=>{
        this.userList=res.data || [];
        this.pageCount=res.data[0].totalPage;
       for(let i=0;i<this.pageCount;i++){
          this.pageArray.push(i)
       }
        
      },
      error(e){
        console.log(e);
      }
    })
    }
 
     openModalPage(){
          if (this.modalRef) this.modalRef = null;
          this.modalRef = this.modalStatus.open(CourseSchemeSubjectComponent, { centered: true, size: 'xl' });
          this.modalRef.result.then((closeEvent: any) => {
           if(closeEvent=='REFRESH'){
            }
           }).catch((e: any) => {
                 console.log("Error:Modal Open ::", e);
            });
          this.modalRef.componentInstance.courseSchemeObj = this.courseSchemeObj;
      }  
}