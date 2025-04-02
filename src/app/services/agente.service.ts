import { AgenteUser } from './../models/AgenteUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<AgenteUser[]>('http://localhost:8080/api/v2/agenteUser', {});
  }

  adicionar(agenteUser: AgenteUser) {
    return this.http.post<AgenteUser>('http://localhost:8080/api/v2/agenteUser', agenteUser);
  }

  atualizarAgente(agenteUser: AgenteUser, id: number) {
    return this.http.put<AgenteUser>(`http://localhost:8080/api/v2/agenteUser/${id}`, agenteUser);
  }

  adicinarAgenteEmEquipe(idAgente: number, idEquipe: number) {
    return this.http.put(`http://localhost:8080/api/v2/agenteUser/${idAgente}/adicionar-equipe/${idEquipe}`, null, { responseType: 'text' });
  }

  removerAgenteDaEquipe(idAgente: number) {
    return this.http.put(`http://localhost:8080/api/v2/agenteUser/${idAgente}/remover-equipe`, null, { responseType: 'text' });
  }

  getAgentesSemEquipe(){
    return this.http.get<AgenteUser[]>(`http://localhost:8080/api/v2/agenteUser/sem-equipe`);
  }

  buscarPorId(idAgente: number) {
    return this.http.get<AgenteUser>(`http://localhost:8080/api/v2/agenteUser/${idAgente}`);
  }

}


