import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// external packages
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

// Angular Material Import
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,

} from '@angular/material';

//created component
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

//created directive
import { OnlyNumber } from '../app/_directives/onlynumber.component';
import { OnlyComma } from '../app/_directives/onlyComma.component';
import { PacksComponent } from './packs/packs.component';
import { UserDetailsComponent } from './user-details/user-details.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AccountComponent,
    PacksComponent,
    UserDetailsComponent,

    //directives
    OnlyNumber,
    OnlyComma,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    //Material imports
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,

    // external packages
    NgSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
