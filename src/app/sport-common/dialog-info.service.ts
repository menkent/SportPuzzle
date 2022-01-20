import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {

  constructor(public dialog: MatDialog) { }

  openDialog(data, onClose?): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '80%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed::', result);
      if (typeof onClose === 'function') {
        onClose(result);
      }
    });
  }
}
