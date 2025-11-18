import { Component, OnInit } from '@angular/core';
import { CiudadanoService, Ciudadano } from '../../services/ciudadano.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-lista-ciudadanos',
  standalone: true,
  templateUrl: './lista-ciudadanos.component.html',
  styleUrls: ['./lista-ciudadanos.component.css'],
  imports: [CommonModule, NgFor, NgClass]   // <-- ESTA LÍNEA ES LO IMPORTANTE
})
export class ListaCiudadanosComponent implements OnInit {

  ciudadanos: Ciudadano[] = [];

  constructor(private ciudadanoService: CiudadanoService) {}

  ngOnInit(): void {
    this.cargarCiudadanos();
  }

  cargarCiudadanos() {
    this.ciudadanoService.listar().subscribe({
      next: (data) => this.ciudadanos = data,
      error: (error) => console.error('Error al cargar ciudadanos', error)
    });
  }

  toggleEstado(c: Ciudadano) {
    const nuevoEstado = !c.requerido;

    this.ciudadanoService.cambiarEstado(c.identificacion, nuevoEstado)
      .subscribe({
        next: () => c.requerido = nuevoEstado,
        error: (error) => console.error('Error cambiando estado', error)
      });
  }
}
