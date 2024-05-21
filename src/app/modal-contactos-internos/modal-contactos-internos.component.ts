import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-contactos-internos',
  standalone: true,
  imports: [],
  templateUrl: './modal-contactos-internos.component.html',
  styleUrl: './modal-contactos-internos.component.css'
})
export class ModalContactosInternosComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalContactosInternosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
