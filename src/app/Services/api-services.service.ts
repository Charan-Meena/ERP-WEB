import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Enviorment/enviorments';
import { ToastrService } from 'ngx-toastr';
//declare var Bs5Utils: any;
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
    http=inject(HttpClient);
    private APIURL = environment.baseUrl;
    bs5Utils:any;
    toastr= inject(ToastrService)
  constructor() 
  {   }
  
  requestGet(endUrl: string) {
    return this.http.get(this.APIURL + endUrl);
  }//EOF re1uestGet
   
  requestPost(endUrl: string, datarequest?: any,isJson?: boolean) {
    datarequest = datarequest || {};
    let postParams = datarequest || {};
    if(!isJson){
      postParams  = new FormData();
      for(let k in datarequest){
        postParams.append(k, datarequest[k]);
      }
    }
    return this.http.post(this.APIURL + endUrl, postParams);
  }//EOF requestPost
 
  showToaster(statusCode:number,message:string){
    if(statusCode==1){
      this.toastr.success(message, 'Success', {
      timeOut: 3000,
      });
    }
    else if(statusCode==2){
      this.toastr.info(message, 'info', {
      timeOut: 3000,
      });
    }
    else if(statusCode==3){
      this.toastr.warning(message, 'Warning', {
      timeOut: 3000,
      });
    }
    else{
      this.toastr.error(message, 'Error', {
      timeOut: 3000,
      });
    }
  }
 
}
