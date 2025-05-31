import { Observable } from 'rxjs/internal/Observable';
import { HorarioAgenteRequest } from './../models/horarioAgenteRequest';
import { HorarioAgenteResponse } from './../models/horarioAgenteResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  salvar(horarioAgente: HorarioAgenteRequest) {
    return this.http.post<HorarioAgenteResponse>(`${this.baseURL}/api/v2/horas/salvar`, horarioAgente);
  }

  atualizar(horarioAgente: HorarioAgenteRequest) {
    return this.http.put<HorarioAgenteResponse>(`${this.baseURL}/api/v2/horas/${horarioAgente.agente_id}`, horarioAgente);
  }

  calcularHoras(agenteId: number, dataInicio: string, dataFim: string): Observable<ResumoHoras> {
    const params = new URLSearchParams();
    params.set('agenteId', agenteId.toString());
    params.set('dataInicio', dataInicio);
    params.set('dataFim', dataFim);
    // console.log(params.toString());

    return this.http.get<ResumoHoras>(`${this.baseURL}/api/v2/horas/calcular-horas?${params.toString()}`);
  }

  buscarRegistrosPeloIdAgente(agenteId: number, dataInicio: string, dataFim: string) {
    const params = new URLSearchParams();
    params.set('dataInicio', dataInicio);
    params.set('dataFim', dataFim);
    // console.log(params.toString());

    return this.http.get<HorarioAgenteResponse[]>(`${this.baseURL}/api/v2/horas/agente/${agenteId}?${params.toString()}`);
  }

}

export interface ResumoHoras {
  horas: number;
  minutos: number;
  totalFaltas: number;
}


