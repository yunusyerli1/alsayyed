import { Component } from '@angular/core';
import { INavbar } from 'src/app/models/INavbar';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

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
