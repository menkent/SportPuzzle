import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';

@NgModule({
  declarations: [InfoDialogComponent, AuthorizationComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [InfoDialogComponent, AuthorizationComponent],
  entryComponents: [
    InfoDialogComponent
  ],
})
export class SportCommonModule { }
