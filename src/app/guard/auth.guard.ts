import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, UrlSegment, Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  canActivateChild(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    const permissao = route.data['permissao'];

    if (permissao && !this.authService.temPermissao(permissao)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }

  canActivate(): boolean {
    if(this.authService.estaLogado()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return false;
    }

    const permissoes = route.data?.['permissoes'];

    if (permissoes && !this.authService.temPermissao(permissoes)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

      return true;
    }

}
