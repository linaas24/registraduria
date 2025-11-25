import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliticsBoardComponent } from '../../components/analitics-board/analitics-board.component';
import { CitizensComponent } from '../citizens/citizens.component';
import { RegisterCitizenComponent } from '../citizens/register-citizen.component';
import { CreateBackgroundComponent } from '../../components/create-background/create-background.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AnaliticsBoardComponent,CommonModule,CitizensComponent,RegisterCitizenComponent, CreateBackgroundComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


   currentView: string = 'panel';  // vista inicial

  setView(view: string) {
    this.currentView = view;
  }

   constructor(
    private authService: AuthService,
    private router: Router
  ) {}


   logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ⬅️ Redirige al login
  }
}
