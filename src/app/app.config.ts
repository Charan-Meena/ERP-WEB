import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideToastr} from 'ngx-toastr'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './Services/custom.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
//import {provideDataTable} from 'angular-datatables'

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([customInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
,provideToastr(),provideAnimations(),provideHttpClient()]
};
