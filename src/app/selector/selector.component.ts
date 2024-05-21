import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CentroService } from '../centros.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Asegúrate de importar HttpClientModule aquí
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  providers: [CentroService] // Proporciona el servicio localmente
})
export class SelectorComponent {
  centr: any[] = [];
  horas: any[] = [];
  dias: any[] = [];
  fechaSeleccionada:any;
  centroSeleccionado:any;
  horaSeleccionada:any;
  shouldReloadNgFor: boolean = true;

  constructor(public centros: CentroService,  private router: Router) {
    this.peti();
    this.generarHoras();
    this.generarDias();
  }

  peti() {
    this.centros.obtenercentros().subscribe((datos: any[]) => {
      this.centr = datos;
      
      console.log(this.centr)
      
    });
  }

  generarHoras() {
    for (let i = 8; i <= 22; i++) {
      this.horas.push(i);
    }
  }

  generarDias() {
    const hoy = new Date();
    for (let i = 0; i < 8; i++) {
      const nuevoDia = new Date();
      nuevoDia.setDate(hoy.getDate() + i);
      const fechaFormateada = this.formatDate(nuevoDia);
      this.dias.push(fechaFormateada);
    }
  }

  onSubmit() {
    // Realizar la lógica necesaria al enviar el formulario
    this.centros.obtenerAulasDisponibles(this.horaSeleccionada,this.fechaSeleccionada,this.centroSeleccionado);
    this.router.navigate(['/resultados'], { state:[this.horaSeleccionada,this.fechaSeleccionada,this.centroSeleccionado] });
  }

  formatDate(date: Date){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Agrega ceros iniciales si es necesario
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return formattedDay + '/' + formattedMonth + '/' + year;
}
}