import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterServicesService {

  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get("https://localhost:44319/Roll/GetAllRolls")
  }
  LoginUser(){
    return this.http.get("https://localhost:44319/Roll/GetAllRolls")
  }
}
