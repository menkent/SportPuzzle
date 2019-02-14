import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatToolbarModule, MatListModule, MatDividerModule, MatNativeDateModule} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material-module.module';

const modules = [

  MatProgressBarModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatDividerModule,
  // DemoMaterialModule,

  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatNativeDateModule,

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  // exports: [...modules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
