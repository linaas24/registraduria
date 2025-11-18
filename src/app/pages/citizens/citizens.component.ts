import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanoService, Ciudadano } from '../../services/ciudadano.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-citizens',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './citizens.component.html',
  styleUrls: ['./citizens.component.css']
})
export class CitizensComponent implements OnInit {
  ciudadanos: Ciudadano[] = [];
  constructor(private ciudadanoService: CiudadanoService) {}

  ngOnInit(): void {
    this.ciudadanoService.listar().subscribe(data => this.ciudadanos = data);
  }

  toggleEstado(c: Ciudadano) {
    const nuevo = !c.requerido;
    this.ciudadanoService.cambiarEstado(c.identificacion, nuevo).subscribe(() => c.requerido = nuevo);
  }
}
