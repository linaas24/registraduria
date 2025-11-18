import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

    if (!authService.isLogged()) {

      Swal.fire({
        icon: 'error',
        title: 'No puedes acceder. Debes estar autenticado. ',
        text: 'Inicia sesión. ',
        confirmButtonText: 'OK',
        width: 500,
      }).then(() => {
        router.navigate(['/login']);
      });
      return false;
    }
  return true;
};














