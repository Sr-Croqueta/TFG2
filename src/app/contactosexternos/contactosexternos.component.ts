import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IntranetService } from '../intranet.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalContactosExternosComponent } from '../modal-contactos-externos/modal-contactos-externos.component';

@Component({
  selector: 'app-contactosexternos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './contactosexternos.component.html',
  styleUrl: './contactosexternos.component.css',
  providers: [IntranetService]
})
export class ContactosexternosComponent implements OnInit {
  contactos: any[] = [];
  cont: number = 1;
  limit = 10;
  totalPages: number = 0;
  page: number = 1;
  shouldReloadNgFor: boolean = true;

  constructor(public intranet: IntranetService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.intranet.obtenercontactext().subscribe((datos: any[]) => {
      this.contactos = datos;
      this.calcularTotalPaginas();
      console.log(this.contactos)
    });
  }

  borrarconin(ID:any){
    this.intranet.borrarconin(ID).subscribe((resul: any)=>{
      console.log(resul)
      window.location.reload();
    });
    
  }

  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.contactos.length / this.limit);
  }

  paginacion(peti: string) {
    if (peti == ">" && this.page < this.totalPages) {
      this.cont =this.cont +10;
      console.log(this.cont)
      
      this.page++;
      
      this.shouldReloadNgFor = !this.shouldReloadNgFor; // Cambiar el estado para recargar ngFor
    }
    if (peti == "<" && this.page > 1) {
      this.cont = this.cont-10;
      if (this.cont == 0) this.cont++
      
      this.page--;
      
      this.shouldReloadNgFor = !this.shouldReloadNgFor; // Cambiar el estado para recargar ngFor
    }
    this.shouldReloadNgFor = !this.shouldReloadNgFor;
  }

  openModal(anuncio: any): void {
    const dialogRef = this.dialog.open(ModalContactosExternosComponent, {
      width: '250px',
      data: anuncio
    });
  }
}