import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const usuarioLogado = loginService.usuarioLogado;
  let url = state.url;

  if (usuarioLogado) {
    if (
      route.data?.['role'] &&
      route.data?.['role'].indexOf(usuarioLogado.perfil) === -1
    ) {
      // Se o perfil do usuário não está no perfil da rota
      // vai para login
      router.navigate(['/login'], {
        queryParams: { error: 'Proibido o acesso a ' + url },
      });
      return false;
    }
    // em qualquer outro caso, permite o acesso
    return true;
  }
  // Se não está logado, vai para login
  router.navigate(['/login'], {
    queryParams: {
      error: 'Deve fazer o login antes de acessar ' + url,
    },
  });
  return false;
};
