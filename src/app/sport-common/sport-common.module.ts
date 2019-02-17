import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
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
