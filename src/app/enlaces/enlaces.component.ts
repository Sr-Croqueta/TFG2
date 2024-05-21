import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IntranetService } from '../intranet.service';
import { OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.css',
  providers: [IntranetService, AuthService]
})
export class EnlacesComponent implements OnInit {
  enlaces: any[] = [];
  user: any = {};
  permisos: any = {};
  cont: number = 1;
  limit = 12;
  totalPages: number = 0;
  page: number = 1;
  shouldReloadNgFor: boolean = true;
  cargando:boolean = true;
  nombreBusqueda:any = "";
  resulbusqueda:any[]=[]

  constructor(public intranet: IntranetService,private router: Router,public users: AuthService) {}

  ngOnInit(): void {
    this.intranet.obtenerenlaces().subscribe((datos: any[]) => {
      
      this.enlaces = datos;
      this.calcularTotalPaginas();
      console.log(this.enlaces)
      
    });
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      console.log(this.user)
      if(this.user) {
    
        this.users.permisos(this.user.id_rol).subscribe((datos: any) => {
          this.permisos = datos;
          console.log(this.permisos)
          this.cargando= false
          
        });
        }
      
    });
    
    this.cargando=true
  }

  calcularTotalPaginas() {
    this.totalPages = Math.ceil(this.enlaces.length / this.limit);
  }

  borrarenlace(id:any){
    this.intranet.borrarenlace(id).subscribe((resul: any)=>{
      console.log(resul)
      this.ngOnInit()
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
    });
    const resultadosBusquedaElement = document.querySelector('.resultados-busqueda');
  
    // Verificar si se encontró el elemento y si es un HTMLElement
    if (resultadosBusquedaElement instanceof HTMLElement) {
      // Mostrar los resultados estableciendo el estilo de display en 'block'
      resultadosBusquedaElement.style.display = 'none';
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
  buscarEnlace(){
    const data = 
    {
      nombre: this.nombreBusqueda
    }
    this.intranet.buscarenlace(data).subscribe((resul: any)=>{
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

}
