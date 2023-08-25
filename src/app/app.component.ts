import { Component } from '@angular/core';
import { INavbarModel } from './helpers/models/INavbarModel';
import { ProductStore } from './stores/product.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alsayyed';

  isSidebarCollapsed: boolean = false;

  sideMenu = [
    {
      title: "Add Products",
      icon: "home",
      route: "list-first"
    },
    {
      title: "Add Weights",
      icon: "bag",
      route: "weight"
    },
    {
      title: "Add Ext Ids",
      icon: "wrench",
      route: "external-ids"
    },
    {
      title: "Add Relations",
      icon: "database",
      route: "relationship"
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

  constructor( private productStore: ProductStore,) {
    this.productStore.init();
  }

  collapseSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
