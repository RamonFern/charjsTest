import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelatorioRequest } from '../models/relatorio-request';
import { environment } from 'src/environments/environment';

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

}
