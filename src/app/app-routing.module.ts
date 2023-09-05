import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AddWeightComponent } from './views/add-weight/add-weight.component';
import { AddExternalIdComponent } from './views/add-external-id/add-external-id.component';
import { AddRelationsComponent } from './views/add-relations/add-relations.component';
import { ListDownloadComponent } from './views/list-download/list-download.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "weight", component: AddWeightComponent },
  { path: "external-ids", component: AddExternalIdComponent },
  { path: "relationship", component: AddRelationsComponent },
  { path: "download", component: ListDownloadComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
