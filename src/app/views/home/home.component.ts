import { Component } from '@angular/core';
import { INavbarModel } from 'src/app/models/INavbarModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  menuItems:INavbarModel[] = [
    {
      title: "Home",
      route: "/home",
      isFeatured: false
    },
    {
      title: "Portfolio",
      route: "/portfolio",
      isFeatured: false
    },
    {
      title: "Contact",
      route: "/contact",
      isFeatured: true
    },

  ]

}
