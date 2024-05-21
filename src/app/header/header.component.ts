import { Component } from '@angular/core';
import {Input } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {




  constructor(public authService: AuthService,) {
    
    
  }


  ngOnInit(): void {
    this.authService.user()
    // this.suscription=this.authService.refresh$.subscribe(()=>{
    //   this.authService.user()
    // })

  }
 


}