import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '@interfaces';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public open(dialogData: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
    });

    return dialogRef.afterClosed();
  }
}
