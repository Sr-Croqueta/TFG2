import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crearusuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crearusuario.component.html',
  styleUrl: './crearusuario.component.css',
  providers: [AuthService]
})
export class CrearusuarioComponent {
  name:string="";
  email:string="";
  password:string="";
  modo:string="crear";
  id:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(public users: AuthService , private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editarUsuario(params['id']);
        this.modo="editar"
        this.id=params['id']
      }
    });
  }

  
  guardarUsuario(){
    if (!this.name || !this.email || this.password) {
      console.error('Debe completar los campos obligatorios.');
      return; // Detener la ejecución del método si algún campo obligatorio está vacío
    }
    const nuevoUsuario = {
      nombre: this.name,
      direccion: this.email,
      notas: this.password
    }
    this.users.guardarUsuario(nuevoUsuario).subscribe((resul: any)=>{
      console.log(resul)
      
    }
    
      
    );
    
  }

  editarUsuario(id: any) {
    console.log(id)
    const mandaid = {
      "id": id
    }
    this.users.obtenerusuario(mandaid).subscribe((resul: any) => {
      this.name = resul.name;
      this.email = resul.email;
      this.password = resul.password;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
      this.shouldReloadNgFor = !this.shouldReloadNgFor;
    });
  }
  editarUsuarioExistente(){
    if (!this.name || !this.email || !this.password) {
      console.error('Debe completar los campos obligatorios.');
      return; // Detener la ejecución del método si algún campo obligatorio está vacío
    }
    const nuevoUsuario = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    this.users.editarUsuario(nuevoUsuario, this.id).subscribe((resul: any) => {
      console.log(resul)
      this.router.navigate(['/enlaces']);
    })
    
  }

}
