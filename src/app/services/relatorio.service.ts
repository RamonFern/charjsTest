import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelatorioRequest } from '../models/relatorio-request';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  baseURL = environment.baseURL;

constructor(private http: HttpClient) { }

salvarRelatorio(relatorioRequest: RelatorioRequest) {
  return this.http.post<RelatorioRequest>(`${this.baseURL}/api/v1/relatorio`, relatorioRequest);
}

buscarTodos() {
  return this.http.get<RelatorioRequest[]>(`${this.baseURL}/api/v1/relatorio`);
}

contarPermutas(nomeAgente: string, dataInicio: string, dataFim: string): Observable<PermutasResumo> {
    const params = new HttpParams()
      .set('nomeAgente', nomeAgente)
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return this.http.get<PermutasResumo>(`${this.baseURL}/api/v1/relatorio/contar-permutas`, { params });
  }

}

export interface PermutasResumo {
  solicitadas: number;
  realizadas: number;
}
