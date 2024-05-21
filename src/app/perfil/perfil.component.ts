import { Component,OnInit } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { IntranetService } from '../intranet.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule, RouterOutlet, FormsModule,HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers : [AuthService]
})
export class PerfilComponent implements OnInit {
  user: any[] = [];
  userEmail: string = '';
  shouldReloadNgFor: boolean = true;
  constructor(public users: AuthService ,private router:Router,private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.users.users().subscribe((datos: any) => {
      this.user = datos
        console.log(datos);
      
    });
    console.log(this.user)
}

logout():void{
  this.users.logout()
  this.router.navigate(['/'])
  setTimeout(() => {
    this.appComponent.reloadComponent(); // Llamada al método para recargar AppComponent
  }, 500); // 500 milisegundos = medio segundo

}

borrarusuario(id:any){
  this.users.borrarusuario(id).subscribe((resul: any)=>{
    console.log(resul)
    this.ngOnInit()
    this.shouldReloadNgFor = !this.shouldReloadNgFor;
    this.shouldReloadNgFor = !this.shouldReloadNgFor;
  });
  
  
}
}
