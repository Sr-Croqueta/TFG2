import { Component, OnInit } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
interface Pedido {
  id: number;
  diseno: {
    id: number;
    nombre: string;
    ruta_archivo: string;
    creado_por: string;
  };
  cliente: {
    id: number;
    email: string;
  };
}

@Component({
  selector: 'app-encargos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './encargos.component.html',
  styleUrl: './encargos.component.css',
  providers: [IntranetService,AuthService]
})
export class EncargosComponent implements OnInit{
  pedidos: Pedido[] = [];
  id: any = 0;
  user: any = {};

  constructor(private intranetService: IntranetService, private route: ActivatedRoute,public users: AuthService) { }

  ngOnInit(): void {
    this.users.user().subscribe((datos: any) => {
      this.user = datos
      this.id=this.user.id
      console.log(this.user)
      console.log(this.id)
      this.obtenerDisenosCliente(this.id);
      
    });
  }

  obtenerDisenosCliente(idManicurista: number): void {
    this.intranetService.obtenerdisenocli(idManicurista).subscribe(
      (datos: any[]) => {
        this.pedidos = datos;
        console.log('Pedidos recibidos:', datos);
      }
    );
  }

}
