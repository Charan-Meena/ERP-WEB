import { inject, Injectable } from '@angular/core';
import { SessionManagementService } from '../Services/session-management.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiServicesService } from '../Services/api-services.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
    sessionService =inject(SessionManagementService);
    router = inject(Router);
    session=inject(SessionManagementService);
    http=inject(HttpClient);
    ApiServices =inject(ApiServicesService);
//router =inject(Router);
  constructor(

  ) { }

   pageOpen(pageName:string){
     this.router.navigateByUrl(pageName);
   }

}
