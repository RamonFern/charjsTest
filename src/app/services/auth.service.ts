import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
