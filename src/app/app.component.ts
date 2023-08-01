import { Component } from '@angular/core';
import { INavbarModel } from './models/INavbarModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alsayyed';

  sideMenu = [
    {
      title: "1.Liste",
      icon: "home",
      route: "list-first"
    },
    {
      title: "2.Liste",
      icon: "bag",
      route: "portfolio"
    },
    {
      title: "3.Liste",
      icon: "wrench",
      route: "service"
    },
    {
      title: "4.Liste",
      icon: "database",
      route: "skills"
    },
    {
      title: "5.Liste",
      icon: "postcard",
      route: "contact"
    }
  ]

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
