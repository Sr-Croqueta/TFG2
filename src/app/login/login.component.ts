import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import {Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule], // Asegúrate de importar HttpClientModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService] // Proporciona el servicio localmente
  
})




export class LoginComponent implements OnInit {
  name:string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userr:any = {}
  registrado:boolean= false;
  error:boolean= false;
  emailr:string='';
  passwordr:string='';
  shouldReloadNgFor: boolean = true;
  roles:any[]=[]
  id_rol:any
  permisos: any = {};
  useri: any = {};
  



  constructor(public authService:AuthService,private router:Router,private appComponent: AppComponent) {}

  ngOnInit(): void {
    
    this.authService.roles().subscribe((datos: any) => {
      console.log(datos)
      this.roles=datos
     
    })
    this.authService.user().subscribe((datos: any) => {
      this.useri = datos
      console.log(this.user)
      if(this.useri) {
    
        this.authService.permisos(this.useri.id_rol).subscribe((datos: any) => {
          this.permisos = datos;
          console.log(this.permisos)
         
          
        });
        
        }
      
    });
    
  }

  onSubmit(): void {
    console.log("entra")
    this.authService.register(this.name,this.email, this.password,this.id_rol)
    this.emailr=this.email
    this.passwordr=this.password
    this.login()
    this.router.navigate(['/'])
      
  }

  login(): void {
    console.log("logeado");
    this.authService.login(this.emailr, this.passwordr);
    this.router.navigate(['/']);
    setTimeout(() => {
      this.appComponent.reloadComponent(); // Llamada al método para recargar AppComponent
    }, 1500); // 1000 milisegundos = 1 segundo
  }
  
  

  user():void{
    this.authService.user()
    this.router.navigate(['/'])
  
  }
  logout():void{
    this.authService.logout()
    this.router.navigate(['/'])
    setTimeout(() => {
      this.appComponent.reloadComponent(); // Llamada al método para recargar AppComponent
    }, 1000); // 500 milisegundos = medio segundo
  
  }

}