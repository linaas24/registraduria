import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   user = {
    identificacion: '',
    password: '',
    remember:'',
  };

  constructor(private authService: AuthService, private router: Router) {}
   

     //login() { console.log("hola mundo") }

     handleForgotPassword(){
    
      console.log("hola mundo")
    }
    //handleForgotPassword() { ... }
      handleGoToRegister() { this.router.navigate(['/register']); }

  
login() {

    // -------------------------------
    // 🔹 VALIDACIÓN DE CAMPOS VACÍOS
    // -------------------------------
    if (!this.user.identificacion.trim() || !this.user.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de continuar.',
        confirmButtonText: 'OK',
      });
      return; // evita llamar al backend
    }

    const soloNumeros = /^[0-9]+$/;
        if (!soloNumeros.test(this.user.identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Identificación inválida',
        text: 'La identificación solo puede contener números.',
        confirmButtonText: 'OK',
      });
      return;
    }


      if (this.user.identificacion.length < 10 || this.user.identificacion.length > 15) {
    Swal.fire({
      icon: 'error',
      title: 'Longitud inválida',
      text: 'La identificación debe tener entre 10 y 15 dígitos.',
      confirmButtonText: 'OK',
    });
    return;
  }

    this.authService.loginUser(this.user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Credenciales correctas',
          text: response.message,
        });
        console.log(response.token)

         if (response.token) {
        localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      },
      
      error: (err) => {
        console.log('Error completo:', err);

        let html = '';
        console.log(err.error)

          // Caso 1: backend envía mensaje personalizado
          if (err.error) {
            html += `<p>${err.error}</p>`;
          }

          if (err.status === 0) {
          // Error típicamente por CORS o servidor caído
          html = "<p>No hay conexión con el servidor. Puede ser CORS o el backend está caído.</p>";

          }

         

          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            html,
            confirmButtonText: 'OK',
            width: 400,
          });
        },
    });
  }
}