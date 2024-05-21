import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IntranetService } from '../intranet.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalContactosInternosComponent } from '../modal-contactos-internos/modal-contactos-internos.component';

@Component({
  selector: 'app-contactosinternos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './contactosinternos.component.html',
  styleUrl: './contactosinternos.component.css',
  providers: [IntranetService]
})
export class ContactosinternosComponent implements OnInit {

  contactos: any[] = [];
  cont: number = 1;
  limit = 10;
  totalPages: number = 0;
  page: number = 1;
  shouldReloadNgFor: boolean = true;
  nombreBusqueda:any = "";
  resulbusqueda:any[]=[];

  constructor(public intranet: IntranetService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.intranet.obtenercontactint().subscribe((datos: any[]) => {
      this.contactos = datos;
      this.calcularTotalPaginas();
      console.log(this.contactos)
    });
  }

  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.contactos.length / this.limit);
  }
  
  borrarconin(ID:any){
    this.intranet.borrarconin(ID).subscribe((resul: any)=>{
      console.log(resul)
      window.location.reload();
    });
    
  }
  buscarCon(){
    const data = 
    {
      Nombre: this.nombreBusqueda
    }
    this.intranet.buscarcon(data).subscribe((resul: any)=>{
      console.log(resul)
      this.resulbusqueda = resul
      this.ngOnInit()
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
      this.mostrarResultadosBusqueda();
    });


  }
  mostrarResultadosBusqueda() {
    // Obtener el elemento HTML que contiene los resultados de la búsqueda
    const resultadosBusquedaElement = document.querySelector('.resultados-busqueda');
  
    // Verificar si se encontró el elemento y si es un HTMLElement
    if (resultadosBusquedaElement instanceof HTMLElement) {
      // Mostrar los resultados estableciendo el estilo de display en 'block'
      resultadosBusquedaElement.style.display = 'flex';
    } else {
      console.error('Elemento de resultados de búsqueda no encontrado o no es un HTMLElement.');
    }
  }
  cerrarbusq() {
    // Obtener el elemento HTML que contiene los resultados de la búsqueda
    const resultadosBusquedaElement = document.querySelector('.resultados-busqueda');
  
    // Verificar si se encontró el elemento y si es un HTMLElement
    if (resultadosBusquedaElement instanceof HTMLElement) {
      // Mostrar los resultados estableciendo el estilo de display en 'block'
      resultadosBusquedaElement.style.display = 'none';
    } else {
      console.error('Elemento de resultados de búsqueda no encontrado o no es un HTMLElement.');
    }
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
    const dialogRef = this.dialog.open(ModalContactosInternosComponent, {
      width: '250px',
      data: anuncio
    });
  }

}
