import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Ciudadano {
  id?: string;
  cedula: string;
  nombres: string;
  apellidos: string;
  estatura: string;
  fechaCreacionDb?: string;
  rh: string;
  antecedentes?: Antecedente[]; // 👈 lo creará backend
  fecha_nacimiento: string;
  ciudad_nacimiento: string;
  ciudad_expedicion: string;
  fecha_expedicion: string;
}

export interface Antecedente {
  descripcion: string;
  estado: string;
  cedulaRef: string;
  id_antecedente?: string;
}





@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  private apiUrl = "https://cedulaapi2-production.up.railway.app/";// cambia si tu backend usa otra ruta
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(private http: HttpClient) {}

  getAllClientes(): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'api/cedulas');
    }

    getCitizenByID(cedula: string): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'api/cedulas/' + cedula);
    }


   registerCitizen(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'api/cedulas', [data], {
        headers: this.httpOptions,
      });
    }
//antecedentes
      registerBackgrounds(data: any): Observable<any> {
      return this.http.post<any>(this.apiUrl + 'api/antecedentes', data, {
        headers: this.httpOptions,
      });
    }

    //antecedentes activos

    getCitizensWitchActiveBackground(): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'api/cedulas/con-antecedentes/activos');
    }

     getCitizensWitchInactiveBackground(): Observable<any> {
      return this.http.get<any>(this.apiUrl + 'api/cedulas/con-antecedentes/inactivos');
    }


  // listar(): Observable<Ciudadano[]> {
  //   return this.http.get<Ciudadano[]>(this.apiUrl)
  //     .pipe(
  //       catchError(err => {
  //         console.warn('No hay backend disponible, usando datos mock.', err);
  //         return of(this.mock);
  //       })
  //     );
  // }

  // registrar(ciudadano: Ciudadano): Observable<any> {
  //   return this.http.post(this.apiUrl, ciudadano)
  //     .pipe(catchError(err => {
  //       console.warn('POST falló, simulando éxito y devolviendo mock.', err);
  //       return of(ciudadano);
  //     }));
  // }

  // cambiarEstado(identificacion: string, requerido: boolean): Observable<any> {
  //   const url = `${this.apiUrl}/${identificacion}/estado`;
  //   return this.http.put(url, { requerido })
  //     .pipe(catchError(err => {
  //       console.warn('PUT falló, simulando éxito.', err);
  //       return of({ identificacion, requerido });
  //     }));
  // }
}
