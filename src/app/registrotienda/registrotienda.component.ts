import { Component } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-registrotienda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrotienda.component.html',
  styleUrl: './registrotienda.component.css',
  providers: [IntranetService, AuthService]
})
export class RegistrotiendaComponent implements OnInit{
  direccion:string="";
  nombre:string="";
  user: any = {};
  telefono:string="";
  descripcion:string="";
  ciudad:string="";
  id:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(private intranetService: IntranetService, private users: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      console.log(this.user)
      if(this.user) {
        this.id = this.user.id;
        console.log(this.id)
      }
      
    });
  }

  

  guardarTienda(){
    if (!this.nombre || !this.direccion) {
      console.error('Debe completar los campos obligatorios.');
      return; // Detener la ejecución del método si algún campo obligatorio está vacío
    }
    const nuevoTienda = {
      id_user: this.id,
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      descripcion: this.descripcion,
      ciudad: this.ciudad,
    }
    this.intranetService.guardarTienda(nuevoTienda).subscribe((resul: any)=>{
      console.log(resul)
      this.router.navigate(['/']);
    }
    
      
    );
    
  }
}
