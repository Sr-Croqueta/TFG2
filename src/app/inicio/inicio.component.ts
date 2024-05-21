import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IntranetService } from '../intranet.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [IntranetService]
})
export class InicioComponent implements OnInit {
  anuncios: any[] = [];
  cont: number = 1;
  user: any = {};
  permisos: any = {};
  limit = 10;
  totalPages: number = 0;
  page: number = 1;
  shouldReloadNgFor: boolean = true;

  constructor(public intranet: IntranetService,public dialog: MatDialog, public users: AuthService) {}

  ngOnInit(): void {
    this.intranet.obteneranuncios().subscribe((datos: any[]) => {
      this.anuncios = datos;
      this.calcularTotalPaginas();
      console.log(this.anuncios)
    });
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      console.log(this.user)
      if(this.user) {
    
        this.users.permisos(this.user.id_rol).subscribe((datos: any) => {
          this.permisos = datos;
          console.log(this.permisos)
          
        });
        }
      
    });
  }
  borraranuncio(ID:any){
    this.intranet.borraranuncio(ID).subscribe((resul: any)=>{
      console.log(resul)
      window.location.reload();
    });
    
  }
  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.anuncios.length / this.limit);
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
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: anuncio
    });
  }
}