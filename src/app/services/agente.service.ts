import { AgenteUser } from './../models/AgenteUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<AgenteUser[]>('http://localhost:8080/api/v2/agenteUser');
  }

  adicionar(agenteUser: AgenteUser) {
    return this.http.post<AgenteUser>('http://localhost:8080/api/v2/agenteUser', agenteUser);
  }

  atualizarAgente(agenteUser: AgenteUser, id: number) {
    return this.http.put<AgenteUser>(`http://localhost:8080/api/v2/agenteUser/${id}`, agenteUser);
  }

}


