import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<any>(`${this.baseURL}/auth/login`, {
      username,
      password
    });
  }

  salvarToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

  estaLogado(): boolean {
    const token = localStorage.getItem('token');
    return token != null && token !== '';
  }

  getUserData(){
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (e) {
      console.error('Token inválido');
      return null;
    }
  }

  temPermissao(permissoes: string | string[]): boolean {
    const user: any = this.getUserData();
    if (!user) return false;

    let roles: string[] = [];

    if (user.roles) {
      roles = user.roles;
    } else if (user.authorities) {
      roles = user.authorities;
    }

    roles = roles.map(r => r.replace('ROLE_', ''));

    if (Array.isArray(permissoes)) {
      return permissoes.some(p => roles.includes(p));
    }

    return roles.includes(permissoes);
  }

  getUsername(): string {
    const user = this.getUserData();
    return user?.sub || '';
  }

}
