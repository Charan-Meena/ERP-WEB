import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../Base/base.service';
import { CourseScheme } from '../../Model/Class/Interface/master';
import { from } from 'rxjs';



@Component({
  selector: 'app-void-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './void-table.component.html',
  styleUrl: './void-table.component.css'
})

export class VoidTableComponent extends BaseService implements OnInit{
  //pageArray:any=[];
  PageNumber:number=1;
  RowsOfPage:number=5;
  pageCount:number=0;
  searchText:string="";
  TableParam:any={PageNumber:this.PageNumber,RowsOfPage:this.RowsOfPage,searchText:this.searchText}
  @Input() TableData:Array<any>=[];
  @Input() ColumnData:Array<string>=[];
  @Input() pageArray:any=[];
  @Output() pageChange=new EventEmitter<any>();
  @Output() onActionPageData=new EventEmitter<any>();

  constructor(){
       super();
  }

ngOnInit():void{
console.log('TableData',this.TableData);
}

onActionEvent(formData:any,Action:string){
  let formObj={...formData}
  formObj['Action']=Action
this.onActionPageData.emit(formObj);
}
pageSearchByText(e:any){
   this.searchText = e.target.value;
   console.log(e.target.value);
   this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.pageChange.emit(this.TableParam);
}
changefunction(env:any){
   this.RowsOfPage= env.target.value
    this.TableParam={
         PageNumber:1,
         RowsOfPage:this.RowsOfPage,
         searchText:this.searchText
  };
  this.pageChange.emit(this.TableParam);
}
onpagechange(pageNumber:number){
  this.PageNumber=pageNumber;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.pageChange.emit(this.TableParam);
}
previous(){
  this.PageNumber--;
  this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:""
  };
  this.pageChange.emit(this.TableParam);
}
next(){
  this.PageNumber++;
 this.TableParam={
   PageNumber:this.PageNumber,
   RowsOfPage:this.RowsOfPage,
   searchText:this.searchText
  };
  this.pageChange.emit(this.TableParam);
}
} 