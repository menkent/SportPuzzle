import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InfoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [InfoDialogComponent],
  entryComponents: [
    InfoDialogComponent
  ],
})
export class SportCommonModule { }
