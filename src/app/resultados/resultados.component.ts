import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentroService } from '../centros.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Asegúrate de importar HttpClientModule aquí
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  providers: [CentroService] // Proporciona el servicio localmente
})
export class ResultadosComponent {
  aulas: any[] = [];
  state: any;

  constructor(
    public centros: CentroService,
    private router: Router,
    private http: HttpClient // Inyecta HttpClient
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    const [horaSeleccionada, fechaSeleccionada, centroSeleccionado] = this.state;
    this.centros.obtenerAulasDisponibles(horaSeleccionada, fechaSeleccionada, centroSeleccionado);
  }

  reservar(aula: any) {
    

    const { id, nombre } = aula; // Obtén los datos del aula
    console.log("hora"+this.state[0]+"fecha"+ this.state[1]+"id de la aula "+ id)
    const data = { hora: this.state[0], dia: this.state[1], id_aula: id }; // Crea el objeto de datos para la reserva

    // Llama al servicio para reservar el aula
    this.http.post("http://127.0.0.1:8000/reservaula", data).subscribe((resul: any) => {
      console.log(resul); // Maneja la respuesta del servidor
      alert(`¡Aula ${nombre} reservada con éxito!`); // Muestra un mensaje de éxito
    }, (error) => {
      console.error(error); // Maneja cualquier error
      alert(`Error al reservar el aula ${nombre}. Por favor, inténtalo de nuevo.`); // Muestra un mensaje de error
    });
  }
  
}