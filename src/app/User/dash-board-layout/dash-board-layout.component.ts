import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-board-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-board-layout.component.html',
  styleUrl: './dash-board-layout.component.css'
})
export class DashBoardLayoutComponent {


dropdownStates: { [key: string]: boolean } = {};

  toggleDropdown(menu: string): void {
    this.dropdownStates[menu] = !this.dropdownStates[menu];
  }


}
