import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService } from '../../services/ciudadano.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-background',
  imports: [FormsModule],
  templateUrl: './create-background.component.html',
  styleUrl: './create-background.component.css'
})
export class CreateBackgroundComponent {
  
    antecedente = {
      descripcion: "",
      estado: "",
      cedulaRef: ""
  };


  constructor(
    private router: Router,
    private ciudadanoService: CiudadanoService
  ) {}






  registrar() {



  
        // -------------------------------------
        // 🔄 Convertir TODOS los campos a string
        // -------------------------------------
        Object.keys(this.antecedente).forEach(key => {
          // @ts-ignore para permitir acceso dinámico
          this.antecedente[key] = String(this.antecedente[key] ?? '').trim();
        });


      // -------------------------------
      // 🔹 VALIDACIÓN DE CAMPOS VACÍOS
      // -------------------------------
      if (!this.antecedente.descripcion.trim() || !this.antecedente.estado.trim() || 
      !this.antecedente.cedulaRef.trim() ) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de continuar.',
          confirmButtonText: 'OK',
        });
        return; // evita llamar al backend
      }
  
      const soloNumeros = /^[0-9]+$/;
          if (!soloNumeros.test(this.antecedente.cedulaRef)) {
        Swal.fire({
          icon: 'error',
          title: 'Identificación inválida',
          text: 'La identificación solo puede contener números.',
          confirmButtonText: 'OK',
        });
        return;
      }

     
  
  
        if (this.antecedente.cedulaRef.length < 10 || this.antecedente.cedulaRef.length > 15) {
      Swal.fire({
        icon: 'error',
        title: 'Longitud inválida',
        text: 'La identificación debe tener entre 10 y 15 dígitos.',
        confirmButtonText: 'OK',
      });
      return;
    }


  
      this.ciudadanoService.registerBackgrounds(this.antecedente).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro  de antecedente exitoso',
            text: response.message,
          });
       
          console.log(response)
           
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
              title: 'Error al registrar los antecedentes del ciudadano',
              html,
              confirmButtonText: 'OK',
              width: 400,
            });
          },
      });
    }
}


