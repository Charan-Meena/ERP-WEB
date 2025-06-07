import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManagementService } from '../Services/session-management.service';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService=inject(SessionManagementService)
  const validToken=localStorage.getItem('JWT_Token');
  if(validToken && sessionService.isAuthenticated()){
       return true;
  }
  else{
    router.navigateByUrl("login")
    return false
  }
  
};
