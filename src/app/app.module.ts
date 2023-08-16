import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SidebarResponsiveComponent } from './containers/sidebar-responsive/sidebar-responsive.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { SvgImageComponent } from './components/svg-image/svg-image.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFirstComponent } from './views/list-first/list-first.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ChipsTagInputComponent } from './components/chips-tag-input/chips-tag-input.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    SvgImageComponent,
    NotFoundComponent,
    SidebarResponsiveComponent,
    NavbarComponent,
    ListFirstComponent,
    ChipsTagInputComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TagInputModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
