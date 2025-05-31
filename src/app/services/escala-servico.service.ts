import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EscalaServicoRequest, EscalaServicoResponse } from '../models/escala-servico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscalaServicoService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }


  listarEscala() {
    return this.http.get<EscalaServicoResponse[]>(`${this.baseURL}/api/v2/escala-servico`);
  }

  criarEscalaServico(escalaRequest: EscalaServicoRequest) {
    return this.http.post<EscalaServicoResponse>(`${this.baseURL}/api/v2/escala-servico`, escalaRequest);
  }

  buscarEscalaServicoDaEquipe(id: number) {
    return this.http.get<EscalaServicoResponse[]>(`${this.baseURL}/api/v2/escala-servico/equipe/${id}`);
  }

}
