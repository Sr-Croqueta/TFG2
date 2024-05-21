import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IntranetService {
  anuncios:any[]=[];
  constructor(private http: HttpClient) {
    
  }

  obteneranuncios() {
    return this.http.get<any[]>("http://127.0.0.1:8000/anuncios");
  }
  obtenerenlaces() {
    return this.http.get<any[]>("http://127.0.0.1:8000/enlaces");
  }
  obtenercontactext(){
    return this.http.get<any[]>("http://127.0.0.1:8000/contactosexternos");
  }
  obtenercontactint(){
    return this.http.get<any[]>("http://127.0.0.1:8000/contactosinternos");
  }
  guardarEnlace(enlace: any) {
    return this.http.post<any>("http://127.0.0.1:8000/crearenlace", enlace);
  }
  borrarenlace(id: any) {
    return this.http.delete<any>("http://127.0.0.1:8000/borrarenlace/"+ id);
  }
  buscarenlace(enlace: any) {
    return this.http.post<any>("http://127.0.0.1:8000/buscarenlace", enlace);
  }
  buscarcon(contac: any) {
    return this.http.post<any>("http://127.0.0.1:8000/buscarcon", contac);
  }
  borrarconin(ID: any) {
    return this.http.delete<any>("http://127.0.0.1:8000/borrarconin/"+ ID);
  }
  borraranuncio(ID: any) {
    return this.http.delete<any>("http://127.0.0.1:8000/borraranuncio/"+ ID);
  }
  obtenerEnlace(id: any){
    console.log(id)
    return this.http.post<any>("http://127.0.0.1:8000/obtenerenlace", id)
  }
  editarEnlace(enlace:any, id:any){
    return this.http.put<any>("http://127.0.0.1:8000/editarenlace/"+id, enlace)
  }

  obtenertiendas() {
    return this.http.get<any[]>("http://127.0.0.1:8000/tiendas");
  }
  
  buscartienda(tienda: any) {
    return this.http.post<any>("http://127.0.0.1:8000/buscartienda", tienda);
  }
  guardarTienda(tienda: any) {
    return this.http.post<any>("http://127.0.0.1:8000/creartienda", tienda);
  }
  guardarDiseño(diseño: any) {
    
    return this.http.post<any>("http://127.0.0.1:8000/creardiseño", diseño);

  }

  obtenerdisenoma(id: any) {
    return this.http.get<any[]>("http://127.0.0.1:8000/disenoma/"+id);
  }

}
