import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfReportService {

  generarReporte(ciudadanos: any[]) {
    const fecha = new Date().toLocaleString('es-CO');

    const tablaCiudadanos = [
      [
        { text: 'Cédula', style: 'tableHeader' },
        { text: 'Nombres', style: 'tableHeader' },
        { text: 'Apellidos', style: 'tableHeader' },
        { text: 'Fecha nacimiento', style: 'tableHeader' },
        { text: 'RH', style: 'tableHeader' }
      ]
    ];

    ciudadanos.forEach((c: any) => {
      tablaCiudadanos.push([
        c.cedula,
        c.nombres,
        c.apellidos,
        c.fecha_nacimiento,
        c.rh
      ]);
    });

    // 🔥 Sección de antecedentes
    const antecedentesSection = ciudadanos
      .filter((c: any) => c.antecedentes && c.antecedentes.length > 0)
      .map((c: any) => {
        const antecedentesLista = c.antecedentes.map((a: any, idx: number) => {
          return {
            text: `${idx + 1}. ${a.descripcion}  | Estado: ${a.estado}`,
            margin: [0, 2, 0, 2]
          };
        });

        return [
          { text: `${c.nombres} ${c.apellidos} – Cédula: ${c.cedula}`, style: 'anteTitle' },
          { ul: antecedentesLista, margin: [0, 0, 0, 10] }
        ];
      });

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 50, 40, 60],

      header: {
        columns: [
          {
            width: 'auto',
            canvas: [
              { type: 'circle', x: 20, y: 20, r: 18, color: '#0b2e59' },
              { type: 'rect', x: 12, y: 8, w: 16, h: 24, color: 'white' }
            ]
          },
          {
            width: '*',
            text: 'DEPARTAMENTO DE DEFENSA NACIONAL\nDirección General de Identificación Ciudadana',
            alignment: 'center',
            margin: [0, 10, 0, 0],
            fontSize: 14,
            bold: true,
            color: '#0b2e59'
          },
          { width: 40, text: '' }
        ],
        margin: [40, 20, 40, 0]
      },

      footer: function () {
        return {
          text: 'Documento generado automáticamente por el Sistema Nacional de Registro Ciudadano – No requiere firma física.',
          alignment: 'center',
          fontSize: 9,
          margin: [0, 10, 0, 10],
          color: 'gray'
        };
      },

      content: [
        {
          text: 'REPORTE OFICIAL DE REGISTRO CIUDADANO',
          style: 'title'
        },

        {
          text:
            'El presente documento contiene la información registrada en la base de datos del Departamento de Defensa Nacional, correspondiente a ciudadanos activos en el sistema. Este informe tiene fines administrativos, de verificación y análisis interno.',
          style: 'paragraph'
        },

        { text: `Fecha de generación del documento: ${fecha}\n\n`, style: 'info' },

        { text: '1. Información General de los Ciudadanos', style: 'sectionHeader' },

        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto'],
            body: tablaCiudadanos
          },
          layout: 'lightHorizontalLines',
          margin: [0, 10, 0, 20]
        },

        // 🔥 Antecedentes (si hay)
        antecedentesSection.length > 0
          ? { text: '2. Registros de Antecedentes', style: 'sectionHeader' }
          : {},

        antecedentesSection.length > 0 ? antecedentesSection : {},

        { text: '\n\nFirma Autorizada:', style: 'sectionHeader' },

        {
          columns: [
            {
              width: '*',
              text:
                '__________________________\n' +
                'Coronel Andrés Velandia\n' +
                'Director Nacional de Registro',
              alignment: 'left',
              margin: [0, 20, 0, 0]
            },

            {
              width: 'auto',
              canvas: [
                {
                  type: 'ellipse',
                  x: 50,
                  y: 30,
                  color: '#0b2e59',
                  r1: 45,
                  r2: 25
                },
                {
                  type: 'ellipse',
                  x: 50,
                  y: 30,
                  color: 'white',
                  r1: 40,
                  r2: 20
                },
                {
                  type: 'text',
                  text: 'DEFENSA\nNACIONAL',
                  color: '#0b2e59',
                  fontSize: 10,
                  alignment: 'center'
                }
              ],
              margin: [0, 20, 0, 0]
            }
          ]
        }
      ],

      styles: {
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          color: '#0b2e59',
          margin: [0, 20, 0, 10]
        },
        paragraph: {
          fontSize: 11,
          alignment: 'justify',
          margin: [0, 0, 0, 15]
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 8],
          color: '#0b2e59'
        },
        info: {
          fontSize: 10,
          italics: true,
          color: 'gray'
        },
        tableHeader: {
          bold: true,
          fillColor: '#0b2e59',
          color: 'white',
          fontSize: 11
        },
        anteTitle: {
          fontSize: 12,
          bold: true,
          color: '#10365f',
          margin: [0, 10, 0, 4]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
