import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {NgxMaskModule} from 'ngx-mask-2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { StoreComponent } from './pages/store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    RegisterDialogComponent,
    LoginDialogComponent,
    LoaderComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxErrorsModule,
    NgxMaskModule.forRoot({}),
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent
  ]
})
export class AppModule { }
