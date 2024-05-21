import { Component } from '@angular/core';
import { IntranetService } from '../intranet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disponibles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disponibles.component.html',
  styleUrl: './disponibles.component.css',
  providers: [IntranetService]
})
export class DisponiblesComponent {

  diseno: any[] = [];
  id:any=0;
  shouldReloadNgFor: boolean = true;
  constructor(private intranetService: IntranetService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.id=params['id']
      }
    });
    this.intranetService.obtenerdisenoma(this.id).subscribe((datos: any[]) => {
      
      this.diseno = datos;
      console.log(this.diseno)
      
    });
  }



}