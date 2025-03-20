import { HorarioAgenteRequest } from './../models/horarioAgenteRequest';
import { HorarioAgenteResponse } from './../models/horarioAgenteResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }

  salvar(horarioAgente: HorarioAgenteRequest) {
    return this.http.post<HorarioAgenteResponse>('http://localhost:8080/api/v2/horas/salvar', horarioAgente);
  }

}


