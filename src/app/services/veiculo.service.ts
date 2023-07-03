import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>('http://localhost:8080/estacionamento');
  }
}
