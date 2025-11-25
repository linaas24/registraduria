import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanoService, Ciudadano } from '../../services/ciudadano.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { PdfReportService } from '../../services/pdf-report.service';
@Component({
  selector: 'app-citizens',

  imports: [CommonModule, FormsModule],
  templateUrl: './citizens.component.html',
  styleUrls: ['./citizens.component.css']
})
export class CitizensComponent implements OnInit {

  cedula="";
  
  ciudadanos: Ciudadano[] = [];
  showAntecedentesTable = false; // 👈 NUEVO
  constructor(private ciudadanoService: CiudadanoService,  private pdfService: PdfReportService) {}

  ngOnInit(): void {
    this.getClientes()
  }

  


  
  getCitizensWitchActiveBackground() {
    this.ciudadanoService.getCitizensWitchActiveBackground().subscribe((data: any) => {
      this.ciudadanos = data;
       this.showAntecedentesTable = true; // 👈 mostrar tabla de antecedentes
      console.log(this.ciudadanos)
    });
  }

  getCitizensWitchInactiveBackground() {
    this.ciudadanoService.getCitizensWitchInactiveBackground().subscribe((data: any) => {
      this.ciudadanos = data;
      this.showAntecedentesTable = true;// 👈 mostrar tabla de antecedentes
      console.log(this.ciudadanos)
    });
  }

    
  getClientes() {
    this.ciudadanoService.getAllClientes().subscribe((data: any) => {
      this.ciudadanos = data;
      this.showAntecedentesTable = false; // 👈 ocultar tabla cuando sea listado general
    });
  }


getClientesByID() {

  if (!this.cedula.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Campo vacío',
      text: 'Debes ingresar una cédula para buscar.',
    });
    return;
  }

  const soloNumeros = /^[0-9]+$/;
  if (!soloNumeros.test(this.cedula)) {
    Swal.fire({
      icon: 'error',
      title: 'Formato inválido',
      text: 'La cédula solo puede contener números.',
    });
    return;
  }

  if (this.cedula.length < 8 || this.cedula.length > 15) {
    Swal.fire({
      icon: 'error',
      title: 'Longitud inválida',
      text: 'Debe tener entre 8 y 15 dígitos.',
    });
    return;
  }

  this.ciudadanoService.getCitizenByID(this.cedula).subscribe({
    next: (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Resultado encontrado',
        text: `Ciudadano encontrado: ${response.nombres} ${response.apellidos}`,
      });

      // convertir respuesta a array para la tabla
      this.ciudadanos = [response];
     this.showAntecedentesTable = false; // 👈 en búsqueda por cédula, solo la tabla principal

    
    },

    error: (err) => {
      console.log(err);

      if(err.error){
        Swal.fire({
        icon: 'error',
        title: 'No encontrado',
        text:  'No existe un ciudadano con esa cédula.',
      });
        
      }

      
    }
  });
}

verAntecedentes(c: Ciudadano) {
  console.log(c.antecedentes);

  if (!c.antecedentes || c.antecedentes.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin antecedentes',
      text: `${c.nombres} ${c.apellidos} no registra antecedentes.` 
    });
    return;
  }

  const htmlAntecedentes = c.antecedentes
    .map((a: any, index: number) => {
      const fecha = a.fecha_creaciondb
        ? new Date(a.fecha_creaciondb).toLocaleString('es-CO')
        : 'Sin fecha';

      return `
        <div class="antecedente-item" 
          style="
            text-align:left; 
            margin-bottom:14px; 
            padding:14px 18px; 
            border-radius:10px;
            border:1px solid #d6e4ff;
            background:#f8fbff;
            box-shadow:0 2px 4px rgba(0,0,0,0.04);
            border-left:6px solid #0b2e59;
          "
        >
          <div style="font-size:16px; font-weight:600; color:#0b2e59;">
            ${index + 1}. ${a.descripcion}
          </div>

          <div style="margin-top:6px; font-size:14px;">
            <strong>ID antecedente:</strong> ${a.id_antecedente}
          </div>
          <div style="font-size:14px;">
            <strong>Estado:</strong> 
            <span style="color:${a.estado === 'Activo' ? '#0b7a2a' : '#7a0b0b'};">
              ${a.estado}
            </span>
          </div>
          <div style="font-size:14px;">
            <strong>Fecha de registro:</strong> ${fecha}
          </div>
        </div>
      `;
    })
    .join('');

  Swal.fire({
    title: `Antecedentes de ${c.nombres} ${c.apellidos}`,
    html: `
      <div style="
        max-height:360px; 
        overflow-y:auto; 
        padding-right:6px;
      ">
        ${htmlAntecedentes}
      </div>
    `,
    width: '650px',
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#0b2e59'
  });
}

exportarReporte() {
  if (this.ciudadanos.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Sin datos',
      text: 'No hay ciudadanos para exportar.',
    });
    return;
  }

  this.pdfService.generarReporte(this.ciudadanos);
}


  toggleEstado(c: Ciudadano) {
    //const nuevo = !c.requerido;
    //this.ciudadanoService.cambiarEstado(c.identificacion, nuevo).subscribe(() => c.requerido = nuevo);
  }
}
