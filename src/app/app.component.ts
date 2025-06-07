import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RolesComponent } from './Pages/roles/roles.component';
import { MasterComponent } from './Pages/master/master.component';
import { SendComponent } from './Pages/component/send/send.component';
import { RecievedComponent } from "./Pages/component/recieved/recieved.component";
import { DesignationComponent } from "./Pages/designation/designation.component";
import { IdleTimeoutService } from './Services/idle-timeout-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet]
,
            
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Anugular Application-18';
  constructor(private idleService: IdleTimeoutService) {}
}
