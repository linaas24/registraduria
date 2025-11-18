import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliticsBoardComponent } from '../../components/analitics-board/analitics-board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AnaliticsBoardComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  recentCitizens = [
    { id: 'ID-84321', name: 'Ana Sofia Rodriguez', status: 'Verified', date: '2023-10-26' },
    { id: 'ID-84320', name: 'Carlos Ramirez', status: 'Pending', date: '2023-10-25' },
    { id: 'ID-84319', name: 'Maria Garcia', status: 'Verified', date: '2023-10-25' }
  ];
}
