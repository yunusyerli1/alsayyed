import { Component, Input } from '@angular/core';
import { INavbarModel } from 'src/app/helpers/models/INavbarModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() navItems: INavbarModel[]= [];



}
