import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatDialog, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogTitle} from '@angular/material';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DialogEnd } from './components/dialog-end';
@NgModule({
  declarations: [
    AppComponent, DialogEnd
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    MatInputModule, 
    FormsModule, 
    MatDialogModule
  ],
  exports: [
    DialogEnd
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogEnd]
})
export class AppModule { }
