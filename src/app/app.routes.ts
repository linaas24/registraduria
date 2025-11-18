import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CitizensComponent } from './pages/citizens/citizens.component';
import { ListaCiudadanosComponent } from './components/lista-ciudadanos/lista-ciudadanos.component';
import { RegisterCitizenComponent } from './pages/citizens/register-citizen.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'citizens', component: CitizensComponent },
      { path: 'ciudadanos/lista', component: ListaCiudadanosComponent },
      { path: 'citizens/new', component: RegisterCitizenComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
