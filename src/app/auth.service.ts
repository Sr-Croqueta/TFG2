import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL de tu backend Laravel
  mensaje:any[]=[];
  tokens:any;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { 
  
  }
  get refresh$(){
    return this._refresh$;
  }

 

  register(name: string,email: string, password: string,id_rol:string ) {
    console.log(name)
    return this.http.post(`${this.apiUrl}/registro`, {name, email, password,id_rol}).subscribe((aulas: any) => {
      // Manejar la respuesta aquí
      console.log(aulas)
      this.mensaje = aulas;
      // Si necesitas hacer algo más con los datos, hazlo aquí dentro de la suscripción
  });
  }
  login(email: string, password: string) {
    this.http.post(`${this.apiUrl}/api/login`, { email, password }).subscribe((response: any) => {
      // Extraer el token del cuerpo de la respuesta
      const token = response.token;
  
      // Verificar si se recibió un token válido
      if (token) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('accessToken', token);
      }

      tap(()=>{
        this._refresh$.next();
      })
  
      // Manejar la respuesta aquí
      console.log(response);
    });
  }
  
  roles(): Observable<any[]> {

      return this.http.get<any[]>(`${this.apiUrl}/roles`);
    
  }


 
  user(): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      return this.http.get<any[]>(`${this.apiUrl}/api/user-profile`, { headers });
    } else {
      // Aquí puedes manejar el caso cuando no hay un token de acceso
      return new Observable<any[]>(); // Devuelve un observable vacío o con un valor predeterminado
    }
  }
  

  logout(): void {
    // Limpiar el token de acceso del almacenamiento local
    localStorage.removeItem('accessToken');
  
    // Realizar la solicitud de logout al servidor
    this.http.get(`${this.apiUrl}/api/logout`).subscribe(
      (response: any) => {
        // Manejar la respuesta aquí
        console.log(response);
      },
      (error: any) => {
        // Manejar errores aquí
        console.error(error);
      }
    );
  }
  

  getToken(): string | null {
    // Obtiene el token de acceso del almacenamiento local
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    // Comprueba si el usuario está autenticado comprobando si hay un token de acceso
    return !!this.getToken();
  }

  users(): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      return this.http.get<any[]>(`${this.apiUrl}/usuarios`, { headers });
    } else {
      // Aquí puedes manejar el caso cuando no hay un token de acceso
      return new Observable<any[]>(); // Devuelve un observable vacío o con un valor predeterminado
    }
  }
  permisos(id: any): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      // Nota: Es importante pasar el ID como parte del cuerpo de la solicitud o como un parámetro de consulta
      return this.http.get<any[]>(`${this.apiUrl}/permisos/${id}`, { headers });
    } else {
      // Devuelve un observable vacío si no hay un token de acceso
      return new Observable<any[]>(observer => observer.complete());
    }
  }

  borrarusuario(id: any): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      // Nota: Es importante pasar el ID como parte del cuerpo de la solicitud o como un parámetro de consulta
      return this.http.get<any[]>(`${this.apiUrl}/borrarusuario/${id}`,{ headers });
    } else {
      // Devuelve un observable vacío si no hay un token de acceso
      return new Observable<any[]>(observer => observer.complete());
    }
  }

  obtenerusuario(id: any): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      // Nota: Es importante pasar el ID como parte del cuerpo de la solicitud o como un parámetro de consulta
      return this.http.get<any[]>(`${this.apiUrl}/obtenerusuario/${id}`,{ headers });
    } else {
      // Devuelve un observable vacío si no hay un token de acceso
      return new Observable<any[]>(observer => observer.complete());
    }
  }

  guardarUsuario(id: any): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      // Nota: Es importante pasar el ID como parte del cuerpo de la solicitud o como un parámetro de consulta
      return this.http.post<any[]>(`${this.apiUrl}/guardarusuario`,{ id },{ headers });
    } else {
      // Devuelve un observable vacío si no hay un token de acceso
      return new Observable<any[]>(observer => observer.complete());
    }
  }

  editarUsuario(usuario:any, id: any): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
      // Nota: Es importante pasar el ID como parte del cuerpo de la solicitud o como un parámetro de consulta
      return this.http.put<any[]>(`${this.apiUrl}/editarusuario/${id}`,{usuario},{ headers });
    } else {
      // Devuelve un observable vacío si no hay un token de acceso
      return new Observable<any[]>(observer => observer.complete());
    }
  }

}