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

  // pesquisaVeiculo(placa: string) {
  //   return this.http.get<any>(`https://cidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa/v5/${placa}`);
  // }
  /**
   *  criarEquipe(equipe: EquipeRequest) {
      return this.http.post<EquipeResponse>('http://localhost:8080/api/v2/equipe', equipe);
  }https://cidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa/v5
   */
}
