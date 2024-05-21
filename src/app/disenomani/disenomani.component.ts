import { Component } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-disenomani',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disenomani.component.html',
  styleUrl: './disenomani.component.css',
  providers: [IntranetService]
})
export class DisenomaniComponent {
  nombre:string="";
  ruta_archivo: File | null = null; 
  modo:string="crear";
  user: any = {};
  id:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(private intranetService: IntranetService,public users: AuthService) {
  }
  ngOnInit(): void {
  
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      this.id = this.user.id;
      console.log(this.user)
     
      
    });
  }

  
  guardarAnuncio() {
    if (!this.id || !this.nombre || !this.ruta_archivo) {
      console.error('Debe completar los campos  obligatorios.');
      console.log(this.id)
      console.log(this.nombre)
      console.log(this.ruta_archivo)
      return;
    }
  
    const formData = new FormData();
    formData.append('id_user', this.id);
    formData.append('nombre', this.nombre);
    formData.append('ruta_archivo', this.ruta_archivo);
    formData.append('creado_por', this.user.name);
  
    this.intranetService.guardarDiseño(formData).subscribe((resul: any) => {
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
