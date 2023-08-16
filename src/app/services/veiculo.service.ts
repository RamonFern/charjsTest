import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dados, DadosVeiculo } from "../models/veiculo-inf";

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private baseUrl = 'https://cluster-01.apigratis.com/api/v1/vehicles/dados';

  constructor(private http: HttpClient) { }

  solicitar(placa: Dados) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9zb2NpYWwvZ29vZ2xlL2NhbGxiYWNrIiwiaWF0IjoxNjkyMDQyMTc4LCJleHAiOjE3MjM1NzgxNzgsIm5iZiI6MTY5MjA0MjE3OCwianRpIjoieE5Edmp3Q3VqM3JrU3BYUyIsInN1YiI6IjI2MzMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.O2PCfPZy6gdhqboi3wXmsGDljRTCQt8GxvvVKxgA028',
      'Content-Type': 'application/json',
      'SecretKey': '193b1f11-49ae-4a43-80bc-8b3349651632',
      'PublicToken': 'a2743b52063cd87a65d1633f5c74f5',
      'DeviceToken': 'dc479e10-cbef-4c8b-8b14-87fd72820a01'
    });

    return this.http.post<DadosVeiculo>(this.baseUrl, placa, { headers } );
  }

  listar() {
    return this.http.get<any[]>('http://localhost:8080/estacionamento');
  }
}

