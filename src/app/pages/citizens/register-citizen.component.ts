import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService, Ciudadano } from '../../services/ciudadano.service';

@Component({
  selector: 'app-register-citizen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-citizen.component.html',
  styleUrls: ['./register-citizen.component.css']
})
export class RegisterCitizenComponent {
  
  ciudadano: Ciudadano = {
    identificacion: '',
    nombres: '',
    apellidos: '',
    requerido: false
  };

  constructor(
    private router: Router,
    private ciudadanoService: CiudadanoService
  ) {}

  registrar() {
    this.ciudadanoService.registrar(this.ciudadano)
      .subscribe(() => {
        alert('Ciudadano registrado exitosamente');
        this.router.navigate(['/citizens']);
      });
  }
}