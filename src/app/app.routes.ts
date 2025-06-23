import { Routes } from '@angular/router';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { HeaderLayoutComponent } from './User/header-layout/header-layout.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { RolesComponent } from './Pages/roles/roles.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { authGaurdGuard } from './guard/auth-gaurd.guard';
import { DashBoardLayoutComponent } from './User/dash-board-layout/dash-board-layout.component';
import { ProgrameMasterComponent } from './Pages/ProgrameManagment/programe-master/programe-master.component';
import { OnlineExaminationComponent } from './Pages/MCQExamination/online-examination/online-examination.component';
import { AdminPanelOnlineExamComponent } from './Pages/MCQExamination/admin-panel-online-exam/admin-panel-online-exam.component';
import { CourseSchemeMasterComponent } from './Pages/ProgrameManagment/course-scheme-master/course-scheme-master.component';
import { CourseSubjectListComponent } from './Pages/ProgrameManagment/course-subject-list/course-subject-list.component';
import { StudentListComponent } from './Students/student-list/student-list.component';
import { UniEmployeeListComponent } from './User/uni-employee-list/uni-employee-list.component';
import { CollegeEmployeeListComponent } from './User/college-employee-list/college-employee-list.component';
import { CollegeAdminListComponent } from './User/college-admin-list/college-admin-list.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:UserLoginComponent    
    },
    {
        path:'test',
        component:DashBoardLayoutComponent    
    },
    {
     path:'',
     component:HeaderLayoutComponent,
     canActivate:[authGaurdGuard],
     children:[
        {path: '', 
            redirectTo:'dashboard',
            pathMatch:'full'},
        {path:'dashboard',component:DashboardComponent},
        {path:'GetRolles',component:RolesComponent},
        {path:'registration',component:UserRegistrationComponent},
        {path:'PrgrameMaster',component:ProgrameMasterComponent},
        {path:'Online-Exam',component:OnlineExaminationComponent},
        {path:'admin-Exam',component:AdminPanelOnlineExamComponent},
        {path:'course-scheme',component:CourseSchemeMasterComponent},
        {path:'subject-list',component:CourseSubjectListComponent},
        {path:'student-list',component:StudentListComponent},
        {path:'uniemployee-list',component:UniEmployeeListComponent},
        {path:'college-employee-list',component:CollegeEmployeeListComponent},
        {path:'college-admin-list',component:CollegeAdminListComponent}
     ]   
    }

];
