import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EscalaServicoRequest, EscalaServicoResponse } from '../models/escala-servico';

@Injectable({
  providedIn: 'root'
})
export class EscalaServicoService {

  constructor(private http: HttpClient) { }


  listarEscala() {
    return this.http.get<EscalaServicoResponse[]>('http://localhost:8080/api/v2/escala-servico');
  }

  criarEscalaServico(escalaRequest: EscalaServicoRequest) {
    return this.http.post<EscalaServicoResponse>(`http://localhost:8080/api/v2/escala-servico`, escalaRequest);
  }

  buscarEscalaServicoDaEquipe(id: number) {
    return this.http.get<EscalaServicoResponse[]>(`http://localhost:8080/api/v2/escala-servico/equipe/${id}`);
  }

}
