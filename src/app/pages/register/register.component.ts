import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


register = {
    identificacion: "",
    nombres: "",
    apellidos: "",
    fuerzaPublica: "",
    rango: "",
    idFuerza: "",
    email: ""
  };
  constructor(private authService: AuthService, private router: Router){}
  
  
  goToLogin() {
    this.router.navigate(['/login']);
  }


handleRegister() {

    // -------------------------------
    // 🔹 VALIDACIÓN DE CAMPOS VACÍOS
    // -------------------------------
      if (!this.register.identificacion.trim() || !this.register.nombres.trim()  ||
      !this.register.apellidos.trim() || !this.register.fuerzaPublica.trim() || !this.register.rango.trim() 
      || !this.register.idFuerza.trim() || !this.register.email.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de continuar.',
          confirmButtonText: 'OK',
        });
        return; // evita llamar al backend
      }

  const soloNumeros = /^[0-9]+$/;
    if (!soloNumeros.test(this.register.identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Identificación inválida',
        text: 'La identificación solo puede contener números.',
        confirmButtonText: 'OK',
      });
      return;
    }

      if (!soloNumeros.test(this.register.idFuerza)) {
      Swal.fire({
        icon: 'error',
        title: 'id fuerza inválida',
        text: 'El id fuerza solo puede contener números.',
        confirmButtonText: 'OK',
      });
      return;
    }


      if (this.register.identificacion.length < 10 || this.register.identificacion.length > 15) {
    Swal.fire({
      icon: 'error',
      title: 'Longitud inválida',
      text: 'La identificación debe tener entre 10 y 15 dígitos.',
      confirmButtonText: 'OK',
    });
    return;
  }

    if (this.register.idFuerza.length < 10 ||this.register.idFuerza.length > 15) {
    Swal.fire({
      icon: 'error',
      title: 'Longitud inválida',
      text: 'EL id Fuerza debe tener entre 10 y 15 dígitos.',
      confirmButtonText: 'OK',
    });
    return;
  }


    this.authService.registerUser(this.register).subscribe({
      next: (response) => {
        console.log(response)
      Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
           html: `
                <p>${response.body}</p>
                <p style="margin-top: 5px;">¿Deseas Iniciar Sesión?</p>
              `,
            showDenyButton: true,
          
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            } else if (result.isDenied) {
              Swal.fire('Ok, puedes seguir registrando usuarios.', '', 'info');
              location.reload(); // Recarga la página
            }
          });
        

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
            title: 'Error al registar usuario',
            html,
            confirmButtonText: 'OK',
            width: 400,
          });
        },
    });
  }
}