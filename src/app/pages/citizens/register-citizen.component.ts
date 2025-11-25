import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService, Ciudadano } from '../../services/ciudadano.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-citizen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-citizen.component.html',
  styleUrls: ['./register-citizen.component.css']
})
export class RegisterCitizenComponent {
  
  ciudadano: Ciudadano = {
    cedula: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    estatura: '',
    ciudad_nacimiento: '',
    ciudad_expedicion: '',
    fecha_expedicion: '',
    rh: ''
  };

  constructor(
    private router: Router,
    private ciudadanoService: CiudadanoService
  ) {}



private convertirFecha(fechaISO: string): string {
  if (!fechaISO) return "";
  const [yyyy, mm, dd] = fechaISO.split("-");
  return `${dd}/${mm}/${yyyy}`;
}




  registrar() {

console.log("ciudadano  antes de convertido a string ", this.ciudadano);

  
        // -------------------------------------
        // 🔄 Convertir TODOS los campos a string
        // -------------------------------------
        Object.keys(this.ciudadano).forEach(key => {
          // @ts-ignore para permitir acceso dinámico
          this.ciudadano[key] = String(this.ciudadano[key] ?? '').trim();
        });
// Convertir fechas a formato dd/MM/yyyy
    this.ciudadano.fecha_nacimiento = this.convertirFecha(this.ciudadano.fecha_nacimiento);
    this.ciudadano.fecha_expedicion = this.convertirFecha(this.ciudadano.fecha_expedicion);
    console.log("ciudadano  de convertido a string ", this.ciudadano);

      // -------------------------------
      // 🔹 VALIDACIÓN DE CAMPOS VACÍOS
      // -------------------------------
      if (!this.ciudadano.cedula.trim() || !this.ciudadano.nombres.trim() || 
      !this.ciudadano.apellidos.trim() || !this.ciudadano.fecha_nacimiento.trim() || 
      !this.ciudadano.estatura.trim()|| !this.ciudadano.ciudad_nacimiento.trim()||
       !this.ciudadano.nombres.trim()|| !this.ciudadano.nombres.trim() || 
       !this.ciudadano.ciudad_expedicion.trim()|| !this.ciudadano.fecha_expedicion.trim() || 
       !this.ciudadano.rh.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de continuar.',
          confirmButtonText: 'OK',
        });
        return; // evita llamar al backend
      }
  
      const soloNumeros = /^[0-9]+$/;
          if (!soloNumeros.test(this.ciudadano.cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Identificación inválida',
          text: 'La identificación solo puede contener números.',
          confirmButtonText: 'OK',
        });
        return;
      }

        const soloDecimales = /^[0-9]+(\.[0-9]+)?$/;

      if (!soloDecimales.test(this.ciudadano.estatura)) {
        Swal.fire({
          icon: 'error',
          title: 'Estatura inválida',
          text: 'La estatura debe ser numérica, ejemplo: 1.65',
          confirmButtonText: 'OK',
        });
        return;
      }
  
  
        if (this.ciudadano.cedula.length < 10 || this.ciudadano.cedula.length > 15) {
      Swal.fire({
        icon: 'error',
        title: 'Longitud inválida',
        text: 'La identificación debe tener entre 10 y 15 dígitos.',
        confirmButtonText: 'OK',
      });
      return;
    }


  
      this.ciudadanoService.registerCitizen(this.ciudadano).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
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
              title: 'Error al registrar al ciudadano',
              html,
              confirmButtonText: 'OK',
              width: 400,
            });
          },
      });
    }
}