import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../Enviorment/enviorments';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token= localStorage.getItem('JWT_Token');
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization :`Bearer ${token}`,
      Key:environment.MERCHANT_KEY
    }
  });
  return next(cloneRequest);
};
