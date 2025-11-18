import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Ciudadano {
  identificacion: string;
  nombres: string;
  apellidos: string;
  requerido?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  private apiUrl = 'http://localhost:8080/api/ciudadanos'; // cambia si tu backend usa otra ruta

  // mock si no hay backend
  private mock: Ciudadano[] = [
    { identificacion: '1010', nombres: 'Ana Sofía', apellidos: 'Rodríguez', requerido: false },
    { identificacion: '2020', nombres: 'Carlos', apellidos: 'Ramírez', requerido: true },
    { identificacion: '3030', nombres: 'María', apellidos: 'García', requerido: false }
  ];

  constructor(private http: HttpClient) {}

  listar(): Observable<Ciudadano[]> {
    return this.http.get<Ciudadano[]>(this.apiUrl)
      .pipe(
        catchError(err => {
          console.warn('No hay backend disponible, usando datos mock.', err);
          return of(this.mock);
        })
      );
  }

  registrar(ciudadano: Ciudadano): Observable<any> {
    return this.http.post(this.apiUrl, ciudadano)
      .pipe(catchError(err => {
        console.warn('POST falló, simulando éxito y devolviendo mock.', err);
        return of(ciudadano);
      }));
  }

  cambiarEstado(identificacion: string, requerido: boolean): Observable<any> {
    const url = `${this.apiUrl}/${identificacion}/estado`;
    return this.http.put(url, { requerido })
      .pipe(catchError(err => {
        console.warn('PUT falló, simulando éxito.', err);
        return of({ identificacion, requerido });
      }));
  }
}
