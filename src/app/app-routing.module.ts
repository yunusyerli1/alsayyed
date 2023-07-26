import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ListFirstComponent } from './views/list-first/list-first.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "list-first", component: ListFirstComponent },
  // { path: "service", component: ServiceComponent },
  // { path: "skills", component: SkillComponent },
  // { path: "contact", component: ContactComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
