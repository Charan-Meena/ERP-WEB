import { inject, Injectable } from '@angular/core';
import { SessionManagementService } from '../Services/session-management.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiServicesService } from '../Services/api-services.service';
import { SendRecievedDataService } from '../Services/send-recieved-data.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
    sessionService =inject(SessionManagementService);
    router = inject(Router);
    session=inject(SessionManagementService);
    http=inject(HttpClient);
    ApiServices =inject(ApiServicesService);
    dataservices =inject(SendRecievedDataService)
  constructor(

  ) { }

   pageOpen(pageName:string){
     this.router.navigateByUrl(pageName);
   }

}
