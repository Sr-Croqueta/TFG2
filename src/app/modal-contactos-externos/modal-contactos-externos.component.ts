import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-contactos-externos',
  standalone: true,
  imports: [],
  templateUrl: './modal-contactos-externos.component.html',
  styleUrl: './modal-contactos-externos.component.css'
})
export class ModalContactosExternosComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalContactosExternosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
