import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AgGridModule } from 'ag-grid-angular';
import { BtnHandlersRenderComponent } from './dashboard/renders/btn-handlers-render/btn-handlers-render.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavBarComponent,
    BtnHandlersRenderComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detail/:id', component: ContactDetailComponent }
    ]),
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
