import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disenocli',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disenocli.component.html',
  styleUrl: './disenocli.component.css',
  providers: [IntranetService]
})
export class DisenocliComponent {

  nombre:string="";
  ruta_archivo: File | null = null; 
  modo:string="crear";
  user: any = {};
  id_cli:any=0;
  id_ma:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(private intranetService: IntranetService,private route: ActivatedRoute,public users: AuthService) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.id_ma=params['id']
      }
    });
  }
  ngOnInit(): void {
  
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      this.id_cli = this.user.id;
      console.log(this.user)
     
      
    });
  }

  
  guardarAnuncio() {
    if (!this.id_cli || !this.nombre || !this.ruta_archivo) {
      console.error('Debe completar los campos  obligatorios.');
      console.log(this.id_cli)
      console.log(this.nombre)
      console.log(this.ruta_archivo)
      return;
    }
  
    const formData = new FormData();
    formData.append('id_user', this.id_cli);
    formData.append('nombre', this.nombre);
    formData.append('ruta_archivo', this.ruta_archivo);
    formData.append('creado_por', this.user.name);
  
    this.intranetService.guardarDiseñocli(formData,this.id_ma).subscribe((resul: any) => {
      console.log(this.ruta_archivo);
    });
  }
  
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ruta_archivo = file;
    }
  }
  
  
    
}
