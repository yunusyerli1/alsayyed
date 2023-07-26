import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alsayyed';

  sideMenu = [
    {
      title: "Home",
      icon: "home",
      route: "home"
    },
    {
      title: "Portfolio",
      icon: "bag",
      route: "portfolio"
    },
    {
      title: "Service",
      icon: "wrench",
      route: "service"
    },
    {
      title: "Skills",
      icon: "database",
      route: "skills"
    },
    {
      title: "Contact",
      icon: "postcard",
      route: "contact"
    }
  ]
}
