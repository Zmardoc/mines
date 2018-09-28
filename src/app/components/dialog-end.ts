import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle} from '@angular/material';
import { MatDialogModule } from "@angular/material";

export interface DialogData {
  dialogText: string;
}



@Component({
  selector: 'dialog-end',
  templateUrl: 'dialog-end.html',
  styleUrls: ['dialog-end.css']
})
export class DialogEnd {

  constructor(
    public dialogRef: MatDialogRef<DialogEnd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}