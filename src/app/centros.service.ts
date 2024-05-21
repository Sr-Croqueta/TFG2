import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CentroService {
  datosapi:any[]=[];
  trendapi:any[]=[];
  aula:any[]=[];
  constructor(private http: HttpClient, ) {
    
   }
   
   obtenerAulasDisponibles(hora: any, dia: any, centro: string) {
    // Convertir los datos a JSON
    const datos = { hora, dia, centro };
    
    // Realizar la solicitud POST con los datos en el cuerpo de la solicitud y las cabeceras especificadas
    this.http.post("http://127.0.0.1:8000/sacardisponibles", datos).subscribe((aulas: any) => {
        // Manejar la respuesta aquí
        console.log(aulas)
        this.aula = aulas;
        console.log(this.aula);
        // Si necesitas hacer algo más con los datos, hazlo aquí dentro de la suscripción
    });
}
obtenercentros() {
  return this.http.get<any[]>("http://127.0.0.1:8000/centro");
}

  reservaraula(aula: string) {
    // Convertir los datos a JSON
    
    
    // Realizar la solicitud POST con los datos en el cuerpo de la solicitud y las cabeceras especificadas
    this.http.post("http://127.0.0.1:8000/reservaula", aula).subscribe((aulas: any) => {
        // Manejar la respuesta aquí
        console.log(aulas)
        this.aula = aulas;
        console.log(this.aula);
        // Si necesitas hacer algo más con los datos, hazlo aquí dentro de la suscripción
    });
}

  
}
