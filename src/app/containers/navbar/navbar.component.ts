import { Component, Input } from '@angular/core';
import { INavbar } from 'src/app/models/INavbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() navItems: INavbar[]= [];



}
