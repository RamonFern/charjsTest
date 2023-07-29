import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelatorioRequest } from '../models/relatorio-request';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

constructor(private http: HttpClient) { }

salvarRelatorio(relatorioRequest: RelatorioRequest) {
  return this.http.post<RelatorioRequest>(`http://localhost:8080/api/v1/relatorio`, relatorioRequest);
}

buscarTodos() {
  return this.http.get<RelatorioRequest[]>(`http://localhost:8080/api/v1/relatorio`);
}

}
