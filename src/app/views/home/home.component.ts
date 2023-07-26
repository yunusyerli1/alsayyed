import { Component } from '@angular/core';
import { INavbar } from 'src/app/models/INavbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  menuItems:INavbar[] = [
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
