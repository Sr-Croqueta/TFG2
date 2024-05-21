import { Component } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crearenlace',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crearenlace.component.html',
  styleUrl: './crearenlace.component.css',
  providers: [IntranetService]
})
export class CrearenlaceComponent {
direccion:string="";
  nombre:string="";
  notas:string="";
  modo:string="crear";
  id:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(private intranetService: IntranetService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editarEnlace(params['id']);
        this.modo="editar"
        this.id=params['id']
      }
    });
  }

  

  guardarEnlace(){
    if (!this.nombre || !this.direccion) {
      console.error('Debe completar los campos obligatorios.');
      return; // Detener la ejecución del método si algún campo obligatorio está vacío
    }
    const nuevoEnlace = {
      nombre: this.nombre,
      direccion: this.direccion,
      notas: this.notas
    }
    this.intranetService.guardarEnlace(nuevoEnlace).subscribe((resul: any)=>{
      console.log(resul)
      this.router.navigate(['/enlaces']);
    }
    
      
    );
    
  }
  editarEnlace(id: any) {
    console.log(id)
    const mandaid = {
      "id": id
    }
    this.intranetService.obtenerEnlace(mandaid).subscribe((resul: any) => {
      this.direccion = resul.direccion;
      this.nombre = resul.nombre;
      this.notas = resul.notas;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
    });
  }
  editarEnlaceExistente(){
    if (!this.nombre || !this.direccion) {
      console.error('Debe completar los campos obligatorios.');
      return; // Detener la ejecución del método si algún campo obligatorio está vacío
    }
    const nuevoEnlace = {
      nombre: this.nombre,
      direccion: this.direccion,
      notas: this.notas
    }
    this.intranetService.editarEnlace(nuevoEnlace, this.id).subscribe((resul: any) => {
      console.log(resul)
      this.router.navigate(['/enlaces']);
    })
    
  }
}
