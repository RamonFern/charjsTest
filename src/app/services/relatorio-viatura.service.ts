import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelatorioViatura } from '../models/relatorio-viatura';


@Injectable({ providedIn: 'root' })
export class RelatorioViaturaService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  listar(): Observable<RelatorioViatura[]> {
    return this.http.get<RelatorioViatura[]>(`${this.baseURL}/api/v1/relatorios-viatura`);
  }

  salvar(relatorio: RelatorioViatura): Observable<RelatorioViatura> {
    return this.http.post<RelatorioViatura>(`${this.baseURL}/api/v1/relatorios-viatura`, relatorio);
  }

  exportarPdf(): Observable<Blob> {
    return this.http.get(`${this.baseURL}/api/v1/exportar-pdf`, {
      responseType: 'blob'
    });
  }
}
