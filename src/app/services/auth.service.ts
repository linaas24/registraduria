import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://TU_API/auth/login';  // Cambia cuando tengas API real

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { usuario: string; password: string }): Observable<any> {

    // 🔹 Usuario temporal para pruebas
    const dummyUser = {
      usuario: 'admin',
      password: '1234',
      token: 'tokenDemo123'
    };

    return new Observable(observer => {

      console.log("Datos recibidos:", data);

      // ✔️ Validación del usuario temporal
      if (data.usuario === dummyUser.usuario && data.password === dummyUser.password) {

        console.log("Login con dummy OK");

        localStorage.setItem('token', dummyUser.token);
        localStorage.setItem('usuario', JSON.stringify({ usuario: dummyUser.usuario }));

        observer.next({ token: dummyUser.token });
        observer.complete();
        return;
      }

      // ✔️ Si no coincide, intenta login real
      this.http.post(this.apiUrl, data).subscribe({
        next: (resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));

          observer.next(resp);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
}
