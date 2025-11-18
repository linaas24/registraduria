import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUri = 'https://api-departamento-defensa-production.up.railway.app';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}



    loginUser(data: any): Observable<any> {
      return this.http.post<any>(this.apiUri + '/api/auth/login', data, {
        headers: this.httpOptions,
      });
    }

      registerUser(data: any): Observable<any> {
      return this.http.post<any>(this.apiUri + '/api/auth/register', data, {
        headers: this.httpOptions,
      });
    }

      // //Comprobar si esta logeado o no
      // loggedIn(): Boolean {
      //   const token = Cookies.get('token');
      //   if (token) {
      //     return true;
      //   }
      //   return false;
      // }

  // login(data: { usuario: string; password: string }): Observable<any> {



  //   return new Observable(observer => {

  //     console.log("Datos recibidos:", data);

  //     // ✔️ Validación del usuario temporal
  //     if (data.usuario === dummyUser.usuario && data.password === dummyUser.password) {

  //       console.log("Login con dummy OK");

  //       localStorage.setItem('token', dummyUser.token);
  //       localStorage.setItem('usuario', JSON.stringify({ usuario: dummyUser.usuario }));

  //       observer.next({ token: dummyUser.token });
  //       observer.complete();
  //       return;
  //     }

  //     // ✔️ Si no coincide, intenta login real
  //     this.http.post(this.apiUrl, data).subscribe({
  //       next: (resp: any) => {
  //         localStorage.setItem('token', resp.token);
  //         localStorage.setItem('usuario', JSON.stringify(resp.usuario));

  //         observer.next(resp);
  //         observer.complete();
  //       },
  //       error: err => observer.error(err)
  //     });
  //   });
  // }

  logout() {
    localStorage.removeItem('token');

  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
}
