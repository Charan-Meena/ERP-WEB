import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../Base/base.service';
import { PROGRAME_API_RESPONSE, ProgrameMenanet } from '../../../Model/Class/Interface/master';
//import { DatatableDirective } from '../../../directives/datatable.directive';


@Component({
  selector: 'app-programe-master',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './programe-master.component.html',
  styleUrl: './programe-master.component.css'
})
export class ProgrameMasterComponent extends BaseService implements OnInit{
  ProgrameResitrationForm:FormGroup = new FormGroup({});
  isProgrameFormSubmitted:boolean=false;
  pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  programeList:Array<ProgrameMenanet>=[];
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
  this.ProgrameResitrationForm =this.fb.group({
      programeID:[''],
      programeName:['',Validators.required],
      programeDuration:['',Validators.required],
      programeLebel:['',Validators.required],
  });
  setTimeout(()=>{
    this.getUserList();
  },30)
}
Fromsubmit(){
  this.isProgrameFormSubmitted = true;
  if(!this.ProgrameResitrationForm.valid){return;}
    this.ApiServices.requestPost('/api/ProgrameManagment/programeMasterRegistration',this.ProgrameResitrationForm.value).subscribe({
    next:(res: PROGRAME_API_RESPONSE | any)=>{
     console.log(res)
     this.ApiServices.showToaster(res.statusCode,res.message);
     this.clearForm();
     this.isProgrameFormSubmitted = false;
     this.getUserList();
    },
    error(e:any){
      console.log('error',e);
    }
      });
    }
onEdit(onEdit:ProgrameMenanet){
  this.ProgrameResitrationForm.patchValue(onEdit)
console.log(onEdit);
}
getUserList(){
  this.pageArray=[];
this.ApiServices.requestPost('/api/ProgrameManagment/programeList',this.TableParam).subscribe({
  next:(res:PROGRAME_API_RESPONSE | any)=>{
    this.programeList=res.data || [];
    this.pageCount=res.totalPages;
   for(let i=0;i<this.pageCount;i++){
      this.pageArray.push(i)
   }
  },
  error(e){
    console.log(e);
  }
})
}
sendTheNewValue(e:any){
  this.RowsOfPage=2;
  this.PageNumber=1;
this.searchText = e.target.value;
console.log(e.target.value);
this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
this.getUserList();
}
onpagechange(pageNumber:number){
  this.PageNumber=pageNumber;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.getUserList();
}
previous(){
  this.PageNumber--;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:""
  };
  this.getUserList();
}
next(){
  this.PageNumber++;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.getUserList();
}
changefunction(env:any){
   this.RowsOfPage= env.target.value
    this.TableParam={
   PageNumber:1,
   RowsOfPage:this.RowsOfPage,
  searchText:this.searchText
  };
  this.getUserList();
}

 get progFormControls(){
    return this.ProgrameResitrationForm.controls;
  }
clearForm(){
  this.ProgrameResitrationForm.reset();
}

}

