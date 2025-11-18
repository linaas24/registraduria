import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CitizensComponent } from './pages/citizens/citizens.component';
import { ListaCiudadanosComponent } from './components/lista-ciudadanos/lista-ciudadanos.component';
import { RegisterCitizenComponent } from './pages/citizens/register-citizen.component';
import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {path:'register', component:  RegisterComponent } ,
  // {
  //   path: 'private',
  //   component: CitizensComponent,
  //   canActivate: [authGuard],
  // },
  {
    path: 'citizens',
    component: CitizensComponent,
    //canActivate: [authGuard],
  },

   {
    path: 'dashboard',
    component: DashboardComponent,
   // canActivate: [authGuard],
  },
    {
    path: 'ciudadanos/lista',
    component: ListaCiudadanosComponent,
    //canActivate: [authGuard],
  },


  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      //{ path: 'dashboard', component: DashboardComponent },
      //{ path: 'citizens', component: CitizensComponent },
      { path: 'ciudadanos/lista', component: ListaCiudadanosComponent },
      { path: 'citizens/new', component: RegisterCitizenComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];