import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="d-flex justify-content-center align-items-center" style="height:80vh;">
    <div class="card p-4" style="width:360px">
      <h4 class="mb-3">Iniciar sesión</h4>
      <form (ngSubmit)="login()">
        <input class="form-control mb-2" placeholder="Identificación" [(ngModel)]="id" name="id" required>
        <input class="form-control mb-3" type="password" placeholder="Contraseña" [(ngModel)]="pass" name="pass" required>
        <button class="btn btn-primary w-100" type="submit">Ingresar</button>
      </form>
    </div>
  </div>
  `
})
export class LoginComponent {
  id = '';
  pass = '';
  constructor(private router: Router) {}
  login() {
    // simula login
    this.router.navigate(['/dashboard']);
  }
}
